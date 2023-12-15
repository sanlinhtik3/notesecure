import { deletedNote } from "@/app/action";
import { ButtonX } from "@/app/components/Button";
import { getNotesById } from "@/app/utils/note";
import { getData } from "@/app/utils/user";
import { cookies } from "next/headers";



export default async function Page({ params }: { params: { user_id: string } }) {

    const notes = await getNotesById(params.user_id);

    const cookieStore = cookies()
    const email = cookieStore.get('email')
    const _id = cookieStore.get('_id')

    const data = _id ? await getData(_id?.value) : null

    return (
        <>
            <h1>URL Param : {params.user_id} </h1>
            <h1>URL Param : {data.name} </h1>

            <div className="grid grid-cols-2 gap-5">
                {notes?.map((note) => (
                    <div key={note._id} className=" border rounded-2xl p-10 shadow-lg shadow-sky-100">
                        <h1>{note.user}</h1>
                        <h1>{note.note}</h1>

                        <form action={deletedNote}>
                            <input type="text" name="userId" hidden value={note?._id} />
                            <ButtonX>Delete</ButtonX>
                        </form>

                    </div>
                ))}
            </div>

        </>
    )
}