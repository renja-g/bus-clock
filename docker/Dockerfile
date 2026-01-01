FROM node:25-alpine

WORKDIR /app

# Copy package files
COPY package.json ./
RUN npm install --production

# Copy server and frontend files
COPY src/server.js ./
COPY public ./public/
COPY src/index.html ./public/

EXPOSE 8080

CMD ["node", "server.js"]
