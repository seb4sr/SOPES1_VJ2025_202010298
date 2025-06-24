# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copia los archivos necesarios
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Compila la aplicación
RUN npm run build

# Etapa 2: Servidor para producción
FROM node:18-alpine AS runner

WORKDIR /app

# Copia archivos de producción desde builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD ["npm", "start"]
