import { TrackObjectWithCollaborator } from "@/helpers/utils.helper"

export const stringToColour = (str: string) => {
  let hash = 0
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = "#"
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, "0")
  }
  return colour
}

/**
 * Reorder a list
 * @param range_start the position of the first item to be reordered
 * @param insert_before the position where the items should be inserted
 * @param range_length the amount of items to be reordered
 * @param list the list to be reordered
 */
export const reorderList = (
  range_start: number,
  insert_before: number,
  range_length: number = 1,
  list: TrackObjectWithCollaborator[],
): TrackObjectWithCollaborator[] => {
  const orderedList = [...list]
  const itemsToMove = orderedList.splice(range_start, range_length)
  console.log("reordered ", itemsToMove.map((item) => item.name).join(", "))
  orderedList.splice(insert_before, 0, ...itemsToMove)
  return orderedList
}
