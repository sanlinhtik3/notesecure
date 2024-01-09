
import { cookies } from "next/headers";
import CreateNote from "./create-note";

export default function Page() {

    const cookieStore = cookies();
    const email = cookieStore.get('email')
    const _id = cookieStore.get('_id')?.value

    return (
        <CreateNote _id={_id} />
    )
}