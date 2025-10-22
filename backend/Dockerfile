FROM node:22-alpine 

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

RUN apk update && apk add --no-cache netcat-openbsd
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "sh", "./entrypoint.sh" ]