#!/bin/bash

# Build and start the Docker containers
docker-compose up --build -d

# Copy the backup file to the Docker container
docker cp backup.dump devb_postgre:/backup.dump

# Execute commands inside the Docker container
docker exec -i devb_postgre bash << EOF
psql -U postgres << SQL
DROP DATABASE IF EXISTS elibrary;
CREATE DATABASE elibrary;
SQL

# Restore the database from the backup
pg_restore -U postgres -d elibrary /backup.dump
EOF