# Use Node.js LTS Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose HTTP and gRPC ports
EXPOSE 4001    # HTTP
EXPOSE 40001   # gRPC

# Start the service
CMD ["node", "src/app.js"]
