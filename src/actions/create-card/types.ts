import { Card } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '@/utils/create-safe-action'

import { CreateCard } from './schema'

export type InputType = z.infer<typeof CreateCard>
export type ReturnType = ActionState<InputType, Card>
