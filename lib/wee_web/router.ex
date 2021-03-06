defmodule WeeWeb.Router do
  use WeeWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {WeeWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug WeeWeb.PlugAttack
  end

  pipeline :api do
    plug :accepts, ["json"]

    plug WeeWeb.PlugAttack
  end

  scope "/", WeeWeb do
    pipe_through :browser

    get "/:slug", LinkController, :show
    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", WeeWeb.API do
    pipe_through :api

    post "/links", LinkController, :create
  end
end
