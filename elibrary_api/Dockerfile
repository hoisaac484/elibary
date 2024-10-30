FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install api_test.tgz
RUN npm install sharp.tgz
#RUN npm run build

CMD ["npm", "start"]

EXPOSE 1337