ARG BASE_IMAGE=node:18-alpine

FROM ${BASE_IMAGE} AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit dev --loglevel verbose --no-audit
COPY . ./

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]