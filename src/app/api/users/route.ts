import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";
import { User } from "@/types/user";

export async function GET() {
  const users = await readDB();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const userData = await request.json();
  const users = await readDB();
  
  const newUser: User = {
    id: Date.now().toString(),
    ...userData,
  };
  
  users.unshift(newUser);
  await writeDB(users);
  
  return NextResponse.json(newUser, { status: 201 });
}
