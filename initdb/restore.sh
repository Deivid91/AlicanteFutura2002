#!/bin/bash
set -e

echo "Esperando a PostgreSQL..."
until pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  sleep 2
done

echo "Restaurando base de datos..."
pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" \
  --no-owner \
  --no-privileges \
  /docker-entrypoint-initdb.d/restore.dump

echo "✅ Restauración completada"