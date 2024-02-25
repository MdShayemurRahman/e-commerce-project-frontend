FROM node:21-alpine3.18 as build

# build app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# serve with nginx
FROM nginx:stable
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .