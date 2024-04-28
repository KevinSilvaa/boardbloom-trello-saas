'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Layout } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

import { CardWithList } from '@/@types/card-and-list'
import { updateCard } from '@/actions/update-card'
import { FormInput } from '@/components/form/form-input'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'

type HeaderProps = {
  data: CardWithList
}

export function Header({ data }: HeaderProps) {
  const queryClient = useQueryClient()
  const params = useParams()

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      })

      queryClient.invalidateQueries({
        queryKey: ['card-logs', data.id],
      })

      toast.success(`Renamed to "${data.title}"`)
      setTitle(data.title)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const inputRef = useRef<ElementRef<'input'>>(null)
  const [title, setTitle] = useState(data.title)

  function onBlur() {
    inputRef.current?.form?.requestSubmit()
  }

  function onSubmit(formData: FormData) {
    const title = formData.get('title') as string
    const boardId = params.boardId as string

    if (title === data.title) {
      return
    }

    execute({ title, boardId, id: data.id })
  }

  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout className="mt-1 size-5 text-neutral-700" />

      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="relative -left-1.5 mb-0.5 truncate border-transparent bg-transparent px-1 text-lg font-semibold text-neutral-700 focus-visible:w-[95%] focus-visible:border-input focus-visible:bg-white"
          />
        </form>

        <p className="to-muted-foreground text-sm">
          In list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  )
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Skeleton className="mt-1 size-6 bg-neutral-200" />

      <div>
        <Skeleton className="mb-1 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-4 w-12 bg-neutral-200" />
      </div>
    </div>
  )
}
