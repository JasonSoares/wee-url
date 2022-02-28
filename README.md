# wee url

wee url is a url shortener.

# Getting started
In order to run the project, you will need the following dependencies installed:

- Elixir 1.13
- NodeJS 16
- PostgreSQL running on port `5432` with username and password set to `postgres`
- Additionally, it is helpful to have Docker installed to set up Postgres with a single command:

```shell
docker run -d -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:latest
```

## Setup
Run the following command to install dependencies and to setup the database
```shell
make setup
```

## Running the project
After you run `make setup`, run the following:
```shell
make server
```

## Accessing the app
Open a browser and navigate to [http://localhost:4000](http://localhost:4000)

## Running tests
After you run `make setup`, run the following:
```shell
make test
```

This will run both the back-end and front-end test suites.

## Notes
See notes.txt for further information about the project.
