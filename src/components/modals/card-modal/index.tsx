'use client'

import { useQuery } from '@tanstack/react-query'

import { CardWithList } from '@/@types/card-and-list'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCardModal } from '@/contexts/card-modal-context'
import { fetcher } from '@/lib/fetcher'

import { Header } from './header'

export function CardModal() {
  const { id, isOpen, onClose } = useCardModal()
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
      </DialogContent>
    </Dialog>
  )
}
