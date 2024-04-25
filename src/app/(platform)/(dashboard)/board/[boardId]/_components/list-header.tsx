'use client'

import { List } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'

import { updateList } from '@/actions/update-list'
import { FormInput } from '@/components/form/form-input'
import { useAction } from '@/hooks/use-action'

import { ListOptions } from './list-options'

type ListHeaderProps = {
  onAddCard: () => void
  list: List
}

export function ListHeader({ onAddCard, list }: ListHeaderProps) {
  const [title, setTitle] = useState(list.title)
  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

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

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  function onSubmit(formData: FormData) {
    const title = formData.get('title') as string
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    if (title === list.title) {
      return disableEditing()
    }

    execute({ title, id, boardId })
  }

  function onBlur() {
    formRef.current?.requestSubmit()
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      formRef.current?.requestSubmit()
    }
  }

  useEventListener('keydown', onKeyDown)

  return (
    <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={list.id} />
          <input hidden id="boardId" name="boardId" value={list.boardId} />

          <FormInput
            ref={inputRef}
            id="title"
            placeholder="Enter list title..."
            errors={fieldErrors}
            defaultValue={title}
            onBlur={onBlur}
            className="h-7 truncate border-transparent bg-transparent px-[7px] pb-1.5 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
          />

          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
        >
          {title}
        </div>
      )}

      <ListOptions list={list} onAddCard={onAddCard} />
    </div>
  )
}
