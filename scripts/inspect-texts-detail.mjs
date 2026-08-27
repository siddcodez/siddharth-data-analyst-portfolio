import fs from "node:fs";

const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const source = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${source}\nexport { $D as splinePacker };`).toString("base64")}`
);

const scenePath = "public/assets/skills-keyboard-data-science.spline";
const input = new Uint8Array(fs.readFileSync(scenePath));
const scene = runtime.splinePacker.unpack(input);

console.log("=== Scene Variables ===");
console.log(JSON.stringify(scene.shared?.variables || scene.scene?.variables || {}, null, 2));

const findByName = (objects, name) => {
  for (const obj of objects ?? []) {
    if (obj.data?.name === name) return obj;
    const found = findByName(obj.children, name);
    if (found) return found;
  }
};

const textsObj = findByName(scene.scene.objects, "texts");
console.log("\n=== Texts Object Structure ===");

const printTree = (node, depth = 0) => {
  const indent = "  ".repeat(depth);
  console.log(`${indent}- [${node.data?.type}] name: "${node.data?.name}" | id: "${node.id}" | pos: ${JSON.stringify(node.data?.position)} | rot: ${JSON.stringify(node.data?.rotation)} | scale: ${JSON.stringify(node.data?.scale)}`);
  if (node.data?.geometry?.type === "TextGeometry") {
    console.log(`${indent}  TextGeometry: text="${node.data.geometry.text}", width=${node.data.geometry.width}, height=${node.data.geometry.height}, fontSize=${node.data.geometry.fontSize}, font="${node.data.geometry.font}", lineHeight=${node.data.geometry.lineHeight}, hAlign=${node.data.geometry.horizontalAlign}, vAlign=${node.data.geometry.verticalAlign}`);
  }
  for (const child of node.children ?? []) {
    printTree(child, depth + 1);
  }
};

printTree(textsObj);
