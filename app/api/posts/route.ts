// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { actionCreatePost } from "@/actions/post.actions";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await actionCreatePost(formData);
    if (result?.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error("[API_POST_ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
