import { Card } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '@/utils/create-safe-action'

import { CopyCard } from './schema'

export type InputType = z.infer<typeof CopyCard>
export type ReturnType = ActionState<InputType, Card>
