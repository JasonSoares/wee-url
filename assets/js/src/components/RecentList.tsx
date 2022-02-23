import React from "react"
import { ShortUrl } from "../types/ShortUrl"
import RecentItem from "./RecentItem"

interface Props {
  shortUrls: ShortUrl[]
  onCopy: (url: string) => void
}

const RecentList = ({ shortUrls, onCopy }: Props) => {
  return (
    <div className="flex flex-col items-center w-full justify-center mx-auto border-2 rounded-md border-indigo-700">
      {shortUrls.map((item) => (
        <RecentItem key={item.shortUrl} {...item} onCopy={onCopy} />
      ))}
    </div>
  )
}

export default RecentList
