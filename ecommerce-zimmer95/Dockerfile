FROM node

WORKDIR /app

COPY ./ecommerce-zimmer95/package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]