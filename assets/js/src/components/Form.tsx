import React from 'react'
import { useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { FormMode } from '../types/Form'

export interface FormFields {
  url: string
}
interface Props {
  onSubmit: any
  mode: FormMode
  inputChanged?: any
  register: UseFormRegister<FormFields>
  handleSubmit: UseFormHandleSubmit<FormFields>
}

const Form: React.FC<Props> = ({ onSubmit, inputChanged, mode, register, handleSubmit }) => {
  // const { register, handleSubmit, formState: {errors} } = useForm()
  const field = register("url", { required: "required"})

  return (
    <form
      className="w-full max-w-lg"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center border border-indigo-500 rounded mb-1">
        <input
          name="url"
          type="text"
          aria-label="Enter a url"
          // aria-invalid={errors.url ? "true" : "false"}
          className="appearance-none bg-transparent border-none w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none flex-grow"
          {...field}
          onChange={(e) => {
            inputChanged && inputChanged()
            field.onChange(e)
          }}
          placeholder="http://www.example.com"
        />
        <input
          className="flex-shrink-0 bg-indigo-700 hover:bg-indigo-500 border-indigo-500 hover:border-indigo-700 text-sm text-white py-2 px-2"
          type="submit"
          value={mode === "shorten" ? "Shorten URL" : "Copy"}
        />
      </div>
      {/* {errors.url && errors.url.type === "required" && (
        <p role="alert" className="text-red-500 text-xs italic">Please enter a valid url</p>
      )} */}

    </form>
  )
}

export default Form
