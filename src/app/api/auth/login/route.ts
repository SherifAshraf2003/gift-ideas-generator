import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const info = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword(info);

  return NextResponse.json(error);
}
