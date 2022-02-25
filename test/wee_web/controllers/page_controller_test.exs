defmodule WeeWeb.PageControllerTest do
  use WeeWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "wee url"
  end
end
