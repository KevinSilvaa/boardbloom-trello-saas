import { auth } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'

const DAY_IN_MS = 60 * 60 * 24 * 1000 // 1 day

export async function checkSubscription() {
  const { orgId } = auth()

  if (!orgId) {
    return false
  }

  const orgSubscription = await prisma.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!orgSubscription) {
    return false
  }

  const isSubscriptionValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isSubscriptionValid
}
