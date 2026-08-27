import fs from "node:fs";

const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const source = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${source}\nexport { $D as splinePacker };`).toString("base64")}`
);

const input = new Uint8Array(fs.readFileSync("public/assets/skills-keyboard-data-science.spline"));
const scene = runtime.splinePacker.unpack(input);

console.log("=== ALL SHARED MATERIALS IN SCENE ===");
for (const [id, mat] of Object.entries(scene.shared.materials ?? {})) {
  console.log(`\nMaterial ID: ${id}`);
  console.log(`  Name: "${mat.name}"`);
  console.log(`  Type: "${mat.type}"`);
  console.log("  Layers:", JSON.stringify(mat.layers?.map(l => ({
    id: l.id,
    type: l.data?.type,
    color: l.data?.color,
    rawColor: l.data?.color ? `rgb(${Math.round(l.data.color.r * 255)}, ${Math.round(l.data.color.g * 255)}, ${Math.round(l.data.color.b * 255)})` : undefined,
    visible: l.data?.visible,
    alpha: l.data?.alpha,
    roughness: l.data?.roughness,
    metalness: l.data?.metalness,
    transmission: l.data?.transmission,
    ior: l.data?.ior,
    category: l.data?.category,
  })), null, 2));
}

// Let's also check which scene objects reference each material
const findReferences = (obj, matId, acc = []) => {
  if (!obj) return acc;
  if (obj.data?.material === matId) {
    acc.push(`${obj.data?.name || "unnamed"} (${obj.data?.type})`);
  }
  for (const c of obj.children ?? []) {
    findReferences(c, matId, acc);
  }
  return acc;
};

console.log("\n=== MATERIAL USAGE PER OBJECT ===");
for (const [id, mat] of Object.entries(scene.shared.materials ?? {})) {
  const refs = findReferences(scene.scene, id);
  console.log(`Material "${mat.name}" (${id}): used by [${refs.join(", ")}]`);
}
