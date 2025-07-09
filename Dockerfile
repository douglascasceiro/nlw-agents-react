# Imagem base com Node
FROM node:20

# Cria diretório de trabalho
WORKDIR /app

# Copia tudo
COPY . .

# Instala dependências
RUN npm install

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando padrão (pode ser sobrescrito pelo compose)
CMD ["npm", "run", "dev"]