# ⚡ Optimisation des Requêtes Spark

## Catalyst Optimizer

### 1. Logical Optimization
- Predicate Pushdown
- Constant Folding
- Expression Simplification

### 2. Physical Optimization
- Join Reordering
- Partition Pruning
- Column Pruning

## Exemple d'Optimisation

### Requête Non-Optimisée
```python
df = spark.read.csv("big_file.csv")
df_filtered = df.filter(F.col("age") > 25)
df_selected = df_filtered.select("name", "age")
result = df_selected.collect()
```

### Plan d'Exécution (avant)
```
Collect
  └─ Project [name, age]
      └─ Filter age > 25
          └─ Read CSV
```

### Plan Optimisé (après)
```
Collect
  └─ Project [name, age]
      └─ Filter age > 25
          └─ Read CSV
              └─ Column Pruning [id, name, age]
```

## Conseils de Performance

### 1. Partitionnement
```python
# Écrit partitionné
df.write.partitionBy("year").parquet("output")

# Lecture rapide
spark.read.parquet("output").filter(
    F.col("year") == 2024
).show()
```

### 2. Caching
```python
df.cache()  # Cache en mémoire
df.count()  # Force le cache
```

### 3. Repartition
```python
# Trop de partitions (overhead)
df.repartition(100)

# Trop peu (lent)
df.repartition(2)

# Optimal (généralement)
df.repartition(200)
```

