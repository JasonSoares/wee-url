import React from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  onSubmit: any
}

const Form: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: {errors} } = useForm()

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label
          htmlFor="url"
          className="block text-gray-700 text-sm font-bold mb-2">Url:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          {...register("url", { required: "required" })}
          name="url"
        />
        <p className="text-red-500 text-xs italic">{errors.url?.message}</p>
      </div>
      <input
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        value="Shorten URL" />
    </form>
  )
}

export default Form
