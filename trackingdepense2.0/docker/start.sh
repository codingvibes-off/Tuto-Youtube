#!/bin/bash
set -e

# Vérifie si docker compose est installé
which docker compose
if [ $? -eq 0 ]; then

    echo ""
    echo "Stop containers..."
    echo ""
    docker compose down

    echo ""
    echo "Create directories for volumes..."
    echo ""
    mkdir -p ./docker/init-db      # dossier pour le script SQL
    mkdir -p ./docker/pgdata       # dossier pour persister les données PostgreSQL

    echo ""
    echo "Pull PostgreSQL image..."
    echo ""
    docker pull postgres:15

    echo ""
    echo "Start PostgreSQL container..."
    echo ""
    docker compose up -d

    echo ""
    echo "Done! PostgreSQL is running and initialized."
    echo "You can connect to it on localhost:5432 with user 'admin' and database 'expenses_db'."

else
    echo "Please install docker compose and rerun the script"
fi
