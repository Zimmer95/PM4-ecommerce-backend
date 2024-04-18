FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

# Agregar el comando para ejecutar el script de migraciones
COPY migrate.sh .
RUN chmod +x migrate.sh
RUN ./migrate.sh

EXPOSE 3000

CMD ["npm", "run", "start"]
