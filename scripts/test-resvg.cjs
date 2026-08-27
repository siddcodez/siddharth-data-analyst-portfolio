const { Resvg } = require("@resvg/resvg-js");
const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><circle cx="64" cy="64" r="60" fill="blue"/></svg>';
const r = new Resvg(svg, { fitTo: { mode: "width", value: 256 } });
const png = r.render().asPng();
console.log("resvg works! PNG size:", png.length, "bytes, magic:", png[0].toString(16), png[1].toString(16), png[2].toString(16), png[3].toString(16));
