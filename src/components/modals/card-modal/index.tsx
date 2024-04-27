'use client'

import { useQuery } from '@tanstack/react-query'

import { CardWithList } from '@/@types/card-and-list'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCardModal } from '@/contexts/card-modal-context'
import { fetcher } from '@/lib/fetcher'

import { Actions } from './actions'
import { Description } from './description'
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

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
            </div>
          </div>

          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
