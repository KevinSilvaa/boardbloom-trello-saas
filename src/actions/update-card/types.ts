import { Card } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '@/utils/create-safe-action'

import { UpdateCard } from './schema'

export type InputType = z.infer<typeof UpdateCard>
export type ReturnType = ActionState<InputType, Card>
