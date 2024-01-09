import { deletedNote } from "@/app/action";
import { ButtonX } from "@/app/components/Button";
import { NoteCard } from "@/app/demo/note-card-demo";
import { getNotesById } from "@/app/utils/note";
import { getData } from "@/app/utils/user";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";



export default async function Page({ params }: { params: { user_id: string } }) {

    const notes = await getNotesById(params.user_id);

    const cookieStore = cookies()
    const email = cookieStore.get('email')
    const _id = cookieStore.get('_id')

    const data = _id ? await getData(_id?.value) : null

    

    return (
        <>
            <h1>URL Param : {params.user_id}</h1>
            <h1>URL Param : {data.name} </h1>

            <Button asChild>
                <Link href={"/note/create"}>Create a note</Link>
            </Button>

            <div className="grid grid-cols-2 gap-5">
                {notes?.map((note: any) => (
                    <NoteCard key={note._id} note={note} />
                ))}
            </div>
        </>
    )
}