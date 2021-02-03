FROM node:alpine

WORKDIR /app/passmngr

COPY package.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm","run", "dev" ]