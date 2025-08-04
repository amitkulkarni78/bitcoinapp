import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const input = tv({
  base: 'w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2',
  variants: {
    variant: {
      primary: 'bg-gray-700 focus:ring-blue-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return <input className={input({ variant, className })} ref={ref} {...props} />
  },
)

Input.displayName = 'Input'

export { Input }
