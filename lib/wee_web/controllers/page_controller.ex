defmodule WeeWeb.PageController do
  use WeeWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
