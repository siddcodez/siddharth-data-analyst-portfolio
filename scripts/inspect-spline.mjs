import fs from "node:fs";

const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const source = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${source}\nexport { $D as splinePacker };`).toString("base64")}`,
);
const input = new Uint8Array(fs.readFileSync("public/assets/skills-keyboard-data-science.spline"));
const scene = runtime.splinePacker.unpack(input);

const rows = [];
const components = [];
const materialReferences = new Set();
const materialReferencePaths = [];
const walk = (objects, path = []) => {
  for (const object of objects ?? []) {
    const nextPath = [...path, object.data?.name ?? object.data?.type ?? "unnamed"];
    if (object.data?.name === "legend") {
      const geometry = object.data.geometry;
      const layers = object.data.material?.layers ?? [];
      const texture = layers.find((layer) => layer.data?.type === "texture")?.data?.texture;
      rows.push({
        component: path.at(-2),
        path: nextPath.join(" / "),
        geometry: geometry?.type,
        text: geometry?.text,
        layerTypes: (object.data.material?.layers ?? []).map((layer) => layer.data?.type),
        position: object.data.position,
        rotation: object.data.rotation,
        scale: object.data.scale,
      });
    }
    if (object.data?.type === "Component") {
      components.push({ name: object.data?.name, data: object.data });
    }
    if (typeof object.data?.material === "string") {
      materialReferences.add(object.data.material);
      materialReferencePaths.push({ material: object.data.material, path: nextPath.join(" / "), geometry: object.data?.geometry?.type, text: object.data?.geometry?.text });
    }
    walk(object.children, nextPath);
  }
};
walk(scene.scene.objects);
console.log(JSON.stringify({
  rows,
  sharedKeys: Object.keys(scene.shared ?? {}),
  sharedComponentKeys: Object.keys(scene.shared?.components ?? {}),
  sharedComponentNames: Object.values(scene.shared?.components ?? {}).map((component) => component?.data?.name),
  materialNames: Object.entries(scene.shared?.materials ?? {}).map(([id, material]) => ({ id, name: material?.name, type: material?.type })),
  imageNames: Object.entries(scene.shared?.images ?? {}).map(([id, image]) => ({ id, name: image?.data?.name })),
  materialReferences: [...materialReferences],
  materialReferencePaths,
  componentData: components,
}, null, 2));
