import EditUser from "../components/EditUser";
import { domain } from "../pub-domain";

async function getData(_id: any) {

    const res = await fetch(`${domain}/api/user?id=${_id}`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function EditProfile({ _id }: any) {
    const data = await getData(_id)

    return (
        <>
            <EditUser note={data} />
        </>
    )
}
