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

console.log("=== BEFORE FIX ===");
for (const c of texts?.children ?? []) {
  console.log(`Container: ${c.data?.name}`);
  for (let i = 0; i < c.children.length; i++) {
    const child = c.children[i];
    const isHeading = child.data?.geometry?.text === "98af722b-2408-4644-bb92-fd32f23cb00f";
    const role = isHeading ? "HEADING" : "DESC";
    console.log(`  ${role} | pos: ${JSON.stringify(child.data?.position)} | width: ${child.data?.geometry?.width} | fontSize: ${child.data?.geometry?.fontSize}`);
  }
}

// Apply changes
for (const c of texts?.children ?? []) {
  for (let i = 0; i < c.children.length; i++) {
    const child = c.children[i];
    const isHeading = child.data?.geometry?.text === "98af722b-2408-4644-bb92-fd32f23cb00f";
    
    if (isHeading) {
      // Heading updates
      child.data.geometry.width = 1600;
      child.data.geometry.height = 350;
      child.data.geometry.fontSize = 72;
      child.data.geometry.lineHeight = 1.2;
      
      if (c.data?.name?.includes("desktop")) {
        child.data.position = [0, 0, -180];
      } else if (c.data?.name?.includes("mobile")) {
        child.data.position = [450.9443786658458, 0, 20];
      }
    } else {
      // Desc updates
      child.data.geometry.width = 1200;
      child.data.geometry.height = 400;
      child.data.geometry.fontSize = 42;
      child.data.geometry.lineHeight = 1.25;
      
      if (c.data?.name?.includes("desktop")) {
        child.data.position = [-157.35461398590996, 0, 130];
      }
    }
  }
}

console.log("\n=== AFTER FIX ===");
for (const c of texts?.children ?? []) {
  console.log(`Container: ${c.data?.name}`);
  for (let i = 0; i < c.children.length; i++) {
    const child = c.children[i];
    const isHeading = child.data?.geometry?.text === "98af722b-2408-4644-bb92-fd32f23cb00f";
    const role = isHeading ? "HEADING" : "DESC";
    console.log(`  ${role} | pos: ${JSON.stringify(child.data?.position)} | width: ${child.data?.geometry?.width} | fontSize: ${child.data?.geometry?.fontSize}`);
  }
}

// Pack and save
const packed = runtime.splinePacker.pack(scene);
fs.writeFileSync(scenePath, packed);
fs.copyFileSync(scenePath, "public/assets/skills-keyboard.spline");
console.log(`\nSuccessfully packed and saved to ${scenePath} (${packed.length} bytes) and copied to public/assets/skills-keyboard.spline`);
