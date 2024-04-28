import { Card } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '@/utils/create-safe-action'

import { UpdateCardOrder } from './schema'

export type InputType = z.infer<typeof UpdateCardOrder>
export type ReturnType = ActionState<InputType, Card[]>
