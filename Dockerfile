# installation build
FROM node:lts-alpine as installation

COPY ./ ./
RUN npm install

# application build
FROM node:lts-alpine as application

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

CMD [ "npm", "run", "start"]
EXPOSE 3000