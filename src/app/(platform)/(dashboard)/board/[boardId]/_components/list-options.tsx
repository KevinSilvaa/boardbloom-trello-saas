import { List } from '@prisma/client'
import { MoreHorizontal, X } from 'lucide-react'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

import { copyList } from '@/actions/copy-list'
import { deleteList } from '@/actions/delete-list'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/use-action'

type ListOptionsProps = {
  list: List
  onAddCard: () => void
}

export function ListOptions({ list, onAddCard }: ListOptionsProps) {
  const closeRef = useRef<ElementRef<'button'>>(null)

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted.`)
      closeRef.current?.click()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied.`)
      closeRef.current?.click()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  function onDelete(formData: FormData) {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeDelete({ id, boardId })
  }

  function onCopy(formData: FormData) {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeCopy({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="size-auto p-2">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="start" className="px-0 py-3">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List actions
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <Button
          variant="ghost"
          onClick={onAddCard}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
        >
          Add card...
        </Button>

        <form action={onCopy}>
          <input name="id" id="id" hidden value={list.id} />
          <input name="boardId" id="boardId" hidden value={list.boardId} />

          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Copy list...
          </FormSubmit>
        </form>

        <Separator />

        <form action={onDelete}>
          <input name="id" id="id" hidden value={list.id} />
          <input name="boardId" id="boardId" hidden value={list.boardId} />

          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
