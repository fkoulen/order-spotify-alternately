import { SpotifyClient } from "@/lib/spotify/spotifyClient"

declare global {
  namespace globalThis {
    var spotifyClient: SpotifyClient
  }
}
