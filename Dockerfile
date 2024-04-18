FROM node

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run migrations:run

EXPOSE 3000

CMD ["npm", "run", "start"]