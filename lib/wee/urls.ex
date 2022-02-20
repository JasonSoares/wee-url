defmodule Wee.Urls do
  @moduledoc """
  The Urls context.
  """

  import Ecto.Query, warn: false
  alias Wee.Repo
  alias Wee.Urls.Link

  @doc """
  Retrieve a link by its slug from the data store
  """
  def get_by_slug(slug) do
    Repo.get_by(Link, slug: slug)
  end

  @doc """
  Add a new link to the data store
  """
  def create_link(attrs \\ %{}) do
    %Link{}
    |> Link.changeset(attrs)
    |> Repo.insert()
  end
end
