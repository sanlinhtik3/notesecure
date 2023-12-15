import { cookies } from "next/headers";
import { deletedNote } from "../action";
import Avatar from "../components/@nextx3/avatar/avatar";
import Navbar from "../components/@nextx3/navbar/navbar";
import { ButtonX } from "../components/Button";
import EditNote from "../components/EditNote";
import HahaBox from "../components/HahaBox";
import { getNotes, getNotesById } from "../utils/note"
import Navbarv from "../components/@nextx3/navbar/navbar";



export default async function Page() {

    const cookieStore = cookies()
    const email = cookieStore.get('email')
    const _id = cookieStore.get('_id')
    // console.log(_id?.value, email)

    const notes = await getNotes();
    // const notes = await getNotesById(_id!.value);

    // console.log(notes)

    return (
        <>
            <Navbarv />

            <h1 className=" text-3xl font-medium uppercase mb-10">All Notes</h1>

            <div className="grid lg:grid-cols-2 gap-5">
                {notes?.map((note: any) => (
                    <div key={note._id} className=" border rounded-2xl p-10 shadow-lg shadow-sky-100">
                        <Avatar userId={note.user} />

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


