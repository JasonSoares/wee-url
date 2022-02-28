defmodule WeeWeb.ErrorViewTest do
  use WeeWeb.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 500.html" do
    assert render_to_string(WeeWeb.ErrorView, "500.html", []) == "Internal Server Error"
  end
end
