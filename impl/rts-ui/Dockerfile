
# https://stackoverflow.com/questions/53681522/share-variable-in-multi-stage-dockerfile-arg-before-from-not-substituted
#ARG PROJECT_DIR=/rts-ui
#
FROM node:21-slim as builder
#
#ARG PROJECT_DIR
WORKDIR /app
#
RUN npm install -g pnpm
#
COPY . .

# RUN pnpm config set registry https://registry.npmmirror.com
RUN pnpm install

ENV VITE_BASE_URL=/

RUN pnpm build


FROM nginx:alpine as production
#ARG PROJECT_DIR

COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY .docker/app.conf /etc/nginx/conf.d/app/conf

EXPOSE 80
