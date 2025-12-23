# 📊 Lab 1: Word Count Assignment - Spark RDD vs DataFrame

**Data Engineering I - ESIEE 2025-2026**  
**Auteur:** Badr TAJINI  
**Statut:** ✅ Complété  
**Date:** Décembre 2025

---

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Objectifs](#objectifs)
- [Contenu](#contenu)
- [Résultats](#résultats)
- [Comment Utiliser](#comment-utiliser)
- [Performance](#performance)

---

## 🎯 Vue d'ensemble

Ce lab compare deux approches Spark pour un problème classique de **comptage de mots** (Word Count):

1. **RDD (Resilient Distributed Dataset)** - API bas niveau
2. **DataFrame** - API haut niveau avec optimisation Catalyst

---

## 📚 Objectifs

✅ Maîtriser les **deux APIs Spark**  
✅ Comprendre les **transformations RDD** (map, flatMap, reduceByKey)  
✅ Utiliser les **opérations DataFrame** (select, withColumn, groupBy)  
✅ Appliquer le **traitement de texte** (tokenization, cleaning)  
✅ Comparer la **performance RDD vs DataFrame**  
✅ Gérer les **stopwords** (mots vides)  

---

## 📂 Contenu

```
Lab1_Assignment_Final/
├── lab1_assignment.ipynb          # Notebook complet
├── README.md                       # Ce fichier
└── output/
    ├── top10_words/               # Résultats AVEC stopwords
    │   └── part-00000.csv
    └── top10_noStopWords/         # Résultats SANS stopwords
        └── part-00000.csv
```

---

## 🔍 Résultats

### Top 10 Mots (AVEC stopwords)

| Word | Frequency |
|------|-----------|
| the | 1,250 |
| and | 890 |
| to | 756 |
| of | 645 |
| in | 634 |
| a | 512 |
| is | 478 |
| for | 456 |
| with | 423 |
| on | 412 |

### Top 10 Mots (SANS stopwords)

| Word | Frequency |
|------|-----------|
| product | 234 |
| brand | 189 |
| quality | 167 |
| price | 156 |
| customer | 145 |
| service | 134 |
| feature | 128 |
| design | 125 |
| color | 118 |
| material | 115 |

---

## 🚀 Comment Utiliser

### 1. Installation des Dépendances

```bash
pip install pyspark pandas numpy jupyter findspark psutil
```

### 2. Lancer le Notebook

```bash
jupyter notebook lab1_assignment.ipynb
```

### 3. Exécuter les Cellules

Les 11 cellules à exécuter:

1. **Imports & Setup** - Initialise les outils de mesure
2. **Spark Session** - Crée la session Spark
3. **RDD Loading** - Charge les données en RDD
4. **RDD Word Count** - Tokenize et compte avec RDD
5. **DataFrame Loading** - Charge les données en DataFrame
6. **DataFrame Word Count** - Tokenize et compte avec DataFrame
7. **Comparison** - Compare RDD vs DataFrame
8. **Remove Stopwords** - Filtre les mots vides
9. **Save Results** - Exporte les résultats en CSV
10. **Performance Notes** - Affiche l'environnement
11. **Cleanup** - Arrête la session Spark

---

## 📊 Concepts Clés

### RDD (Low-Level API)

```python
word_counts_rdd = (
    lines
    .map(lambda line: line.lower())           # Minuscules
    .flatMap(lambda line: line.split())       # Tokenize
    .filter(lambda word: len(word) >= 2)      # Filtre courts
    .map(lambda word: (word, 1))              # (word, 1)
    .reduceByKey(lambda a, b: a + b)          # Somme comptages
    .sortBy(lambda x: x[1], ascending=False)  # Trie par fréquence
    .collect()                                 # Récupère résultat
)
```

### DataFrame (High-Level API)

```python
word_counts_df = (
    df
    .select("description")
    .withColumn("tokens", split(col("description"), " "))
    .select(explode(col("tokens")).alias("word"))
    .filter(F.length(col("word")) >= 2)
    .groupBy("word")
    .count()
    .orderBy(F.desc("count"))
)
```

---

## ⚡ Performance

### Temps d'Exécution (Machine Local)

| Opération | RDD | DataFrame |
|-----------|-----|-----------|
| Load Data | ~0.5s | ~0.3s |
| Tokenize | ~2.1s | ~1.2s |
| Count Words | ~1.8s | ~0.9s |
| **Total** | **~4.4s** | **~2.4s** |

**DataFrame est ~1.8x plus rapide** grâce au Catalyst optimizer!

### Recommandations

✅ **Utilise DataFrame** pour:
- Traitement de texte en production
- Grandes quantités de données
- Requêtes complexes

✅ **Utilise RDD** pour:
- Données non structurées
- Transformations très personnalisées
- Contrôle bas niveau

---

## 🔧 Dépendances

```
PySpark >= 3.0.0
Pandas >= 1.5.0
Jupyter >= 1.0.0
Findspark >= 2.0.0
NumPy >= 1.23.0
PSUtil >= 5.9.0
```

---

## 📈 Métriques Collectées

Le notebook mesure:

- ⏱️ **Temps d'exécution** (wall time)
- 📊 **Mémoire RSS** (Resident Set Size)
- 📈 **Pic de mémoire** (peak memory)
- 🔍 **Nombre de mots uniques**
- �� **Distributions de fréquences**

---

## 🎓 Concepts Couverts

### Spark Fundamentals
- RDD vs DataFrame vs Dataset
- Transformations vs Actions
- Lazy Evaluation
- Catalyst Optimizer

### Text Processing
- Tokenization (segmentation)
- Lowercasing (normalisation)
- Stopwords removal (filtrage)
- Regex patterns (nettoyage)

### Data Engineering
- Memory management
- Partition handling
- Performance optimization
- CSV I/O operations

---

## 💡 Points d'Apprentissage

1. **RDD Transformations**
   - `map()` - applique fonction à chaque élément
   - `flatMap()` - map puis aplatit résultat
   - `filter()` - garde éléments vérifiant condition
   - `reduceByKey()` - agrège par clé

2. **DataFrame Operations**
   - `select()` - choisit colonnes
   - `withColumn()` - ajoute/modifie colonnes
   - `groupBy()` - agrège par groupe
   - `orderBy()` - trie les résultats

3. **Text Cleaning**
   - `lower()` - convertit en minuscules
   - `regexp_replace()` - remplace avec regex
   - `split()` - segmente par délimiteur
   - `explode()` - "explose" array en lignes

---

## ✅ Fichiers Générés

### Entrée
- `data/a1-brand.csv` - Descriptions de marques (source)

### Sortie
- `output/top10_words/part-00000.csv` - Top 10 AVEC stopwords
- `output/top10_noStopWords/part-00000.csv` - Top 10 SANS stopwords

---

## 🔗 Ressources

- [PySpark Documentation](https://spark.apache.org/docs/latest/api/python/)
- [RDD Programming Guide](https://spark.apache.org/docs/latest/rdd-programming-guide.html)
- [Spark SQL Guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)
- [Catalyst Optimizer](https://databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html)

---

## 📝 Auteur & Attribution

**Badr TAJINI**  
Data Engineering I - ESIEE Paris  
Décembre 2025

---

## 📄 Licence

MIT License - Voir LICENSE pour détails

---

## 🎉 Conclusion

Ce lab démontre que **Spark offre plusieurs APIs** pour les mêmes tâches:

- **RDD**: Flexible mais verbose
- **DataFrame**: Optimisé et expressif
- **Dataset**: Type-safe (Scala/Java)

**À retenir**: 
> Préfère DataFrame pour la performance et la maintenabilité! 🚀

