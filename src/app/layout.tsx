import "./globals.css"
import { Inter } from "next/font/google"
import { SpotifyProvider } from "@/spotify/spotify-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dividify",
  description: "Reorder a Spotify playlist by dividing it by collaborator!",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpotifyProvider>{children}</SpotifyProvider>
      </body>
    </html>
  )
}
