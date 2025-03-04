# Stage 1: Build React với Vite
FROM node:20 AS node-20-builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

# Stage 2: Chạy Nginx để serve static files
FROM nginx:1.27-alpine

COPY --from=node-20-builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]