import React from 'react'
import { useController, UseFormHandleSubmit } from 'react-hook-form'
import { FormMode } from '../types/Form'

export interface FormFields {
  url: string
}
interface Props {
  mode: FormMode
  control: any
  submitHandler: ({ url: string}) => void
  handleSubmit: UseFormHandleSubmit<FormFields>
  inputChanged?: () => void
}

const validUrl = (currentUrl: string): boolean => {
  try {
    const url = new URL(currentUrl)

    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const Form = ({ submitHandler, inputChanged, mode, control, handleSubmit }: Props) => {
  const { field, fieldState, formState } = useController({
    control,
    name: "url",
    defaultValue: "",
    rules: { required: "Please enter a url", validate: validUrl }
  })

  const {isSubmitting, isSubmitted, isSubmitSuccessful, errors} = formState

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(submitHandler)}>
      <div className="flex items-center border-2 border-indigo-500 rounded mb-1">
        <input
          name="url"
          type="text"
          aria-label="Enter a url"
          aria-invalid={fieldState.error ? "true" : "false"}
          className="appearance-none border-none w-full text-gray-700 py-4 px-2 leading-tight focus:outline-none flex-grow"
          {...field}
          onChange={(e) => {
            field.onChange(e)
            inputChanged && inputChanged()
          }}
          placeholder="http://www.example.com"
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="flex-shrink-0 flex-grow-0 basis-1/4 disabled:opacity-50 bg-indigo-700 hover:bg-indigo-500 border-indigo-500 hover:border-indigo-700 text-white py-4 px-2"
        >
          {isSubmitting ? "Working..." : mode === "shorten" ? "Shorten" : "Copy"}
        </button>
      </div>

      {errors.url && (
        <p role="alert" className="bg-red-200 border-2 rounded border-red-700 text-red-700 py-2 px-4">
          {
            errors.url.type === "validate"
              ? "Please enter a valid url starting with http:// or https://"
              : errors.url.message
          }
        </p>
      )}
    </form>
  )
}

export default Form
