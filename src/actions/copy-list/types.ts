import { List } from '@prisma/client'
import { z } from 'zod'

import { ActionState } from '@/utils/create-safe-action'

import { CopyList } from './schema'

export type InputType = z.infer<typeof CopyList>
export type ReturnType = ActionState<InputType, List>
