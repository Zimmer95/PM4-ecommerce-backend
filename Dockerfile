FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./


EXPOSE 3000
# Agregar el comando para ejecutar el script de migraciones

COPY migration.sh .
RUN chmod +x migration.sh
RUN ./migration.sh


CMD ["npm", "run", "start"]
