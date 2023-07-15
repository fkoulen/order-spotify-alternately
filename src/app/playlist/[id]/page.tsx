import React from "react"
import spotifyClient from "@/lib/spotify/spotifyClient"
import { TrackObject } from "@/lib/spotify/spotify"

type TrackObjectWithCollaborator = TrackObject & {
  collaborator: string | undefined
}

type Collaborator = {
  id: string | undefined
  display_name: string | undefined | null
}
const Playlist = async ({ params }: { params: { id: string } }) => {
  const data = await spotifyClient.getPlaylistsByPlaylistIdTracks(params.id, { limit: 50 })
  const collaborators: Collaborator[] = []
  const tracks = new Array<TrackObjectWithCollaborator>()

  if (data.items) {
    await Promise.all(
      data.items?.map(async (item) => {
        const user = await spotifyClient.getUsersByUserId(item.added_by?.id ?? "")
        const collaborator: Collaborator = { id: user.id, display_name: user.display_name }

        if (!collaborators.some((c) => c.id === collaborator.id)) {
          collaborators.push(collaborator)
        }

        if (item.track) {
          tracks.push({
            ...(item.track as TrackObjectWithCollaborator),
            collaborator: collaborator.display_name ?? collaborator.id,
          })
        }
      }),
    )
  }

  return (
    <div>
      <p>Collaborators: {collaborators.map((collaborator) => collaborator.display_name).join(", ")}</p>
      <b>Songs</b>
      <ul>
        {tracks.map((track) => {
          return (
            <li key={track.id}>
              {track.name}, added by {track.collaborator}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Playlist
