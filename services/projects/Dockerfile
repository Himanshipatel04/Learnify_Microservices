FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Expose ports
EXPOSE 4001
EXPOSE 40001

# Run compiled JavaScript
CMD ["node", "dist/index.js"]
