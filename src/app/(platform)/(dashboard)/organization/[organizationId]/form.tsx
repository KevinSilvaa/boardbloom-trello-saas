'use client'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'

import { FormButton } from './form-button'
import { FormInput } from './form-input'

export function Form() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log('Success', data)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  function handleSubmit(formData: FormData) {
    const title = formData.get('title') as string

    execute({ title })
  }

  return (
    <form action={handleSubmit}>
      <div className="flex flex-col gap-2">
        <FormInput errors={fieldErrors} />
      </div>

      <FormButton />
    </form>
  )
}
