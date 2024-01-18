import EditUser from "../components/EditUser";
import { domain } from "../pub-domain";

async function getData() {
    // const cookieStore = cookies()

    // const theme = cookieStore.get('email')

    const res = await fetch(`${domain}/api/user?id=65a8ad11005fdfe95874da23`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function EditProfile() {

    const data = await getData()

    console.log('haha', data)

    return (
        <>
            <EditUser note={data} />
        </>
    )
}
