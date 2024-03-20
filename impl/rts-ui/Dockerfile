FROM node:21-slim as builder

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

ENV VITE_BASE_URL=/

RUN pnpm build

FROM nginx:alpine as production

COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY .docker/app.conf /etc/nginx/conf.d/app/conf

EXPOSE 80
