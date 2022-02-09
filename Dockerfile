FROM node:lts AS development

ENV NODE_ENV development

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package-lock.json ./

# If you are building your code for production
RUN npm ci

# Bundle app source
COPY . .
