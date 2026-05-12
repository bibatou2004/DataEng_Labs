const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "DE2 Labs - Data Engineering II";

// ─────────────────────────────
// 🎨 THEME GLOBAL
// ─────────────────────────────
const C = {
  navy: "1A2B5F",
  blue: "2563EB",
  purple: "7C3AED",
  teal: "0D9488",
  orange: "EA580C",
  green: "059669",
  red: "DC2626",
  gray: "64748B",
  lgray: "E2E8F0",
  white: "FFFFFF",
  offwhite: "F8FAFF",
  dark: "1E293B",
};

const FONT = "Calibri";

// ─────────────────────────────
// 🧠 HELPERS (VERSION PRO)
// ─────────────────────────────
const text = (s, txt, opt) =>
  s.addText(txt, { fontFace: FONT, margin: 0, ...opt });

const box = (s, pres, x, y, w, h, fill, shadow = true) =>
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: fill },
    ...(shadow && {
      shadow: { type: "outer", color: "000000", blur: 6, offset: 2, opacity: 0.1 },
    }),
  });

const headerBar = (s, title) => {
  box(s, pres, 0, 0, 10, 0.75, C.navy, false);
  text(s, title, {
    x: 0.4,
    y: 0.15,
    w: 9,
    h: 0.5,
    fontSize: 20,
    bold: true,
    color: C.white,
  });
};

// ─────────────────────────────
// 🟦 TITLE SLIDE
// ─────────────────────────────
function titleSlide() {
  const s = pres.addSlide();
  s.background = { color: C.navy };

  text(s, "Data Engineering II", {
    x: 0.6,
    y: 1.5,
    w: 9,
    fontSize: 44,
    bold: true,
    color: C.white,
  });

  text(s, "Labs 0 → 3 | Spark 4.0 | ESIEE Paris", {
    x: 0.6,
    y: 2.7,
    w: 8,
    fontSize: 18,
    color: C.gray,
  });
}

// ─────────────────────────────
// 📌 SECTION HEADER
// ─────────────────────────────
function sectionSlide(label, title, color) {
  const s = pres.addSlide();
  s.background = { color };

  text(s, label, {
    x: 1,
    y: 1.6,
    fontSize: 18,
    color: C.white,
  });

  text(s, title, {
    x: 1,
    y: 2.2,
    fontSize: 38,
    bold: true,
    color: C.white,
  });
}

// ─────────────────────────────
// 📄 CONTENT SLIDE BASE
// ─────────────────────────────
function contentSlide(title) {
  const s = pres.addSlide();
  s.background = { color: C.offwhite };
  headerBar(s, title);
  return s;
}

// ─────────────────────────────
// 🧾 SLIDES
// ─────────────────────────────
titleSlide();

// ───────────── LAB 0
sectionSlide("LAB 0", "Setup & Validation", C.teal);

{
  const s = contentSlide("Lab 0 - Objectif");

  box(s, pres, 0.5, 1.2, 4.5, 3.8, C.white);
  text(s, "Objectif", { x: 0.7, y: 1.3, fontSize: 16, bold: true, color: C.teal });

  text(s,
    "• Spark 4.0 local\n• CSV → DataFrame\n• Parquet partitionné\n• groupBy & explain()\n• Validation environnement",
    { x: 0.7, y: 1.8, fontSize: 13, color: C.dark }
  );
}

// ───────────── LAB 1
sectionSlide("LAB 1", "Structured Streaming", C.blue);

{
  const s = contentSlide("Streaming Pipeline");

  box(s, pres, 0.5, 1.2, 2.8, 3, C.white);
  text(s, "SOURCE", { x: 0.6, y: 1.3, fontSize: 14, bold: true, color: C.blue });

  text(s, "JSON files\n10 events/sec", { x: 0.6, y: 1.8, fontSize: 11 });

  box(s, pres, 3.5, 1.2, 2.8, 3, C.white);
  text(s, "TRANSFORM", { x: 3.6, y: 1.3, fontSize: 14, bold: true, color: C.purple });

  text(s, "Watermark\nWindow 1h\nAggregation", { x: 3.6, y: 1.8, fontSize: 11 });

  box(s, pres, 6.5, 1.2, 2.8, 3, C.white);
  text(s, "SINK", { x: 6.6, y: 1.3, fontSize: 14, bold: true, color: C.green });

  text(s, "Parquet\nCheckpoint", { x: 6.6, y: 1.8, fontSize: 11 });
}

// ───────────── LAB 2
sectionSlide("LAB 2", "Inverted Index", C.purple);

{
  const s = contentSlide("Text Processing Pipeline");

  text(s,
    "Corpus → Tokenization → Stopwords → Index → Parquet/CSV",
    { x: 0.6, y: 1.5, fontSize: 14, bold: true }
  );

  text(s,
    "28 tokens | avg latency 242ms | Spark groupBy optimization",
    { x: 0.6, y: 2.3, fontSize: 12, color: C.gray }
  );
}

// ───────────── LAB 3
sectionSlide("LAB 3", "KMeans Clustering", C.orange);

{
  const s = contentSlide("ML Pipeline");

  text(s,
    "KMeans + StandardScaler + Silhouette Evaluation",
    { x: 0.6, y: 1.5, fontSize: 14, bold: true }
  );

  text(s,
    "k=3 optimal | silhouette = 0.9797 | −34% partition gain",
    { x: 0.6, y: 2.3, fontSize: 12, color: C.gray }
  );
}

// ───────────── CONCLUSION
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  text(s, "Conclusion", {
    x: 0.6,
    y: 1.2,
    fontSize: 40,
    bold: true,
    color: C.white,
  });

  text(s,
    "Spark Streaming + ML + Indexing = Pipeline Data Engineering complet",
    { x: 0.6, y: 2.2, fontSize: 16, color: C.gray }
  );
}

// ─────────────────────────────
// 💾 EXPORT
// ─────────────────────────────
const outPath = "/home/bibawandaogo/Data_Engineering2/DE2_Labs_Pro.pptx";

pres.writeFile({ fileName: outPath })
  .then(() => console.log("✔ PPT généré :", outPath))
  .catch(e => console.error("❌ Error:", e));