import { auth } from '@clerk/nextjs'

import { MAX_FREE_BOARDS } from '@/constants/boards'
import { prisma } from '@/lib/prisma'

export async function incrementAvailableCount() {
  const { orgId } = auth()

  if (!orgId) {
    throw new Error('Unauthorized.')
  }

  const orgLimit = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  })

  if (orgLimit) {
    await prisma.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count + 1,
      },
    })
  } else {
    await prisma.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    })
  }
}

export async function decreaseAvailableCount() {
  const { orgId } = auth()

  if (!orgId) {
    throw new Error('Unauthorized.')
  }

  const orgLimit = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  })

  if (orgLimit) {
    await prisma.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    })
  } else {
    await prisma.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    })
  }
}

export async function hasAvailableCount() {
  const { orgId } = auth()

  if (!orgId) {
    throw new Error('Unauthorized.')
  }

  const orgLimit = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  })

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true
  } else {
    return false
  }
}

export async function getAvailableCount() {
  const { orgId } = auth()

  if (!orgId) {
    return 0
  }

  const orgLimit = await prisma.orgLimit.findUnique({
    where: {
      orgId,
    },
  })

  if (!orgLimit) {
    return 0
  }

  return orgLimit.count
}
