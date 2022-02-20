defmodule Wee.Urls.LinkTest do
  use Wee.DataCase, async: true

  alias Wee.Urls.Link

  describe "changeset/2" do
    test "valid url" do
      changeset = Link.changeset(%Link{}, %{url: "https://example.com"})
      assert changeset.valid?
      assert String.length(changeset.changes.slug) > 0
    end

    test "missing url scheme" do
      changeset = Link.changeset(%Link{}, %{url: "example.com"})
      refute changeset.valid?
      assert %{url: ["is expected to start with http or https"]} = errors_on(changeset)
    end

    test "missing url host" do
      changeset = Link.changeset(%Link{}, %{url: "http://"})
      refute changeset.valid?
      assert %{url: ["is expected to include the host"]} = errors_on(changeset)
    end

    test "unsupported url scheme" do
      changeset = Link.changeset(%Link{}, %{url: "ftp://example.com"})
      refute changeset.valid?
      assert %{url: ["is expected to start with http or https"]} = errors_on(changeset)
    end

    test "missing url" do
      changeset = Link.changeset(%Link{}, %{})
      refute changeset.valid?
      assert %{url: ["can't be blank"]} = errors_on(changeset)
    end
  end
end
