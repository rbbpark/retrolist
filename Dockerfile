FROM node:18-alpine

WORKDIR /app

# Copy root package json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy and build the shared package
WORKDIR /app/packages/shared
COPY packages/shared/package.json ./
RUN npm ci 
COPY packages/shared/ ./
RUN npm run build

# Copy the server app source
WORKDIR /app/apps/server
COPY apps/server/package.json ./
RUN npm ci 
COPY apps/server/ ./

# Build the server app
RUN npm run build

# Set working directory back to root
WORKDIR /app

# Expose the port the app runs on
EXPOSE 3001