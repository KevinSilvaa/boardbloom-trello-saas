import { auth, currentUser } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { prisma } from '@/lib/prisma'

type CreateAuditLogProps = {
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}

export async function createAuditLog({
  entityId,
  entityType,
  entityTitle,
  action,
}: CreateAuditLogProps) {
  try {
    const { orgId } = auth()

    const user = await currentUser()

    if (!orgId || !user) {
      throw new Error('User not found.')
    }

    await prisma.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + ' ' + user?.lastName,
      },
    })
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error)
  }
}
