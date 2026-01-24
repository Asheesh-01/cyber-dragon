import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for") ||
      "unknown";

    const userAgent = req.headers.get("user-agent") || "unknown";

    const { error } = await supabase.from("contact_messages").insert([
      { name, email, message, ip_address: ip, user_agent: userAgent },
    ]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
  console.error(err);

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
