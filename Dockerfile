FROM node:21-alpine3.18 as build

# Declare build time environment variables
ARG REACT_APP_API

# Set default values for environment variables
ENV REACT_APP_API=$REACT_APP_API

# Build App
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:stable
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]