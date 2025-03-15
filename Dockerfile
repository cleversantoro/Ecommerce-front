# Usa a imagem oficial do Node.js para construir o projeto
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Compila o projeto React para produção
RUN npm run build

# Usa uma imagem Nginx para servir o frontend
FROM nginx:stable-alpine

# Copia os arquivos compilados para a pasta do Nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão do Nginx
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]


