import React from 'react'

interface FormTextareaProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  rows?: number
  className?: string
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  className = ''
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="form-textarea"
      />
    </div>
  )
}
