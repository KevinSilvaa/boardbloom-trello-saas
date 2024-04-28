import { auth } from '@clerk/nextjs'
import { ENTITY_TYPE } from '@prisma/client'
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

    const auditLogs = await prisma.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    })

    return NextResponse.json(auditLogs, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
