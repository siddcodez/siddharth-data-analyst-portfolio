/**
 * fix-keycap-textures.mjs
 *
 * Re-embeds ALL 24 keycap textures as proper raster PNG images.
 * Uses @resvg/resvg-js to convert SVG → PNG (256x256).
 * Works off the CURRENT scene state (component names already renamed to
 * python, sql, pandas, etc. — NOT the old js/ts/html names).
 */

import fs from "node:fs";
import { createRequire } from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  BrainCircuit,
  ChartColumn,
  ChartNetwork,
  ChartNoAxesCombined,
  Database,
  GitBranch,
  Network,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";

// Load resvg via CJS require (it's a native addon)
const require = createRequire(import.meta.url);
const { Resvg } = require("@resvg/resvg-js");

// ---------------------------------------------------------------------------
// Load Spline runtime + unpack scene
// ---------------------------------------------------------------------------
const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const runtimeSource = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${runtimeSource}\nexport { $D as splinePacker };`).toString("base64")}`
);

const scenePath = "public/assets/skills-keyboard-data-science.spline";
const scene = runtime.splinePacker.unpack(new Uint8Array(fs.readFileSync(scenePath)));

// ---------------------------------------------------------------------------
// Helper: SVG string → 256×256 PNG Uint8Array
// ---------------------------------------------------------------------------
const svgToPng = (svgString) => {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: "width", value: 256 },
    background: "transparent",
  });
  return new Uint8Array(resvg.render().asPng());
};

// ---------------------------------------------------------------------------
// Helper: lucide icon → SVG string → PNG Uint8Array
// ---------------------------------------------------------------------------
const iconPng = (Icon, color) => {
  const svgString = renderToStaticMarkup(
    React.createElement(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 128 128", width: "128", height: "128" },
      React.createElement(Icon, {
        x: 20, y: 20, width: 88, height: 88,
        color, strokeWidth: 3.8,
      })
    )
  );
  return svgToPng(svgString);
};

// ---------------------------------------------------------------------------
// Helper: read file from .tmp-spline-logos → rasterize if SVG → return PNG bytes
// ---------------------------------------------------------------------------
const assetsPath = ".tmp-spline-logos";
const logoAsset = (name, ext) => {
  const filePath = `${assetsPath}/${name}.${ext}`;
  const raw = fs.readFileSync(filePath);
  if (ext === "png") {
    // Already raster — verify PNG magic
    if (raw[0] === 0x89 && raw[1] === 0x50) return new Uint8Array(raw);
    throw new Error(`${filePath} is not a valid PNG!`);
  }
  // It's an SVG file — rasterize to PNG
  return svgToPng(raw.toString("utf8"));
};

// ---------------------------------------------------------------------------
// Build asset map: keycapName → PNG Uint8Array
// ---------------------------------------------------------------------------
const assets = {
  python:            logoAsset("python",      "svg"),
  sql:               logoAsset("sql",         "svg"),
  pandas:            logoAsset("pandas",      "svg"),
  numpy:             logoAsset("numpy",       "svg"),
  excel:             logoAsset("excel",       "svg"),
  powerbi:           logoAsset("powerbi",     "svg"),
  tableau:           logoAsset("tableau",     "png"),
  scikitlearn:       logoAsset("scikitlearn", "svg"),
  jupyter:           logoAsset("jupyter",     "svg"),
  googlecolab:       logoAsset("googlecolab", "svg"),
  git:               logoAsset("git",         "svg"),
  github:            logoAsset("github",      "svg"),
  vscode:            logoAsset("vscode",      "svg"),
  anaconda:          logoAsset("anaconda",    "svg"),
  statistics:        iconPng(ChartColumn,       "#3b82f6"),
  eda:               iconPng(Sparkles,          "#22d3ee"),
  datavisualization: iconPng(ChartNoAxesCombined, "#a855f7"),
  ml:                iconPng(BrainCircuit,      "#f97316"),
  regression:        iconPng(TrendingUp,        "#22c55e"),
  classification:    iconPng(Network,           "#3b82f6"),
  clustering:        iconPng(ChartNetwork,      "#ec4899"),
  predictivemodel:   iconPng(Workflow,          "#8b5cf6"),
  datacleaning:      iconPng(Database,          "#14b8a6"),
  featureeng:        iconPng(GitBranch,         "#eab308"),
};

// Verify all assets are valid PNG before touching the scene
console.log("=== Asset PNG verification ===");
for (const [name, data] of Object.entries(assets)) {
  const isPNG = data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4E && data[3] === 0x47;
  if (!isPNG) throw new Error(`FATAL: ${name} asset is NOT a PNG (magic: ${[...data.slice(0,4)].map(b=>b.toString(16)).join(" ")})`);
  console.log(`  ✅ ${name.padEnd(22)} PNG ${data.length} bytes`);
}
console.log();

// ---------------------------------------------------------------------------
// Find objects in scene by name
// ---------------------------------------------------------------------------
const findByName = (objects, name) => {
  for (const o of objects ?? []) {
    if (o.data?.name === name) return o;
    const found = findByName(o.children, name);
    if (found) return found;
  }
};

// ---------------------------------------------------------------------------
// Find a template legend that has a working texture layer structure
// We'll use the first keycap found that has any legend (even with wrong data)
// to clone the material structure from — we just swap the image bytes.
// ---------------------------------------------------------------------------
const findTemplateLegend = (objects) => {
  // Walk scene to find any legend with a texture layer
  const walk = (objs) => {
    for (const o of objs ?? []) {
      if (o.data?.name === "legend") {
        const layers = o.data?.material?.layers ?? [];
        if (layers.some(l => l.data?.type === "texture")) return o;
      }
      const found = walk(o.children);
      if (found) return found;
    }
  };
  return walk(objects);
};

const templateLegend = findTemplateLegend(scene.scene.objects);
if (!templateLegend?.data?.geometry || !templateLegend?.data?.material) {
  throw new Error("Could not find any legend with a texture layer to use as template.");
}
console.log("Template legend found — cloning material structure from it.\n");

// ---------------------------------------------------------------------------
// Re-embed PNG textures into each keycap
// ---------------------------------------------------------------------------
const keycapNames = Object.keys(assets);
let updated = 0;
let failed = 0;

console.log("=== Embedding PNG textures into scene ===");
for (const keyName of keycapNames) {
  const component = findByName(scene.scene.objects, keyName);
  if (!component) {
    console.log(`  ❌ SKIP ${keyName} — component not found in scene`);
    failed++;
    continue;
  }

  const keycap = component.children?.find(c => c.data?.name === "keycap");
  const legend = keycap?.children?.find(c => c.data?.name === "legend");

  if (!legend) {
    console.log(`  ❌ SKIP ${keyName} — legend object not found`);
    failed++;
    continue;
  }

  const pngData = assets[keyName];

  // Clone the template material and patch the texture layer
  const material = structuredClone(templateLegend.data.material);
  const textureLayer = material.layers.find(l => l.data?.type === "texture");
  if (!textureLayer) {
    console.log(`  ❌ SKIP ${keyName} — no texture layer in cloned material`);
    failed++;
    continue;
  }

  // Embed the rasterized PNG
  textureLayer.data.texture.image.data = pngData;
  textureLayer.data.texture.image.name = `${keyName}.png`;

  // Also clone geometry from template to ensure consistent UV mapping
  legend.data.geometry = structuredClone(templateLegend.data.geometry);
  legend.data.material = material;

  console.log(`  ✅ ${keyName.padEnd(22)} → ${keyName}.png (${pngData.length} bytes)`);
  updated++;
}

console.log(`\nEmbedded: ${updated}/24  Failed: ${failed}/24\n`);
if (failed > 0) throw new Error(`${failed} keycaps failed — aborting before writing file.`);

// ---------------------------------------------------------------------------
// Pack and write
// ---------------------------------------------------------------------------
const packed = runtime.splinePacker.pack(scene);
fs.writeFileSync(scenePath, packed);
fs.copyFileSync(scenePath, "public/assets/skills-keyboard.spline");
console.log(`Wrote updated scene to ${scenePath} (${packed.length} bytes)`);
console.log(`Copied to public/assets/skills-keyboard.spline`);
