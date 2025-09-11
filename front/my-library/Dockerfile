FROM node:24 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

EXPOSE 4000

CMD ["node", "dist/my-library/server/server.mjs"]
