FROM alpine:latest

RUN apk add --no-cache nodejs npm

# WORKDIR /app

# COPY package*.json /app/

# RUN npm install

# RUN npm install pm2 -g

# COPY . /app

# EXPOSE 5000

# CMD [ "pm2-runtime","start","server.js","-i","0" ]

#Base Image node:8.12.0 on alpine
# FROM node:8.12.0-alpine

#Install build essentials for redis
# RUN apk add musl-dev gcc make g++ zlib-dev linux-headers


WORKDIR /app

COPY package*.json /app/

RUN npm install

RUN npm install pm2 -g

COPY . /app

#Redis Installation script
# RUN sh installredis.sh

EXPOSE 5000

# CMD [ "nodemon","server.js"]
CMD [ "pm2-runtime","start","server.js","-i","0" ]

#Deploying App With redis
# CMD ["pm2-runtime start server.js -i 0"]