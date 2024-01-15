import Navbarv from "./navbar";
import { cookies } from "next/headers";

export default function Navbar() {
    const cookieStore = cookies();
    const email = cookieStore.get('email')?.value;
    const name = cookieStore.get('name')?.value;
    const asset = cookieStore.get('asset')?.value;
    const _id = cookieStore.get('_id')?.value;

    return (
        <Navbarv _id={_id} email={email} name={name} asset={asset} />
    )
}