import { revalidatePath } from "next/cache";
import { createClient } from "../../../utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const info = await req.json();

  const { data } = await supabase.auth.signInWithPassword(info);

  return NextResponse.json(data);
}
