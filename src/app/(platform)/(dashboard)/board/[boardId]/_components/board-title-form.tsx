'use client'

import { Board } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

import { updateBoard } from '@/actions/update-board'
import { FormInput } from '@/components/form/form-input'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'

type BoardTitleFormProps = {
  board: Board
}

export function BoardTitleForm({ board }: BoardTitleFormProps) {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [title, setTitle] = useState(board.title)
  const [isEditing, setIsEditing] = useState(false)

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }

  function onSubmit(formData: FormData) {
    const title = formData.get('title') as string

    if (title === board.title) {
      return disableEditing()
    }

    execute({ title, id: board.id })
  }

  function onBlur() {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          ref={inputRef}
          className="h-7 border-none bg-transparent px-2 py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
        />
      </form>
    )
  }

  return (
    <Button
      variant="transparent"
      onClick={enableEditing}
      className="size-auto px-2 py-1 text-lg font-bold"
    >
      {title}
    </Button>
  )
}
