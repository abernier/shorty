FROM node:18-alpine

COPY package.json package-lock.json ./
RUN npm ci --omit dev --no-audit
COPY . ./

EXPOSE 3000
CMD ["node", "server.js"]
