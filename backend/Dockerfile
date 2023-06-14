FROM node:14
ENV NODE_ENV=development
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install nodemon -g
RUN node mongoData.js
VOLUME /app
EXPOSE 8080
