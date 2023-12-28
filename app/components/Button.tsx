"use client"

import { Button } from "@/components/ui/button"
// import { Button } from "@nextui-org/react"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useFormStatus } from "react-dom"

export function ButtonX({ children, color, className }: { children: React.ReactNode, color?: any, className?: string, lo?: any, setLo?: any }) {
    const { pending } = useFormStatus()


    return (
        <>
            {/* <button className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900 hover:bg-sky-800">
                {pending ? 'Saving...' : children}
            </button> */}

            <Button type="submit" disabled={pending}>
                {pending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </>
                ) : children}
            </Button>

            {/* <Button type="submit" isLoading={pending} color={color} className={className}>{children}</Button> */}
        </>
    )
}