import React from 'react'

interface SelectInputProps {
  name: string
  label: string
  onChange: (event: any) => void
  defaultOption?: string
  value?: string | number
  error?: string
  options: Array<any>
}

const SelectInput = (props: SelectInputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
        <select
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className="form-control"
        >
          <option value="">{props.defaultOption}</option>
          {props.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            )
          })}
        </select>
        {props.error && <div className="alert alert-danger">{props.error}</div>}
      </div>
    </div>
  )
}

export default SelectInput
