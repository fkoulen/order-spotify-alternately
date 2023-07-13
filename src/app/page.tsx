"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const { data } = useSession()

  return (
    <>
      <p>Hello</p>
      <code>{JSON.stringify(data)}</code>
      <button
        className={
          "block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        }
        onClick={() => signIn("spotify")}
      >
        Sign in
      </button>
      <button
        className={
          "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        }
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </>
  )
}
