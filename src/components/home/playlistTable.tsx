"use client"

import React, { useState } from "react"
import { SimplifiedPlaylistObject } from "@/lib/spotify/spotify"
import { Pagination, Table } from "flowbite-react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { reorderPlaylist } from "@/helpers/utils.helper"

interface PlaylistTableProps {
  playlists: SimplifiedPlaylistObject[]
}

const PlaylistTable = ({ playlists }: PlaylistTableProps) => {
  const token = useSession().data?.accessToken
  const [currentPage, setCurrentPage] = useState(1)

  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(5)

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

  // Records to be displayed on the current page
  const currentRecords = playlists.slice(indexOfFirstRecord, indexOfLastRecord)

  const nPages = Math.ceil(playlists.length / recordsPerPage)

  const [disableButtons, setDisableButtons] = useState(false)

  return (
    <div className={"w-3/5 flex flex-col items-center"}>
      <Table striped className={"w-full min-w-full relative"}>
        <Table.Head>
          <Table.HeadCell>
            <span className="sr-only">Image</span>
          </Table.HeadCell>
          <Table.HeadCell>Playlist</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentRecords.map((item) => {
            const images = item.images
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
                <Table.Cell>
                  <Image
                    src={images?.at(0)?.url ?? ""}
                    alt={"Playlist image"}
                    width={0}
                    height={0}
                    sizes={"100vw"}
                    className={"object-cover float-left h-12 w-12 max-w-[3rem]"}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.name}
                </Table.Cell>
                <Table.Cell>
                  <button
                    disabled={disableButtons}
                    className="font-medium text-emerald-600 hover:underline disabled:text-gray-500 disabled:opacity-50 disabled:hover:no-underline"
                    onClick={() => reorderPlaylist(token, item.id, setDisableButtons)}
                  >
                    <p>Reorder</p>
                  </button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
      <Pagination
        className={"text-white"}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page)
        }}
        showIcons
        totalPages={nPages}
      />
    </div>
  )
}

export default PlaylistTable
