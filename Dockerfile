# build stage
FROM hexpm/elixir:1.13.3-erlang-23.2.3-alpine-3.15.0

# install build dependencies
RUN apk update && apk upgrade && \
    apk add postgresql-client && \
    apk add nodejs npm && \
    apk add build-base && \
    rm -rf /var/cache/apk/*

ENV MIX_ENV prod

RUN mix do local.hex --force, local.rebar --force

COPY mix.exs ./
COPY mix.lock ./

RUN mix do deps.get --only prod
RUN mix deps.compile

# Cache and compile node packages
COPY assets/package.json assets/
RUN cd assets && npm install

COPY . ./

# Run frontend build, compile and digest
RUN cd assets/ && \
    npm run deploy && \
    cd - && \
    mix do compile, phx.digest

RUN chmod +x entrypoint.sh
CMD ["/entrypoint.sh"]
