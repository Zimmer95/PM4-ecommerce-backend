FROM node

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["/bin/bash", "-c", "npm run start"]
