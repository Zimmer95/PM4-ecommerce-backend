FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 5432

CMD ["npm", "run", "start"]

COPY migration.sh .
RUN chmod +x migration.sh
RUN ./migration.sh