# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the command to run the app when the container starts
CMD ["npm", "start"]

# Mount a volume for live code updates
VOLUME ["/app/node_modules", "/app"]