defmodule Wee.Factory do
  use ExMachina.Ecto, repo: Wee.Repo

  alias Wee.Urls.Link

  def link_factory do
    %Link{
      url: Faker.Internet.url(),
      slug: Faker.String.base64(6)
    }
  end
end
