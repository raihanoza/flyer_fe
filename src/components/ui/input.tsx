import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-[#D4D7E3] bg-[#F7FBFF] p-4 text-sm ring-offset-[#F7FBFF] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#8897AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8897AD] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
