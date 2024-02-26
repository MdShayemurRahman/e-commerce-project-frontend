FROM node:19.5.0-alpine as build

# build app
WORKDIR /app
COPY package.json ./
RUN npm cache clean --force
RUN apk update && apk add npm
RUN npm install
COPY . .
RUN npm run build

# serve with nginx
FROM nginx:stable
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .