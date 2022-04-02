FROM node:16-alpine

LABEL version="1.0"
LABEL description="This is the base docker image."
LABEL maintainer = ["eivs@live.com"]

# Create app directory
WORKDIR /usr/src/node-app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
