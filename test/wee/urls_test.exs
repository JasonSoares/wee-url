defmodule Wee.UrlsTest do
  use Wee.DataCase, async: true

  alias Wee.Urls
  alias Wee.Urls.Link

  describe "links" do
    test "create_link/1 with valid data creates a link" do
      valid_attrs = %{url: "http://www.example.com"}
      assert {:ok, %Link{} = link} = Urls.create_link(valid_attrs)
      refute String.trim(link.slug) == ""
      assert link.url == "http://www.example.com"
    end

    test "create_link/1 with invalid data returns error changeset" do
      invalid_attrs = %{url: nil}
      assert {:error, %Ecto.Changeset{}} = Urls.create_link(invalid_attrs)
    end
  end
end
