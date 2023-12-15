export function Table({ children }: { children?: React.ReactNode }) {
    return (
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            {children}
        </table>
    )
}
export function TableHeader({ children }: { children?: React.ReactNode }) {
    return (
        <thead className="bg-gray-50">
            <tr>
                {children}
            </tr>
        </thead>
    )
}

export function TableBody({ children }: { children?: React.ReactNode }) {
    return (
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {children}
        </tbody>
    )
}

export function TableRow({ children }: { children?: React.ReactNode }) {
    return (
        <tr className="hover:bg-gray-50">
            {children}
        </tr>
    )
}

export function TableColumn({ children }: { children?: React.ReactNode }) {
    return (
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">{children}</th>
    )
}

export function TableCell({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
        <td className={`px-6 py-4 ${className}`}>{children}</td>
    )
}
