# 📚 Concepts Fondamentaux de Spark

## 1. RDD (Resilient Distributed Dataset)

### Caractéristiques
- Abstraction bas niveau
- Immuable et distribué
- Tolérant aux pannes
- Pas de schéma

### Exemple
```python
rdd = sc.parallelize([1, 2, 3, 4, 5])
result = rdd.map(lambda x: x * 2).collect()
# Output: [2, 4, 6, 8, 10]
```

---

## 2. DataFrame

### Caractéristiques
- Abstraction haut niveau
- Structure tabulaire (SQL-like)
- Schéma typé
- Optimisé par Catalyst

### Exemple
```python
df = spark.createDataFrame(
    [(1, "Alice"), (2, "Bob")],
    ["id", "name"]
)
df.show()
```

---

## 3. Transformations

### Définition
Opérations qui créent un nouveau DataFrame/RDD sans l'exécuter immédiatement.

### Types
- Narrow: map, filter (pas de shuffle)
- Wide: groupBy, join (avec shuffle)

### Exemples
```python
# Narrow
df.filter(F.col("age") > 25)
df.map(lambda x: x * 2)

# Wide
df.groupBy("city").count()
df.join(other_df, "id")
```

---

## 4. Actions

### Définition
Opérations qui retournent des résultats au driver ou écrivent sur disque.

### Exemples
```python
df.count()              # Retourne un nombre
df.show()               # Affiche les résultats
df.collect()            # Retourne un tableau
df.write.parquet(path)  # Écrit sur disque
```

---

## 5. DAG (Directed Acyclic Graph)

### Structure
```
[Source] → [Transform 1] → [Transform 2] → [Action]
```

### Exemple
```python
df = spark.read.csv("data.csv")
df2 = df.filter(F.col("age") > 25)
df3 = df2.groupBy("city").count()
result = df3.show()  # DAG exécuté ici

# DAG:
# Read CSV → Filter → GroupBy → Show
```

