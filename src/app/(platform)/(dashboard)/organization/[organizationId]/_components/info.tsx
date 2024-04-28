'use client'

import { useOrganization } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'
import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

type InfoProps = {
  isPro: boolean
}

export function Info({ isPro }: InfoProps) {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <Info.Skeleton />
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative size-[60px]">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="Organanization"
          className="rounded-md object-cover"
        />
      </div>

      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>

        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="mr-1 size-3" />
          {isPro ? 'Pro' : 'Free'}
        </div>
      </div>
    </div>
  )
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative size-[60px]">
        <Skeleton className="absolute h-full w-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />

        <div className="flex items-center">
          <Skeleton className="mr-2 size-4" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  )
}
