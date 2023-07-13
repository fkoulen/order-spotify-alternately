import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import querystring from "querystring"
import { env } from "@/helpers/env.helper"

export const client_id = env("NEXT_PUBLIC_SPOTIFY_CLIENT_ID") // Your client id
export const client_secret = env("NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET") // Your secret

const scope = "user-read-private user-read-email"

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: client_id,
      clientSecret: client_secret!,
      authorization: `https://accounts.spotify.com/authorize?${querystring.stringify({ scope: scope })}`,
    }),
  ],
})

export { handler as GET, handler as POST }
