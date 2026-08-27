import fs from "node:fs";
const runtimePath = "node_modules/@splinetool/runtime/build/runtime.js";
const source = fs.readFileSync(runtimePath, "utf8");
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(`${source}\nexport { $D as splinePacker };`).toString("base64")}`
);
const input = new Uint8Array(fs.readFileSync("public/assets/skills-keyboard-data-science.spline"));
const scene = runtime.splinePacker.unpack(input);

const keys = ["python","sql","pandas","numpy","excel","powerbi","tableau","scikitlearn","jupyter","googlecolab","git","github","vscode","anaconda","statistics","eda","datavisualization","ml","regression","classification","clustering","predictivemodel","datacleaning","featureeng"];
const findByName = (objects, name) => {
  for (const o of objects ?? []) {
    if (o.data?.name === name) return o;
    const f = findByName(o.children, name);
    if (f) return f;
  }
};

let allPNG = true;
for (const k of keys) {
  const comp = findByName(scene.scene.objects, k);
  const legend = comp?.children?.find(c => c.data?.name === "keycap")?.children?.find(c => c.data?.name === "legend");
  const img = legend?.data?.material?.layers?.find(l => l.data?.type === "texture")?.data?.texture?.image;
  const d = img?.data;
  if (!d) {
    console.log(`❌ ${k.padEnd(22)} | NO DATA`);
    allPNG = false;
    continue;
  }
  const b0=d[0],b1=d[1],b2=d[2],b3=d[3];
  const isPNG  = b0===0x89&&b1===0x50&&b2===0x4E&&b3===0x47;
  const isJPEG = b0===0xFF&&b1===0xD8&&b2===0xFF;
  const isSVG  = b0===0x3C;
  const fmt = isPNG ? "PNG  ✅" : isJPEG ? "JPEG ✅" : isSVG ? "SVG TEXT ❌" : "UNKNOWN ❌";
  const hex = [b0,b1,b2,b3].map(x=>x.toString(16).padStart(2,"0")).join(" ");
  if (!isPNG && !isJPEG) allPNG = false;
  console.log(`${fmt} | ${k.padEnd(22)} | magic: ${hex} | len: ${d.length}`);
}
console.log(`\nAll valid raster images: ${allPNG}`);
