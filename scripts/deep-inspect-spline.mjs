import fs from "node:fs";

const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const source = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${source}\nexport { $D as splinePacker };`).toString("base64")}`,
);

const input = new Uint8Array(fs.readFileSync("public/assets/skills-keyboard-data-science.spline"));
const scene = runtime.splinePacker.unpack(input);

const results = [];

const findByName = (objects, name) => {
  for (const object of objects ?? []) {
    if (object.data?.name === name) return object;
    const found = findByName(object.children, name);
    if (found) return found;
  }
};

const expectedKeys = [
  "python", "sql", "pandas", "numpy", "excel", "powerbi", "tableau",
  "scikitlearn", "jupyter", "googlecolab", "git", "github", "vscode",
  "anaconda", "statistics", "eda", "datavisualization", "ml",
  "regression", "classification", "clustering", "predictivemodel",
  "datacleaning", "featureeng"
];

for (const keyName of expectedKeys) {
  const component = findByName(scene.scene.objects, keyName);
  if (!component) {
    results.push({ keyName, found: false, hasLegend: false, hasTexture: false, imageName: null, imageDataLength: 0 });
    continue;
  }

  const keycap = component.children?.find(c => c.data?.name === "keycap");
  const legend = keycap?.children?.find(c => c.data?.name === "legend");

  if (!legend) {
    results.push({ keyName, found: true, hasLegend: false, hasTexture: false, imageName: null, imageDataLength: 0 });
    continue;
  }

  const layers = legend.data?.material?.layers ?? [];
  const textureLayer = layers.find(l => l.data?.type === "texture");
  const texture = textureLayer?.data?.texture;
  const image = texture?.image;
  const imageName = image?.name ?? image?.data?.name ?? null;
  const imageData = image?.data;
  const imageDataLength = imageData ? (typeof imageData === "string" ? imageData.length : (imageData?.length ?? 0)) : 0;
  
  // Also check if it's a Uint8Array or Buffer
  const imageDataActual = imageData instanceof Uint8Array ? imageData.length : 
                          (Array.isArray(imageData) ? imageData.length : 
                          (imageData?.buffer ? imageData.byteLength : imageDataLength));

  results.push({
    keyName,
    found: true,
    hasLegend: true,
    hasTexture: !!textureLayer,
    imageName,
    imageDataLength: imageDataActual,
    layerCount: layers.length,
    layerTypes: layers.map(l => l.data?.type),
    geometryType: legend.data?.geometry?.type,
    // Print full image object keys for debugging
    imageKeys: image ? Object.keys(image) : null,
    textureKeys: texture ? Object.keys(texture) : null,
  });
}

// Also check if image data is stored differently
const firstKey = "python";
const component = findByName(scene.scene.objects, firstKey);
const keycap = component?.children?.find(c => c.data?.name === "keycap");
const legend = keycap?.children?.find(c => c.data?.name === "legend");
const layers = legend?.data?.material?.layers ?? [];
const textureLayer = layers.find(l => l.data?.type === "texture");
const texture = textureLayer?.data?.texture;
const image = texture?.image;

console.log("=== FULL IMAGE OBJECT FOR 'python' ===");
console.log(JSON.stringify({
  imageKeys: image ? Object.keys(image) : null,
  imageName: image?.name,
  imageDataType: image?.data ? typeof image.data : null,
  imageDataIsUint8Array: image?.data instanceof Uint8Array,
  imageDataLength: image?.data?.length ?? image?.data?.byteLength ?? 0,
  textureKeys: texture ? Object.keys(texture) : null,
}, null, 2));

console.log("\n=== ALL 24 KEYCAP TEXTURE STATUS ===");
let allGood = true;
for (const r of results) {
  const status = r.found && r.hasLegend && r.hasTexture && r.imageDataLength > 0 ? "✅ OK" : "❌ BAD";
  if (status === "❌ BAD") allGood = false;
  console.log(`${status} | ${r.keyName.padEnd(20)} | image: ${(r.imageName ?? "null").padEnd(25)} | dataLen: ${r.imageDataLength}`);
}

console.log("\n=== SUMMARY ===");
console.log(`All 24 keycaps correct: ${allGood}`);
console.log(`Keycaps found: ${results.filter(r => r.found).length}/24`);
console.log(`With texture: ${results.filter(r => r.hasTexture).length}/24`);
console.log(`With image data > 0: ${results.filter(r => r.imageDataLength > 0).length}/24`);
