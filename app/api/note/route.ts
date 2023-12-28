import connectMongoDB from "@/app/libs/mongodb";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { AES, enc } from 'crypto-js';
import Note from "@/app/models/note.model";

export async function GET(request: NextRequest) {
    await connectMongoDB();

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    // query is "hello" for /api/user?id=hello

    const password = 'your-secret-password';

    try {
        if (id) {
            const user = await Note.findById(id);
            return NextResponse.json({
                _id: user?._id,
                name: user?.name,
                email: user?.email
            })
        }

        const users = await Note.find();
        return NextResponse.json(users)
    } catch (error) {
        console.log(error, 'Error from User Api')
    }

    return NextResponse.json({ message: "Hello" })
}

export async function POST(request: Request, response: Response) {
    await connectMongoDB();

    // const rawData = {
    //     id: id
    // }

    const data = await request.json()
    // return NextResponse.json(data)

    // Validate that email and password are provided
    // if (!data.email || !data.password) {
    //     return NextResponse.json({ error: 'Email and password are required' });
    // }

    try {

        // Check if the user with the provided email exists
        // const existingUser = await Note.findOne({ email: data.email });

        // if (existingUser) {
        //     return NextResponse.json({ error: 'existingUser' });
        // }

        // Hash the password using bcrypt before storing it in the database
        // const hashedPassword = await bcrypt.hash(data.password, 10);

        // const password = 'your-secret-password';
        // const encrypted = AES.encrypt(data.name, password).toString();

        // const users = await Note.create({
        //     name: encrypted,
        //     email: data.email,
        //     password: hashedPassword
        // });

        // return NextResponse.json(users)

        const users = await Note.create({
            user: data.user,
            note: data.note,
        });

        return NextResponse.json(users)


    } catch (error: Error | any) {
        // console.log(error, 'Error from User Api')
        if (error.name === "ValidationError") {
            return NextResponse.json({ error: error.message })
        }

    }

}

export async function DELETE(request: Request, response: Response) {
    await connectMongoDB();
    const data = await request.json();

    console.log(data)

    // const deleted = await Note.findByIdAndDelete(data._id);

    const deleted = await Note.deleteOne({ _id: data._id });

    return NextResponse.json(deleted)
}