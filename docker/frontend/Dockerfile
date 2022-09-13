#INSTALL NODE 
FROM node:16.10-alpine AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . /usr/src/app

#BUILD
RUN npm run build

#START
CMD npm start
