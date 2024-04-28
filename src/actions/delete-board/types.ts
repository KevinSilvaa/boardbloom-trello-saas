import { Board } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '@/utils/create-safe-action'

import { DeleteBoard } from './schema'

export type InputType = z.infer<typeof DeleteBoard>
export type ReturnType = ActionState<InputType, Board>
