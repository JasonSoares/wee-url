#!/bin/sh

# Wait until Postgres is ready before running the next step.
while ! pg_isready -q -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USER
do
  echo "$(date) - waiting for database to start."
  sleep 2
done

mix ecto.create
mix ecto.migrate

# Start the server.
exec mix phx.server
