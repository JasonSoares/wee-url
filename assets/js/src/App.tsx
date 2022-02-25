import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocalStorage } from './hooks'
import Header from './components/Header'
import Form, { FormFields } from './components/Form'
import { createShortUrl } from './services/api'
import { FormMode } from './types/Form'
import { ShortUrl } from './types/ShortUrl'
import RecentList from './components/RecentList'
import Alert, { Props as AlertProps } from './components/Alert'

function buildShortUrl(slug: string): string {
  return `${window.location.protocol}//${window.location.host}/${slug}`
}

function isAlreadyShortened(currentUrl: string) {
  try {
    const url = new URL(currentUrl)
    return url.host.toLowerCase() === window.location.host.toLowerCase()
  } catch {
    return false
  }
}

function putRecent(
  newUrl: ShortUrl,
  existingUrls: ShortUrl[],
  maxRecent: number = 5,
): ShortUrl[] {
  existingUrls.unshift(newUrl)
  return existingUrls.slice(0, maxRecent)
}

function App() {
  const [shortUrl, setShortUrl] = useState<string>()
  const [formMode, setFormMode] = useState<FormMode>('shorten')
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>()
  const {
    setValue: setFormValue,
    getValues,
    control,
    handleSubmit,
    resetField,
    setError: setFormError,
  } = useForm<FormFields>({ defaultValues: { url: '' } })
  const [recentUrls, setRecentUrls] = useLocalStorage<ShortUrl[]>(
    'recentUrls',
    [],
  )
  const [currentAlert, setCurrentAlert] = useState<AlertProps | null>(null)

  function dismissAlert(after: number) {
    if (currentTimeout) {
      clearTimeout(currentTimeout)
    }

    const timer = setTimeout(() => {
      setCurrentAlert(null)
    }, after)

    setCurrentTimeout(timer)
  }

  function setSuccessAlert(message: string) {
    setCurrentAlert({ type: 'success', message })
    dismissAlert(5000)
  }

  function setErrorAlert(message: string) {
    setCurrentAlert({ type: 'error', message })
    dismissAlert(5000)
  }

  function copyUrlToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(
      () => {
        setSuccessAlert('URL successfully copied to the clipboard!')
      },
      () => {
        setErrorAlert('Sorry, unable to copy URL to the clipboard')
      },
    )
  }

  const submitHandler = async ({ url }: FormFields) => {
    if (formMode === 'copy') {
      copyUrlToClipboard(shortUrl!)
    } else if (isAlreadyShortened(getValues('url'))) {
      setFormError('url', {
        type: 'manual',
        message: 'URL is already wee',
      })
    } else {
      try {
        const { data } = await createShortUrl(url)
        const newShortUrl = buildShortUrl(data.slug)

        setShortUrl(newShortUrl)
        setFormMode('copy')
        resetField('url')
        setFormValue('url', newShortUrl, {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        })

        setSuccessAlert('Successfully created wee URL!')

        const newRecent = putRecent(
          { url, shortUrl: newShortUrl },
          recentUrls as ShortUrl[],
        )
        setRecentUrls(newRecent)
      } catch (err) {
        console.log({ err })
        setErrorAlert(
          'There was an error handling your request. Please try again later.',
        )
      }
    }
  }

  const inputChanged = () => {
    if (formMode === 'copy') {
      setFormMode('shorten')
    }
  }

  return (
    <>
      <Header />
      <div className="full-width mx-auto mt-24 px-4 w-full max-w-5xl">
        {currentAlert && <Alert {...currentAlert} />}
        <div className="flex items-center w-full justify-center mx-auto">
          <h1 className="text-2xl">
            Paste a link in the form below to get a wee version of it!
          </h1>
        </div>
        <div className="flex items-center w-full justify-center pt-6 mx-auto">
          <Form
            handleSubmit={handleSubmit}
            control={control}
            submitHandler={submitHandler}
            mode={formMode}
            inputChanged={inputChanged}
          />
        </div>
        {recentUrls.length > 0 && (
          <div className="flex items-center w-full justify-center pt-6 mx-auto">
            <RecentList
              shortUrls={recentUrls}
              onCopy={() => copyUrlToClipboard(shortUrl!)}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default App
