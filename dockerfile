# Utiliza una imagen base de Node.js
FROM node:14

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

# Instala las dependencias
RUN npm install

# Compila el código TypeScript
RUN npm run build

# Expone el puerto en el que funciona la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "./dist/index.js"]
