#!/bin/bash

set -e
set -u

echo "Creating user 'maxime' and database 'testdb'"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
      CREATE USER maxime WITH ENCRYPTED PASSWORD 'password';
      CREATE DATABASE testdb;
      GRANT ALL PRIVILEGES ON DATABASE testdb TO maxime;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" testdb <<-EOSQL
      GRANT USAGE, CREATE ON SCHEMA public TO maxime;
EOSQL

echo " Database was created"
