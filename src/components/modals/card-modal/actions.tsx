'use client'

import { Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { CardWithList } from '@/@types/card-and-list'
import { copyCard } from '@/actions/copy-card'
import { deleteCard } from '@/actions/delete-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useCardModal } from '@/contexts/card-modal-context'
import { useAction } from '@/hooks/use-action'

type ActionsProps = {
  data: CardWithList
}

export function Actions({ data }: ActionsProps) {
  const params = useParams()
  const cardModal = useCardModal()

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title} copied successfully!"`)
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error)
      },
    },
  )
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title} deleted successfully!"`)
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error)
      },
    },
  )

  function onCopy() {
    const boardId = params.boardId as string

    executeCopyCard({ id: data.id, boardId })
  }

  function onDelete() {
    const boardId = params.boardId as string

    executeDeleteCard({ id: data.id, boardId })
  }

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>

      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        size="inline"
        className="w-full justify-start"
      >
        <Copy className="mr-2 size-4" />
        Copy
      </Button>

      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="gray"
        size="inline"
        className="w-full justify-start"
      >
        <Trash className="mr-2 size-4" />
        Delete
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  )
}
