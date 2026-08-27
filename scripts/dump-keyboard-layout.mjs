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

const keyboard = findByName(scene.scene.objects, "keyboard");

const dumpHierarchy = (obj, indent = 0) => {
  const pad = "  ".repeat(indent);
  const pos = obj.data?.position ? `[${obj.data.position.join(", ")}]` : "";
  console.log(`${pad}- ${obj.data?.name || "unnamed"} (${obj.data?.type}) ${pos}`);
  for (const child of obj.children ?? []) {
    dumpHierarchy(child, indent + 1);
  }
};

console.log("=== KEYBOARD HIERARCHY ===");
if (keyboard) dumpHierarchy(keyboard);
