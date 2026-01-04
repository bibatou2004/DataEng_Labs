# DE1 — Final Project Report: Local Lakehouse (Wikipedia Clickstream)

**Author:** Youcef GUEDIRI and Abibatou WANDAOGO
**Date:** 03/01/2026
**Course:** Data Engineering I (ESIEE 2025)

---

## 1. Use-case and Dataset

**Problem Statement:**
This project aims to build a high-performance local Lakehouse to analyze web traffic trends using the **Wikipedia Clickstream** dataset. The goal is to answer business questions (e.g., "Top visited articles") efficiently on a single machine environment.

**Dataset:**
- **Source:** Wikipedia Clickstream (English, January 2024).
- **Volume:** ~25-30 Million rows (estimated from raw size).
- **Schema:** `prev` (referrer), `curr` (article), `type` (link type), `n` (click count).
- **Format:** Raw TSV compressed (.gz).

## 2. System and SLOs

**Environment:**
- **OS:** WSL2 (Ubuntu 24.04) on Windows.
- **Spark:** PySpark 4.0.0-preview1.
- **Hardware:** Local Machine (Allocated via `local[*]`).

**Service Level Objectives (SLOs):**
1.  **Freshness:** Gold tables updated ≤ 2 hours after data landing. (Achieved: pipeline runs in < 2 minutes).
2.  **Latency:** Analytical query (Q1) ≤ 9 seconds on local hardware.
3.  **Efficiency:** Optimize storage via Parquet compression.

## 3. Lakehouse Design (Medallion Architecture)

The pipeline follows a Bronze-Silver-Gold architecture:

- **Bronze (Landing):**
    - Raw ingestion of TSV files.
    - **Schema:** `prev` (String), `curr` (String), `type` (String), `n` (String).
    - **Storage:** Parquet (Overwrite mode).
- **Silver (Cleaning & Enforcement):**
    - **Transformations:** Cast column `n` to Integer. Filter `n > 0`. Drop rows with NULLs in critical columns.
    - **Storage:** Parquet.
- **Gold (Analytics):**
    - **Aggregation:** Group by `curr`, Sum `n`.
    - **Optimization:** Partition tuning and ordering.

## 4. Physical Design & Optimization Strategy

**Baseline Configuration:**
Spark's default `spark.sql.shuffle.partitions` is set to **200**. For a local dataset of this size (< 1GB Parquet), this creates too many small tasks (overhead) and small files (fragmentation).

**Optimized Configuration:**
1.  **Shuffle Partitions:** Reduced to **12**. This aligns better with the local core count and data volume, reducing task scheduling overhead.
2.  **Projection:** Selecting only necessary columns before aggregation.

## 5. Evidence and Metrics

Metrics were recorded using `time.time()` and validated via Spark UI.

| Layer / Query | Strategy | Duration (s) | Notes |
| :--- | :--- | :--- | :--- |
| **Bronze** | Raw Ingest | ~64.1 s | IO bound (Reading Gzip TSV) |
| **Silver** | Clean & Cast | ~10.9 s | Fast (Parquet Read) |
| **Gold Q1 (Baseline)** | Default (200 partitions) | **9.44 s** | High scheduling overhead |
| **Gold Q1 (Optimized)**| Tuned (12 partitions) | **5.38 s** | **~43% Performance Gain** |

**Evidence:**
- Physical plans for Baseline and Optimized runs are stored in `proof/*.txt`.
- Spark UI screenshots (`proof/spark_ui_*.png`) confirm the DAG structure and execution times.

## 6. Results and Limits

**Conclusion:**
By tuning the `shuffle.partitions` parameter, we achieved a **43% reduction in latency** (from 9.44s to 5.38s), meeting the SLO (< 9s).

**Limitations & Future Work:**
- **Single Node:** The current setup is limited by local RAM/CPU.
- **Partitioning:** We did not implement `partitionBy("date")` as the dataset covers only one month. For multi-month data, partitioning by date would be mandatory for pruning.