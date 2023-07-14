import React from "react"
import { Spinner } from "@/lib/flowbiteComponents"

const Loading = () => {
  return (
    <div className={"w-full h-screen flex justify-center items-center"}>
      <Spinner color={"success"} size={"xl"} />
    </div>
  )
}

export default Loading
