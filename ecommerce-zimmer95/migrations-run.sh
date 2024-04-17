#!/bin/bash

# Espera a que la base de datos esté disponible
while ! nc -z -v -w30 db-ecommerce-zimmer95 5432; do
  echo 'Esperando a que la base de datos esté disponible...'
  sleep 5
done

# Ejecuta las migraciones
echo 'Ejecutando migraciones...'
npm run migrations:run

# Inicia la aplicación
echo 'Iniciando la aplicación...'
npm start
