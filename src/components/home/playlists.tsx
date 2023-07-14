import React from "react"
import spotifyClient from "@/lib/spotify/spotifyClient"
import { SimplifiedPlaylistObject } from "@/lib/spotify/spotify"
import { getServerSession, Session } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import PlaylistTable from "@/components/home/playlistTable"

const Playlists = async () => {
  const session: Session | null = await getServerSession(authOptions)
  const collection: SimplifiedPlaylistObject[] = []
  let data = await spotifyClient.getMePlaylists({ limit: 50, offset: 0 })
  const addItemsToCollection = () => {
    data.items?.forEach((item) => {
      if (item.owner?.id === session?.user?.id) collection.push(item)
    })
  }

  addItemsToCollection()

  while (data.next) {
    if (data.next) {
      const url = new URL(data.next)
      const params = new URLSearchParams(url.search)
      data = await spotifyClient.getMePlaylists({
        limit: Number.parseInt(params.get("limit") as string),
        offset: Number.parseInt(params.get("offset") as string),
      })
      addItemsToCollection()
    }
  }

  return <PlaylistTable playlists={collection} />
}

export default Playlists
