FROM node:20
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN yarn install

# Copy all files
COPY . .

EXPOSE 8080

CMD yarn data && yarn start
