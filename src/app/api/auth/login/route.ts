import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUsersCollection } from "@/lib/database/collections";

// First get email and password from the request body. Then check if the email exists in the database.
// If it does, compare the password with the hashed password in the database. If they match, return a success response. If they don't match, return an error response.

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const userCollection = await getUsersCollection();
    const existingUser = await userCollection.findOne({ normalizedEmail });

    // If the user does not exist, return a response indicating that the email does not exist.
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 },
      );
    }

    // If user exists, compare the password with the hashed password in the database.

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.passwordHash,
    );
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 },
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error during login:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
};
