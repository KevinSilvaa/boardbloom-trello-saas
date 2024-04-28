'use server'

import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/utils/create-audit-log'
import { createSafeAction } from '@/utils/create-safe-action'
import { hasAvailableCount, incrementAvailableCount } from '@/utils/org-limit'
import { checkSubscription } from '@/utils/subscription'

import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

export async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const canCreateNewBoard = await hasAvailableCount()
  const isPro = await checkSubscription()

  if (!canCreateNewBoard && !isPro) {
    return {
      error:
        'You have reached your limit of free boards. Please upgrade to create more.',
    }
  }

  const { title, image } = data

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|')

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: 'Missing fields. Failed to create board.',
    }
  }

  let board

  try {
    board = await prisma.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    })

    if (!isPro) {
      await incrementAvailableCount()
    }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: 'Failed to create.',
    }
  }

  revalidatePath(`/board/${board.id}`)

  return {
    data: board,
  }
}

export const createBoard = createSafeAction(CreateBoard, handler)
