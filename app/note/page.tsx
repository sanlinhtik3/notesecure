import { cookies } from "next/headers";
import { deletedNote } from "../action";
import Avatar from "../components/@nextx3/avatar/avatar";
import { ButtonX } from "../components/Button";
import EditNote from "../components/EditNote";
import HahaBox from "../components/HahaBox";
import { getNotes } from "../utils/note"
import Navbarv from "../components/@nextx3/navbar/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { redirect } from "next/navigation";


export default async function Page() {

    const cookieStore = cookies()
    const email = cookieStore.get('email')
    const _id = cookieStore.get('_id')

    const hasCookie = cookieStore.has('email')

    if (!hasCookie) {
        redirect('/sign-in')
    }

    const notes = await getNotes();

    return (
        <>
            <Navbarv />

            <h1 className=" text-3xl font-medium uppercase mb-10">All Notes</h1>

            <Button asChild>
                <Link href={"/note/create"}>Create</Link>
            </Button>

            <div className="grid lg:grid-cols-2 gap-5">
                {notes?.map((note: any) => (
                    <div key={note._id} className=" border rounded-2xl p-10 shadow-sm">

                        <Suspense fallback={<div>Loading...</div>}>
                            <Avatar userId={note.user} />
                        </Suspense>


                        <h1>{note.note.substring(0, 200)}</h1>

                        <div className="flex gap-2 mt-5">
                            <HahaBox note={note} />

                            <EditNote note={note} />

                            <form action={deletedNote}>
                                <input type="text" name="userId" hidden defaultValue={note?._id} />
                                <ButtonX className="bg-red-100 text-red-500">Delete</ButtonX>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

            <h1 className=" text-3xl font-medium uppercase mb-10">Current User All Notes</h1>

            <Button asChild>
                <Link href={"/note/create"}>Create</Link>
            </Button>

            <div className="grid lg:grid-cols-2 gap-5">
                {notes?.map((note: any) => (
                    <div key={note._id} className=" border rounded-2xl p-10 shadow-sm">

                        <Suspense fallback={<div>Loading...</div>}>
                            <Avatar userId={note.user} />
                        </Suspense>


                        <h1>{note.note.substring(0, 200)}</h1>

                        <div className="flex gap-2 mt-5">
                            <HahaBox note={note} />

                            <EditNote note={note} />

                            <form action={deletedNote}>
                                <input type="text" name="userId" hidden defaultValue={note?._id} />
                                <ButtonX className="bg-red-100 text-red-500">Delete</ButtonX>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}


