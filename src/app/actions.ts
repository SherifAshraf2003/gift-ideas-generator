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

export async function signupAction(info: {
  email: string;
  password: string;
  name: string;
}) {
  const supabase = createClient();
  const { error: signupError, data } = await supabase.auth.signUp({
    email: info.email,
    password: info.password,
  });

  const { error } = await supabase
    .from("profiles")
    .update({ username: info.name })
    .eq("id", data?.user?.id);
  console.log(data);

  const errorMsg = (signupError?.message ?? "") + (error?.message ?? "");

  console.error(errorMsg);
  const res = {
    error: errorMsg,
    data: data,
  };
  return res;
}

export async function logOutAction() {
  const supabase = createClient();
  const error = await supabase.auth.signOut();
  return error;
}
