FROM node:14.16.1-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8081

CMD ["npm","run","start:prod"]
