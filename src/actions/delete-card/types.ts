import { Card } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '@/utils/create-safe-action'

import { DeleteCard } from './schema'

export type InputType = z.infer<typeof DeleteCard>
export type ReturnType = ActionState<InputType, Card>
