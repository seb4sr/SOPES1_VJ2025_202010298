FROM golang:1.24.3 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o monitorserver

# Etapa 2: runtime
FROM alpine:latest

RUN apk --no-cache add ca-certificates

COPY --from=builder /app/monitorserver /monitorserver

EXPOSE 3000

ENTRYPOINT ["/monitorserver"]