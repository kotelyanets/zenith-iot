import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80",
                secondary:
                    "border-transparent bg-zinc-800 text-zinc-100 hover:bg-zinc-800/80",
                destructive:
                    "border-transparent bg-rose-500 text-zinc-50 hover:bg-rose-500/80",
                outline: "text-zinc-300 border-zinc-700",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
