'use client'

import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import {
  ElementRef,
  forwardRef,
  KeyboardEvent as KeyboardEventType,
  useRef,
} from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { createCard } from '@/actions/create-card'
import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'

type CardFormProps = {
  listId: string
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null)

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created!`)
        formRef.current?.reset()
      },
      onError: (error) => {
        toast.error(error)
      },
    })

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        disableEditing()
      }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener('keydown', onKeyDown)

    function onTextareaKeyDown(
      event: KeyboardEventType<HTMLTextAreaElement>,
    ): void {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    function onSubmit(formData: FormData) {
      const title = formData.get('title') as string
      const listId = formData.get('listId') as string
      const boardId = params.boardId as string

      execute({ title, listId, boardId })
    }

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            errors={fieldErrors}
            placeholder="Enter a title for this card..."
          />

          <input hidden id="listId" name="listId" value={listId} />

          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button variant="ghost" onClick={disableEditing} size="sm">
              Cancel
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className="px-2 pt-2">
        <Button
          variant="ghost"
          onClick={enableEditing}
          size="sm"
          className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
        >
          <Plus className="mr-2 size-4" />
          Add a card
        </Button>
      </div>
    )
  },
)

CardForm.displayName = 'CardForm'
