import { cookies } from "next/headers";
import { deletedNote } from "../action";
import Avatar from "../components/@nextx3/avatar/avatar";
import { ButtonX } from "../components/Button";
import EditNote from "../components/EditNote";
import HahaBox from "../components/HahaBox";
import { getNotes } from "../utils/note"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Navbar from "../components/@nextx3/navbar/nav";


export default async function Page() {

    const cookieStore = cookies()
    const email = cookieStore.get('email')
    const _id = cookieStore.get('_id')
    const asset = cookieStore.get('asset')?.value;

    const hasCookie = cookieStore.has('email')

    if (!hasCookie) {
        redirect('/sign-in')
    }

    const notes = await getNotes();

    return (
        <>
            <Navbar />

            {asset && parseInt(asset) === 2 && (
                <>
                    <h1 className=" text-3xl font-medium uppercase mb-10">All Notes</h1>

                    <div className="grid lg:grid-cols-2 gap-5">
                        {notes?.map((note: any) => (
                            <div key={note._id} className=" border rounded-2xl p-10 shadow-sm">

                                <Suspense fallback={<div>Loading...</div>}>
                                    <Avatar userId={note.user} />
                                </Suspense>


                                {/* <h1>{note.note.substring(0, 200)}</h1> */}

                                <div className="flex gap-2 mt-5">
                                    <HahaBox note={note} />

                                    <EditNote note={note} />

                                    <form action={deletedNote}>
                                        <input type="text" name="userId" hidden defaultValue={note?._id} />
                                        <ButtonX>Delete</ButtonX>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}



            <h1 className=" text-3xl font-medium uppercase mb-10">Treasure Note</h1>

            <Button asChild>
                <Link href={"/note/create"}>Create</Link>
            </Button>

            <div className="h-10"></div>

            <div className="grid lg:grid-cols-2 gap-5">
                {notes?.map((note: any) => (
                    <div key={note._id} className=" border rounded-2xl p-10 shadow-sm">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Avatar userId={note.user} />
                        </Suspense>

                        {/* <h1>{note.note.substring(0, 200)}</h1> */}

                        <div className="flex gap-2 mt-5">
                            <HahaBox note={note} />

                            <EditNote note={note} />

                            <form action={deletedNote}>
                                <input type="text" name="userId" hidden defaultValue={note?._id} />
                                <ButtonX>Delete</ButtonX>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}