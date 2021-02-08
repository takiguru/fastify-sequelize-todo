FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE ${SERVICE_PORT}
CMD [ "npm", "run","start:dev" ]