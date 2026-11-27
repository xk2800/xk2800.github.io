FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Studio config is baked into the bundle at build time
ARG SANITY_STUDIO_PROJECT_ID
ARG SANITY_STUDIO_DATASET=production
ENV SANITY_STUDIO_PROJECT_ID=$SANITY_STUDIO_PROJECT_ID SANITY_STUDIO_DATASET=$SANITY_STUDIO_DATASET
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
