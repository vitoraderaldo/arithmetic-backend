FROM node:18.16.0-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
RUN npm install --omit=dev

FROM node:18.16.0-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules


CMD ["node", "dist/main.js"]
