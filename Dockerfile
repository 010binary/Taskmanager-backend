# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install necessary tools
RUN apk add --no-cache libc6-compat build-base python3 make 

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies)
RUN npm install

# Verify TypeScript installation
RUN npm list typescript && npx tsc --version

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy necessary files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies
RUN npm ci --only=production

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
