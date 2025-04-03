FROM node:18-alpine

WORKDIR /usr/src/app

# Copy root package files
COPY package.json package-lock.json ./

# Copy the server app
COPY apps/server ./apps/server

# Install dependencies
RUN npm ci

# Build the server app
WORKDIR /usr/src/app/apps/server
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "dist/app.js"]



