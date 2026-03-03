import { NextResponse } from "next/server";
import { createToken, setSession, clearSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Geçersiz şifre" }, { status: 401 });
  }

  const token = await createToken();
  await setSession(token);

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await clearSession();
  return NextResponse.json({ success: true });
}
