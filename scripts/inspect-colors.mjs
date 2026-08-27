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

console.log("=== KEYBOARD BODY & PLATFORM ===");
const body = findByName(scene.scene.objects, "body");
if (body) {
  console.log("body layers:", JSON.stringify(body.data?.material?.layers?.map(l => ({ type: l.data?.type, color: l.data?.color, raw: l.data })), null, 2));
}

const platform = findByName(scene.scene.objects, "platform");
if (platform) {
  console.log("platform layers:", JSON.stringify(platform.data?.material?.layers?.map(l => ({ type: l.data?.type, color: l.data?.color, raw: l.data })), null, 2));
}

const expectedKeys = [
  "python", "sql", "pandas", "numpy", "excel", "powerbi", "tableau",
  "scikitlearn", "jupyter", "googlecolab", "git", "github", "vscode",
  "anaconda", "statistics", "eda", "datavisualization", "ml",
  "regression", "classification", "clustering", "predictivemodel",
  "datacleaning", "featureeng"
];

console.log("\n=== ALL 24 KEYCAP MATERIALS & COLORS ===");
for (const keyName of expectedKeys) {
  const comp = findByName(scene.scene.objects, keyName);
  const keycap = comp?.children?.find(c => c.data?.name === "keycap");
  const legend = keycap?.children?.find(c => c.data?.name === "legend");

  console.log(`\n--- Key: ${keyName} ---`);
  if (!keycap) {
    console.log("  keycap not found");
    continue;
  }
  console.log("  keycap layers:", JSON.stringify(keycap.data?.material?.layers?.map(l => ({
    id: l.id,
    type: l.data?.type,
    color: l.data?.color,
    value: l.data?.value,
    roughness: l.data?.roughness,
    metalness: l.data?.metalness,
    transmission: l.data?.transmission,
    ior: l.data?.ior,
    gradient: l.data?.gradient,
    data: l.data
  })), null, 2));
}
