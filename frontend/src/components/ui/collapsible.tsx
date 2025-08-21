"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CollapsibleProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

const Collapsible = React.forwardRef<
  HTMLDivElement,
  CollapsibleProps
>(({ open = false, onOpenChange, children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      {children}
    </div>
  )
})
Collapsible.displayName = "Collapsible"

interface CollapsibleTriggerProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  asChild?: boolean
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ children, className, onClick, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick,
      ref,
      className: cn(className),
      ...props
    })
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn("w-full", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

interface CollapsibleContentProps {
  children: React.ReactNode
  className?: string
}

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden transition-all duration-200", className)}
      {...props}
    >
      {children}
    </div>
  )
})
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
