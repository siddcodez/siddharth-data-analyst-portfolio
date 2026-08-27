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

const python = findByName(scene.scene.objects, "python");

const inspectObj = (obj, indent = 0) => {
  const pad = " ".repeat(indent);
  console.log(`${pad}Name: "${obj.data?.name}", Type: "${obj.data?.type}", ID: "${obj.id}"`);
  if (obj.data?.material) {
    console.log(`${pad}  Material:`, JSON.stringify(obj.data.material, null, 2).split("\n").map(l => pad + "  " + l).join("\n"));
  }
  if (obj.data?.mat) {
    console.log(`${pad}  Mat:`, obj.data.mat);
  }
  if (obj.data?.color) {
    console.log(`${pad}  Color:`, obj.data.color);
  }
  for (const child of obj.children ?? []) {
    inspectObj(child, indent + 2);
  }
};

console.log("=== Inspecting 'python' hierarchy ===");
if (python) inspectObj(python);

console.log("\n=== Checking scene.shared.materials ===");
if (scene.scene?.shared?.materials) {
  console.log("Shared materials:", JSON.stringify(Object.entries(scene.scene.shared.materials).map(([k, v]) => ({
    id: k,
    name: v.name,
    layers: v.layers?.map(l => ({ type: l.data?.type, color: l.data?.color, value: l.data?.value, raw: l.data }))
  })), null, 2));
}

console.log("\n=== Checking scene.shared.components ===");
if (scene.scene?.shared?.components) {
  for (const [k, v] of Object.entries(scene.scene.shared.components)) {
    console.log(`Shared component [${k}]:`, v.name);
  }
}
