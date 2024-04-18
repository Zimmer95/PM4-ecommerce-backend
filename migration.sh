#!/bin/bash

# Espera a que la base de datos esté disponible
while ! nc -z -w 1 db-host 5432; do
  echo 'Esperando a que la base de datos esté disponible...'
  sleep 1
done

# Ejecuta las migraciones
echo 'Ejecutando migraciones...'
npm run migrations:run
