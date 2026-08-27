import fs from "node:fs";

const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const source = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${source}\nexport { $D as splinePacker };`).toString("base64")}`
);

const scenePath = "public/assets/skills-keyboard-data-science.spline";
const input = new Uint8Array(fs.readFileSync(scenePath));
const scene = runtime.splinePacker.unpack(input);

const findByName = (objects, name) => {
  for (const obj of objects ?? []) {
    if (obj.data?.name === name) return obj;
    const found = findByName(obj.children, name);
    if (found) return found;
  }
};

const texts = findByName(scene.scene.objects, "texts");
console.log("texts children count:", texts?.children?.length);
for (const c of texts?.children ?? []) {
  console.log("container:", c.data?.name, "children:", c.children?.length);
  for (const tc of c.children ?? []) {
    console.log("  child:", tc.data?.name, "type:", tc.data?.type, "geo:", tc.data?.geometry?.type, "rawGeometry:", tc.data?.geometry);
  }
}
