import Navbarv from "../components/@nextx3/navbar/navbar"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbarv />
            <section className="container">
                {children}
            </section>
        </>
    )
}