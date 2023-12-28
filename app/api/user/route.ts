import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/user.model";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { AES, enc } from "crypto-js";
import { domain } from "@/app/pub-domain";

export async function GET(request: NextRequest) {
  await connectMongoDB();

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  // query is "hello" for /api/user?id=hello

  const password = "your-secret-password";

  try {
    if (id) {
      const user = await User.findById(id);
      return NextResponse.json({
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        asset: user?.asset,
      });
    }

    // pagination
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page") as string)
      : 1;
    const limit = 10; // Set the limit of items per page

    // Calculate the skip value based on the page number
    const skip = (page - 1) * limit;

    const users = await User.find();
    // .skip(skip)
    // .limit(limit);

    const totalUsers = await User.countDocuments();

    const totalPages = Math.ceil(totalUsers / limit);

    // Calculate next and previous page URLs
    const nextPage =
      page < totalPages ? `${domain}/api/user?page=${page}` : null;
    const prevPage = page > 1 ? `${domain}/api/user?page=${page - 1}` : null;

    return NextResponse.json({
      count: totalUsers,
      next: nextPage,
      previous: prevPage,
      results: users,
    });
  } catch (error) {
    console.log(error, "Error from User Api");
  }

  return NextResponse.json({ message: "Hello from app/api/user/route GET" });
}

export async function POST(request: Request, response: Response) {
  await connectMongoDB();

  // const rawData = {
  //     id: id
  // }

  const data = await request.json();

  // Validate that email and password are provided
  if (!data.email || !data.password) {
    return NextResponse.json({ error: "Email and password are required" });
  }

  try {
    // Check if the user with the provided email exists
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return NextResponse.json({ error: "existingUser" });
    }

    // Hash the password using bcrypt before storing it in the database
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const password = "your-secret-password";
    const encrypted = AES.encrypt(data.name, password).toString();

    const users = await User.create({
      name: data.name,
      email: data.email,
      asset: data.asset,
      password: hashedPassword,
    });

    return NextResponse.json(users);
  } catch (error: Error | any) {
    // console.log(error, 'Error from User Api')
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message });
    }
  }
}

export async function PUT(request: Request, response: Response) {
  // await connectMongoDB();

  // const rawData = {
  //     id: id
  // }

  const data = await request.json();
  // return NextResponse.json(data)

  try {
    const users = await User.findByIdAndUpdate(
      data._id,
      {
        name: data.name,
        asset: data.asset,
      },
      {
        new: true,
      },
    );

    return NextResponse.json({
      message: "Successfully logged in",
      user: users,
    });
  } catch (error: Error | any) {
    // console.log(error, 'Error from User Api')
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message });
    }
  }
}

export async function DELETE(request: NextRequest, response: Response) {
  await connectMongoDB();

  // const searchParams = request.nextUrl.searchParams
  // const id = searchParams.get('id')
  // query is "hello" for /api/user?id=hello

  const { _id } = await request.json();

  const checkId = await User.findById(_id);

  if (!checkId) {
    return NextResponse.json({ message: "User not found" });
  }

  try {
    const user = await User.findByIdAndDelete(_id);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "Error from User Api DELETE");
  }
}
