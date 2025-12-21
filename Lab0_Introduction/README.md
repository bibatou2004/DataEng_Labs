# 🚀 Lab 0: Introduction à Apache Spark et PySpark

**Data Engineering I - ESIEE 2025-2026**  
**Auteur:** Badr TAJINI  
**Statut:** ✅ Complété  
**Dernière mise à jour:** Décembre 2025

---

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Objectifs Pédagogiques](#objectifs-pédagogiques)
- [Concepts Clés](#concepts-clés)
- [Architecture Spark](#architecture-spark)
- [Installation](#installation)
- [Démarrage Rapide](#démarrage-rapide)
- [Exercices Pratiques](#exercices-pratiques)
- [Ressources](#ressources)

---

## 📊 Vue d'ensemble

**Lab 0** est une **introduction pratique** à Apache Spark et PySpark, couvrant:

✅ Configuration de l'environnement Spark  
✅ Création et manipulation de DataFrames  
✅ Opérations SQL et opérations RDD  
✅ Transformations et Actions  
✅ Optimisation des requêtes  
✅ Sauvegarde et chargement de données  

---

## 🎯 Objectifs Pédagogiques

### 1. Comprendre l'Architecture Spark
- Master-Worker model
- DAG (Directed Acyclic Graph)
- Exécution distribuée

### 2. Maîtriser les DataFrames
- Création et chargement
- Transformations (filter, map, join)
- Actions (count, show, collect)

### 3. Optimiser les Requêtes
- Catalyst optimizer
- Query plans
- Partition pruning

### 4. Manipuler les Données
- CSV, JSON, Parquet
- SQL queries
- Agrégations

---

## 🔧 Concepts Clés

### Spark vs PySpark

| Aspect | Spark | PySpark |
|--------|-------|---------|
| **Langage** | Scala (natif) | Python (wrapper) |
| **Performance** | Plus rapide | Légèrement plus lent |
| **Facilité** | Modéré | Très facile |
| **Usage** | Production | Data Science |

### RDD vs DataFrame

| Concept | RDD | DataFrame |
|---------|-----|-----------|
| **Abstraction** | Low-level | High-level |
| **Structure** | Pas de schéma | Schéma typé |
| **Performance** | Lent | Rapide (Catalyst) |
| **Usage** | Données non structurées | Données structurées |

### Transformations vs Actions

**Transformations** (Lazy):
```python
df.filter(F.col("age") > 18)          # Pas exécuté immédiatement
df.map(lambda x: x * 2)                # Pas exécuté immédiatement
df.join(other_df, "id")                # Pas exécuté immédiatement
```

**Actions** (Eager):
```python
df.count()                              # EXÉCUTÉ immédiatement
df.show()                               # EXÉCUTÉ immédiatement
df.collect()                            # EXÉCUTÉ immédiatement
df.write.parquet(path)                  # EXÉCUTÉ immédiatement
```

### DAG (Directed Acyclic Graph)

```
Opérations Spark → DAG → Spark Scheduler → Tasks sur Workers

Exemple:
df.filter(age > 18)
  .groupBy("city")
  .count()
  
DAG:
[CSV File] → [Filter] → [GroupBy] → [Count] → [Result]
```

---

## 🏗️ Architecture Spark

### Cluster Architecture

```
┌──────────────────────────────────────────────────┐
│           SPARK CLUSTER                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────────────────────────┐        │
│  │        Driver Program                │        │
│  │  (SparkContext, SparkSession)       │        │
│  └────────────┬────────────────────────┘        │
│               │                                  │
│               │ Task Distribution                │
│               ▼                                  │
│  ┌─────────┬─────────┬─────────┐              │
│  │ Executor│ Executor│ Executor│ (Workers)    │
│  │ JVM 1   │ JVM 2   │ JVM N   │              │
│  │         │         │         │              │
│  │ Task 1  │ Task 5  │ Task 9  │              │
│  │ Task 2  │ Task 6  │ Task 10 │              │
│  │ Task 3  │ Task 7  │ Task 11 │              │
│  │ Task 4  │ Task 8  │ Task 12 │              │
│  └────┬────┴────┬────┴────┬────┘              │
│       │         │         │                    │
│       └────┬────┴────┬────┘                    │
│            ▼         ▼                         │
│         [Shuffle] [Results]                    │
│                                                │
└──────────────────────────────────────────────────┘
```

### Execution Model

```
1. DAG Construction (Lazy)
   ↓
2. Stage Breakdown (par Shuffle boundaries)
   ↓
3. Task Generation (une par partition)
   ↓
4. Scheduler Distribution (à Workers)
   ↓
5. Execution (en parallèle)
   ↓
6. Result Collection (au Driver)
```

---

## 💻 Installation

### Prérequis

```bash
# Python 3.8+
python --version

# Java 8+
java -version

# Scala (optionnel)
scala -version
```

### Installation PySpark

```bash
# Méthode 1: pip
pip install pyspark

# Méthode 2: conda
conda install pyspark -c conda-forge

# Méthode 3: source (advanced)
# Télécharge depuis https://spark.apache.org/downloads.html
```

### Vérification de l'Installation

```python
from pyspark.sql import SparkSession
from pyspark import __version__ as spark_version

print(f"PySpark version: {spark_version}")

spark = SparkSession.builder.appName("test").getOrCreate()
print(f"Spark {spark.version} initialisé avec succès!")

# Arrête la session
spark.stop()
```

---

## 🚀 Démarrage Rapide

### 1. Créer une SparkSession

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("Mon App Spark") \
    .master("local[*]") \
    .config("spark.driver.memory", "4g") \
    .getOrCreate()

print(f"✅ Spark {spark.version} initialisé")
```

### 2. Créer un DataFrame

```python
# À partir d'une liste
data = [
    ("Alice", 25, "Paris"),
    ("Bob", 30, "Lyon"),
    ("Charlie", 35, "Marseille")
]
columns = ["name", "age", "city"]

df = spark.createDataFrame(data, columns)
df.show()
```

**Output:**
```
+-------+---+---------+
|name   |age|city     |
+-------+---+---------+
|Alice  |25 |Paris    |
|Bob    |30 |Lyon     |
|Charlie|35 |Marseille|
+-------+---+---------+
```

### 3. Charger des Données

```python
# CSV
df_csv = spark.read.option("header", "true").csv("data.csv")

# Parquet
df_parquet = spark.read.parquet("data.parquet")

# JSON
df_json = spark.read.json("data.json")

# Affiche le schéma
df_csv.printSchema()
```

### 4. Manipuler les Données

```python
from pyspark.sql import functions as F

# Filter
df_age = df.filter(F.col("age") > 25)

# Select
df_names = df.select("name", "city")

# GroupBy
df_group = df.groupBy("city").count()

# Join
df_joined = df.join(other_df, "id")

# Affiche les résultats
df_age.show()
```

### 5. Sauvegarder les Données

```python
# Parquet (recommandé)
df.write.mode("overwrite").parquet("output/data.parquet")

# CSV
df.write.mode("overwrite").option("header", "true").csv("output/data.csv")

# JSON
df.write.mode("overwrite").json("output/data.json")
```

---

## 📚 Exercices Pratiques

### Exercice 1: Chargement et Affichage

```python
# 1. Crée un DataFrame avec 5 utilisateurs
data = [
    (1, "Alice", 25),
    (2, "Bob", 30),
    (3, "Charlie", 35),
    (4, "Diana", 28),
    (5, "Eve", 32)
]
df = spark.createDataFrame(data, ["id", "name", "age"])

# 2. Affiche le contenu
df.show()

# 3. Affiche le schéma
df.printSchema()

# 4. Affiche les statistiques
df.describe().show()
```

**Résultat attendu:**
```
+---+-------+---+
|id |name   |age|
+---+-------+---+
|1  |Alice  |25 |
|2  |Bob    |30 |
|3  |Charlie|35 |
|4  |Diana  |28 |
|5  |Eve    |32 |
+---+-------+---+

root
 |-- id: long (nullable = true)
 |-- name: string (nullable = true)
 |-- age: long (nullable = true)

+-------+---+-------+
|summary|id |age    |
+-------+---+-------+
|count  |5  |5      |
|mean   |3.0|30.0   |
|stddev |1.58|4.12  |
|min    |1  |25     |
|max    |5  |35     |
+-------+---+-------+
```

---

### Exercice 2: Transformations de Base

```python
from pyspark.sql import functions as F

# Filtre: âge > 28
df_filtered = df.filter(F.col("age") > 28)
print("Utilisateurs avec âge > 28:")
df_filtered.show()

# Select: seulement nom et âge
df_selected = df.select("name", "age")
print("Nom et âge:")
df_selected.show()

# WithColumn: ajoute colonne
df_with_age_category = df.withColumn(
    "age_category",
    F.when(F.col("age") < 30, "Jeune").otherwise("Senior")
)
print("Avec catégorie d'âge:")
df_with_age_category.show()

# Distinct: valeurs uniques
df_distinct = df.select("age").distinct()
print("Âges uniques:")
df_distinct.show()
```

---

### Exercice 3: Agrégations

```python
from pyspark.sql import functions as F

# Count par catégorie
df_with_category = df.withColumn(
    "category",
    F.when(F.col("age") < 30, "Young").otherwise("Old")
)

print("Nombre par catégorie:")
df_with_category.groupBy("category").count().show()

# Statistiques d'âge
print("Statistiques d'âge:")
df.agg(
    F.count("age").alias("count"),
    F.avg("age").alias("average"),
    F.min("age").alias("min"),
    F.max("age").alias("max"),
    F.stddev("age").alias("stddev")
).show()
```

---

### Exercice 4: Requêtes SQL

```python
# Crée une vue temporaire
df.createOrReplaceTempView("users")

# Requête SQL
result = spark.sql("""
    SELECT name, age,
           CASE 
               WHEN age < 30 THEN 'Young'
               WHEN age < 40 THEN 'Middle'
               ELSE 'Senior'
           END as age_group
    FROM users
    WHERE age > 25
    ORDER BY age DESC
""")

print("Résultat SQL:")
result.show()
```

---

### Exercice 5: Joins

```python
# DataFrame 1: utilisateurs
users = spark.createDataFrame([
    (1, "Alice"),
    (2, "Bob"),
    (3, "Charlie")
], ["id", "name"])

# DataFrame 2: villes
cities = spark.createDataFrame([
    (1, "Paris"),
    (2, "Lyon"),
    (4, "Nice")
], ["id", "city"])

# Inner Join (seulement matches)
print("Inner Join:")
users.join(cities, "id", "inner").show()
# Output: Alice-Paris, Bob-Lyon

# Left Join (tous les users)
print("\nLeft Join:")
users.join(cities, "id", "left").show()
# Output: Alice-Paris, Bob-Lyon, Charlie-NULL

# Full Outer Join (tout)
print("\nFull Outer Join:")
users.join(cities, "id", "outer").show()
# Output: Alice-Paris, Bob-Lyon, Charlie-NULL, NULL-Nice
```

---

## 📊 Optimisation des Requêtes

### Catalyst Optimizer

Spark optimise automatiquement les requêtes:

```python
# Requête non optimisée (explicite)
df1 = spark.read.csv("big_file.csv")
df2 = df1.filter(F.col("age") > 25)
df3 = df2.select("name")
result = df3.collect()

# Spark convertit internement en:
# 1. Lit le CSV
# 2. Filtre sur age > 25 (Predicate Pushdown)
# 3. Sélectionne seulement 'name' (Column Pruning)
# 4. Collecte les résultats

# Résultat: Lecture + Filtrage + Projection = Optimale
```

### Plans d'Exécution

```python
# Affiche le plan d'exécution
df.filter(F.col("age") > 25).explain(mode="formatted")

# Output:
# ─ Filter
#    ├─ Condition: age > 25
#    └─ Read CSV
#       └─ Column Pruning: [id, name, age]
```

---

## 🔍 Debugging et Monitoring

### Logs

```python
import logging

# Configure les logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("Starting Spark application")
logger.debug(f"DataFrame count: {df.count()}")
logger.warning("Large dataset, consider partitioning")
```

### Spark UI

```python
# Le Spark UI est disponible à:
# http://localhost:4040

# Affiche les stages, tasks, et performance
# Accessible pendant et après l'exécution
```

---

## 📁 Structure du Projet

```
Lab0_Introduction/
│
├── 📓 notebooks/
│   ├── 01_Introduction.ipynb
│   ├── 02_DataFrames.ipynb
│   ├── 03_Transformations.ipynb
│   ├── 04_SQL.ipynb
│   ├── 05_Optimizations.ipynb
│   └── 06_Exercises.ipynb
│
├── 📊 donnees/
│   ├── entrees/
│   │   ├── users.csv
│   │   ├── products.csv
│   │   └── orders.json
│   │
│   └── sorties/
│       ├── results.parquet
│       └── summary.csv
│
├── 📚 docs/
│   ├── CONCEPTS.md
│   ├── ARCHITECTURE.md
│   ├── OPTIMIZATION.md
│   └── TROUBLESHOOTING.md
│
├── scripts/
│   ├── run_examples.sh
│   └── setup.sh
│
├── proof/
│   ├── exercise_outputs.txt
│   └── performance_metrics.csv
│
├── README.md (EN FRANÇAIS)
├── requirements.txt
└── .gitignore
```

---

## 📦 Dépendances

```
pyspark>=3.0.0
pandas>=1.5.0
numpy>=1.23.0
jupyter>=1.0.0
findspark>=2.0.0
```

Installation:
```bash
pip install -r requirements.txt
```

---

## 🎓 Ressources

### Documentation Officielle
- [Apache Spark Documentation](https://spark.apache.org/docs/latest/)
- [PySpark API](https://spark.apache.org/docs/latest/api/python/)
- [Spark SQL Guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)

### Tutoriels
- [Spark by Examples](https://sparkbyexamples.com/)
- [Databricks Academy](https://academy.databricks.com/)
- [Learn Spark](https://developer.ibm.com/tutorials/spark-101/)

### Livres
- "Learning Spark" - Jules S. Damji et al.
- "Spark: The Definitive Guide" - Bill Chambers et al.

---

## 💡 Conseils et Bonnes Pratiques

### 1. Arrête les Sessions Properly
```python
try:
    # Ton code Spark
    pass
finally:
    spark.stop()
```

### 2. Utilise des DataFrames, Pas des RDDs
```python
# ✅ BON (DataFrame)
df.filter(F.col("age") > 25).show()

# ❌ MAUVAIS (RDD)
rdd = df.rdd.filter(lambda x: x["age"] > 25).collect()
```

### 3. Évite les Actions Coûteuses
```python
# ❌ MAUVAIS: 2 actions
count = df.count()
results = df.collect()

# ✅ BON: 1 action
results = df.collect()
count = len(results)
```

### 4. Partitionne les Données Grandes
```python
# Écrit partitionné pour requêtes rapides
df.write.partitionBy("year", "month").parquet("output/data")

# Requête rapide (ne lit que year=2024/month=12/)
spark.read.parquet("output/data").filter(
    (F.col("year") == 2024) & (F.col("month") == 12)
).show()
```

---

## 📝 Licence

MIT License - Voir [LICENSE](../LICENSE)

---

## 👨‍🎓 Auteur

**Badr TAJINI**  
Data Engineering I - ESIEE 2025-2026

---

**Dernière mise à jour:** Décembre 2025  
**Statut:** ✅ Complété  
**Version de Spark:** 3.0+  
**Version de Python:** 3.8+
