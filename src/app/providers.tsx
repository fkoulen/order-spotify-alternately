"use client"

import { QueryClient, QueryClientProvider } from "react-query"
import { ReactNode, useState } from "react"
import { SessionProvider } from "next-auth/react"

type Props = {
  children?: ReactNode
}

const Providers = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}

export default Providers
