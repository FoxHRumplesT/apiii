FROM node:14.16.1

COPY package.json /monti-api/

WORKDIR /monti-api

RUN npm install

ADD . /monti-api

EXPOSE 8081

CMD [ "npm", "run", "start"]
