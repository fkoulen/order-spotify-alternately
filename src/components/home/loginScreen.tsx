"use client"
import React from "react"
import { Button } from "@/lib/flowbiteComponents"
import { signIn } from "next-auth/react"

const LoginScreen = () => {
  return (
    <div className={"w-full h-screen flex flex-col gap-4 justify-center items-center"}>
      <h1 className={"text-3xl"}>
        Welcome to <span className={"text-emerald-600"}>Dividify</span>!
      </h1>
      <p>Divide your Spotify playlists by collaborators!</p>
      <Button color={"primary"} onClick={() => signIn("spotify")}>
        Sign in to Spotify
      </Button>
    </div>
  )
}

export default LoginScreen
