
FROM node:18-alpine

WORKDIR /app

COPY . .

# Install dependencies
RUN npm install ./ui_v1.tgz 

CMD ["npm", "start"]

EXPOSE 3000