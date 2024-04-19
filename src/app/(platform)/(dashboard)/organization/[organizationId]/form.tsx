'use client'

import { useFormState } from 'react-dom'

import { createBoard, CreateBoardPreviousState } from '@/actions/create-board'

import { FormButton } from './form-button'
import { FormInput } from './form-input'

export function Form() {
  const initalState = {
    message: null,
    errors: {},
  } as CreateBoardPreviousState

  const [state, dispatch] = useFormState(createBoard, initalState)

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-2">
        <FormInput errors={state?.errors} />
      </div>

      <FormButton />
    </form>
  )
}
