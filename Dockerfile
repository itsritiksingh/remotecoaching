FROM alpine:latest

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package*.json /app/

RUN npm install

RUN npm i -g pm2

COPY . /app

EXPOSE 5000

ENTRYPOINT [ "pm2-runtime" ]

CMD [ "server.js" ]


