import * as api from "./spotify"

let spotifyClient: SpotifyClient

if (!global.spotifyClient) global.spotifyClient = api

spotifyClient = global.spotifyClient

export const setToken = (token: string | undefined) => {
  global.spotifyClient.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
}

export type SpotifyClient = typeof import("@/lib/spotify/spotify")

export default spotifyClient
