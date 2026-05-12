const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'DE2 Labs - Data Engineering II';

// ─── COLOR PALETTE ───────────────────────────────────────────
const C = {
  navy:    "1A2B5F",
  blue:    "2563EB",
  lblue:   "3B82F6",
  sky:     "BAD4F5",
  white:   "FFFFFF",
  offwhite:"F8FAFF",
  gray:    "64748B",
  lgray:   "E2E8F0",
  dgray:   "1E293B",
  green:   "059669",
  lgreen:  "D1FAE5",
  orange:  "EA580C",
  lorange: "FEE2E2",
  teal:    "0D9488",
  lteal:   "CCFBF1",
  purple:  "7C3AED",
  lpurple: "EDE9FE",
  yellow:  "D97706",
  lyellow: "FEF3C7",
  red:     "DC2626",
};

// ─── HELPERS ─────────────────────────────────────────────────
function titleSlide(pres, title, subtitle, bg=C.navy) {
  const s = pres.addSlide();
  s.background = { color: bg };

  // Big accent shape on right
  s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 0, w: 2.8, h: 5.625, fill: { color: C.blue, transparency: 70 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.8, y: 0, w: 1.2, h: 5.625, fill: { color: C.lblue, transparency: 50 } });

  // Title
  s.addText(title, { x: 0.6, y: 1.4, w: 8.5, h: 1.4, fontSize: 40, bold: true, color: C.white, fontFace: "Calibri", align: "left", margin: 0 });
  // Subtitle
  s.addText(subtitle, { x: 0.6, y: 2.9, w: 7.5, h: 0.7, fontSize: 20, color: C.sky, fontFace: "Calibri", align: "left", margin: 0 });

  // Bottom bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.2, w: 10, h: 0.425, fill: { color: C.blue, transparency: 30 } });
  s.addText("Data Engineering II — ESIEE Paris 2025-2026  |  Bibawandaogo", { x: 0.5, y: 5.22, w: 9, h: 0.38, fontSize: 11, color: C.sky, fontFace: "Calibri", align: "left", margin: 0 });
  return s;
}

function sectionHeader(pres, label, title, color=C.blue) {
  const s = pres.addSlide();
  s.background = { color: color };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.25, h: 5.625, fill: { color: C.white, transparency: 60 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 0, w: 0.25, h: 5.625, fill: { color: C.white, transparency: 80 } });
  s.addText(label, { x: 1.2, y: 1.5, w: 7.5, h: 0.6, fontSize: 16, color: C.white, fontFace: "Calibri", bold: false, align: "left", transparency: 30, margin: 0 });
  s.addText(title, { x: 1.2, y: 2.1, w: 7.5, h: 1.4, fontSize: 38, bold: true, color: C.white, fontFace: "Calibri", align: "left", margin: 0 });
  return s;
}

function contentSlide(pres, title, bgColor=C.offwhite) {
  const s = pres.addSlide();
  s.background = { color: bgColor };
  // Header strip
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.75, fill: { color: C.navy } });
  s.addText(title, { x: 0.4, y: 0.1, w: 9, h: 0.55, fontSize: 20, bold: true, color: C.white, fontFace: "Calibri", align: "left", margin: 0 });
  return s;
}

function card(s, pres, x, y, w, h, header, body, headerColor=C.blue, bodyBg=C.white) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: bodyBg }, shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.1 } });
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.38, fill: { color: headerColor } });
  s.addText(header, { x: x+0.08, y: y+0.04, w: w-0.16, h: 0.3, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  s.addText(body, { x: x+0.1, y: y+0.45, w: w-0.2, h: h-0.55, fontSize: 11, color: C.dgray, fontFace: "Calibri", margin: 0 });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 1 — Cover
// ══════════════════════════════════════════════════════════════
titleSlide(pres,
  "Data Engineering II\nLabs 0 → 3",
  "Soutenance finale — Practice & Assignment — ESIEE Paris 2026"
);

// ══════════════════════════════════════════════════════════════
// SLIDE 2 — Agenda
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Agenda");
  const labs = [
    ["LAB 0", "Setup & Validation\nEnvironnement Spark", C.teal],
    ["LAB 1", "Structured Streaming\nWatermark & Windows", C.blue],
    ["LAB 2", "Inverted Index\nText Pipeline", C.purple],
    ["LAB 3", "Clustering KMeans\nSpark ML + Partitioning", C.orange],
  ];
  labs.forEach(([tag, txt, col], i) => {
    const x = 0.4 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 2.1, h: 3.4, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.1, w: 2.1, h: 0.55, fill: { color: col } });
    s.addText(tag, { x: x+0.07, y: 1.14, w: 1.96, h: 0.47, fontSize: 18, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(txt, { x: x+0.1, y: 1.75, w: 1.9, h: 2.6, fontSize: 13, color: C.dgray, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(`${i*2+1} Practice\n${i*2+2} Assignment`, { x: x+0.1, y: 3.5, w: 1.9, h: 0.9, fontSize: 10, color: col, fontFace: "Calibri", align: "center", margin: 0 });
  });
  s.addText("Durée totale : ~15 min  |  Track A — Esports  |  Apache Spark 4.0.1 + Python 3.10", { x: 0.4, y: 4.85, w: 9.2, h: 0.35, fontSize: 11, color: C.gray, fontFace: "Calibri", align: "center", margin: 0 });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 3 — LAB 0 Section
// ══════════════════════════════════════════════════════════════
sectionHeader(pres, "LAB 0", "Setup & Validation\nde l'Environnement Spark", C.teal);

// ══════════════════════════════════════════════════════════════
// SLIDE 4 — Lab 0 Objectifs
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 0 — Objectif & Stack technique");
  // Left: objectif
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.95, w: 4.4, h: 4.3, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.1 } });
  s.addText("Objectif", { x: 0.45, y: 1.0, w: 4.2, h: 0.45, fontSize: 15, bold: true, color: C.teal, fontFace: "Calibri", margin: 0 });
  s.addText([
    { text: "Valider l'installation complète de l'environnement :", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "• Spark 4.0.1 local mode", options: { breakLine: true } },
    { text: "• Lecture CSV avec schéma explicite", options: { breakLine: true } },
    { text: "• Écriture Parquet partitionné", options: { breakLine: true } },
    { text: "• Capture des plans d'exécution", options: { breakLine: true } },
    { text: "• Agrégation groupBy", options: { breakLine: true } },
  ], { x: 0.5, y: 1.5, w: 4.1, h: 3.5, fontSize: 13, color: C.dgray, fontFace: "Calibri", margin: 0 });

  // Right: stack
  const tools = [
    ["Apache Spark 4.0.1", "local[*] — moteur de calcul distribué", C.teal],
    ["PySpark", "API Python pour Spark", C.teal],
    ["Parquet", "Format colonnaire binaire compressé", C.teal],
    ["CSV", "Format texte plat — référence", C.gray],
  ];
  tools.forEach(([name, desc, col], i) => {
    const y = 1.05 + i * 0.92;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y, w: 4.5, h: 0.82, fill: { color: C.offwhite }, shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.08 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y, w: 0.12, h: 0.82, fill: { color: col } });
    s.addText(name, { x: 5.2, y: y+0.04, w: 4.2, h: 0.35, fontSize: 13, bold: true, color: C.dgray, fontFace: "Calibri", margin: 0 });
    s.addText(desc, { x: 5.2, y: y+0.42, w: 4.2, h: 0.32, fontSize: 11, color: C.gray, fontFace: "Calibri", margin: 0 });
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 5 — Lab 0 Pipeline
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 0 — Pipeline de Validation");

  // Flow diagram: CSV → DataFrame → Parquet → Aggregation → Plans
  const steps = [
    ["1", "CSV\nSource", C.teal, "15 lignes\n4 colonnes"],
    ["2", "DataFrame\nSchéma explicite", C.blue, "id, category\nvalue, text"],
    ["3", "Parquet\nPartitionné", C.purple, "Partitionné\npar category"],
    ["4", "Agrégation\ngroupBy", C.orange, "cnt, avg_value\npar catégorie"],
    ["5", "Plans\nd'exécution", C.green, "CSV vs Parquet\nexplain()"],
  ];
  const boxW = 1.55, boxH = 2.3, startX = 0.4, y = 1.3;
  steps.forEach(([num, label, col, detail], i) => {
    const x = startX + i * 1.85;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: boxW, h: boxH, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.12 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: boxW, h: 0.5, fill: { color: col } });
    s.addText(num, { x, y: y+0.08, w: boxW, h: 0.35, fontSize: 18, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(label, { x: x+0.06, y: y+0.58, w: boxW-0.12, h: 0.9, fontSize: 12, bold: true, color: C.dgray, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(detail, { x: x+0.06, y: y+1.52, w: boxW-0.12, h: 0.65, fontSize: 10, color: C.gray, fontFace: "Calibri", align: "center", margin: 0 });
    // Arrow
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, { x: x+boxW, y: y+boxH/2-0.05, w: 0.3, h: 0.1, fill: { color: col } });
    }
  });

  // Key result
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 3.85, w: 9.3, h: 0.65, fill: { color: C.lgreen } });
  s.addText("✓  Résultat : Environnement validé — Spark 4.0.1 opérationnel, scan CSV + Parquet fonctionnel, plans d'exécution capturés", { x: 0.5, y: 3.9, w: 9.0, h: 0.55, fontSize: 12, color: C.green, fontFace: "Calibri", bold: true, margin: 0 });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 6 — LAB 1 Section
// ══════════════════════════════════════════════════════════════
sectionHeader(pres, "LAB 1", "Structured Streaming\nWatermark · Windows · Parquet Sink", C.blue);

// ══════════════════════════════════════════════════════════════
// SLIDE 7 — Lab 1 Architecture
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 1 — Architecture Structured Streaming");

  // Pipeline diagram
  const pipeY = 1.5;
  // Source box
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: pipeY, w: 1.9, h: 2.3, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 5, offset: 2, angle: 135, opacity: 0.1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: pipeY, w: 1.9, h: 0.42, fill: { color: C.blue } });
  s.addText("SOURCE", { x: 0.35, y: pipeY+0.06, w: 1.9, h: 0.32, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
  s.addText("JSON Files\ndata/landing/lab1/\n\nmaxFilesPer\nTrigger: 1\n\n50 events\n10 fichiers", { x: 0.45, y: pipeY+0.5, w: 1.7, h: 1.7, fontSize: 10, color: C.dgray, fontFace: "Calibri", align: "center", margin: 0 });

  // Arrow 1
  s.addShape(pres.shapes.RECTANGLE, { x: 2.25, y: pipeY+1.0, w: 0.5, h: 0.1, fill: { color: C.blue } });
  s.addText("→", { x: 2.3, y: pipeY+0.85, w: 0.4, h: 0.35, fontSize: 16, color: C.blue, fontFace: "Calibri", align: "center", margin: 0 });

  // Transform box
  s.addShape(pres.shapes.RECTANGLE, { x: 2.75, y: pipeY, w: 2.4, h: 2.3, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 5, offset: 2, angle: 135, opacity: 0.1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 2.75, y: pipeY, w: 2.4, h: 0.42, fill: { color: C.purple } });
  s.addText("TRANSFORM", { x: 2.75, y: pipeY+0.06, w: 2.4, h: 0.32, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
  s.addText("withWatermark()\n\"10 min\"\n\nwindow(event_time,\n\"1h\")\n\ngroupBy(\nwindow, game_type)", { x: 2.85, y: pipeY+0.5, w: 2.2, h: 1.7, fontSize: 10, color: C.dgray, fontFace: "Calibri", align: "center", margin: 0 });

  // Arrow 2
  s.addText("→", { x: 5.2, y: pipeY+0.85, w: 0.4, h: 0.35, fontSize: 16, color: C.purple, fontFace: "Calibri", align: "center", margin: 0 });

  // Aggregation box
  s.addShape(pres.shapes.RECTANGLE, { x: 5.6, y: pipeY, w: 2.0, h: 2.3, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 5, offset: 2, angle: 135, opacity: 0.1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.6, y: pipeY, w: 2.0, h: 0.42, fill: { color: C.orange } });
  s.addText("AGGREGATE", { x: 5.6, y: pipeY+0.06, w: 2.0, h: 0.32, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
  s.addText("count(*)\navg(duration)\nmax(spectators)\nmin(duration)\n\nOutputMode:\nappend", { x: 5.7, y: pipeY+0.5, w: 1.8, h: 1.7, fontSize: 10, color: C.dgray, fontFace: "Calibri", align: "center", margin: 0 });

  // Arrow 3
  s.addText("→", { x: 7.65, y: pipeY+0.85, w: 0.4, h: 0.35, fontSize: 16, color: C.orange, fontFace: "Calibri", align: "center", margin: 0 });

  // Sink box
  s.addShape(pres.shapes.RECTANGLE, { x: 8.05, y: pipeY, w: 1.6, h: 2.3, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 5, offset: 2, angle: 135, opacity: 0.1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 8.05, y: pipeY, w: 1.6, h: 0.42, fill: { color: C.green } });
  s.addText("SINK", { x: 8.05, y: pipeY+0.06, w: 1.6, h: 0.32, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
  s.addText("Parquet\nstream_sink/\n\nCheckpoint\nactivé\n\nTrigger:\n5 sec", { x: 8.12, y: pipeY+0.5, w: 1.46, h: 1.7, fontSize: 10, color: C.dgray, fontFace: "Calibri", align: "center", margin: 0 });

  // Bottom note
  s.addText("Track A — Esports  |  Événements : match_id · match_end_time · game_type · winning_team · match_duration_sec · spectators", { x: 0.35, y: 4.9, w: 9.3, h: 0.35, fontSize: 10, color: C.gray, fontFace: "Calibri", align: "center", margin: 0 });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 8 — Lab 1 Watermark expliqué
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 1 — Watermark & Window : pourquoi ?");

  // Timeline illustration
  const tY = 1.2, tH = 0.08, tW = 8.5;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.75, y: tY+0.5, w: tW, h: tH, fill: { color: C.lgray } });

  // Events on timeline
  const evts = [
    [1.2, "10:00", C.blue, "Evt A"],
    [2.8, "10:06", C.blue, "Evt B"],
    [4.5, "10:12", C.green, "Evt C"],
    [6.2, "10:18", C.orange, "Evt D\n(retard)"],
    [7.9, "10:24", C.red, "Evt E\n(trop tard)"],
  ];
  evts.forEach(([x, time, col, label]) => {
    s.addShape(pres.shapes.OVAL, { x: x+0.75-0.1, y: tY+0.38, w: 0.22, h: 0.22, fill: { color: col } });
    s.addText(time, { x: x+0.75-0.35, y: tY+0.65, w: 0.8, h: 0.28, fontSize: 9, color: C.gray, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(label, { x: x+0.75-0.38, y: tY+0.05, w: 0.85, h: 0.35, fontSize: 9, color: col, bold: true, fontFace: "Calibri", align: "center", margin: 0 });
  });

  // Window bracket
  s.addShape(pres.shapes.RECTANGLE, { x: 1.2+0.75-0.1, y: tY+0.12, w: 0.08, h: 0.3, fill: { color: C.blue } });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.5+0.75-0.1, y: tY+0.12, w: 0.08, h: 0.3, fill: { color: C.blue } });
  s.addShape(pres.shapes.RECTANGLE, { x: 1.2+0.75, y: tY+0.12, w: 3.2, h: 0.08, fill: { color: C.blue, transparency: 50 } });
  s.addText("Window 1h", { x: 2.0+0.75, y: tY-0.1, w: 2.0, h: 0.3, fontSize: 10, color: C.blue, fontFace: "Calibri", align: "center", margin: 0, bold: true });

  // Watermark line
  s.addShape(pres.shapes.LINE, { x: 6.0+0.75-0.1, y: tY-0.2, w: 0, h: 1.4, line: { color: C.red, width: 2, dashType: "dash" } });
  s.addText("Watermark\n(−10 min)", { x: 6.0+0.75-0.8, y: tY-0.42, w: 1.6, h: 0.42, fontSize: 9, color: C.red, fontFace: "Calibri", align: "center", margin: 0, bold: true });

  // Legend
  const legItems = [
    [C.blue, "Event dans la window"],
    [C.orange, "Retard acceptable (< 10min)"],
    [C.red, "Trop tard → ignoré"],
  ];
  legItems.forEach(([col, txt], i) => {
    s.addShape(pres.shapes.OVAL, { x: 1.0+i*3.0, y: 2.3, w: 0.22, h: 0.22, fill: { color: col } });
    s.addText(txt, { x: 1.28+i*3.0, y: 2.28, w: 2.4, h: 0.25, fontSize: 11, color: C.dgray, fontFace: "Calibri", margin: 0 });
  });

  // Cards below
  const concepts = [
    ["Watermark", "Définit le retard max accepté.\nÉvénements trop anciens sont ignorés\npour libérer la mémoire.", C.blue],
    ["Window", "Regroupe les événements par plage\ntemporelle pour les agréger\n(count, avg, min, max).", C.purple],
    ["Exactly-Once", "Le checkpointing garantit que chaque\névénement est traité exactement une\nfois, même après crash.", C.green],
  ];
  concepts.forEach(([title, body, col], i) => {
    const x = 0.4 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.7, w: 2.9, h: 2.45, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 5, offset: 2, angle: 135, opacity: 0.1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.7, w: 2.9, h: 0.38, fill: { color: col } });
    s.addText(title, { x: x+0.08, y: 2.74, w: 2.74, h: 0.3, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addText(body, { x: x+0.1, y: 3.12, w: 2.7, h: 1.9, fontSize: 11, color: C.dgray, fontFace: "Calibri", margin: 0 });
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 9 — Lab 1 Résultats & Optimisation
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 1 — Résultats & Optimisation Baseline vs Optimized");

  // Comparison table
  const headers = ["Paramètre", "Baseline", "Optimized", "Impact"];
  const rows = [
    ["Window Duration", "1 heure", "30 minutes", "↓ Latence"],
    ["Watermark Delay", "10 minutes", "5 minutes", "↓ Mémoire"],
    ["Trigger Interval", "10 secondes", "5 secondes", "↑ Réactivité"],
    ["Input Rows / batch", "5 rows", "5 rows", "Stable"],
    ["Batch Duration", "~2 441 ms", "~2 246 ms", "↓ 8%"],
    ["Partitions", "200", "200", "Inchangé"],
  ];

  const tableData = [
    headers.map((h, i) => ({ text: h, options: { bold: true, color: C.white, fill: { color: i===1?C.blue:i===2?C.green:C.navy }, fontSize: 12 } })),
    ...rows.map((row) => row.map((cell, i) => ({ text: cell, options: { fontSize: 11, color: i===3&&cell.startsWith("↓")?C.green:i===3&&cell.startsWith("↑")?C.orange:C.dgray } })))
  ];
  s.addTable(tableData, { x: 0.4, y: 1.0, w: 9.2, h: 3.5, border: { pt: 0.5, color: C.lgray }, fill: { color: C.white }, colW: [2.4, 2.0, 2.0, 2.8] });

  // Bottom insight
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.7, w: 9.2, h: 0.65, fill: { color: C.lyellow } });
  s.addText("💡  La réduction du watermark libère plus rapidement la mémoire d'état — critique pour les streams continus à grande échelle.", { x: 0.6, y: 4.75, w: 8.8, h: 0.55, fontSize: 12, color: C.yellow, fontFace: "Calibri", bold: true, margin: 0 });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 10 — LAB 2 Section
// ══════════════════════════════════════════════════════════════
sectionHeader(pres, "LAB 2", "Inverted Index\nText Pipeline · Parquet vs CSV", C.purple);

// ══════════════════════════════════════════════════════════════
// SLIDE 11 — Lab 2 Pipeline
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 2 — Pipeline Inverted Index (Assignment)");

  const steps = [
    { n: "1", title: "Corpus\nIngestion", detail: "5 docs esports\nSchéma explicite\ndoc_id + text", col: C.purple },
    { n: "2", title: "Text\nNormalization", detail: "lowercase\nrégex ponctuation\nsplit whitespace", col: C.blue },
    { n: "3", title: "Stop-Words\nFiltering", detail: "56 mots filtrés\nbroadcast variable\n44→33 tokens", col: C.teal },
    { n: "4", title: "Build\nIndex", detail: "groupBy(token)\ncollect_list(doc_id)\ncount(*)", col: C.orange },
    { n: "5", title: "Write\nParquet/CSV", detail: "Parquet: 1.51 KB\nCSV: 0.57 KB\ncomparaison", col: C.green },
    { n: "6", title: "Query\nLatency", detail: "≥3 lookups\n~242 ms avg\nplan sauvegardé", col: C.red },
  ];

  const bW = 1.45, bH = 3.1, startX = 0.25, py = 1.1;
  steps.forEach((st, i) => {
    const x = startX + i * 1.58;
    s.addShape(pres.shapes.RECTANGLE, { x, y: py, w: bW, h: bH, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 5, offset: 2, angle: 135, opacity: 0.1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: py, w: bW, h: 0.45, fill: { color: st.col } });
    s.addText(st.n, { x, y: py+0.07, w: bW, h: 0.32, fontSize: 16, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(st.title, { x: x+0.06, y: py+0.52, w: bW-0.12, h: 0.75, fontSize: 11, bold: true, color: C.dgray, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(st.detail, { x: x+0.06, y: py+1.32, w: bW-0.12, h: 1.6, fontSize: 10, color: C.gray, fontFace: "Calibri", align: "center", margin: 0 });
    if (i < steps.length - 1) {
      s.addText("›", { x: x+bW, y: py+1.2, w: 0.12, h: 0.45, fontSize: 14, color: st.col, fontFace: "Calibri", align: "center", margin: 0 });
    }
  });

  s.addText("Résultat index: 28 tokens uniques | Top token: \"esports\" — freq=5, docs=5 | Latence avg: 242 ms", { x: 0.3, y: 4.45, w: 9.4, h: 0.32, fontSize: 10, color: C.gray, fontFace: "Calibri", align: "center", margin: 0 });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 12 — Lab 2 Parquet vs CSV
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 2 — Parquet vs CSV : Comparaison de Stockage");

  // Bar chart
  s.addChart(pres.charts.BAR, [
    { name: "Taille (KB)", labels: ["Parquet", "CSV"], values: [1.51, 0.57] }
  ], {
    x: 0.5, y: 1.0, w: 4.5, h: 3.3, barDir: "col",
    chartColors: [C.purple, C.teal],
    chartArea: { fill: { color: "FFFFFF" }, roundedCorners: false },
    catAxisLabelColor: "64748B",
    valAxisLabelColor: "64748B",
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: "1E293B",
    showLegend: false,
    showTitle: true,
    title: "Taille en KB",
    titleFontSize: 13,
  });

  // Right side comparison
  const compItems = [
    ["Parquet", "1.51 KB", "Format binaire colonnaire\nCompression Snappy native\nRapide en lecture Spark\nMétadonnées préservées\nType array supporté", C.purple],
    ["CSV", "0.57 KB", "Format texte lisible\nPortable universellement\nArray → concat string\nPas de compression\nLecture plus lente", C.teal],
  ];
  compItems.forEach(([fmt, size, desc, col], i) => {
    const x = 5.3 + i * 2.2;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 2.0, h: 3.3, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 5, offset: 2, angle: 135, opacity: 0.1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.0, w: 2.0, h: 0.42, fill: { color: col } });
    s.addText(fmt, { x: x+0.08, y: 1.06, w: 1.84, h: 0.3, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(size, { x: x+0.08, y: 1.48, w: 1.84, h: 0.45, fontSize: 22, bold: true, color: col, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(desc, { x: x+0.1, y: 1.98, w: 1.8, h: 2.1, fontSize: 10, color: C.dgray, fontFace: "Calibri", margin: 0 });
  });

  // Ratio note
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.55, w: 9.2, h: 0.68, fill: { color: C.lpurple } });
  s.addText("📊  Ratio CSV/Parquet = 0.38×  |  Pour ce petit corpus, Parquet est plus lourd (metadata overhead) — l'avantage Parquet s'inverse à grande échelle (>10 MB)", { x: 0.6, y: 4.6, w: 8.8, h: 0.58, fontSize: 11, color: C.purple, fontFace: "Calibri", bold: false, margin: 0 });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 13 — LAB 3 Section
// ══════════════════════════════════════════════════════════════
sectionHeader(pres, "LAB 3", "Clustering KMeans\nSpark ML · Partitioning · Convergence", C.orange);

// ══════════════════════════════════════════════════════════════
// SLIDE 14 — Lab 3 Algo KMeans expliqué
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 3 — Algorithme KMeans : Pourquoi ce choix ?");

  // Left: algo steps
  const algSteps = [
    ["Initialisation", "k centres aléatoires via k-means||\n(évite les minima locaux)", C.orange],
    ["Assignment", "Chaque point → centre le plus proche\n(distance euclidienne)", C.blue],
    ["Update", "Recalcul des centres = moyenne\ndes points du cluster", C.teal],
    ["Convergence", "Répéter jusqu'à ||Δcentres|| < tol\nou maxIter atteint", C.green],
  ];
  algSteps.forEach(([ step, desc, col ], i) => {
    const y = 1.05 + i * 1.08;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 4.3, h: 0.95, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.09 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.28, h: 0.95, fill: { color: col } });
    s.addText(`${i+1}`, { x: 0.35, y: y+0.2, w: 0.28, h: 0.5, fontSize: 16, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(step, { x: 0.7, y: y+0.04, w: 3.8, h: 0.35, fontSize: 13, bold: true, color: col, fontFace: "Calibri", margin: 0 });
    s.addText(desc, { x: 0.7, y: y+0.42, w: 3.8, h: 0.45, fontSize: 11, color: C.dgray, fontFace: "Calibri", margin: 0 });
    if (i < algSteps.length - 1) {
      s.addText("↓", { x: 1.3, y: y+0.95, w: 0.4, h: 0.2, fontSize: 12, color: col, fontFace: "Calibri", align: "center", margin: 0 });
    }
  });

  // Right: dataset info + metrics cards
  s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 1.05, w: 4.6, h: 1.95, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 5, offset: 2, angle: 135, opacity: 0.1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 1.05, w: 4.6, h: 0.42, fill: { color: C.orange } });
  s.addText("Dataset Synthétique (Track A)", { x: 5.08, y: 1.1, w: 4.44, h: 0.32, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  s.addText([
    { text: "• 10 000 points  |  5 features", options: { breakLine: true } },
    { text: "• 3 clusters séparés : loc=(0,0), (10,10), (−10,−10)", options: { breakLine: true } },
    { text: "• StandardScaler : mean=0, std=1", options: { breakLine: true } },
    { text: "• k testé : [2, 3, 4, 5]  |  maxIter=10  |  seed=42", options: {} },
  ], { x: 5.1, y: 1.52, w: 4.4, h: 1.35, fontSize: 11, color: C.dgray, fontFace: "Calibri", margin: 0 });

  // Metrics cards
  const mCards = [
    ["Silhouette", "0.9797", "Qualité clustering\n(max 1.0)", C.green],
    ["Inertie", "739.03", "Compacité intra-\ncluster (WCSS)", C.orange],
    ["Stabilité CV", "0.00%", "5 seeds testés\nVariance nulle", C.teal],
  ];
  mCards.forEach(([label, val, desc, col], i) => {
    const x = 5.0 + i * 1.55;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 3.2, w: 1.45, h: 2.0, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 3.2, w: 1.45, h: 0.1, fill: { color: col } });
    s.addText(val, { x, y: 3.32, w: 1.45, h: 0.65, fontSize: 22, bold: true, color: col, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(label, { x, y: 3.98, w: 1.45, h: 0.3, fontSize: 11, bold: true, color: C.dgray, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(desc, { x, y: 4.32, w: 1.45, h: 0.78, fontSize: 10, color: C.gray, fontFace: "Calibri", align: "center", margin: 0 });
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 15 — Lab 3 Silhouette par k
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 3 — Elbow Method : Choix de k=3");

  // Silhouette bar chart
  s.addChart(pres.charts.BAR, [
    { name: "Silhouette Score", labels: ["k=2", "k=3", "k=4", "k=5"], values: [0.7821, 0.9797, 0.7260, 0.7232] }
  ], {
    x: 0.4, y: 1.0, w: 4.8, h: 3.4, barDir: "col",
    chartColors: [C.blue, C.green, C.orange, C.red],
    chartArea: { fill: { color: "FFFFFF" }, roundedCorners: false },
    catAxisLabelColor: "64748B",
    valAxisLabelColor: "64748B",
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: "1E293B",
    showLegend: false,
    showTitle: true,
    title: "Silhouette Score par k",
    titleFontSize: 13,
    valAxisMaxVal: 1.0,
  });

  // Right insights
  const ins = [
    ["k=3 optimal", "Silhouette = 0.9797\nProche de 1.0 → clusters très bien\nséparés, cohérents avec la structure\ndu dataset synthétique.", C.green],
    ["k=2 insuffisant", "Silhouette = 0.78\nDeux clusters fusionnent des\nstructures différentes.", C.blue],
    ["k≥4 sous-optimal", "Silhouette < 0.73\nSur-segmentation : clusters trop\npetits et moins compacts.", C.orange],
  ];
  ins.forEach(([title, body, col], i) => {
    const y = 1.0 + i * 1.48;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y, w: 4.1, h: 1.35, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y, w: 0.18, h: 1.35, fill: { color: col } });
    s.addText(title, { x: 5.75, y: y+0.05, w: 3.75, h: 0.35, fontSize: 13, bold: true, color: col, fontFace: "Calibri", margin: 0 });
    s.addText(body, { x: 5.75, y: y+0.45, w: 3.75, h: 0.8, fontSize: 11, color: C.dgray, fontFace: "Calibri", margin: 0 });
  });

  s.addText("Justification k-means|| init : évite les minima locaux en sélectionnant des centres bien distribués dès l'initialisation (O(k log k))", { x: 0.4, y: 4.65, w: 9.2, h: 0.55, fontSize: 10, color: C.gray, fontFace: "Calibri", align: "center", margin: 0 });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 16 — Lab 3 Partitioning
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 3 — Partitioning Default vs Optimized");

  // Two columns
  const cols = [
    {
      title: "DEFAULT (12 partitions)", col: C.blue,
      details: ["Partitions: 12 (auto Spark)", "Distribution: RoundRobin", "Shuffle par worker: élevé", "Cache locality: faible", "I/O contention: possible"],
      k3_time: "5750 ms", k3_sil: "0.9797",
    },
    {
      title: "OPTIMIZED (32 partitions)", col: C.green,
      details: ["Partitions: 32 (repartition id)", "Distribution: Hash on id", "Shuffle distribué", "Cache locality: meilleure", "Parallélisme CPU amélioré"],
      k3_time: "3764 ms", k3_sil: "0.9797",
    },
  ];

  cols.forEach((col, i) => {
    const x = 0.35 + i * 5.0;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 0.92, w: 4.5, h: 4.3, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 5, offset: 2, angle: 135, opacity: 0.1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 0.92, w: 4.5, h: 0.45, fill: { color: col.col } });
    s.addText(col.title, { x: x+0.1, y: 0.97, w: 4.3, h: 0.35, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    col.details.forEach((d, j) => {
      s.addText(`• ${d}`, { x: x+0.18, y: 1.45+j*0.48, w: 4.1, h: 0.42, fontSize: 12, color: C.dgray, fontFace: "Calibri", margin: 0 });
    });
    // Stats
    s.addShape(pres.shapes.RECTANGLE, { x: x+0.15, y: 3.72, w: 4.2, h: 1.12, fill: { color: col.col, transparency: 85 } });
    s.addText("k=3  Silhouette: " + col.k3_sil, { x: x+0.25, y: 3.78, w: 4.0, h: 0.4, fontSize: 13, bold: true, color: col.col, fontFace: "Calibri", margin: 0 });
    s.addText("k=3  Temps:       " + col.k3_time, { x: x+0.25, y: 4.2, w: 4.0, h: 0.4, fontSize: 13, bold: true, color: col.col, fontFace: "Calibri", margin: 0 });
  });

  // VS divider
  s.addText("VS", { x: 4.5, y: 2.45, w: 0.5, h: 0.55, fontSize: 18, bold: true, color: C.gray, fontFace: "Calibri", align: "center", margin: 0 });

  // Bottom gain
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.1, w: 9.3, h: 0.42, fill: { color: C.lgreen } });
  s.addText("→  Gain : 3764 vs 5750 ms  =  −34.5% de temps pour k=3  |  Qualité identique (Silhouette 0.9797 dans les deux cas)", { x: 0.5, y: 5.14, w: 9.0, h: 0.34, fontSize: 11, color: C.green, bold: true, fontFace: "Calibri", margin: 0 });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 17 — Lab 3 Practice vs Assignment
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Lab 3 — Practice vs Assignment : Différences clés");

  const diffs = [
    ["Dataset", "5 000 pts\n5 features héros\n(win_rate, kda...)", "10 000 pts\n5 features génériques\n(feature_0...4)"],
    ["Algorithmes", "KMeans + BisectingKMeans\nK: 3, 5, 8", "KMeans seul\nK: 2, 3, 4, 5"],
    ["Silhouette Max", "0.8234 (k=3)", "0.9797 (k=3)"],
    ["Partitioning", "8 → 32  (−17.8%)", "12 → 32  (−34.5%)"],
    ["Shuffle", "~52 MB → ~42 MB\n(−19.2%)", "Non mesuré\n(focus temps CPU)"],
    ["Seed Stability", "CV = 0.13%\n5 seeds 42-46", "CV = 0.00%\nClusters parfaitement séparés"],
  ];

  const headers = ["Aspect", "Practice", "Assignment"];
  const tableData = [
    headers.map((h, i) => ({ text: h, options: { bold: true, color: C.white, fill: { color: i===0?C.navy:i===1?C.teal:C.orange }, fontSize: 12 } })),
    ...diffs.map(row => row.map((cell, i) => ({ text: cell, options: { fontSize: 10, color: C.dgray } })))
  ];
  s.addTable(tableData, { x: 0.35, y: 1.0, w: 9.3, h: 4.1, border: { pt: 0.5, color: C.lgray }, fill: { color: C.white }, colW: [2.0, 3.65, 3.65] });

  s.addText("Les deux tracés valident k=3 comme optimal — le dataset assignment est plus facile (clusters plus espacés) → silhouette plus élevée.", { x: 0.35, y: 5.2, w: 9.3, h: 0.3, fontSize: 10, color: C.gray, fontFace: "Calibri", align: "center", margin: 0 });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 18 — Récapitulatif Global
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Récapitulatif Global — Labs 0 à 3");

  const labs = [
    { lab: "Lab 0", titre: "Setup", result: "Env validé\nSpark 4.0.1 OK", outils: "Spark · Parquet · CSV", score: "✓", col: C.teal },
    { lab: "Lab 1", titre: "Streaming", result: "Pipeline fonctionnel\nWatermark + Window", outils: "readStream · writeStream\ncheckpoint", score: "✓", col: C.blue },
    { lab: "Lab 2", titre: "Index Inversé", result: "28 tokens uniques\n242 ms avg latency", outils: "groupBy · collect_list\nParquet vs CSV", score: "✓", col: C.purple },
    { lab: "Lab 3", titre: "Clustering", result: "k=3 Silhouette=0.9797\n−34.5% avec 32 parts", outils: "KMeans · StandardScaler\nClusteringEvaluator", score: "✓", col: C.orange },
  ];

  labs.forEach((l, i) => {
    const y = 1.0 + i * 1.12;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 1.0, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.08 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 1.2, h: 1.0, fill: { color: l.col } });
    s.addText(l.lab, { x: 0.35, y: y+0.06, w: 1.2, h: 0.42, fontSize: 16, bold: true, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(l.titre, { x: 0.35, y: y+0.52, w: 1.2, h: 0.38, fontSize: 12, color: C.white, fontFace: "Calibri", align: "center", margin: 0 });
    s.addText(l.result, { x: 1.65, y: y+0.1, w: 2.8, h: 0.82, fontSize: 12, bold: true, color: l.col, fontFace: "Calibri", margin: 0 });
    s.addText(l.outils, { x: 4.55, y: y+0.1, w: 4.4, h: 0.82, fontSize: 11, color: C.gray, fontFace: "Calibri", margin: 0 });
    s.addText(l.score, { x: 9.2, y: y+0.2, w: 0.4, h: 0.6, fontSize: 22, color: C.green, fontFace: "Calibri", align: "center", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 5.5, w: 9.3, h: 0.0, fill: { color: C.lgray } });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 19 — Problèmes & Solutions
// ══════════════════════════════════════════════════════════════
{
  const s = contentSlide(pres, "Problèmes Rencontrés & Solutions");

  const issues = [
    {
      lab: "Lab 1",
      prob: "UUID non sérialisable en JSON lors\nde la capture des métriques lastProgress",
      sol: "Fonction convert_to_serializable() récursive\npour convertir UUID → str avant json.dump()",
      col: C.blue
    },
    {
      lab: "Lab 2",
      prob: "CSV datasource ne supporte pas\nle type ARRAY (collect_list → UDT Vector)",
      sol: "F.concat_ws(',', doc_ids) avant l'écriture CSV\n— array sérialisé comme string pipe-séparé",
      col: C.purple
    },
    {
      lab: "Lab 3",
      prob: "computeCost() absent dans Spark 4\npour calculer l'inertie (WCSS)",
      sol: "Fonction custom calculate_inertia() via RDD:\nbroadcast des centres + sum(dist²) par point",
      col: C.orange
    },
    {
      lab: "Lab 3",
      prob: "Sérialisation colonnes Vector incompatibles\navec certains formats de sortie",
      sol: "Sauvegarde uniquement id + prediction en Parquet\n— features Vector exclues du sink final",
      col: C.teal
    },
  ];

  issues.forEach((issue, i) => {
    const y = 0.92 + i * 1.15;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 9.3, h: 1.05, fill: { color: C.white }, shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.08 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.22, h: 1.05, fill: { color: issue.col } });
    s.addText(issue.lab, { x: 0.62, y: y+0.04, w: 1.0, h: 0.38, fontSize: 12, bold: true, color: issue.col, fontFace: "Calibri", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 1.55, y: y+0.1, w: 3.65, h: 0.85, fill: { color: C.lorange, transparency: 30 } });
    s.addText("⚠ Problème", { x: 1.6, y: y+0.1, w: 3.55, h: 0.3, fontSize: 10, bold: true, color: C.red, fontFace: "Calibri", margin: 0 });
    s.addText(issue.prob, { x: 1.62, y: y+0.4, w: 3.52, h: 0.5, fontSize: 10, color: C.dgray, fontFace: "Calibri", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: y+0.1, w: 4.28, h: 0.85, fill: { color: C.lgreen, transparency: 30 } });
    s.addText("✓ Solution", { x: 5.35, y: y+0.1, w: 4.18, h: 0.3, fontSize: 10, bold: true, color: C.green, fontFace: "Calibri", margin: 0 });
    s.addText(issue.sol, { x: 5.37, y: y+0.4, w: 4.16, h: 0.5, fontSize: 10, color: C.dgray, fontFace: "Calibri", margin: 0 });
  });
}

// ══════════════════════════════════════════════════════════════
// SLIDE 20 — Conclusion
// ══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 0, w: 2.5, h: 5.625, fill: { color: C.blue, transparency: 75 } });

  s.addText("Conclusion", { x: 0.6, y: 0.4, w: 7.5, h: 0.8, fontSize: 36, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  s.addText("4 labs · 2 tracks (Practice + Assignment) · Apache Spark 4.0.1", { x: 0.6, y: 1.2, w: 7.5, h: 0.4, fontSize: 15, color: C.sky, fontFace: "Calibri", margin: 0 });

  const kws = [
    ["Structured Streaming", "Watermark · Window · Exactly-once"],
    ["Inverted Index", "Tokenization · Parquet vs CSV"],
    ["Spark ML KMeans", "k=3 optimal · Silhouette 0.9797"],
    ["Partitioning", "−34% temps · Qualité préservée"],
  ];
  kws.forEach(([kw, sub], i) => {
    const x = 0.55 + (i % 2) * 4.7;
    const y = 1.85 + Math.floor(i / 2) * 1.25;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.4, h: 1.1, fill: { color: C.blue, transparency: 75 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.16, h: 1.1, fill: { color: C.sky } });
    s.addText(kw, { x: x+0.26, y: y+0.08, w: 4.05, h: 0.42, fontSize: 15, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    s.addText(sub, { x: x+0.26, y: y+0.52, w: 4.05, h: 0.48, fontSize: 12, color: C.sky, fontFace: "Calibri", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.2, w: 10, h: 0.425, fill: { color: C.blue, transparency: 50 } });
  s.addText("Bibawandaogo — Data Engineering II — ESIEE Paris 2025-2026  |  Track A · Esports", { x: 0.5, y: 5.23, w: 9, h: 0.35, fontSize: 11, color: C.sky, fontFace: "Calibri", align: "center", margin: 0 });
}

// ── WRITE ──────────────────────────────────────────────────────
const outPath = "/home/bibawandaogo/Data_Engineering2/DE2_Labs_Presentation.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log(" Written:", outPath))
  .catch(e => console.error("❌", e));