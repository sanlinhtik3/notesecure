import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import EditUser from "../components/EditUser";
import { cookies } from "next/headers";

async function getData() {
    // const cookieStore = cookies()

    // const theme = cookieStore.get('email')

    // console.log(theme?.value)


    const res = await fetch(`http://localhost:3000/api/user?id=65a8ad11005fdfe95874da23`);
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
