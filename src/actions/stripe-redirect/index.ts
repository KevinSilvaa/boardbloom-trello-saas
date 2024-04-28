'use server'

import { auth, currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/utils/absolute-url'
import { createSafeAction } from '@/utils/create-safe-action'

import { StripeRedirect } from './schema'
import { InputType, ReturnType } from './types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()
  const user = await currentUser()

  if (!userId || !orgId || !user) {
    return {
      error: 'Unauthorized',
    }
  }

  const settingsUrl = absoluteUrl(`/organization/${orgId}`)

  let url = ''

  try {
    const orgSubscription = await prisma.orgSubscription.findUnique({
      where: {
        orgId,
      },
    })

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })

      url = stripeSession.url
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: 'BoardBloom Pro',
                description: 'Unlimited boards for your organization',
              },
              unit_amount: 2000, // $20 dollars,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      })

      url = stripeSession.url || ''
    }
  } catch (error) {
    return {
      error: 'Something went wrong!',
    }
  }

  revalidatePath(`/organization/${orgId}`)

  return {
    data: url,
  }
}

export const stripeRedirect = createSafeAction(StripeRedirect, handler)
