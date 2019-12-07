FROM node:10.17 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.17
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html