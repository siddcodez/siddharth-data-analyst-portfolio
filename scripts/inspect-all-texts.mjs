import fs from "node:fs";

const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const source = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${source}\nexport { $D as splinePacker };`).toString("base64")}`
);

const scenePath = "public/assets/skills-keyboard-data-science.spline";
const input = new Uint8Array(fs.readFileSync(scenePath));
const scene = runtime.splinePacker.unpack(input);

const keycapsWithText = [];

const walk = (obj, path = []) => {
  const p = [...path, obj.data?.name || "unnamed"];
  if (obj.data?.geometry?.type === "TextGeometry" || obj.data?.type === "Text") {
    keycapsWithText.push({
      path: p.join(" / "),
      visible: obj.data?.visible,
      text: obj.data?.geometry?.text,
      name: obj.data?.name,
    });
  }
  for (const c of obj.children ?? []) {
    walk(c, p);
  }
};

walk(scene.scene.objects);

console.log("=== All Text Objects in Scene ===");
console.log(JSON.stringify(keycapsWithText, null, 2));
