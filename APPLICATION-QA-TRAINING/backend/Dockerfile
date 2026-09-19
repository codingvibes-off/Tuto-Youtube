FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
# Requis par le moteur Prisma (query/schema engine) : sans openssl,
# l'image alpine n'a pas de libssl et le moteur ne peut pas se charger
# ("Could not parse schema engine response" au démarrage du conteneur).
RUN apk add --no-cache openssl
COPY package*.json ./
COPY prisma ./prisma
# npm install complet (pas --omit=dev) : ts-node/typescript restent
# nécessaires au démarrage pour exécuter `prisma db seed`.
RUN npm install && npx prisma generate
COPY --from=build /app/dist ./dist
# Node 20.19+/22 active par défaut la détection auto ESM ("import" détecté
# dans prisma/seed.ts), ce qui empêche ts-node 10.x d'intercepter le
# chargement du fichier (ERR_UNKNOWN_FILE_EXTENSION ".ts" au démarrage du
# seed). On désactive cette détection et on force explicitement ts-node en
# sortie CommonJS (cohérent avec tsconfig.json) pour retrouver le
# comportement attendu.
ENV NODE_OPTIONS="--no-experimental-detect-module"
ENV TS_NODE_COMPILER_OPTIONS="{\"module\":\"CommonJS\"}"
EXPOSE 3000
# Le seed est ré-exécuté à chaque démarrage de conteneur (démo pédagogique :
# on veut repartir d'un jeu de données propre et connu à chaque run).
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/main"]
