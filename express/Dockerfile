# base image
FROM node:19-alpine

# set working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json to workdir
COPY package*.json ./

# install dependencies (in clean way)
RUN npm ci

# copy source code to workdir
COPY . .

# build the app
RUN npm run build

# expose the port
EXPOSE 3000

# run the app
CMD ["npm", "run", "serve"]
