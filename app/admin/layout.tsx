export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className=" max-w-7xl mx-auto">
            <nav></nav>

            {children}
        </section>
    )
}