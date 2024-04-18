FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

# Agregar el comando para ejecutar el script de migraciones
COPY migration.sh .
RUN chmod +x migration.sh
RUN ./migration.sh

EXPOSE 3000

CMD ["npm", "run", "start"]
