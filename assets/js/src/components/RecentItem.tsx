import React from "react"

interface Props {
  url: string
  shortUrl: string
  onCopy: (url: string) => void
}

const RecentItem = ({ url, shortUrl, onCopy }: Props) => {
  return (
    <div className="flex flex-col border-t first:rounded-t-md last:rounded-b-md border-indigo-300 first:border-t-0 md:space-x-5 md:flex-row lg:flex-row xl:flex-row 2xl:flex-row 3xl:flex-row justify-center align-middle w-full bg-indigo-200 py-4 px-4">
      <div className="basis-2/3 my-auto truncate py-4 text-sm" >{url}</div>
      <div className="my-auto text-indigo-700"><a className="truncate" href={shortUrl} target="_blank">{shortUrl}</a></div>
      <button
        type="button"
        onClick={() => onCopy(shortUrl)}
        className="flex-shrink-0 flex-grow-0 bg-indigo-700 hover:bg-indigo-500 border-indigo-300 text-white text-sm px-8 py-4 rounded mt-4 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0 3xl:mt-0">
        Copy
      </button>
    </div>
  )
}

export default RecentItem
