"use server";
import { createClient } from "./utils/supabase/server";

// export async function loginAction(info: { email: string; password: string }) {
//   const supabase = createClient();

//   const { data, error } = await supabase.auth.signInWithPassword(info);
//   console.log("data:", data);
//   console.log("error:", error);
//   if (error) {
//     redirect("/error");
//   }

//   redirect("/home");
// }

export async function signupAction(info: { email: string; password: string }) {
  const supabase = createClient();
  const { error, data } = await supabase.auth.signUp(info);
  console.log(error?.message);
  const res = {
    error: error?.message,
    data: data,
  };
  return res;
}

export async function logOutAction() {
  const supabase = createClient();
  const error = await supabase.auth.signOut();
  return error;
}
