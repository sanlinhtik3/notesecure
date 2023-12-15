import connectMongoDB from "@/app/libs/mongodb";
import Note from "@/app/models/note.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectMongoDB();

    // const searchParams = request.nextUrl.searchParams
    // const id = searchParams.get('id')
    // query is "hello" for /api/user?id=hello

    // query is "hello" for /api/user/id=hello
    const id = params.id

    try {
        if (id) {
            const user = await Note.find({ user: id });
            return NextResponse.json(user)
        }
    } catch (error) {
        console.log(error, 'Error from Note Api')
    }

    return NextResponse.json({ message: "Hello" })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    await connectMongoDB();

    const id = params.id;

    const data = await request.json()

    const rawData = {
        user: data.user,
        note: data.note
    }

    // return NextResponse.json(rawData)

    try {
        const editNote = await Note.findByIdAndUpdate(id, rawData, {
            new: true
        })

        return NextResponse.json(editNote)
    } catch (error) {
        console.log(error, 'Error from Note Api')
    }

}