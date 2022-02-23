import React from "react";

export interface Props {
  type: "success" | "error"
  message: string
  onClick: () => void
}

const Alert = ({ type, message, onClick}: Props) => {
  const backgroundColor = type == "error" ? "bg-red-200" : "bg-indigo-200"
  const textColor = type === "error" ? "text-red-900" : "text-indigo-900"
  const borderColor = type === "error" ? "border-red-900" : "border-indigo-900"

  return (
    <div role="alert"
      onClick={onClick}
      className={`w-full py-4 px-4 border-2 rounded-md mb-4 cursor-pointer ${backgroundColor} ${textColor} ${borderColor}`}>
      {message}
    </div>
  )
}

export default Alert
