defmodule WeeWeb.API.LinkControllerTest do
  use WeeWeb.ConnCase, async: true

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "post /api/link" do
    test "creates link when data is valid", %{conn: conn} do
      conn =
        post(conn, Routes.link_path(conn, :create), link: %{"url" => "http://www.example.com"})

      assert %{"slug" => slug, "url" => url} = json_response(conn, 201)["data"]
      assert url == "http://www.example.com"
      refute String.trim(slug) == ""
    end

    test "fails when url is invalid", %{conn: conn} do
      conn = post(conn, Routes.link_path(conn, :create), link: %{"url" => "www.example.com"})
      assert json_response(conn, 422)
    end
  end
end
