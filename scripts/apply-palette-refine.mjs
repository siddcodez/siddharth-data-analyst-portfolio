import fs from "node:fs";
import { createRequire } from "node:module";
import crypto from "node:crypto";
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
// Helpers: SVG -> PNG
// ---------------------------------------------------------------------------
const svgToPng = (svgString) => {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: "width", value: 256 },
    background: "transparent",
  });
  return new Uint8Array(resvg.render().asPng());
};

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

const assetsPath = ".tmp-spline-logos";
const logoAsset = (name, ext) => {
  const filePath = `${assetsPath}/${name}.${ext}`;
  const raw = fs.readFileSync(filePath);
  if (ext === "png") {
    if (raw[0] === 0x89 && raw[1] === 0x50) return new Uint8Array(raw);
    throw new Error(`${filePath} is not a valid PNG!`);
  }
  return svgToPng(raw.toString("utf8"));
};

// ---------------------------------------------------------------------------
// Textures asset map (with crisp high-contrast icon stroke colors)
// ---------------------------------------------------------------------------
const textureAssets = {
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
  // High contrast stroke colors on dark slate / accent keys
  statistics:        iconPng(ChartColumn,        "#38bdf8"), // sky blue
  eda:               iconPng(Sparkles,           "#ffffff"), // crisp white on cyan key
  datavisualization: iconPng(ChartNoAxesCombined,"#ffffff"), // crisp white on violet key
  ml:                iconPng(BrainCircuit,       "#ffffff"), // crisp white on indigo key
  regression:        iconPng(TrendingUp,         "#2dd4bf"), // bright teal on dark slate
  classification:    iconPng(Network,            "#ffffff"), // crisp white on blue key
  clustering:        iconPng(ChartNetwork,       "#818cf8"), // bright indigo on dark slate
  predictivemodel:   iconPng(Workflow,           "#ffffff"), // crisp white on indigo key
  datacleaning:      iconPng(Database,           "#ffffff"), // crisp white on teal key
  featureeng:        iconPng(GitBranch,          "#38bdf8"), // sky blue on dark slate
};

// ---------------------------------------------------------------------------
// Palettes definition for Keycaps (Final Polish Pass)
// ---------------------------------------------------------------------------
const hexToRgb01 = (hex) => {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  };
};

const KEYCAP_PALETTE = {
  // Row 0
  python:            { hex: "#172b46", name: "Dark Steel Navy (Darker Python)" },
  sql:               { hex: "#161f2e", name: "Dark Slate" },
  pandas:            { hex: "#182232", name: "Dark Slate Blue" },
  numpy:             { hex: "#161f2e", name: "Dark Slate" },
  excel:             { hex: "#182232", name: "Dark Slate Blue" },
  powerbi:           { hex: "#d9a406", name: "Muted Amber Gold (Power BI)" },

  // Row 1
  tableau:           { hex: "#161f2e", name: "Dark Slate" },
  scikitlearn:       { hex: "#182232", name: "Dark Slate Blue" },
  jupyter:           { hex: "#161f2e", name: "Dark Slate" },
  googlecolab:       { hex: "#182232", name: "Dark Slate Blue" },
  git:               { hex: "#a94428", name: "Muted Rust Orange (Git Accent)" },
  github:            { hex: "#182232", name: "Dark Slate Blue" },

  // Row 2
  vscode:            { hex: "#161f2e", name: "Dark Slate" },
  anaconda:          { hex: "#182232", name: "Dark Slate Blue" },
  statistics:        { hex: "#161f2e", name: "Dark Slate" },
  eda:               { hex: "#0e7490", name: "Refined Cyan Accent" },
  datavisualization: { hex: "#6d28d9", name: "Refined Deep Violet Accent" },
  ml:                { hex: "#3730a3", name: "Refined Deep Indigo Accent" },

  // Row 3
  regression:        { hex: "#161f2e", name: "Dark Slate" },
  classification:    { hex: "#1d4ed8", name: "Refined Tech Blue Accent" },
  clustering:        { hex: "#182232", name: "Dark Slate Blue" },
  predictivemodel:   { hex: "#4f46e5", name: "Refined Indigo Accent" },
  datacleaning:      { hex: "#0f766e", name: "Refined Deep Teal Accent" },
  featureeng:        { hex: "#161f2e", name: "Dark Slate" },
};

// ---------------------------------------------------------------------------
// Helpers: Scene traversal
// ---------------------------------------------------------------------------
const findByName = (objects, name) => {
  for (const o of objects ?? []) {
    if (o.data?.name === name) return o;
    const found = findByName(o.children, name);
    if (found) return found;
  }
};

const findTemplateLegend = (objects) => {
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

// ---------------------------------------------------------------------------
// Helper: Create customized keycap material in scene.shared.materials
// ---------------------------------------------------------------------------
const createOrUpdateMaterial = (matId, matName, hexColor) => {
  const rgb = hexToRgb01(hexColor);
  const material = {
    name: matName,
    layers: [
      {
        fi: 0,
        id: "layer1",
        data: {
          mode: 0,
          isMask: false,
          visible: true,
          bumpMapIntensity: 5,
          alphaOverride: 1,
          category: "phong",
          specular: { r: 0.25, g: 0.25, b: 0.28 },
          shininess: 6,
          type: "light",
          occlusion: true,
          alpha: 0.6,
        },
      },
      {
        fi: 0.5,
        id: crypto.randomUUID(),
        data: {
          alpha: 0.85,
          mode: 0,
          isMask: false,
          visible: true,
          type: "depth",
          gradientType: 0,
          smooth: false,
          isVector: true,
          isWorldSpace: false,
          origin: [0, 0, 0],
          direction: [0, -1, 0],
          colors: [
            [rgb.r * 1.15, rgb.g * 1.15, rgb.b * 1.15, 0.15],
            [0, 0, 0, 0.85],
          ],
          steps: [0, 1],
          near: -200,
          far: 200,
        },
      },
      {
        fi: 1,
        id: "layer2",
        data: {
          alpha: 1,
          mode: 0,
          isMask: false,
          visible: true,
          type: "color",
          color: { r: rgb.r, g: rgb.g, b: rgb.b },
        },
      },
    ],
  };

  scene.shared.materials[matId] = material;
  return matId;
};

// ---------------------------------------------------------------------------
// Apply Keyboard Base / Body Material Refinement
// ---------------------------------------------------------------------------
const body = findByName(scene.scene.objects, "body");
if (body?.data?.material?.layers) {
  const colorLayer = body.data.material.layers.find(l => l.data?.type === "color");
  if (colorLayer) {
    // Deep Navy Charcoal #0e131d
    colorLayer.data.color = { r: 0.055, g: 0.075, b: 0.115 };
    console.log("Updated keyboard body to Deep Navy Charcoal (#0e131d)");
  }
}

const platform = findByName(scene.scene.objects, "platform");
if (platform?.data?.material?.layers) {
  const colorLayer = platform.data.material.layers.find(l => l.data?.type === "color");
  if (colorLayer) {
    // Subtle Dark Navy border #141c29
    colorLayer.data.color = { r: 0.078, g: 0.110, b: 0.161 };
    console.log("Updated keyboard platform to Dark Navy (#141c29)");
  }
}

// ---------------------------------------------------------------------------
// Apply Keycap Materials and Legend Textures to All 24 Keys
// ---------------------------------------------------------------------------
console.log("\n=== APPLYING REFINED PALETTE (FINAL POLISH) TO 24 KEYCAPS ===");
let updatedCount = 0;

for (const [keyName, pal] of Object.entries(KEYCAP_PALETTE)) {
  const comp = findByName(scene.scene.objects, keyName);
  if (!comp) {
    console.log(`  ❌ Missing component: ${keyName}`);
    continue;
  }

  const keycapGroup = comp.children?.find(c => c.data?.name === "keycap");
  const legend = keycapGroup?.children?.find(c => c.data?.name === "legend");
  const keycapDesktop = keycapGroup?.children?.find(c => c.data?.name === "keycap-desktop");
  const keycapMobile = keycapGroup?.children?.find(c => c.data?.name === "keycap-mobile");

  // 1. Assign dedicated Material with refined color
  const matId = `mat_${keyName}_${pal.hex.replace("#", "")}`;
  createOrUpdateMaterial(matId, `${keyName}_mat`, pal.hex);

  if (keycapDesktop?.data) keycapDesktop.data.material = matId;
  if (keycapMobile?.data) keycapMobile.data.material = matId;

  // 2. Re-embed crisp PNG texture into Legend
  const pngData = textureAssets[keyName];
  if (legend && pngData) {
    const material = structuredClone(templateLegend.data.material);
    const textureLayer = material.layers.find(l => l.data?.type === "texture");
    if (textureLayer) {
      textureLayer.data.texture.image.data = pngData;
      textureLayer.data.texture.image.name = `${keyName}.png`;
      legend.data.geometry = structuredClone(templateLegend.data.geometry);
      legend.data.material = material;
    }
  }

  console.log(`  ✅ ${keyName.padEnd(20)} -> ${pal.name.padEnd(35)} (${pal.hex})`);
  updatedCount++;
}

console.log(`\nSuccessfully updated ${updatedCount}/24 keycaps with refined palette.\n`);

// ---------------------------------------------------------------------------
// Pack and save Spline assets
// ---------------------------------------------------------------------------
const packed = runtime.splinePacker.pack(scene);
fs.writeFileSync(scenePath, packed);
fs.copyFileSync(scenePath, "public/assets/skills-keyboard.spline");
console.log(`Wrote updated scene to ${scenePath} (${packed.length} bytes)`);
console.log(`Copied to public/assets/skills-keyboard.spline`);
