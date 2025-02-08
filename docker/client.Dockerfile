ARG CLIENT_PORT=80

FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS production-stage
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE ${CLIENT_PORT}

CMD ["nginx", "-g", "daemon off;"]
