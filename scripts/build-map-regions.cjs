const fs = require("fs");
const path = require("path");

const AIMAG_MAP = {
  Dornod: "Дорнод",
  "Bayan-Ölgiy": "Баян-Өлгий",
  Hovd: "Ховд",
  Sühbaatar: "Сүхбаатар",
  Dornogovi: "Дорноговь",
  "Govi-Altay": "Говь-Алтай",
  Bayanhongor: "Баянхонгор",
  Ömnögovi: "Өмнөговь",
  Hövsgöl: "Хөвсгөл",
  Bulgan: "Булган",
  Uvs: "Увс",
  Selenge: "Сэлэнгэ",
  Dzavhan: "Завхан",
  Hentiy: "Хэнтий",
  "Darhan-Uul": "Дархан-Уул",
  Töv: "Төв",
  Arhangay: "Архангай",
  Orhon: "Орхон",
  Dundgovi: "Дундговь",
  Övörhangay: "Өвөрхангай",
  "Govĭ-Sümber": "Говьсүмбэр",
  Ulaanbaatar: "Улаанбаатар",
};

const UB_MAP = {
  Bayangol: "Баянгол",
  "Bayanzu'rx": "Баянзүрх",
  Chingeltei: "Чингэлтэй",
  Nalaix: "Налайх",
  Songinoxairxan: "Сонгинохайрхан",
  "Su'xbaatar": "Сүхбаатар",
  "Xan-Uul": "Хан-Уул",
  Baganuur: "Багануур",
  Bagaxangai: "Багахангай",
};

function allCoords(geom, out = []) {
  if (!geom) return out;
  if (geom.type === "Polygon") {
    for (const ring of geom.coordinates) for (const c of ring) out.push(c);
  } else if (geom.type === "MultiPolygon") {
    for (const poly of geom.coordinates)
      for (const ring of poly) for (const c of ring) out.push(c);
  }
  return out;
}

function boundsOf(features) {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const f of features) {
    for (const [x, y] of allCoords(f.geometry)) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  return { minX, minY, maxX, maxY };
}

function projectFactory(b, width, height, pad = 12) {
  const bw = b.maxX - b.minX;
  const bh = b.maxY - b.minY;
  const s = Math.min((width - pad * 2) / bw, (height - pad * 2) / bh);
  const ox = (width - bw * s) / 2;
  const oy = (height - bh * s) / 2;
  return ([lon, lat]) => [
    ox + (lon - b.minX) * s,
    height - (oy + (lat - b.minY) * s),
  ];
}

function ringPath(ring, proj) {
  return (
    ring
      .map((c, i) => {
        const [x, y] = proj(c);
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ") + " Z"
  );
}

function geomPath(geom, proj) {
  const parts = [];
  if (geom.type === "Polygon") {
    for (const ring of geom.coordinates) parts.push(ringPath(ring, proj));
  } else if (geom.type === "MultiPolygon") {
    for (const poly of geom.coordinates)
      for (const ring of poly) parts.push(ringPath(ring, proj));
  }
  return parts.join(" ");
}

function centroid(geom) {
  const cs = allCoords(geom);
  let sx = 0,
    sy = 0;
  for (const [x, y] of cs) {
    sx += x;
    sy += y;
  }
  return [sx / cs.length, sy / cs.length];
}

function simplifyRing(ring, eps = 0.01) {
  if (ring.length < 8) return ring;
  const out = [ring[0]];
  for (let i = 1; i < ring.length - 1; i++) {
    const [x, y] = ring[i];
    const [px, py] = out[out.length - 1];
    if (Math.hypot(x - px, y - py) >= eps) out.push(ring[i]);
  }
  out.push(ring[ring.length - 1]);
  return out;
}

function simplifyGeom(geom, eps) {
  if (geom.type === "Polygon") {
    return {
      type: "Polygon",
      coordinates: geom.coordinates.map((r) => simplifyRing(r, eps)),
    };
  }
  return {
    type: "MultiPolygon",
    coordinates: geom.coordinates.map((poly) =>
      poly.map((r) => simplifyRing(r, eps))
    ),
  };
}

function inBox(c, box) {
  return c[0] >= box[0] && c[0] <= box[2] && c[1] >= box[1] && c[1] <= box[3];
}

const aimagsRaw = JSON.parse(
  fs.readFileSync("c:/Projects/agaar/public/maps/mongolia-aimags.geojson", "utf8")
);
const aimagFeats = aimagsRaw.features.map((f) => {
  const en = f.properties.name_en;
  const mn = AIMAG_MAP[en];
  if (!mn) console.warn("missing aimag", en);
  return {
    ...f,
    properties: { id: mn || en, name: mn || en, nameEn: en },
    geometry: simplifyGeom(f.geometry, 0.015),
  };
});
const aimagBounds = boundsOf(aimagFeats);
const W = 980;
const H = 520;
const aimagProj = projectFactory(aimagBounds, W, H, 18);
const aimagRegions = aimagFeats.map((f) => {
  const c = centroid(f.geometry);
  const [cx, cy] = aimagProj(c);
  return {
    id: f.properties.id,
    name: f.properties.name,
    d: geomPath(f.geometry, aimagProj),
    cx: +cx.toFixed(2),
    cy: +cy.toFixed(2),
  };
});

const adm2 = JSON.parse(
  fs.readFileSync(
    "c:/Projects/agaar/public/maps/mng-adm2-simplified.geojson",
    "utf8"
  )
);
const ubWanted = new Set(Object.keys(UB_MAP));
const ubFeats = [];
for (const f of adm2.features) {
  const en = f.properties.shapeName;
  if (!ubWanted.has(en)) continue;
  const c = centroid(f.geometry);
  const core = inBox(c, [106.4, 47.7, 107.7, 48.15]);
  const nalaikh = en === "Nalaix" && inBox(c, [107.2, 47.7, 107.8, 48.1]);
  const baganuur = en === "Baganuur" && inBox(c, [108.0, 47.6, 108.8, 48.1]);
  const bagakhangai =
    en === "Bagaxangai" && inBox(c, [107.1, 47.2, 107.8, 47.6]);
  if (!(core || nalaikh || baganuur || bagakhangai)) continue;
  ubFeats.push({
    type: "Feature",
    properties: { id: UB_MAP[en], name: UB_MAP[en], nameEn: en },
    geometry: simplifyGeom(f.geometry, 0.002),
  });
}

const byName = new Map();
for (const f of ubFeats) {
  const n = allCoords(f.geometry).length;
  const prev = byName.get(f.properties.id);
  if (!prev || allCoords(prev.geometry).length < n) {
    byName.set(f.properties.id, f);
  }
}
const ubUnique = [...byName.values()];
console.log(
  "UB districts",
  ubUnique.map((f) => f.properties.name).join(", ")
);

const ubBounds = boundsOf(ubUnique);
const UW = 900;
const UH = 560;
const ubProj = projectFactory(ubBounds, UW, UH, 40);
const ubRegions = ubUnique.map((f) => {
  const c = centroid(f.geometry);
  const [cx, cy] = ubProj(c);
  return {
    id: f.properties.id,
    name: f.properties.name,
    d: geomPath(f.geometry, ubProj),
    cx: +cx.toFixed(2),
    cy: +cy.toFixed(2),
  };
});

const outDir = "c:/Projects/agaar/src/lib/maps";
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, "mongolia-aimags.ts"),
  `/** Auto-generated SVG regions for Mongolia aimags — do not edit by hand. */
export type MapRegion = { id: string; name: string; d: string; cx: number; cy: number };

export const MONGOLIA_MAP = {
  viewBox: "0 0 ${W} ${H}",
  regions: ${JSON.stringify(aimagRegions, null, 2)} as MapRegion[],
};
`
);

fs.writeFileSync(
  path.join(outDir, "ulaanbaatar-districts.ts"),
  `/** Auto-generated SVG regions for Ulaanbaatar districts — do not edit by hand. */
export type MapRegion = { id: string; name: string; d: string; cx: number; cy: number };

export const ULAANBAATAR_MAP = {
  viewBox: "0 0 ${UW} ${UH}",
  regions: ${JSON.stringify(ubRegions, null, 2)} as MapRegion[],
};
`
);

console.log(
  "aimags",
  aimagRegions.length,
  "paths bytes",
  aimagRegions.reduce((s, r) => s + r.d.length, 0)
);
console.log(
  "ub",
  ubRegions.length,
  "paths bytes",
  ubRegions.reduce((s, r) => s + r.d.length, 0)
);
