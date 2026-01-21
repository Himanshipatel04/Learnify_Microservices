FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 

COPY . .

RUN npm run build

EXPOSE 4000    
EXPOSE 40000   

CMD ["node", "dist/index.js"]
