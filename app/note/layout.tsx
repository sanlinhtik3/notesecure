import WithAuth from "../info/page";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <WithAuth>
                <main className="container py-6 sm:px-6 lg:px-8">{children}</main>
            </WithAuth>
        </>
    )
}