'use client'

import { createBoard } from '@/actions/create-board'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { useAction } from '@/hooks/use-action'

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
        <FormInput id="title" label="Board Title" errors={fieldErrors} />
      </div>

      <FormSubmit>Save</FormSubmit>
    </form>
  )
}
