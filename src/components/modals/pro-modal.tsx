'use client'

import Image from 'next/image'
import { toast } from 'sonner'

import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useProModal } from '@/contexts/pro-modal-context'
import { useAction } from '@/hooks/use-action'

export function ProModal() {
  const { isOpen, onClose } = useProModal()

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  function onClick() {
    execute({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center">
          <Image
            src="/hero.svg"
            alt="Hero"
            priority
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>

        <div className="mx-auto space-y-6 p-6 text-neutral-700">
          <h2 className="text-xl font-semibold">
            Upgrade to BoardBloom Pro Today!
          </h2>

          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of BoardBloom
          </p>

          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>

          <Button onClick={onClick} disabled={isLoading} className="w-full">
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
