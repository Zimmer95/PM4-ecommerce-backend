FROM node

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["/bin/bash", "-c", "npm run migrations:generate src/migrations/initial_on_render && npm run migration:run && npm run start"]
