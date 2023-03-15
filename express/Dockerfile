# Base image
FROM node:19-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to workdir
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code to workdir
COPY . .

# Build the app
# RUN npm run build

# Expose the port
# EXPOSE 3000

# Run the app
# CMD ["npm", "serve"]
CMD ["npm", "start"]
