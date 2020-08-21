FROM node:12.14

# Create server directory
WORKDIR /usr/src/server

# Install server dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm ci --quiet --only=production

# Bundle server source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
