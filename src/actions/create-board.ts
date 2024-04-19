'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const createBoardSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Minimun length of 3 letters is required' }),
})

export type CreateBoardPreviousState = {
  errors?: {
    title?: string[]
  }
  message?: string | null
}

export type CreateBoardStateType = z.infer<typeof createBoardSchema>

export async function createBoard(
  prevState: CreateBoardPreviousState,
  formData: FormData,
) {
  const validatedFields = createBoardSchema.safeParse({
    title: formData.get('title'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields.',
    }
  }

  const { title } = validatedFields.data

  try {
    await prisma.board.create({
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      message: 'Database Error',
    }
  }

  revalidatePath('/organization/org_2f6AZHeSH8dLv8Z1v0avXEwrSwg')
  redirect('/organization/org_2f6AZHeSH8dLv8Z1v0avXEwrSwg')
}
