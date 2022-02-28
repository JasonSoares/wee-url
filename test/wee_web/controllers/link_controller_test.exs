defmodule WeeWeb.LinkControllerTest do
  use WeeWeb.ConnCase
  import Wee.Factory

  describe "show" do
    test "returns 301 and redirects to the original url when link exists", %{conn: conn} do
      link = insert(:link)
      conn = get(conn, Routes.link_path(conn, :show, link.slug))
      assert redirected_to(conn, 301) == link.url
    end

    test "returns 404 when link doesn't exist", %{conn: conn} do
      conn = get(conn, Routes.link_path(conn, :show, "doesnotexist"))
      assert html_response(conn, 404) =~ "404"
      assert html_response(conn, 404) =~ "We searched high and low, but the page you're looking for was not found."
      assert html_response(conn, 404) =~ "Create a wee link"
    end
  end
end
