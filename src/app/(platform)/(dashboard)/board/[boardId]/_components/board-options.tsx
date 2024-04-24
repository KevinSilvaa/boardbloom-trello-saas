'use client'

import { MoreHorizontal, X } from 'lucide-react'
import { toast } from 'sonner'

import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'

type BoardOptionsProps = {
  id: string
}

export function BoardOptions({ id }: BoardOptionsProps) {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error)
    },
  })

  function onDelete() {
    execute({ id })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="size-auto p-2">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="start" className="px-0 py-3">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Board Actions
        </div>

        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 size-auto p-2 text-neutral-600"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="h-auto w-full justify-start rounded-none px-5 py-2 text-sm font-normal"
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  )
}
