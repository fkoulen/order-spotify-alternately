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
    <div className={"w-full h-screen flex flex-col gap-4 justify-center items-center"}>
      <h1 className={"text-3xl"}>
        Welcome<span className={"text-emerald-600"}> {session?.user?.name}</span>!
      </h1>
      <Avatar img={session?.user?.image ?? ""} rounded size={"lg"} />
      <Playlists />
      <SignOutButton />
    </div>
  )
}

export default HomeScreen
