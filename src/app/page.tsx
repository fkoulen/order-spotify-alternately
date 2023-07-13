"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, Button, CustomFlowbiteTheme, Flowbite, Spinner } from "flowbite-react"

export default function Home() {
  const { data: session, status } = useSession()
  const getContent = () => {
    if (status === "loading")
      return (
        <div className={"w-full h-screen flex justify-center items-center"}>
          <Spinner color={"success"} size={"xl"} />
        </div>
      )

    if (status === "unauthenticated")
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

    if (session) {
      return (
        <div className={"w-full h-screen flex flex-col gap-4 justify-center items-center"}>
          <h1 className={"text-3xl"}>
            Welcome<span className={"text-emerald-600"}> {session.user?.name}</span>!
          </h1>
          <Avatar img={session.user?.image ?? ""} rounded size={"lg"} />
          <Button color={"primary"} onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      )
    }
  }

  const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        primary:
          "text-white bg-emerald-700 border border-transparent enabled:hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:enabled:hover:bg-emerald-700 dark:focus:ring-emerald-800",
      },
    },
    spinner: {
      color: {
        success: "fill-emerald-700",
      },
    },
  }

  return <Flowbite theme={{ theme: customTheme }}>{getContent()}</Flowbite>
}
