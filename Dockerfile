# Our first stage, that is the Builder
FROM node:14.16.1-alpine AS ts-sample-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Our Second stage, that creates an image for production
FROM node:14.16.1-alpine AS ts-sample-prod
WORKDIR /
COPY --from=ts-sample-builder ./app/dist ./dist
COPY package.json ./
RUN npm install
# expose port and define CMD
EXPOSE 3002
CMD ["npm","run","start:prod"]
