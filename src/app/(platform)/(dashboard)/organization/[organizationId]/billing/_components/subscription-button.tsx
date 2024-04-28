'use client'

import { toast } from 'sonner'

import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import { useProModal } from '@/contexts/pro-modal-context'
import { useAction } from '@/hooks/use-action'

type SubscriptionButtonProps = {
  isPro: boolean
}

export function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
  const proModal = useProModal()

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  function onClick() {
    if (isPro) {
      execute({})
    } else {
      proModal.onOpen()
    }
  }

  return (
    <Button disabled={isLoading} onClick={onClick}>
      {isPro ? 'Manage subscription' : 'Upgrade to pro'}
    </Button>
  )
}
