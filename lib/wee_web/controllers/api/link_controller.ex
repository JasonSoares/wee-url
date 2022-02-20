defmodule WeeWeb.API.LinkController do
  use WeeWeb, :controller

  alias Wee.Urls
  alias Wee.Urls.Link

  action_fallback WeeWeb.FallbackController

  def create(conn, %{"link" => link_params}) do
    with {:ok, %Link{} = link} <- Urls.create_link(link_params) do
      conn
      |> put_status(:created)
      |> render("show.json", link: link)
    end
  end
end
