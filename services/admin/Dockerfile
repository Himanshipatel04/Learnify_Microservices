FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 

COPY . .

EXPOSE 4000    # HTTP
EXPOSE 40000   # gRPC

CMD ["node", "src/app.js"]
