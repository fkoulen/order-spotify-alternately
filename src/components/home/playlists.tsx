import React from "react"
import spotifyClient from "@/lib/spotify/spotifyClient"

const Playlists = async () => {
  const data = await spotifyClient.getMePlaylists({ limit: 18, offset: 0 })

  return (
    <ul>
      {data.items?.map((item) => {
        return <li key={item.id}>{item.name}</li>
      })}
    </ul>
  )
}

export default Playlists
