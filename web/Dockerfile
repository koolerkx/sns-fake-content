FROM node:14-alpine

ARG VITE_API_ENDPOINT=http://localhost:3000/v1
ENV VITE_API_ENDPOINT=$VITE_API_ENDPOINT

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

COPY . .

RUN npm run build
RUN npm install -g serve

ENV PORT=5173

CMD serve -s -p ${PORT} ./dist
