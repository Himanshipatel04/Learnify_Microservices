FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 

COPY . .

RUN npm run build

EXPOSE 4002    
EXPOSE 40002   

CMD ["node", "dist/index.js"]
