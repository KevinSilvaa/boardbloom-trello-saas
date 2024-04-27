'use client'

import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { CardWithList } from '@/@types/card-and-list'
import { updateCard } from '@/actions/update-card'
import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'

type DescriptionProps = {
  data: CardWithList
}

export function Description({ data }: DescriptionProps) {
  const queryClient = useQueryClient()
  const params = useParams()

  const [isEditing, setIsEditing] = useState(false)

  const textareaRef = useRef<ElementRef<'textarea'>>(null)
  const formRef = useRef<ElementRef<'form'>>(null)

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })

      toast.success(`Card "${data.title}" updated successfully!`)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  function onSubmit(formData: FormData) {
    const description = formData.get('description') as string
    const boardId = params.boardId as string

    execute({ id: data.id, description, boardId })
  }

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 size-5 text-neutral-700" />

      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Description</p>

        {isEditing ? (
          <form ref={formRef} action={onSubmit} className="space-y-2">
            <FormTextarea
              id="description"
              ref={textareaRef}
              placeholder="Add a more detailed description"
              defaultValue={data.description || undefined}
              errors={fieldErrors}
              className="mt-2 w-full"
            />

            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={disableEditing}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            onClick={enableEditing}
            className="min-h-[78px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium"
          >
            {data.description || 'Add a more detailed description...'}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="size-6 bg-neutral-200" />

      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  )
}
