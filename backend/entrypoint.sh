#!/bin/sh

echo "Aguardando o banco de dados... "
while ! nc -z AtendeBot_DataBase 5432; do
    sleep 1
done

echo "Executando migrations..."
npx prisma migrate dev

echo "Iniciando... "
npm run dev