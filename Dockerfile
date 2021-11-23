FROM node:14.16.1-alpine

WORKDIR /monti-api

COPY package.json /monti-api/

RUN npm install

EXPOSE 445

CMD [ "npm", "run", "start"]
