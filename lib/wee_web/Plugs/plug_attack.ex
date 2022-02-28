defmodule WeeWeb.PlugAttack do
  import Plug.Conn
  use PlugAttack

  rule "allow local", conn do
    allow conn.remote_ip == {127, 0, 0, 1}
  end

  rule "throttle per ip", conn do
    throttle conn.remote_ip,
      # limit to 5 requests per second per ip address
      period: 1_000, limit: 5,
      storage: {PlugAttack.Storage.Ets, WeeWeb.PlugAttack.Storage}
  end

  def block_action(conn, _data, _opts) do
    conn
    |> send_resp(:forbidden, Jason.encode!(%{"errors" => %{"ratelimit" => "exceeded"}}))
    |> halt
  end
end
