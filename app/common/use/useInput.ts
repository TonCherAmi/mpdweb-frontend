import React, { useState } from 'react'

import Handler from '@app/common/types/Handler'

export interface Input {
  value: string
  handleChange: React.ChangeEventHandler<HTMLInputElement>
}

const useInput = (initialValue: string, onChange?: Handler<string>): Input => {
  const [value, setValue] = useState(initialValue)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)

    onChange?.(event.target.value)
  }

  return { value, handleChange }
}

export default useInput
