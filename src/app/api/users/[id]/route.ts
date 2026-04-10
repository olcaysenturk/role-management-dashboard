import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const updates = await request.json();
  const users = await readDB();
  
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  
  users[index] = { ...users[index], ...updates };
  await writeDB(users);
  
  return NextResponse.json(users[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const users = await readDB();
  
  const filteredUsers = users.filter((u) => u.id !== id);
  if (users.length === filteredUsers.length) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  
  await writeDB(filteredUsers);
  
  return NextResponse.json({ id });
}
