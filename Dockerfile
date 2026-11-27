# Test build of the static site, served by nginx. Content is fetched from Sanity at build time.
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install -g bun && bun install --frozen-lockfile
COPY . .
ARG SANITY_PROJECT_ID
ARG SANITY_DATASET=production
ENV SANITY_PROJECT_ID=$SANITY_PROJECT_ID SANITY_DATASET=$SANITY_DATASET
RUN bun run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
