'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'

export async function deleteBoard(id: string) {
  await prisma.board.delete({
    where: {
      id,
    },
  })

  revalidatePath('/organization/org_2f6AZHeSH8dLv8Z1v0avXEwrSwg')
}
