# Compile UI
FROM node:22.17 AS build

WORKDIR /src
COPY package*.json ./
RUN npm ci --quiet

COPY . .
RUN rm -rf dist/
RUN npm run build.production

FROM nginx:1.28-alpine

ENV API_URL /api

COPY --from=build /src/dist/codeveros-ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY 0-setup-env.sh /docker-entrypoint.d

RUN chmod +x /docker-entrypoint.d/0-setup-env.sh

EXPOSE 80
