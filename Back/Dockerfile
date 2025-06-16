FROM node:24-alpine3.22

WORKDIR /nodeserver

COPY package*.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "run", "dev"]