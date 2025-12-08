# Lab 2: Entrepôt de Données - Schéma en Étoile

## 🎯 Objectif

Construction d'un **Data Warehouse** avec architecture **Star Schema** utilisant **PySpark** et **Apache Spark**.

## 📊 Architecture

### Tables de Dimension (6)
- **dim_utilisateur**: 10 lignes | Infos + génération
- **dim_age**: 10 lignes | Groupes d'âge
- **dim_marque**: 5 lignes | Informations marques
- **dim_categorie**: 5 lignes | Catégories produits
- **dim_produit**: 10 lignes | Produits enrichis
- **dim_date**: 4 lignes | Dimension calendrier

### Table de Faits
- **fact_events**: 20 lignes | Événements e-commerce

## ✅ Portes de Qualité

| Porte | Critère | Statut |
|-------|---------|--------|
| 1 | Comptage > 0 | ✅ PASS |
| 2 | Taux nullité < seuils | ✅ PASS |
| 3 | Intégrité FK | ✅ PASS |

## 📦 Fichiers de Données

### Entrées (7 CSV)
```
donnees/entrees/
├── user.csv
├── session.csv
├── product.csv
├── product_name.csv
├── events.csv
├── brand.csv
└── category.csv
```

### Sorties (3 formats)
```
donnees/sorties/
├── fact_events_csv/
├── fact_events_csv_snappy/
└── fact_events_parquet/
```

## 🚀 Exécution

```bash
jupyter lab notebooks/lab2_assignment.ipynb
```

Exécute toutes les cellules (Ctrl+Shift+Enter).

## 📊 Résultats

- ✅ Star schema complet
- ✅ 6 dimensions + 1 fact table
- ✅ 20 événements de faits
- ✅ Toutes portes de qualité validées
- ✅ Exports en 3 formats

## 📚 Technologies

- **PySpark 4.0.1**
- **Apache Spark 4.0**
- **Python 3.9+**
- **Jupyter Lab**

## 👤 Auteur

**Badr TAJINI** - ESIEE Paris - Décembre 2025

## 📄 Licence

MIT
