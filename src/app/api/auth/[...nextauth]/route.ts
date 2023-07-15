import NextAuth, { AuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import querystring from "querystring"
import { env } from "@/helpers/env.helper"
import { JWT } from "next-auth/jwt"
import { setToken } from "@/lib/spotify/spotifyClient"

const client_id = env("SPOTIFY_CLIENT_ID")
const client_secret = env("SPOTIFY_CLIENT_SECRET")

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  // requesting access token from refresh token
  const data = new URLSearchParams(
    querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    }),
  )
  const authOptions = {
    headers: {
      Authorization: "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    body: data,
    method: "post",
  }

  return fetch("https://accounts.spotify.com/api/token", authOptions)
    .then((response) => response.json())
    .then((data: JWT) => {
      setToken(data.accessToken)

      return {
        ...token,
        accessToken: data.access_token,
        // @ts-ignore
        accessTokenExpires: Date.now() + data.expires_in * 1000,
      } as JWT
    })
    .catch(() => {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      } as JWT
    })
}

const scope = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
]

export const authOptions: AuthOptions = {
  secret: env("SECRET"),
  providers: [
    SpotifyProvider({
      clientId: client_id,
      clientSecret: client_secret,
      authorization: `https://accounts.spotify.com/authorize?${querystring.stringify({ scope: scope.join(" ") })}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        setToken(account.access_token)
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          user,
        }
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        setToken(token.accessToken)
        return token
      }
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.error = token.error
      session.user = token.user
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
