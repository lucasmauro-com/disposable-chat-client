FROM node:lts-alpine

ARG CLIENT_PORT=5173

EXPOSE ${CLIENT_PORT}

WORKDIR /app

COPY ./package*.json .

RUN npm install

COPY . .

RUN npm run build

