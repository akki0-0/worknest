import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUsersCollection } from "@/lib/database/collections";
import { User } from "@/types/user";

export async function POST(request: NextRequest) {
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
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long",
        },
        { status: 400 }
      );
    }

    // check if email already exists
    const normalizedEmail = email.trim().toLowerCase();
    const usersCollection = await getUsersCollection();
    const existingUser = await usersCollection.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "A user with this email already exists",
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const currentDate = new Date();

    const newUser: User = {
      email: normalizedEmail,
      passwordHash,
      role: "user",
      isActive: true,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    const result = await usersCollection.insertOne(newUser);
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: result.insertedId,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A user with this email already exists",
        },
        { status: 409 }
      );
    }

    console.error("User registration failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to register user",
      },
      { status: 500 }
    );
  }
}
