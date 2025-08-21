# Use official Node.js runtime as base
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching layers)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the app
COPY . .

# Expose port (match your server.js PORT)
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
