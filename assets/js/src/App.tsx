import React, { useState } from "react"
import Form from "./components/Form"
import ShortUrl from "./components/ShortUrl"
import { createShortUrl } from "./services/api"

const App: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null)
  const onSubmit = async ({ url }) => {
    const data = await createShortUrl(url)
    console.log(data)
    setUrl(`http://localhost:4000/${data.data.slug}`)
  }

  const onCopy = () => {}

  return (
    <div className="container mx-auto">
      <div className="w-full max-w-xs">
        <Form onSubmit={onSubmit} />
      </div>
      <div className="w-full max-w-xs">
        <ShortUrl
          url={url}
          onCopy={onCopy}
        />
      </div>
    </div>
  )
}

export default App
