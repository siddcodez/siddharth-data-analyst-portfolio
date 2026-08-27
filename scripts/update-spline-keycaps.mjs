import fs from "node:fs";
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

const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const runtimeSource = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${runtimeSource}\nexport { $D as splinePacker };`).toString("base64")}`,
);

const scenePath = "public/assets/skills-keyboard-data-science.spline";
const scene = runtime.splinePacker.unpack(new Uint8Array(fs.readFileSync(scenePath)));

const iconSvg = (Icon, color) => Buffer.from(
  renderToStaticMarkup(
    React.createElement(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 128 128", width: "128", height: "128" },
      React.createElement(Icon, {
        x: 20,
        y: 20,
        width: 88,
        height: 88,
        color,
        strokeWidth: 3.8,
      }),
    ),
  ),
);

const assetsPath = ".tmp-spline-logos";
const asset = (name) => new Uint8Array(fs.readFileSync(`${assetsPath}/${name}`));
const assets = {
  python: asset("python.svg"),
  sql: asset("sql.svg"),
  pandas: asset("pandas.svg"),
  numpy: asset("numpy.svg"),
  excel: asset("excel.svg"),
  powerbi: asset("powerbi.svg"),
  tableau: asset("tableau.png"),
  scikitlearn: asset("scikitlearn.svg"),
  jupyter: asset("jupyter.svg"),
  googlecolab: asset("googlecolab.svg"),
  git: asset("git.svg"),
  github: asset("github.svg"),
  vscode: asset("vscode.svg"),
  anaconda: asset("anaconda.svg"),
  statistics: iconSvg(ChartColumn, "#3b82f6"),
  eda: iconSvg(Sparkles, "#22d3ee"),
  datavisualization: iconSvg(ChartNoAxesCombined, "#a855f7"),
  ml: iconSvg(BrainCircuit, "#f97316"),
  regression: iconSvg(TrendingUp, "#22c55e"),
  classification: iconSvg(Network, "#3b82f6"),
  clustering: iconSvg(ChartNetwork, "#ec4899"),
  predictivemodel: iconSvg(Workflow, "#8b5cf6"),
  datacleaning: iconSvg(Database, "#14b8a6"),
  featureeng: iconSvg(GitBranch, "#eab308"),
};

const replacements = {
  js: "python",
  ts: "sql",
  html: "pandas",
  css: "numpy",
  react: "excel",
  vue: "powerbi",
  nextjs: "tableau",
  tailwind: "scikitlearn",
  nodejs: "jupyter",
  express: "googlecolab",
  postgres: "git",
  mongodb: "github",
  git: "vscode",
  github: "anaconda",
  prettier: "statistics",
  npm: "eda",
  firebase: "datavisualization",
  wordpress: "ml",
  linux: "regression",
  docker: "classification",
  nginx: "clustering",
  aws: "predictivemodel",
  vim: "datacleaning",
  vercel: "featureeng",
};

const findByName = (objects, name) => {
  for (const object of objects ?? []) {
    if (object.data?.name === name) return object;
    const found = findByName(object.children, name);
    if (found) return found;
  }
};

const templateLegend = findByName(scene.scene.objects, "html").children
  .find((child) => child.data?.name === "keycap").children
  .find((child) => child.data?.name === "legend");

if (!templateLegend?.data?.geometry || !templateLegend?.data?.material) {
  throw new Error("Could not find the existing Spline keycap texture template.");
}

let updated = 0;
const keycapComponents = Object.fromEntries(
  Object.keys(replacements).map((name) => [name, findByName(scene.scene.objects, name)]),
);

for (const [oldName, newName] of Object.entries(replacements)) {
  const keycapComponent = keycapComponents[oldName];
  const keycap = keycapComponent?.children?.find((child) => child.data?.name === "keycap");
  const legend = keycap?.children?.find((child) => child.data?.name === "legend");
  const imageData = assets[newName];

  if (!keycapComponent || !legend || !imageData) {
    throw new Error(`Unable to update ${oldName} to ${newName}.`);
  }

  const material = structuredClone(templateLegend.data.material);
  const textureLayer = material.layers.find((layer) => layer.data?.type === "texture");
  textureLayer.data.texture.image.data = imageData;
  textureLayer.data.texture.image.name = `${newName}.${newName === "tableau" ? "png" : "svg"}`;

  legend.data.geometry = structuredClone(templateLegend.data.geometry);
  legend.data.material = material;
  keycapComponent.data.name = newName;
  updated += 1;
}

fs.writeFileSync(scenePath, runtime.splinePacker.pack(scene));
fs.copyFileSync(scenePath, "public/assets/skills-keyboard.spline");
console.log(`Embedded ${updated} Data Analytics and Data Science logo textures in ${scenePath}.`);
