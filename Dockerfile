# Stage 1: Build the React app
FROM node:20 AS node-20-builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the built app using Nginx
FROM nginx:1.27-alpine

COPY --from=node-20-builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]