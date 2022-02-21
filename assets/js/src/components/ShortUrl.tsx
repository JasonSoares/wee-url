import React from "react"

interface Props {
  url: string
  onCopy: any
}

const ShortUrl: React.FC<Props> = ({ url, onCopy }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <span>{url}</span>
    </div>
  )
}

export default ShortUrl
