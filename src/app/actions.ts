import { createClient } from "./utils/supabase/client";

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

export async function signupAction(data: { email: string; password: string }) {
  const supabase = createClient();
  console.log("data:", data);
  const { error } = await supabase.auth.signUp(data);
  console.log(error?.message);
  return error?.message;
}

export async function logOutAction() {
  const supabase = createClient();
  const error = await supabase.auth.signOut();
  return error;
}
