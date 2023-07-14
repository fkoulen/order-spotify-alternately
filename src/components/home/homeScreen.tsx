import React from "react"
import { Avatar } from "@/lib/flowbiteComponents"
import Playlists from "@/components/home/playlists"
import { SignOutButton } from "@/components/home/signOutButton"
import { Session } from "next-auth"

interface HomeScreenProps {
  session: Session
}

const HomeScreen = ({ session }: HomeScreenProps) => {
  return (
    <div className={"w-full min-h-screen h-full flex flex-col gap-4 items-center pt-12"}>
      <h1 className={"text-3xl"}>
        Welcome<span className={"text-emerald-600"}> {session?.user?.name}</span>!
      </h1>
      <Avatar img={session?.user?.image ?? ""} rounded size={"lg"} />
      <em className={"text-zinc-500"}>Note: you can only reorder playlists of which you are the owner.</em>
      <Playlists />
      <SignOutButton />
    </div>
  )
}

export default HomeScreen
