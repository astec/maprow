#INSTALL NODE
FROM node:16.10-alpine AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
#BUILD
RUN npm run build
EXPOSE 4200
#START
CMD ["npm", "start"]
