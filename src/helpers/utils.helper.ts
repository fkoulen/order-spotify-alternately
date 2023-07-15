import { PlaylistTrackObject, TrackObject } from "@/lib/spotify/spotify"
import spotifyClient, { setToken } from "@/lib/spotify/spotifyClient"

export type TrackObjectWithCollaborator = TrackObject & {
  collaborator: string | undefined
}
export const reorderListByCollaborator = (list: TrackObjectWithCollaborator[]): TrackObjectWithCollaborator[] => {
  // Get all collaborators and their tracks
  const collaboratorMap: { [id: string]: TrackObjectWithCollaborator[] } = {}
  list.forEach((track) => {
    const collaboratorId = track.collaborator
    if (collaboratorId) {
      collaboratorMap[collaboratorId] = collaboratorMap[collaboratorId] || []
      collaboratorMap[collaboratorId].push(track)
    }
  })

  // Sort in descending order of track count
  const sortedCollaborators = Object.keys(collaboratorMap).sort(
    (a, b) => collaboratorMap[b].length - collaboratorMap[a].length,
  )

  const amountOfBiggestCollaborator = Math.max(
    ...sortedCollaborators.map((collaboratorId) => collaboratorMap[collaboratorId].length),
  )

  const orderedList: TrackObjectWithCollaborator[] = []

  // Enter the songs alternately by collaborator
  for (let i = 0; i < amountOfBiggestCollaborator; i++) {
    sortedCollaborators.forEach((collaboratorId) => {
      const tracksByCollaborator = collaboratorMap[collaboratorId]
      if (i < tracksByCollaborator.length) orderedList.push(tracksByCollaborator[i])
    })
  }

  return orderedList
}

export async function getAllTracks(playlistId: string) {
  const tracks = new Array<TrackObjectWithCollaborator>()
  const collection: PlaylistTrackObject[] = []

  let data = await spotifyClient.getPlaylistsByPlaylistIdTracks(playlistId, {
    limit: 50,
    offset: 0,
    fields: "next, items(added_by.id, track(name, id))",
  })

  const addItemsToCollection = () => data.items?.forEach((item) => collection.push(item))

  addItemsToCollection()

  while (data.next) {
    if (data.next) {
      const url = new URL(data.next)
      const urlSearchParams = new URLSearchParams(url.search)
      data = await spotifyClient.getPlaylistsByPlaylistIdTracks(playlistId, {
        limit: Number.parseInt(urlSearchParams.get("limit") as string),
        offset: Number.parseInt(urlSearchParams.get("offset") as string),
        fields: "next, items(added_by.id, track(name, id))",
      })
      addItemsToCollection()
    }
  }

  await Promise.all(
    collection.map(async (item) => {
      if (item.track) {
        tracks.push({
          ...(item.track as TrackObjectWithCollaborator),
          collaborator: item.added_by?.id,
        })
      }
    }),
  )

  return tracks
}

async function reorderNextIncorrectlyPlacedSong(
  realTracks: TrackObjectWithCollaborator[],
  reorderedTracks: TrackObjectWithCollaborator[],
  playlistId: string,
) {
  for (let i = 0; i < realTracks.length; i++) {
    const realTrack = realTracks[i]
    const reorderedTrack = reorderedTracks[i]

    if (JSON.stringify(realTrack) !== JSON.stringify(reorderedTrack)) {
      const indexInRealTracks = realTracks.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(reorderedTracks.find((item) => item === reorderedTrack)),
      )
      spotifyClient
        .putPlaylistsByPlaylistIdTracks(playlistId, {
          range_start: indexInRealTracks,
          insert_before: i,
          range_length: 1,
        })
        .then(() => {
          getAllTracks(playlistId)
            .then((res) => {
              realTracks = res
              if (JSON.stringify(realTracks) !== JSON.stringify(reorderedTracks)) {
                reorderNextIncorrectlyPlacedSong(realTracks, reorderedTracks, playlistId)
              }
            })
            .catch((e) => alert(e.message))
        })
        .catch((e) => alert(e.message))

      break
    }
  }
}

export async function reorderPlaylist(
  token: string | undefined,
  playlistId: string | undefined,
  setDisableButtons: (value: ((prevState: boolean) => boolean) | boolean) => void,
) {
  if (!token) alert("no token provided")
  if (!playlistId) alert("no playlist id provided")

  if (token && playlistId) {
    setToken(token)
    let realTracks = await getAllTracks(playlistId)
    const reorderedTracks = reorderListByCollaborator(realTracks)

    alert("started reordering!")
    await reorderNextIncorrectlyPlacedSong(realTracks, reorderedTracks, playlistId)
  }
}
