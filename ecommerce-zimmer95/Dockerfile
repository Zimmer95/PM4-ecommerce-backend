FROM node

WORKDIR /app

COPY ./ecommerce-zimmer95/package*.json ./

RUN npm install

COPY . ./ecommerce-zimmer95

EXPOSE 3000

CMD ["npm", "run", "start"]