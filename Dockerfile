# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link .npmrc package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

RUN --mount=type=secret,id=API_URL --mount=type=secret,id=API_KEY API_URL="$(cat /run/secrets/API_URL)" API_KEY="$(cat /run/secrets/API_KEY)"

ENV PUBLIC_AZURE_STORAGE_SAS_TOKEN='sp=r&st=2024-03-18T01:19:57Z&se=2024-05-16T09:19:57Z&spr=https&sv=2022-11-02&sr=c&sig=UH5PP4XKr9wlqRyTASqVUEAWhCi%2BOhEoZ%2F5YcbVjaYo%3D'

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
