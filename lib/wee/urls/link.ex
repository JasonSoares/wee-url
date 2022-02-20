defmodule Wee.Urls.Link do
  use Ecto.Schema
  import Ecto.Changeset

  schema "links" do
    field :slug, :string
    field :url, :string

    timestamps()
  end

  @doc false
  def changeset(link, attrs) do
    link
    |> cast(attrs, [:url])
    |> ensure_valid_url()
    |> put_change(:slug, generate_slug())
    |> validate_required([:url, :slug])
    |> unique_constraint(:slug)
  end

  defp ensure_valid_url(changeset) do
    validate_change(changeset, :url, fn :url, url -> validate_url(url) end)
  end

  defp generate_slug(min_length \\ 6) do
    :crypto.strong_rand_bytes(min_length) |> Base.url_encode64(padding: false)
  end

  defp valid_host?(nil), do: false
  defp valid_host?(host), do: String.trim(host) != ""

  defp valid_scheme?(nil), do: false
  defp valid_scheme?(scheme), do: scheme in ["http", "https"]

  defp validate_url(url) do
    %{host: host, scheme: scheme} = URI.parse(url)

    cond do
      not valid_scheme?(scheme) ->
        [url: "is expected to start with http or https"]

      not valid_host?(host) ->
        [url: "is expected to include the host"]

      true ->
        []
    end
  end
end
