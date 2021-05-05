FROM nginx:1.19-alpine

ENV API_URL /api

COPY dist/codeveros-ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY 0-setup-env.sh /docker-entrypoint.d

RUN chmod +x /docker-entrypoint.d/0-setup-env.sh

EXPOSE 80
