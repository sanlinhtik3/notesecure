import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/user.model";
import Error from "next/error";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
    await connectMongoDB();

    try {
        const users = await User.find();
        return NextResponse.json(users)
    } catch (error) {
        console.log(error, 'Error from User Api')
    }

    return NextResponse.json({ message: "Hello" })
}

export async function POST(request: Request, response: Response) {
    // await connectMongoDB();

    // const rawData = {
    //     id: id
    // }

    const data = await request.json()
    // return NextResponse.json(data)

    // Validate that email and password are provided
    if (!data.email || !data.password) {
        return NextResponse.json({ error: 'Email and password are required' });
    }

    try {
        // Check if the user with the provided email exists
        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            // Compare the provided password with the hashed password in the database
            try {
                const passwordMatch = await bcrypt.compare(data.password, existingUser.password);

                console.log(passwordMatch)

                if (!passwordMatch) {
                    return NextResponse.json({ error: 'Incorrect password' });
                }

                return NextResponse.json({
                    message: 'Successfully logged in',
                    user: existingUser
                })
            } catch (error) {
                console.log(error, 'Error from User Api')
            }
        }

    } catch (error: Error | any) {
        // console.log(error, 'Error from User Api')
        if (error.name === "ValidationError") {
            return NextResponse.json({ error: error.message })
        }

    }

}