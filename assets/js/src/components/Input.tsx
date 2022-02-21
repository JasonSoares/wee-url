import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form';
import { FormFields } from './Form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: UseControllerProps<FormFields>
}

const Input: React.FC<InputProps> = (props) => {
  const {control, ...rest} = props
  const { field } = useController(control)
  return (
    <input {...rest}
    />
  )
}

export default Input
