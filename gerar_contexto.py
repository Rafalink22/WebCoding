import os

# Extensões que você quer ler (ajuste conforme seu projeto)
extensoes_permitidas = ['.js', '.html', '.css', '.py', '.java', '.php', '.sql']
ignorar_pastas = ['node_modules', '.git', 'venv', '__pycache__', 'dist', 'build']

with open('projeto_completo.txt', 'w', encoding='utf-8') as outfile:
    for root, dirs, files in os.walk("."):
        # Remove pastas ignoradas da busca
        dirs[:] = [d for d in dirs if d not in ignorar_pastas]
        
        for file in files:
            if any(file.endswith(ext) for ext in extensoes_permitidas):
                caminho_completo = os.path.join(root, file)
                outfile.write(f"\n--- INICIO ARQUIVO: {caminho_completo} ---\n")
                outfile.write("```\n")
                try:
                    with open(caminho_completo, 'r', encoding='utf-8') as infile:
                        outfile.write(infile.read())
                except Exception as e:
                    outfile.write(f"Erro ao ler arquivo: {e}")
                outfile.write("\n```\n")
                outfile.write(f"--- FIM ARQUIVO: {caminho_completo} ---\n")

print("Arquivo 'projeto_completo.txt' gerado com sucesso!")