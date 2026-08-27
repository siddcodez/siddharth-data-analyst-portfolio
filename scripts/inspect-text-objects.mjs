import fs from "node:fs";

const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const source = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${source}\nexport { $D as splinePacker };`).toString("base64")}`
);

const scenePath = "public/assets/skills-keyboard-data-science.spline";
const input = new Uint8Array(fs.readFileSync(scenePath));
const scene = runtime.splinePacker.unpack(input);

const textObjects = [];

const walk = (objects, path = []) => {
  for (const obj of objects ?? []) {
    const curPath = [...path, obj.data?.name || obj.data?.type || "unnamed"];
    if (
      obj.data?.type === "Text" ||
      obj.data?.geometry?.type === "TextGeometry" ||
      obj.data?.name === "heading" ||
      obj.data?.name === "desc" ||
      obj.data?.name?.includes("text") ||
      obj.data?.name?.includes("Text")
    ) {
      textObjects.push({
        name: obj.data?.name,
        type: obj.data?.type,
        path: curPath.join(" / "),
        position: obj.data?.position,
        rotation: obj.data?.rotation,
        scale: obj.data?.scale,
        size: obj.data?.size,
        geometry: obj.data?.geometry,
        material: obj.data?.material,
        variable: obj.data?.variable,
        dataVariable: obj.data?.dataVariable,
        variables: obj.data?.variables,
        rawObjKeys: Object.keys(obj.data || {}),
        rawObj: obj.data,
      });
    }
    walk(obj.children, curPath);
  }
};

walk(scene.scene.objects);

console.log("=== Found Text / Named Objects ===");
for (const t of textObjects) {
  console.log(JSON.stringify({
    name: t.name,
    path: t.path,
    type: t.type,
    position: t.position,
    rotation: t.rotation,
    scale: t.scale,
    size: t.size,
    text: t.geometry?.text || t.geometry?.textValue || t.rawObj?.text,
    fontSize: t.geometry?.fontSize || t.geometry?.size || t.rawObj?.fontSize,
    width: t.geometry?.width || t.geometry?.boxWidth || t.geometry?.textBoxWidth || t.rawObj?.width,
    height: t.geometry?.height || t.rawObj?.height,
    geometry: t.geometry,
    variable: t.variable,
    variables: t.variables,
    dataVariable: t.dataVariable,
  }, null, 2));
}

console.log("\n=== Scene Variables ===");
console.log(JSON.stringify(scene.shared?.variables || scene.scene?.variables || {}, null, 2));
