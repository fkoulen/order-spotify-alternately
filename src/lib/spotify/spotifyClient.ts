import * as api from "./spotify"

let spotifyClient: SpotifyClient

if (!global.spotifyClient) global.spotifyClient = api

spotifyClient = global.spotifyClient

export const setToken = (token: string | undefined) => {
  global.spotifyClient.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
}

// todo prevent crash on refresh token (right now it crashes because the request fails, is refreshed on refresh)

export type SpotifyClient = typeof import("@/lib/spotify/spotify")

export default spotifyClient
