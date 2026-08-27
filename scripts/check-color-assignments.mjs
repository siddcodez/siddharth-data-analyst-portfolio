import fs from "node:fs";

const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const source = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${source}\nexport { $D as splinePacker };`).toString("base64")}`
);

const input = new Uint8Array(fs.readFileSync("public/assets/skills-keyboard-data-science.spline"));
const scene = runtime.splinePacker.unpack(input);

const findByName = (objects, name) => {
  for (const object of objects ?? []) {
    if (object.data?.name === name) return object;
    const found = findByName(object.children, name);
    if (found) return found;
  }
};

const expectedKeys = [
  "python", "sql", "pandas", "numpy", "excel", "powerbi", "tableau",
  "scikitlearn", "jupyter", "googlecolab", "git", "github", "vscode",
  "anaconda", "statistics", "eda", "datavisualization", "ml",
  "regression", "classification", "clustering", "predictivemodel",
  "datacleaning", "featureeng"
];

console.log("=== CURRENT KEYCAP COLOR ASSIGNMENTS ===");
for (const k of expectedKeys) {
  const comp = findByName(scene.scene.objects, k);
  const kd = findByName(comp ? [comp] : [], "keycap-desktop");
  const matId = kd?.data?.material;
  const mat = scene.shared.materials?.[matId];
  const colorLayer = mat?.layers?.find(l => l.data?.type === "color");
  const c = colorLayer?.data?.color;
  const rgb = c ? `rgb(${Math.round(c.r * 255)}, ${Math.round(c.g * 255)}, ${Math.round(c.b * 255)})` : "none";
  const hex = c ? `#${Math.round(c.r * 255).toString(16).padStart(2, '0')}${Math.round(c.g * 255).toString(16).padStart(2, '0')}${Math.round(c.b * 255).toString(16).padStart(2, '0')}` : "none";
  console.log(`Key: ${k.padEnd(20)} | Mat: "${mat?.name?.padEnd(12)}" | ${rgb.padEnd(18)} | ${hex}`);
}

const body = findByName(scene.scene.objects, "body");
const bodyColorLayer = body?.data?.material?.layers?.find(l => l.data?.type === "color");
console.log("\nKeyboard Body Base Color:", bodyColorLayer?.data?.color);
