#!/bin/bash

set -e
set -u

echo "Creating user 'test' and database 'testdb'"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
      CREATE USER test WITH ENCRYPTED PASSWORD 'password';
      CREATE DATABASE testdb;
      GRANT ALL PRIVILEGES ON DATABASE testdb TO test;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" testdb <<-EOSQL
      GRANT USAGE, CREATE ON SCHEMA public TO test;
EOSQL

echo " Database was created"
