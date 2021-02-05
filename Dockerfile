FROM node:14

WORKDIR /app/passmngr

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8080

CMD ["yarn",  "dev"]
