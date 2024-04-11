# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining source code to the working directory
COPY . .

# Expose port 3000 (default port for React apps)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
