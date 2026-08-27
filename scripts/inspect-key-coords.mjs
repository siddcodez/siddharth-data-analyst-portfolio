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

const keyPositions = [];
for (const k of expectedKeys) {
  const comp = findByName(scene.scene.objects, k);
  const pos = comp?.data?.position || [0, 0, 0];
  keyPositions.push({ name: k, x: pos[0], y: pos[1], z: pos[2] });
}

keyPositions.sort((a, b) => (a.z - b.z) || (a.x - b.x));
console.log("=== KEY POSITIONS IN 3D SPACE ===");
for (const kp of keyPositions) {
  console.log(`Key: ${kp.name.padEnd(20)} | X: ${kp.x.toFixed(1).padStart(7)}, Y: ${kp.y.toFixed(1).padStart(7)}, Z: ${kp.z.toFixed(1).padStart(7)}`);
}
