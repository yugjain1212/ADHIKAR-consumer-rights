import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border-border bg-transparent text-foreground hover:bg-muted/50",
        accent: 
          "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        success: 
          "border-transparent bg-success text-success-foreground hover:bg-success/80",
        warning: 
          "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        info: 
          "border-transparent bg-info text-info-foreground hover:bg-info/80",
        ghost: 
          "border-transparent bg-muted/50 text-muted-foreground hover:bg-muted",
        subtle: 
          "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        "subtle-secondary": 
          "border-transparent bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
        "subtle-accent": 
          "border-transparent bg-accent/10 text-accent hover:bg-accent/20",
        "subtle-success": 
          "border-transparent bg-success/10 text-success hover:bg-success/20",
        "subtle-warning": 
          "border-transparent bg-warning/10 text-warning hover:bg-warning/20",
        "subtle-info": 
          "border-transparent bg-info/10 text-info hover:bg-info/20",
        "subtle-destructive": 
          "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[0.625rem]",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
