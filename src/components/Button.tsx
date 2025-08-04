import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'font-bold py-2 px-4 rounded-lg transition duration-300',
  variants: {
    variant: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    },
    fullWidth: {
      true: 'w-full',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button: React.FC<ButtonProps> = ({ className, variant, fullWidth, disabled, ...props }) => (
  <button
    className={button({ variant, fullWidth, disabled, className })}
    disabled={disabled}
    {...props}
  />
)

Button.displayName = 'Button'

export { Button, button }
