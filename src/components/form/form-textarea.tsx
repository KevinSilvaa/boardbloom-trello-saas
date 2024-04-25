'use client'

import { forwardRef, KeyboardEventHandler } from 'react'
import { useFormStatus } from 'react-dom'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utils/cn'

import { FormErrors } from './form-errors'

type FormTextareaProps = {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  onBlur?: () => void
  onClick?: () => void
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
  defaultValue?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      onKeyDown,
      defaultValue,
    },
    ref,
  ) => {
    const { pending } = useFormStatus()

    return (
      <div className="w-full space-y-2">
        <div className="w-full space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-sm font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}

          <Textarea
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            required={required}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={pending || disabled}
            defaultValue={defaultValue}
            aria-describedby={`${id}-error`}
            className={cn(
              'resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring focus-visible:ring-offset-0',
              className,
            )}
          />
        </div>

        <FormErrors id={id} errors={errors} />
      </div>
    )
  },
)

FormTextarea.displayName = 'FormTextarea'
