FROM hexpm/elixir:1.13.3-erlang-24.2.1-alpine-3.15.0

WORKDIR /app

RUN apk --no-cache --update add nodejs npm \
    && mix local.rebar --force \
    && mix local.hex --force

COPY . .

RUN mix do deps.get, compile
RUN cd ./assets \
    && npm install

CMD mix deps.get && mix phx.server
