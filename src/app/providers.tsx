"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { CustomFlowbiteTheme } from "@/lib/flowbiteComponents"
import { Flowbite } from "flowbite-react"

type Props = {
  children?: ReactNode
}

const Providers = ({ children }: Props) => {
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

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <SessionProvider>{children}</SessionProvider>
    </Flowbite>
  )
}

export default Providers
