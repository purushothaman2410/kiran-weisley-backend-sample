# Use an official Node.js LTS image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Set environment variable for production
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]

