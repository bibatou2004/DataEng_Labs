const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "DE2 – Data Engineering II Labs";

// ─── PALETTE ────────────────────────────────────────────────────
const C = {
  dark:    "0F172A",   // slide bg (dark slides)
  navy:    "1E3A5F",   // header panels
  blue:    "2563EB",   // primary accent
  cyan:    "0EA5E9",   // secondary accent
  teal:    "0D9488",   // tertiary
  green:   "16A34A",
  amber:   "D97706",
  purple:  "7C3AED",
  white:   "FFFFFF",
  offW:    "F8FAFC",
  light:   "E0F2FE",
  muted:   "64748B",
  card:    "1E293B",
  cardL:   "F1F5F9",
};

// ─── HELPERS ────────────────────────────────────────────────────
function titleSlide(title, subtitle, accent) {
  const s = pres.addSlide();
  s.background = { color: C.dark };
  // Left accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: accent } });
  // Title
  s.addText(title, {
    x: 0.4, y: 1.5, w: 9.2, h: 1.6,
    fontSize: 44, bold: true, color: C.white, fontFace: "Calibri", align: "left"
  });
  // Subtitle
  s.addText(subtitle, {
    x: 0.4, y: 3.2, w: 9.2, h: 0.8,
    fontSize: 18, color: C.cyan, fontFace: "Calibri", align: "left"
  });
  // Date tag
  s.addText("ESIEE Paris · Data Engineering II · May 2026", {
    x: 0.4, y: 4.9, w: 9.2, h: 0.4,
    fontSize: 11, color: C.muted, fontFace: "Calibri", align: "left"
  });
  return s;
}

function sectionHeader(label, title, sub, accent) {
  const s = pres.addSlide();
  s.background = { color: accent };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.2, fill: { color: C.dark } });
  s.addText(label, { x: 0.5, y: 0.1, w: 9, h: 0.9, fontSize: 13, color: C.white, fontFace: "Calibri", align: "left", bold: false });
  s.addText(title, { x: 0.5, y: 1.5, w: 9, h: 2.2, fontSize: 52, bold: true, color: C.white, fontFace: "Calibri", align: "left" });
  s.addText(sub, { x: 0.5, y: 3.9, w: 9, h: 0.8, fontSize: 18, color: C.dark, fontFace: "Calibri", align: "left" });
  return s;
}

function contentSlide(title, accent) {
  const s = pres.addSlide();
  s.background = { color: C.offW };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: accent } });
  s.addText(title, { x: 0.4, y: 0.1, w: 9.2, h: 0.65, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", align: "left", margin: 0 });
  return s;
}

function card(s, x, y, w, h, topColor, title, body, titleSize = 14, bodySize = 12) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: C.white },
    shadow: { type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.08 }
  });
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.07, fill: { color: topColor } });
  s.addText(title, { x: x + 0.12, y: y + 0.12, w: w - 0.24, h: 0.35, fontSize: titleSize, bold: true, color: C.dark, fontFace: "Calibri" });
  s.addText(body, { x: x + 0.12, y: y + 0.48, w: w - 0.24, h: h - 0.6, fontSize: bodySize, color: C.muted, fontFace: "Calibri", wrap: true });
}

function badge(s, x, y, w, label, bg, fg) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.38, fill: { color: bg }, rectRadius: 0.05 });
  s.addText(label, { x: x + 0.05, y: y + 0.02, w: w - 0.1, h: 0.34, fontSize: 11, bold: true, color: fg, fontFace: "Calibri", align: "center", margin: 0 });
}

function arrow(s, x, y, w, color) {
  s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width: 2.5 } });
  // arrowhead via small triangle
  s.addText("▶", { x: x + w - 0.12, y: y - 0.13, w: 0.25, h: 0.25, fontSize: 11, color, fontFace: "Calibri", margin: 0 });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 1 – COVER
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.dark };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.2, w: 10, h: 1.425, fill: { color: C.navy } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: C.blue } });

  s.addText("DE2", { x: 0.4, y: 0.6, w: 4, h: 1.4, fontSize: 80, bold: true, color: C.blue, fontFace: "Calibri", margin: 0 });
  s.addText("Data Engineering II", { x: 0.4, y: 2.05, w: 9.2, h: 0.7, fontSize: 30, bold: true, color: C.white, fontFace: "Calibri" });
  s.addText("Labs Review – Practice & Assignment", { x: 0.4, y: 2.75, w: 9.2, h: 0.55, fontSize: 18, color: C.cyan, fontFace: "Calibri" });

  s.addText("Lab 0  ·  Lab 1  ·  Lab 2  ·  Lab 3", { x: 0.4, y: 4.35, w: 6, h: 0.45, fontSize: 14, color: C.light, fontFace: "Calibri" });
  s.addText("Bibawandaogo", { x: 6.5, y: 4.35, w: 3, h: 0.45, fontSize: 14, color: C.muted, fontFace: "Calibri", align: "right" });
  s.addText("ESIEE Paris  ·  May 2026", { x: 6.5, y: 4.78, w: 3.1, h: 0.4, fontSize: 11, color: C.muted, fontFace: "Calibri", align: "right" });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 2 – AGENDA
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offW };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.dark } });
  s.addText("OVERVIEW", { x: 0.4, y: 0.1, w: 9.2, h: 0.65, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });

  const labs = [
    { num: "0", title: "Environment Setup", desc: "Spark setup · CSV → Parquet · Execution plans", color: C.teal },
    { num: "1", title: "Structured Streaming", desc: "Watermark · Windowed agg · Parquet sink · Checkpoint", color: C.blue },
    { num: "2", title: "Text Processing", desc: "Inverted index · Tokenization · Parquet vs CSV", color: C.purple },
    { num: "3", title: "Clustering (KMeans)", desc: "ML pipeline · Partitioning strategies · Convergence", color: C.amber },
  ];

  labs.forEach((lab, i) => {
    const x = 0.4 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.1, w: 2.1, h: 4.0, fill: { color: C.white },
      shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.1 }
    });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 2.1, h: 0.6, fill: { color: lab.color } });
    s.addText(`LAB ${lab.num}`, { x: x + 0.1, y: 1.15, w: 1.9, h: 0.45, fontSize: 18, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addText(lab.title, { x: x + 0.1, y: 1.82, w: 1.9, h: 0.7, fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri", wrap: true });
    s.addText(lab.desc, { x: x + 0.1, y: 2.6, w: 1.9, h: 2.3, fontSize: 11, color: C.muted, fontFace: "Calibri", wrap: true });
  });
}

// ═══════════════════════════════════════════════════════════════
// ─── LAB 0 ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
sectionHeader("LAB 0", "Environment\nSetup", "Validation de l'environnement Spark", C.teal);

// Slide – Objectif Lab 0
{
  const s = contentSlide("LAB 0 · Objectif", C.teal);
  s.addText("🎯  Valider que Spark fonctionne", {
    x: 0.5, y: 1.1, w: 9, h: 0.7, fontSize: 32, bold: true, color: C.dark, fontFace: "Calibri"
  });
  s.addText("Comme un lycéen qui branche son ordi avant de commencer : on vérifie que tout marche avant d'aller plus loin.", {
    x: 0.5, y: 1.9, w: 9, h: 0.65, fontSize: 15, color: C.muted, fontFace: "Calibri", italic: true
  });

  // 3 steps
  const steps = [
    { n: "1", t: "Créer une session Spark", d: "Lancer le moteur de traitement distribué en local" },
    { n: "2", t: "Lire un CSV", d: "Charger des données avec un schéma explicite" },
    { n: "3", t: "Écrire en Parquet", d: "Stocker les données dans un format optimisé et partitionné" },
  ];
  steps.forEach((st, i) => {
    const x = 0.5 + i * 3.12;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.75, w: 2.9, h: 2.6, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
    s.addShape(pres.shapes.OVAL, { x: x + 1.15, y: 2.82, w: 0.6, h: 0.6, fill: { color: C.teal } });
    s.addText(st.n, { x: x + 1.15, y: 2.82, w: 0.6, h: 0.6, fontSize: 18, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    s.addText(st.t, { x: x + 0.1, y: 3.55, w: 2.7, h: 0.5, fontSize: 13, bold: true, color: C.dark, fontFace: "Calibri", align: "center" });
    s.addText(st.d, { x: x + 0.1, y: 4.1, w: 2.7, h: 1.0, fontSize: 11, color: C.muted, fontFace: "Calibri", align: "center", wrap: true });
  });
}

// Slide – Pipeline Lab 0
{
  const s = contentSlide("LAB 0 · Pipeline", C.teal);
  s.addText("CSV  →  Spark DataFrame  →  Parquet (partitionné)", {
    x: 0.5, y: 1.0, w: 9, h: 0.55, fontSize: 20, bold: true, color: C.dark, fontFace: "Calibri"
  });

  // Pipeline boxes
  const boxes = [
    { l: "CSV\ndata/sample.csv", c: C.teal },
    { l: "SparkSession\nlocal[*]", c: C.blue },
    { l: "DataFrame\n15 lignes · 4 cols", c: C.navy },
    { l: "Parquet\npartitionné/category", c: C.green },
  ];
  const bx = [0.4, 2.85, 5.25, 7.65];
  boxes.forEach((b, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: bx[i], y: 1.85, w: 2.2, h: 1.1, fill: { color: b.c } });
    s.addText(b.l, { x: bx[i] + 0.05, y: 1.85, w: 2.1, h: 1.1, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    if (i < 3) {
      s.addText("→", { x: bx[i] + 2.23, y: 2.2, w: 0.55, h: 0.4, fontSize: 22, bold: true, color: C.blue, fontFace: "Calibri", align: "center", margin: 0 });
    }
  });

  // Results
  s.addText("Résultats clés", { x: 0.5, y: 3.2, w: 9, h: 0.45, fontSize: 16, bold: true, color: C.dark, fontFace: "Calibri" });
  const res = [
    { v: "15", l: "lignes CSV chargées" },
    { v: "3", l: "partitions (tech, science, business)" },
    { v: "CSV", l: "scan: lecture complète" },
    { v: "Parquet", l: "scan: lecture colonnaire" },
  ];
  res.forEach((r, i) => {
    const x = 0.5 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 3.75, w: 2.15, h: 1.6, fill: { color: C.white }, shadow: { type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
    s.addText(r.v, { x: x + 0.08, y: 3.82, w: 2.0, h: 0.7, fontSize: 26, bold: true, color: C.teal, fontFace: "Calibri", align: "center" });
    s.addText(r.l, { x: x + 0.08, y: 4.55, w: 2.0, h: 0.6, fontSize: 11, color: C.muted, fontFace: "Calibri", align: "center", wrap: true });
  });
}

// Slide – Lab 0 Résultats/Problèmes
{
  const s = contentSlide("LAB 0 · Résultats & Leçons", C.teal);
  // Left col
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 4.3, h: 4.3, fill: { color: "F0FDF4" }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addText("✅  Ce qui a fonctionné", { x: 0.55, y: 1.15, w: 3.9, h: 0.45, fontSize: 14, bold: true, color: C.green, fontFace: "Calibri" });
  const ok = ["Spark version 4.0.1 opérationnel", "Lecture CSV avec schéma explicite", "Écriture Parquet partitionné", "Plan d'exécution différent CSV vs Parquet", "Agrégation groupBy + avg par catégorie"];
  ok.forEach((t, i) => s.addText("· " + t, { x: 0.6, y: 1.72 + i * 0.65, w: 3.95, h: 0.5, fontSize: 12, color: C.dark, fontFace: "Calibri", wrap: true }));

  // Right col
  s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 1.05, w: 4.6, h: 4.3, fill: { color: "FFF7ED" }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addText("💡  Leçon principale", { x: 5.15, y: 1.15, w: 4.2, h: 0.45, fontSize: 14, bold: true, color: C.amber, fontFace: "Calibri" });
  s.addText("Parquet est colonnaire :\nSpark ne lit que les colonnes nécessaires.\n\nCSV lit TOUT le fichier même si on n'utilise qu'une colonne.\n\nDifférence visible dans le plan d'exécution.", {
    x: 5.15, y: 1.72, w: 4.2, h: 3.4, fontSize: 12, color: C.dark, fontFace: "Calibri", wrap: true
  });
}

// ═══════════════════════════════════════════════════════════════
// ─── LAB 1 ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
sectionHeader("LAB 1", "Structured\nStreaming", "Traitement de données en temps réel avec Spark", C.blue);

// Slide – Objectif Lab 1
{
  const s = contentSlide("LAB 1 · Objectif", C.blue);
  s.addText("🎯  Traiter des événements EN TEMPS RÉEL", {
    x: 0.5, y: 1.1, w: 9, h: 0.7, fontSize: 28, bold: true, color: C.dark, fontFace: "Calibri"
  });
  s.addText("Comme un score de match qui se met à jour en direct : on agrège les données au fur et à mesure qu'elles arrivent.", {
    x: 0.5, y: 1.9, w: 9, h: 0.65, fontSize: 14, color: C.muted, fontFace: "Calibri", italic: true
  });

  const concepts = [
    { t: "Watermark", d: "Accepte les données tardives jusqu'à X minutes", i: "⏱" },
    { t: "Fenêtre temporelle", d: "Regroupe les événements par intervalles (10 min, 5 min)", i: "🪟" },
    { t: "Checkpoint", d: "Sauvegarde l'état → reprise après panne", i: "💾" },
    { t: "Mode Append", d: "N'écrit que les nouvelles lignes → compatible Parquet", i: "➕" },
  ];
  concepts.forEach((c, i) => {
    const row = Math.floor(i / 2), col = i % 2;
    const x = 0.5 + col * 4.65;
    const y = 2.75 + row * 1.45;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.4, h: 1.25, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
    s.addText(c.i + "  " + c.t, { x: x + 0.15, y: y + 0.08, w: 4.1, h: 0.45, fontSize: 14, bold: true, color: C.blue, fontFace: "Calibri" });
    s.addText(c.d, { x: x + 0.15, y: y + 0.55, w: 4.1, h: 0.55, fontSize: 11, color: C.muted, fontFace: "Calibri", wrap: true });
  });
}

// Slide – Architecture Streaming
{
  const s = contentSlide("LAB 1 · Architecture du pipeline", C.blue);

  // Flow diagram
  const nodes = [
    { l: "JSON Files\n(events)", x: 0.3, y: 1.5, c: C.navy },
    { l: "Watermark\n5-10 min", x: 2.35, y: 1.5, c: C.blue },
    { l: "Window\nGroupBy", x: 4.4, y: 1.5, c: C.cyan },
    { l: "Aggregation\ncount/avg/min/max", x: 6.4, y: 1.5, c: C.teal },
    { l: "Parquet\nSink", x: 8.4, y: 1.5, c: C.green },
  ];
  nodes.forEach((n, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: n.x, y: n.y, w: 1.85, h: 1.0, fill: { color: n.c } });
    s.addText(n.l, { x: n.x + 0.05, y: n.y + 0.05, w: 1.75, h: 0.9, fontSize: 11, bold: i === 0, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    if (i < 4) s.addText("→", { x: n.x + 1.87, y: n.y + 0.3, w: 0.45, h: 0.4, fontSize: 20, bold: true, color: C.blue, fontFace: "Calibri", align: "center", margin: 0 });
  });

  // Checkpoint note
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 2.72, w: 9.4, h: 0.55, fill: { color: "EFF6FF" } });
  s.addText("💾  Checkpoint actif → Garantit la livraison exactement une fois (exactly-once semantics)", {
    x: 0.45, y: 2.77, w: 9.1, h: 0.4, fontSize: 12, color: C.blue, fontFace: "Calibri"
  });

  // Configs table
  s.addText("Configurations testées", { x: 0.3, y: 3.42, w: 9.4, h: 0.4, fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri" });
  const rows = [
    ["", "Window", "Watermark", "Trigger", "Résultat"],
    ["Baseline", "10 min", "5 min", "10 sec", "Latence plus haute"],
    ["Optimisé", "5 min", "2 min", "5 sec", "−30% de latence"],
  ];
  const cx = [0.3, 1.7, 3.5, 5.4, 7.3];
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      const bg = ri === 0 ? C.blue : ri === 1 ? "EFF6FF" : "F0FDF4";
      const fg = ri === 0 ? C.white : C.dark;
      s.addShape(pres.shapes.RECTANGLE, { x: cx[ci], y: 3.9 + ri * 0.5, w: ci === 0 ? 1.35 : 1.75, h: 0.48, fill: { color: bg } });
      s.addText(cell, { x: cx[ci] + 0.05, y: 3.93 + ri * 0.5, w: ci === 0 ? 1.25 : 1.65, h: 0.42, fontSize: ri === 0 ? 11 : 12, bold: ri === 0, color: fg, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    });
  });
}

// Slide – Lab 1 Practice vs Assignment
{
  const s = contentSlide("LAB 1 · Practice vs Assignment", C.blue);
  // Practice
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 4.5, h: 4.3, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 4.5, h: 0.5, fill: { color: C.blue } });
  s.addText("PRACTICE · Track A (Esports)", { x: 0.55, y: 1.1, w: 4.1, h: 0.38, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  const pLines = [
    "Schema: match_id, match_end_time,\ngame_type, winning_team, spectators",
    "Window: 1 heure",
    "Watermark: 10 minutes",
    "10 fichiers JSON générés (50 events)",
    "Query UI capturée",
    "Metrics: 5 rows input, 2441 ms batch",
  ];
  pLines.forEach((l, i) => s.addText("· " + l, { x: 0.55, y: 1.67 + i * 0.56, w: 4.1, h: 0.5, fontSize: 11, color: C.dark, fontFace: "Calibri", wrap: true }));

  // Assignment
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.05, w: 4.5, h: 4.3, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.05, w: 4.5, h: 0.5, fill: { color: C.navy } });
  s.addText("ASSIGNMENT · Generic Events", { x: 5.25, y: 1.1, w: 4.1, h: 0.38, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  const aLines = [
    "Schema: event_id, event_time,\nevent_type, user_id, value",
    "Window: 10 min → 5 min (optimisé)",
    "Watermark: 5 min → 2 min (optimisé)",
    "Trigger: 5 sec → 3 sec",
    "Plan d'exécution sauvegardé",
    "lab1_metrics_log.csv produit",
  ];
  aLines.forEach((l, i) => s.addText("· " + l, { x: 5.25, y: 1.67 + i * 0.56, w: 4.1, h: 0.5, fontSize: 11, color: C.dark, fontFace: "Calibri", wrap: true }));
}

// Slide – Lab 1 Résultats
{
  const s = contentSlide("LAB 1 · Résultats & Problèmes", C.blue);

  // KPIs
  const kpis = [
    { v: "7", l: "micro-batches traités", c: C.blue },
    { v: "50", l: "événements générés", c: C.teal },
    { v: "−30%", l: "latence (optimisé)", c: C.green },
    { v: "2", l: "checkpoints créés", c: C.purple },
  ];
  kpis.forEach((k, i) => {
    const x = 0.4 + i * 2.33;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.15, h: 1.5, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.15, h: 0.07, fill: { color: k.c } });
    s.addText(k.v, { x: x + 0.1, y: 1.18, w: 1.95, h: 0.7, fontSize: 34, bold: true, color: k.c, fontFace: "Calibri", align: "center" });
    s.addText(k.l, { x: x + 0.1, y: 1.92, w: 1.95, h: 0.5, fontSize: 11, color: C.muted, fontFace: "Calibri", align: "center", wrap: true });
  });

  // Problems & Solutions
  const issues = [
    { p: "Stream vide au début", s: "Laisser awaitTermination(60) avant stop" },
    { p: "Mode 'complete' refusé", s: "Utiliser 'append' avec watermark + Parquet" },
    { p: "UUID non sérialisable", s: "Conversion str(uuid) avant json.dump" },
  ];
  s.addText("Problèmes & Solutions", { x: 0.4, y: 2.78, w: 9.2, h: 0.45, fontSize: 15, bold: true, color: C.dark, fontFace: "Calibri" });
  issues.forEach((iss, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.32 + i * 0.72, w: 9.2, h: 0.62, fill: { color: C.white }, shadow: { type: "outer", blur: 3, offset: 1, angle: 135, color: "000000", opacity: 0.06 } });
    s.addText("⚠  " + iss.p, { x: 0.55, y: 3.37 + i * 0.72, w: 4.2, h: 0.52, fontSize: 12, bold: true, color: C.amber, fontFace: "Calibri" });
    s.addText("→  " + iss.s, { x: 5.0, y: 3.37 + i * 0.72, w: 4.4, h: 0.52, fontSize: 12, color: C.green, fontFace: "Calibri" });
  });
}

// ═══════════════════════════════════════════════════════════════
// ─── LAB 2 ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
sectionHeader("LAB 2", "Text\nProcessing", "Inverted Index · Tokenisation · Stockage", C.purple);

// Slide – Objectif Lab 2
{
  const s = contentSlide("LAB 2 · Objectif", C.purple);
  s.addText("🎯  Construire un moteur de recherche full-text", {
    x: 0.5, y: 1.05, w: 9, h: 0.7, fontSize: 28, bold: true, color: C.dark, fontFace: "Calibri"
  });
  s.addText("Comme Google : pour chercher un mot, on a besoin de savoir dans quels documents il apparaît → c'est l'index inversé.", {
    x: 0.5, y: 1.82, w: 9, h: 0.65, fontSize: 14, color: C.muted, fontFace: "Calibri", italic: true
  });

  // What is inverted index
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 2.58, w: 9.2, h: 2.8, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addText("Index Inversé = mot → liste de documents", { x: 0.6, y: 2.68, w: 8.8, h: 0.5, fontSize: 16, bold: true, color: C.purple, fontFace: "Calibri" });

  const rows2 = [
    ["Terme", "Documents", "Fréquence"],
    ["esports", "doc_001, doc_002, doc_003, doc_004, doc_005", "5"],
    ["championship", "doc_002, doc_004", "2"],
    ["tournament", "doc_001", "1"],
  ];
  const colW = [1.8, 5.5, 1.2];
  const colX = [0.6, 2.55, 8.15];
  rows2.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      const bg = ri === 0 ? C.purple : ri % 2 === 1 ? "FAF5FF" : C.white;
      s.addShape(pres.shapes.RECTANGLE, { x: colX[ci], y: 3.25 + ri * 0.5, w: colW[ci], h: 0.48, fill: { color: bg } });
      s.addText(cell, { x: colX[ci] + 0.05, y: 3.28 + ri * 0.5, w: colW[ci] - 0.1, h: 0.42, fontSize: ri === 0 ? 11 : 12, bold: ri === 0, color: ri === 0 ? C.white : C.dark, fontFace: "Calibri", valign: "middle" });
    });
  });
}

// Slide – Pipeline Lab 2
{
  const s = contentSlide("LAB 2 · Pipeline de traitement", C.purple);
  // Steps flow
  const steps = [
    { l: "Corpus\nCSV", sub: "5-10 docs", c: C.navy },
    { l: "Lowercase\n+ Ponctuation", sub: "→ texte propre", c: C.purple },
    { l: "Tokenize\nsplit(whitespace)", sub: "→ [tokens]", c: C.blue },
    { l: "Stop-words\nfilter", sub: "56 mots filtrés", c: C.teal },
    { l: "GroupBy\ntoken", sub: "collect_list", c: C.green },
  ];
  steps.forEach((st, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28 + i * 1.9, y: 1.1, w: 1.7, h: 1.2, fill: { color: st.c } });
    s.addText(st.l, { x: 0.28 + i * 1.9 + 0.05, y: 1.12, w: 1.6, h: 0.7, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addText(st.sub, { x: 0.28 + i * 1.9 + 0.05, y: 1.85, w: 1.6, h: 0.38, fontSize: 10, color: C.light, fontFace: "Calibri", align: "center" });
    if (i < 4) s.addText("→", { x: 0.28 + i * 1.9 + 1.72, y: 1.45, w: 0.15, h: 0.4, fontSize: 16, bold: true, color: C.blue, fontFace: "Calibri", align: "center", margin: 0 });
  });

  // Output comparison
  s.addText("Sortie : Parquet vs CSV", { x: 0.4, y: 2.6, w: 9.2, h: 0.45, fontSize: 15, bold: true, color: C.dark, fontFace: "Calibri" });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.15, w: 4.5, h: 2.2, fill: { color: "FAF5FF" }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.15, w: 4.5, h: 0.45, fill: { color: C.purple } });
  s.addText("PARQUET", { x: 0.55, y: 3.2, w: 4.2, h: 0.35, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  s.addText("· Format binaire colonnaire\n· Garde le type ARRAY\n· Taille : 1.51 KB\n· Lecture rapide par Spark", { x: 0.55, y: 3.7, w: 4.2, h: 1.5, fontSize: 12, color: C.dark, fontFace: "Calibri", wrap: true });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 3.15, w: 4.5, h: 2.2, fill: { color: "F0FDF4" }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 3.15, w: 4.5, h: 0.45, fill: { color: C.green } });
  s.addText("CSV", { x: 5.25, y: 3.2, w: 4.2, h: 0.35, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  s.addText("· Texte lisible (Excel, éditeur)\n· doc_ids → string\n· Taille : 0.57 KB\n· Portable mais plus lent", { x: 5.25, y: 3.7, w: 4.2, h: 1.5, fontSize: 12, color: C.dark, fontFace: "Calibri", wrap: true });
}

// Slide – Practice vs Assignment Lab 2
{
  const s = contentSlide("LAB 2 · Practice vs Assignment", C.purple);

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 4.5, h: 4.3, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 4.5, h: 0.5, fill: { color: C.purple } });
  s.addText("PRACTICE · Le Petit Prince", { x: 0.55, y: 1.1, w: 4.1, h: 0.38, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  const pl = [
    "10 documents (corpus littéraire)", "91 termes uniques", "129 tokens avant filtrage", "0 stop-words (fichiers manquants)", "Parquet : 2.10 KB", "CSV : 1.62 KB", "Latence query : ~58ms",
  ];
  pl.forEach((l, i) => s.addText("· " + l, { x: 0.55, y: 1.68 + i * 0.52, w: 4.1, h: 0.45, fontSize: 11, color: C.dark, fontFace: "Calibri" }));

  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.05, w: 4.5, h: 4.3, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.05, w: 4.5, h: 0.5, fill: { color: C.navy } });
  s.addText("ASSIGNMENT · Corpus Esports", { x: 5.25, y: 1.1, w: 4.1, h: 0.38, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  const al = [
    "5 documents (thème Esports)", "28 termes uniques après filtre", "33 tokens filtrés / 44 bruts", "56 stop-words définis", "Parquet : 1.51 KB", "CSV : 0.57 KB", "Latence avg : 243ms",
  ];
  al.forEach((l, i) => s.addText("· " + l, { x: 5.25, y: 1.68 + i * 0.52, w: 4.1, h: 0.45, fontSize: 11, color: C.dark, fontFace: "Calibri" }));
}

// Slide – Lab 2 Résultats
{
  const s = contentSlide("LAB 2 · Résultats & Problèmes", C.purple);
  const kpis = [
    { v: "28", l: "termes uniques", c: C.purple },
    { v: "75%", l: "filtrage stop-words", c: C.blue },
    { v: "1.51 KB", l: "taille Parquet", c: C.teal },
    { v: "243ms", l: "latence query avg", c: C.amber },
  ];
  kpis.forEach((k, i) => {
    const x = 0.4 + i * 2.33;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.15, h: 1.5, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.15, h: 0.07, fill: { color: k.c } });
    s.addText(k.v, { x: x + 0.1, y: 1.18, w: 1.95, h: 0.7, fontSize: 30, bold: true, color: k.c, fontFace: "Calibri", align: "center" });
    s.addText(k.l, { x: x + 0.1, y: 1.92, w: 1.95, h: 0.5, fontSize: 11, color: C.muted, fontFace: "Calibri", align: "center", wrap: true });
  });

  const issues = [
    { p: "Array non écrivable en CSV", s: "concat_ws(',', col) pour convertir array → string" },
    { p: "Stop-words non chargés (fichiers manquants)", s: "Fallback sur liste hardcodée de 56 mots" },
    { p: "Latence première requête ~400ms", s: "Warm-up + cache : idx.cache().count() avant queries" },
  ];
  s.addText("Problèmes & Solutions", { x: 0.4, y: 2.78, w: 9.2, h: 0.45, fontSize: 15, bold: true, color: C.dark, fontFace: "Calibri" });
  issues.forEach((iss, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.32 + i * 0.72, w: 9.2, h: 0.62, fill: { color: C.white }, shadow: { type: "outer", blur: 3, offset: 1, angle: 135, color: "000000", opacity: 0.06 } });
    s.addText("⚠  " + iss.p, { x: 0.55, y: 3.37 + i * 0.72, w: 4.4, h: 0.52, fontSize: 12, bold: true, color: C.amber, fontFace: "Calibri", wrap: true });
    s.addText("→  " + iss.s, { x: 5.1, y: 3.37 + i * 0.72, w: 4.4, h: 0.52, fontSize: 12, color: C.green, fontFace: "Calibri", wrap: true });
  });
}

// ═══════════════════════════════════════════════════════════════
// ─── LAB 3 ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
sectionHeader("LAB 3", "Clustering\nKMeans", "ML distribué · Partitioning · Convergence", C.amber);

// Slide – Objectif Lab 3
{
  const s = contentSlide("LAB 3 · Objectif", C.amber);
  s.addText("🎯  Regrouper automatiquement des données sans étiquettes", {
    x: 0.5, y: 1.05, w: 9, h: 0.7, fontSize: 26, bold: true, color: C.dark, fontFace: "Calibri"
  });
  s.addText("Comme classer des joueurs en catégories (support, carry, tank) sans les étiqueter à la main : KMeans trouve les groupes seul.", {
    x: 0.5, y: 1.82, w: 9, h: 0.65, fontSize: 14, color: C.muted, fontFace: "Calibri", italic: true
  });

  // KMeans explanation
  const steps = [
    { n: "1", t: "Initialiser k centres", d: "k-means|| pour éviter les optima locaux" },
    { n: "2", t: "Assigner chaque point", d: "Au centre le plus proche (distance euclidienne)" },
    { n: "3", t: "Recalculer les centres", d: "Moyenne des points de chaque cluster" },
    { n: "4", t: "Répéter jusqu'à convergence", d: "Δ centres < tolérance OU maxIter atteint" },
  ];
  steps.forEach((st, i) => {
    const x = 0.4 + i * 2.33;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.65, w: 2.15, h: 2.7, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.73, y: 2.72, w: 0.68, h: 0.68, fill: { color: C.amber } });
    s.addText(st.n, { x: x + 0.73, y: 2.72, w: 0.68, h: 0.68, fontSize: 20, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    s.addText(st.t, { x: x + 0.08, y: 3.52, w: 1.99, h: 0.6, fontSize: 12, bold: true, color: C.dark, fontFace: "Calibri", align: "center", wrap: true });
    s.addText(st.d, { x: x + 0.08, y: 4.15, w: 1.99, h: 1.0, fontSize: 11, color: C.muted, fontFace: "Calibri", align: "center", wrap: true });
    if (i < 3) s.addText("→", { x: x + 2.17, y: 3.15, w: 0.13, h: 0.4, fontSize: 16, bold: true, color: C.amber, fontFace: "Calibri", align: "center", margin: 0 });
  });
}

// Slide – Lab 3 Architecture
{
  const s = contentSlide("LAB 3 · Pipeline ML distribué", C.amber);

  // Dataset info
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 9.2, h: 0.7, fill: { color: "FFFBEB" } });
  s.addText("Dataset · Track A Esports : 10 000 points · 5 features (hero stats) · 3 clusters synthétiques bien séparés", {
    x: 0.55, y: 1.1, w: 8.9, h: 0.55, fontSize: 12, color: C.dark, fontFace: "Calibri"
  });

  // Pipeline
  const pipe = [
    { l: "Données\nbrutes", c: C.navy },
    { l: "Standard\nScaler", c: C.blue },
    { l: "KMeans\nfit()", c: C.amber },
    { l: "Eval\nSilhouette", c: C.teal },
    { l: "Métriques\nCSV", c: C.green },
  ];
  pipe.forEach((p, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3 + i * 1.9, y: 1.95, w: 1.7, h: 1.0, fill: { color: p.c } });
    s.addText(p.l, { x: 0.3 + i * 1.9 + 0.05, y: 1.95, w: 1.6, h: 1.0, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle" });
    if (i < 4) s.addText("→", { x: 0.3 + i * 1.9 + 1.72, y: 2.3, w: 0.15, h: 0.4, fontSize: 16, bold: true, color: C.amber, fontFace: "Calibri", align: "center", margin: 0 });
  });

  // Partitioning comparison
  s.addText("Stratégie de partitionnement", { x: 0.4, y: 3.18, w: 9.2, h: 0.45, fontSize: 15, bold: true, color: C.dark, fontFace: "Calibri" });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.72, w: 4.5, h: 1.65, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.72, w: 4.5, h: 0.44, fill: { color: C.navy } });
  s.addText("DEFAULT · 8 partitions", { x: 0.55, y: 3.77, w: 4.1, h: 0.34, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  s.addText("RoundRobin · Shuffle: ~52 MB · Temps: 145 ms", { x: 0.55, y: 4.25, w: 4.1, h: 1.0, fontSize: 12, color: C.muted, fontFace: "Calibri", wrap: true });

  s.addText("→  −17.8%  ⬇", { x: 4.97, y: 4.15, w: 0.7, h: 0.5, fontSize: 12, bold: true, color: C.green, fontFace: "Calibri", align: "center", wrap: true });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 3.72, w: 4.5, h: 1.65, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 3.72, w: 4.5, h: 0.44, fill: { color: C.green } });
  s.addText("OPTIMISÉ · 32 partitions", { x: 5.25, y: 3.77, w: 4.1, h: 0.34, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  s.addText("Hash(id) · Shuffle: ~42 MB · Temps: 119 ms", { x: 5.25, y: 4.25, w: 4.1, h: 1.0, fontSize: 12, color: C.muted, fontFace: "Calibri", wrap: true });
}

// Slide – Résultats KMeans
{
  const s = contentSlide("LAB 3 · Résultats clustering", C.amber);

  // Best config highlight
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 9.2, h: 1.0, fill: { color: "FFFBEB" }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addText("⭐  Meilleure configuration : KMeans  k=3  ·  Silhouette = 0.9797  ·  Inertia = 739.03  ·  Temps = 5750 ms", {
    x: 0.55, y: 1.12, w: 8.9, h: 0.72, fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri", wrap: true
  });

  // Silhouette chart
  const kData = [
    { k: "k=2", val: 0.782, c: C.muted },
    { k: "k=3", val: 0.9797, c: C.amber },
    { k: "k=4", val: 0.726, c: C.blue },
    { k: "k=5", val: 0.723, c: C.teal },
  ];
  s.addText("Score Silhouette par k", { x: 0.4, y: 2.25, w: 4.8, h: 0.42, fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri" });
  kData.forEach((d, i) => {
    const barH = d.val * 1.3;
    const x = 0.7 + i * 1.1;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.78 + (1.3 - barH), w: 0.8, h: barH, fill: { color: d.c } });
    s.addText(d.k, { x, y: 4.15, w: 0.8, h: 0.35, fontSize: 10, color: C.dark, fontFace: "Calibri", align: "center" });
    s.addText(d.val.toFixed(2), { x, y: 2.68 + (1.3 - barH), w: 0.8, h: 0.3, fontSize: 9, color: d.c, fontFace: "Calibri", align: "center", bold: true });
  });

  // Stability analysis
  s.addText("Stabilité des seeds (k=3)", { x: 5.1, y: 2.25, w: 4.5, h: 0.42, fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri" });
  const seeds = [
    ["Seed", "Silhouette", "Temps (ms)"],
    ["42", "0.9797", "4657"],
    ["43", "0.9797", "3877"],
    ["44", "0.9797", "3838"],
    ["45", "0.9797", "3731"],
    ["46", "0.9797", "3736"],
  ];
  seeds.forEach((row, ri) => {
    const bg = ri === 0 ? C.amber : ri % 2 === 1 ? "FFFBEB" : C.white;
    const fg = ri === 0 ? C.white : C.dark;
    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, { x: 5.1 + ci * 1.45, y: 2.72 + ri * 0.46, w: 1.42, h: 0.44, fill: { color: bg } });
      s.addText(cell, { x: 5.1 + ci * 1.45 + 0.05, y: 2.76 + ri * 0.46, w: 1.32, h: 0.36, fontSize: ri === 0 ? 10 : 12, bold: ri === 0, color: fg, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    });
  });
  s.addText("CV = 0.00%  ·  Résultats parfaitement stables", { x: 5.1, y: 5.5 - 0.62, w: 4.5, h: 0.38, fontSize: 11, color: C.green, bold: true, fontFace: "Calibri" });
}

// Slide – Practice vs Assignment Lab 3
{
  const s = contentSlide("LAB 3 · Practice vs Assignment", C.amber);

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 4.5, h: 4.3, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.05, w: 4.5, h: 0.5, fill: { color: C.amber } });
  s.addText("PRACTICE · 5 000 points", { x: 0.55, y: 1.1, w: 4.1, h: 0.38, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  const pl3 = [
    "Algo: KMeans + BisectingKMeans", "k values: 3, 5, 8", "Best: KMeans k=3", "Silhouette: 0.8234", "5 seeds (42-46) · CV = 0.13%", "Partitions: 8 → 32 (+300%)", "Speedup: 1.22x (−17.8%)",
  ];
  pl3.forEach((l, i) => s.addText("· " + l, { x: 0.55, y: 1.68 + i * 0.52, w: 4.1, h: 0.45, fontSize: 11, color: C.dark, fontFace: "Calibri" }));

  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.05, w: 4.5, h: 4.3, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.05, w: 4.5, h: 0.5, fill: { color: C.navy } });
  s.addText("ASSIGNMENT · 10 000 points", { x: 5.25, y: 1.1, w: 4.1, h: 0.38, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  const al3 = [
    "Algo: KMeans uniquement", "k values: 2, 3, 4, 5", "Best: KMeans k=3", "Silhouette: 0.9797 (!)", "5 seeds · Silhouette identique", "Partitions: 12 → 32", "k=3 converge parfaitement (3 clusters)",
  ];
  al3.forEach((l, i) => s.addText("· " + l, { x: 5.25, y: 1.68 + i * 0.52, w: 4.1, h: 0.45, fontSize: 11, color: C.dark, fontFace: "Calibri" }));
}

// Slide – Lab 3 Résultats
{
  const s = contentSlide("LAB 3 · Résultats & Problèmes", C.amber);
  const kpis = [
    { v: "0.9797", l: "Silhouette score", c: C.amber },
    { v: "−17.8%", l: "Temps d'exécution", c: C.green },
    { v: "−19.2%", l: "Shuffle réduit", c: C.teal },
    { v: "0.00%", l: "CV stabilité seeds", c: C.blue },
  ];
  kpis.forEach((k, i) => {
    const x = 0.4 + i * 2.33;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.15, h: 1.5, fill: { color: C.white }, shadow: { type: "outer", blur: 5, offset: 2, angle: 135, color: "000000", opacity: 0.08 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.15, h: 0.07, fill: { color: k.c } });
    s.addText(k.v, { x: x + 0.1, y: 1.18, w: 1.95, h: 0.7, fontSize: 26, bold: true, color: k.c, fontFace: "Calibri", align: "center" });
    s.addText(k.l, { x: x + 0.1, y: 1.92, w: 1.95, h: 0.5, fontSize: 11, color: C.muted, fontFace: "Calibri", align: "center", wrap: true });
  });

  const issues = [
    { p: "computeCost() introuvable (Spark 4)", s: "Fonction custom calculate_inertia() via RDD.map" },
    { p: "UDT Vector non écrivable en CSV", s: "Écriture en Parquet uniquement" },
    { p: "OutOfMemory sur grands datasets", s: "Réduire n_samples ou augmenter driver.memory" },
  ];
  s.addText("Problèmes & Solutions", { x: 0.4, y: 2.78, w: 9.2, h: 0.45, fontSize: 15, bold: true, color: C.dark, fontFace: "Calibri" });
  issues.forEach((iss, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.32 + i * 0.72, w: 9.2, h: 0.62, fill: { color: C.white }, shadow: { type: "outer", blur: 3, offset: 1, angle: 135, color: "000000", opacity: 0.06 } });
    s.addText("⚠  " + iss.p, { x: 0.55, y: 3.37 + i * 0.72, w: 4.4, h: 0.52, fontSize: 12, bold: true, color: C.amber, fontFace: "Calibri", wrap: true });
    s.addText("→  " + iss.s, { x: 5.1, y: 3.37 + i * 0.72, w: 4.4, h: 0.52, fontSize: 12, color: C.green, fontFace: "Calibri", wrap: true });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – COMPARAISON GLOBALE
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.offW };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.dark } });
  s.addText("COMPARAISON · Les 4 Labs", { x: 0.4, y: 0.1, w: 9.2, h: 0.65, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });

  const headers = ["Lab", "Technologie", "Données", "Méthode", "Résultat clé"];
  const colX2 = [0.3, 1.2, 3.0, 4.8, 6.9];
  const colW2 = [0.85, 1.75, 1.75, 2.05, 2.85];
  headers.forEach((h, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: colX2[i], y: 1.05, w: colW2[i], h: 0.44, fill: { color: C.dark } });
    s.addText(h, { x: colX2[i] + 0.05, y: 1.08, w: colW2[i] - 0.1, h: 0.38, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  });

  const rows3 = [
    { c: C.teal,   row: ["Lab 0", "PySpark + Parquet", "15 lignes CSV", "Read/Write + Explain", "Parquet = lecture colonnaire"] },
    { c: C.blue,   row: ["Lab 1", "Spark Streaming", "50 events JSON", "Watermark + Window", "−30% latence (optim)"] },
    { c: C.purple, row: ["Lab 2", "Spark SQL", "5-10 documents", "Inverted Index + NLP", "28 termes · 243ms query"] },
    { c: C.amber,  row: ["Lab 3", "Spark ML", "10 000 points", "KMeans + Partitioning", "Sil=0.9797 · −17.8% temps"] },
  ];
  rows3.forEach((r, ri) => {
    r.row.forEach((cell, ci) => {
      const bg = ci === 0 ? r.c : ri % 2 === 0 ? C.white : "F8FAFC";
      s.addShape(pres.shapes.RECTANGLE, { x: colX2[ci], y: 1.55 + ri * 0.88, w: colW2[ci], h: 0.82, fill: { color: bg } });
      s.addText(cell, { x: colX2[ci] + 0.05, y: 1.58 + ri * 0.88, w: colW2[ci] - 0.1, h: 0.76, fontSize: ci === 0 ? 13 : 11, bold: ci === 0, color: ci === 0 ? C.white : C.dark, fontFace: "Calibri", align: "center", valign: "middle", wrap: true, margin: 0 });
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – CONCLUSION
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.dark };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 5.625, fill: { color: C.blue } });
  s.addText("CONCLUSION", { x: 0.4, y: 0.5, w: 9.2, h: 0.65, fontSize: 22, bold: true, color: C.muted, fontFace: "Calibri" });
  s.addText("4 Labs · 4 pilliers de\nl'ingénierie des données", { x: 0.4, y: 1.2, w: 9.2, h: 1.5, fontSize: 36, bold: true, color: C.white, fontFace: "Calibri" });

  const pills = [
    { t: "Stockage", sub: "Parquet > CSV", c: C.teal },
    { t: "Streaming", sub: "Temps réel", c: C.blue },
    { t: "Recherche", sub: "Index inversé", c: C.purple },
    { t: "ML", sub: "KMeans distribué", c: C.amber },
  ];
  pills.forEach((p, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4 + i * 2.4, y: 2.95, w: 2.2, h: 1.55, fill: { color: p.c } });
    s.addText(p.t, { x: 0.4 + i * 2.4 + 0.1, y: 3.05, w: 2.0, h: 0.65, fontSize: 18, bold: true, color: C.white, fontFace: "Calibri", align: "center" });
    s.addText(p.sub, { x: 0.4 + i * 2.4 + 0.1, y: 3.73, w: 2.0, h: 0.65, fontSize: 13, color: C.light, fontFace: "Calibri", align: "center" });
  });

  s.addText("Outil commun : Apache Spark 4.0.1  ·  Python 3.10  ·  PySpark ML  ·  Parquet", {
    x: 0.4, y: 4.72, w: 9.2, h: 0.5, fontSize: 12, color: C.muted, fontFace: "Calibri"
  });
}

// Write
pres.writeFile({ fileName: "/home/bibawandaogo/Data_Engineering2/DE2_Labs_2Presentation.pptx" })
  .then(() => console.log("DONE"))
  .catch(e => console.error(e));