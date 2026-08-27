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
for (const c of texts?.children ?? []) {
  console.log(`=== Container: ${c.data?.name} ===`);
  console.log(`pos: ${JSON.stringify(c.data?.position)}, rot: ${JSON.stringify(c.data?.rotation)}, scale: ${JSON.stringify(c.data?.scale)}`);
  for (let i = 0; i < c.children.length; i++) {
    const child = c.children[i];
    const isHeading = child.data?.geometry?.text === "98af722b-2408-4644-bb92-fd32f23cb00f";
    const role = isHeading ? "HEADING" : "DESC";
    console.log(`  Child [${i}] (${role}):`);
    console.log(`    pos: ${JSON.stringify(child.data?.position)}`);
    console.log(`    rot: ${JSON.stringify(child.data?.rotation)}`);
    console.log(`    scale: ${JSON.stringify(child.data?.scale)}`);
    console.log(`    width: ${child.data?.geometry?.width}`);
    console.log(`    height: ${child.data?.geometry?.height}`);
    console.log(`    fontSize: ${child.data?.geometry?.fontSize}`);
    console.log(`    lineHeight: ${child.data?.geometry?.lineHeight}`);
    console.log(`    hAlign: ${child.data?.geometry?.horizontalAlign}, vAlign: ${child.data?.geometry?.verticalAlign}`);
  }
}
