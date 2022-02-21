import React, { useState } from "react"
import { useForm, useWatch, useFormState } from "react-hook-form"
import Form, { FormFields } from "./components/Form"
import { createShortUrl } from "./services/api"
import { FormMode } from "./types/Form"

const App: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [mode, setMode] = useState<FormMode>("shorten")

  const {setValue, register, handleSubmit} = useForm<FormFields>()

  const onSubmit = async ({ url }) => {
    if (mode === "copy") {
      console.log('copy')
    } else {
      const data = await createShortUrl(url)
      console.log(data)
      const shortUrl = `http://localhost:4000/${data.data.slug}`
      setMode("copy")
      setUrl(shortUrl)
      setValue("url", shortUrl, { shouldDirty: false, shouldTouch: false, shouldValidate: false})
    }
  }

  const inputChanged = (_e) => {
    if (mode === "copy") {
      setMode("shorten")
    }
  }

  return (
    <>
      <div className="flex items-center w-full justify-center pt-6 mx-auto">
        <Form handleSubmit={handleSubmit} register={register} onSubmit={onSubmit} mode={mode} inputChanged={inputChanged} />
      </div>
    </>
  )
}

export default App
