import * as React from "react"

import { cn } from "@/lib/utils"

interface CheckboxProps extends Omit<React.ComponentProps<"input">, 'onChange'> {
  onChange?: (checked: boolean) => void
}

function Checkbox({
  className,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      onChange={(e) => onChange?.(e.target.checked)}
      {...props}
    />
  )
}

export { Checkbox }
