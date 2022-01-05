FROM node:16
LABEL authors="Mirko Siddi"
# update dependencies and install curl
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./ \
#     ./source ./

# This will copy everything from the source path 
# --more of a convenience when testing locally.
COPY package*.json ./
# update each dependency in package.json to the latest version
RUN npm install
# If you are building your code for production
#RUN npm ci --only=production
# Bundle app source
COPY . .
# Bundle app source
EXPOSE 3000
CMD [ "npm", "start" ]