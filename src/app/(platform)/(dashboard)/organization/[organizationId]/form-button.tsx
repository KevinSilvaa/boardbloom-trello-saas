'use client'

import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'

export function FormButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit">
      Submit
    </Button>
  )
}
