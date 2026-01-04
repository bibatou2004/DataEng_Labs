import os
import urllib.request

output_dir = "data/raw"
os.makedirs(output_dir, exist_ok=True)

file_name = "clickstream-enwiki-2024-01.tsv.gz"
url = f"https://dumps.wikimedia.org/other/clickstream/2024-01/{file_name}"
output_path = os.path.join(output_dir, file_name)

if not os.path.exists(output_path):
    print(f"Téléchargement de {file_name}...")
    urllib.request.urlretrieve(url, output_path)
    print("Fini !")
else:
    print("Déjà téléchargé.")