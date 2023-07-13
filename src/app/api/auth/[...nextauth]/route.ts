import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import querystring from "querystring"
import { env } from "@/helpers/env.helper"

const scope = "user-read-private user-read-email"

const handler = NextAuth({
  secret: env("SECRET"),
  providers: [
    SpotifyProvider({
      clientId: env("SPOTIFY_CLIENT_ID"),
      clientSecret: env("SPOTIFY_CLIENT_SECRET")!,
      authorization: `https://accounts.spotify.com/authorize?${querystring.stringify({ scope: scope })}`,
    }),
  ],
})

export { handler as GET, handler as POST }
