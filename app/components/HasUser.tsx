import { cookies } from "next/headers"

export default function HasUser() {

    const cookieStore = cookies()
    const email = cookieStore.get('email')

    console.log(email)

    return (
        <>
            <h1>Login user {email?.value} </h1>
        </>
    )
}