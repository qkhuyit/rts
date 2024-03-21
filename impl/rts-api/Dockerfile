FROM golang:1.22.0-bullseye AS builder

WORKDIR /app

COPY ./rts-shared ./rts-shared
COPY ./rts-api ./rts-api

WORKDIR /app/rts-api

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /app/build/rts-api


FROM debian:12.5

ENV APP_PORT=80

WORKDIR /app

COPY --from=builder /app/build/rts-api .

ENTRYPOINT ["/app/rts-api", "serve"]

EXPOSE $APP_PORT
