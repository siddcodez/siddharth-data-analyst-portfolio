import fs from "node:fs";

const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const source = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${source}\nexport { $D as splinePacker };`).toString("base64")}`
);

const input = new Uint8Array(fs.readFileSync("public/assets/skills-keyboard-data-science.spline"));
const scene = runtime.splinePacker.unpack(input);

console.log("Scene top level keys:", Object.keys(scene));
console.log("scene.scene keys:", Object.keys(scene.scene));

if (scene.scene?.materials) {
  console.log("Found scene.scene.materials:", Object.keys(scene.scene.materials).length);
}

if (scene.materials) {
  console.log("Found scene.materials:", Object.keys(scene.materials).length);
}

// Let's inspect where "9bd45cc9-fb41-4d51-9553-aa12232c4052" is in the whole scene data
const searchUUID = (obj, target, path = "") => {
  if (!obj || typeof obj !== "object") return;
  for (const [k, v] of Object.entries(obj)) {
    if (k === target || v === target) {
      console.log(`Matched target at: ${path}.${k}`);
    }
    if (typeof v === "object") {
      searchUUID(v, target, `${path}.${k}`);
    }
  }
};

searchUUID(scene, "9bd45cc9-fb41-4d51-9553-aa12232c4052");

// Let's inspect all 24 key components and get the materials used by keycap-desktop / keycap-mobile
const expectedKeys = [
  "python", "sql", "pandas", "numpy", "excel", "powerbi", "tableau",
  "scikitlearn", "jupyter", "googlecolab", "git", "github", "vscode",
  "anaconda", "statistics", "eda", "datavisualization", "ml",
  "regression", "classification", "clustering", "predictivemodel",
  "datacleaning", "featureeng"
];

const findByName = (objects, name) => {
  for (const object of objects ?? []) {
    if (object.data?.name === name) return object;
    const found = findByName(object.children, name);
    if (found) return found;
  }
};

console.log("\n=== KEYCAP MESH MATERIALS ===");
for (const k of expectedKeys) {
  const comp = findByName(scene.scene.objects, k);
  const kd = findByName(comp ? [comp] : [], "keycap-desktop");
  console.log(`Key [${k}]: keycap-desktop material =`, kd?.data?.material);
}
