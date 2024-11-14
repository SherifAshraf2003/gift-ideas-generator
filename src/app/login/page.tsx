"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { toast } from "sonner";
import formSchema from "@/lib/types";
import { useUserDataStore } from "@/lib/store";

const loginSchema = formSchema.pick({
  email: true,
  password: true,
});

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (info) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.getUser();
      if (error === null) {
        router.refresh();
        toast("You are currently logged in", {
          description: "Please log out to continue",
          position: "bottom-center",
        });
        return;
      }
      const res = await axios.post("/api/auth/login", info);
      if (res.data !== null) {
        useUserDataStore.setState({ session: res.data.session.access_token });
        router.push("/");
        router.refresh();
        useUserDataStore.getState().setUserId();
      } else router.push("/error");
    } catch (err) {
      console.error("Error during login:", err);
      router.refresh();
      toast("Error while logging in", {
        description: "Wrong email or password",
        position: "bottom-center",
      });
    }
  };

  return (
    <section className="flex min-h-screen justify-center items-center p-4 ">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Welcome To Gifty
          </h1>
          <p className="text-center text-lg md:text-xl mb-4">Login</p>
          <div className="space-y-4">
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-xs pl-1  mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-xs pl-1 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center">
              <Button
                className="min-w-28 bg-black hover:bg-primary/90 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </Button>
              <p className="text-sm mt-4">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-500 hover:text-blue-800"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
