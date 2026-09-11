FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
# npm install complet (pas --omit=dev) : ts-node/typescript restent
# nécessaires au démarrage pour exécuter `prisma db seed`.
RUN npm install && npx prisma generate
COPY --from=build /app/dist ./dist
EXPOSE 3000
# Le seed est ré-exécuté à chaque démarrage de conteneur (démo pédagogique :
# on veut repartir d'un jeu de données propre et connu à chaque run).
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/main"]
