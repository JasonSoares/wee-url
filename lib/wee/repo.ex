defmodule Wee.Repo do
  use Ecto.Repo,
    otp_app: :wee,
    adapter: Ecto.Adapters.Postgres
end
