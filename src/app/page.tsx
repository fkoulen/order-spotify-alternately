import { CustomFlowbiteTheme, Flowbite } from "@/lib/flowbiteComponents"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import HomeScreen from "@/components/home/homeScreen"
import LoginScreen from "@/components/home/loginScreen"

export default async function Home() {
  const session = await getServerSession(authOptions)

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
    <Flowbite theme={{ theme: customTheme }}>{session ? <HomeScreen session={session} /> : <LoginScreen />}</Flowbite>
  )
}
