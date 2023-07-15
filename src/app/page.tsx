import { CustomFlowbiteTheme } from "@/lib/flowbiteComponents"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import HomeScreen from "@/components/home/homeScreen"
import LoginScreen from "@/components/home/loginScreen"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return session ? <HomeScreen session={session} /> : <LoginScreen />
}
