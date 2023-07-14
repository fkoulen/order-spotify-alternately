"use client"
import { Button } from "@/lib/flowbiteComponents"
import React from "react"
import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <Button color={"primary"} onClick={() => signOut()}>
      Sign out
    </Button>
  )
}
