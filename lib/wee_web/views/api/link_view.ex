defmodule WeeWeb.API.LinkView do
  use WeeWeb, :view

  def render("show.json", %{link: link}) do
    %{data: render_one(link, __MODULE__, "link.json")}
  end

  def render("link.json", %{link: link}) do
    %{
      url: link.url,
      slug: link.slug
    }
  end
end
