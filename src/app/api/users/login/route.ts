import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
//connect to db
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //check if user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //check if password correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      email: user.email
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRETE!, {
      expiresIn: "1d"
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true
    });
    response.cookies.set("token", token, {
      httpOnly: true
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
