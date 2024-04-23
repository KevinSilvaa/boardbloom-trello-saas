'use client'

import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

type FormSubmitProps = {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}

export function FormSubmit({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  )
}
