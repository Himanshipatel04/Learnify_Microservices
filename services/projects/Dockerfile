# Use Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose gRPC port (example: 50052) and HTTP if needed
EXPOSE 40001
EXPOSE 4001

# Start the service
CMD ["node", "src/app.js"]
