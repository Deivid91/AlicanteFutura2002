# Imagen base: Node.js 20.15.0 (LTS, estable)
FROM node:20.15.0

# Crear y usar el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa React
EXPOSE 5173

# Comando por defecto: arranca el servidor de desarrollo
CMD ["npm", "run", "dev"]