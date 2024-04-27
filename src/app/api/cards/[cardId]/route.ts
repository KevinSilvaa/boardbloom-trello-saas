import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

type ParamsType = {
  params: {
    cardId: string
  }
}

export async function GET(req: Request, { params }: ParamsType) {
  try {
    const { userId, orgId } = auth()

    if (!userId || !orgId) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
    }

    const card = await prisma.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    })

    return NextResponse.json(card, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 },
    )
  }
}
