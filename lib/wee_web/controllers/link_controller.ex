defmodule WeeWeb.LinkController do
  use WeeWeb, :controller

  alias Wee.Urls
  alias Wee.Urls.Link

  action_fallback WeeWeb.FallbackController

  def show(conn, %{"slug" => slug}) do
    case Urls.get_by_slug(slug) do
      nil ->
        conn
        |> put_status(:not_found)
        |> put_view(WeeWeb.ErrorView)
        |> render(:"404")

      %Link{url: url} ->
        conn
        |> put_status(301)
        |> redirect(external: url)
    end
  end
end
