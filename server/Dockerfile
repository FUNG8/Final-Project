FROM node:20
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD yarn install && \
    yarn data && \
    yarn start