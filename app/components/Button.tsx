"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ButtonX({ children, className }: { children: React.ReactNode, className?: string, lo?: any, setLo?: any }) {
    const { pending } = useFormStatus()

    return (
        <Button variant={"outline"} className={className} type="submit" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </>
            ) : children}
        </Button>
    )
}