import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

//connect call
connect();

//
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log("Signup route", reqBody);

    //validation
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create a new user in database
    const newUser = new User({
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({
      message: "User created",
      success: true,
      savedUser
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
