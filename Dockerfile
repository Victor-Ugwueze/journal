FROM node:14.0-alpine3.11

WORKDIR /usr/app

RUN apk update && apk upgrade && \
  apk add make gcc g++ python curl

COPY package.json /usr/app

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
