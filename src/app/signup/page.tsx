"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import formSchema from "@/lib/schema";
import { Input } from "../../components/ui/input";
import { z } from "zod";
import Link from "next/link";
import { signupAction } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
      const error = await signupAction(data);
      if (error === null) {
        router.push("/error");
      } else if (error === "User already registered") {
        toast("User is already registered", {
          description: "Please login to continue",
        });
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex min-h-screen justify-center items-center p-4 bg-gradient-to-r from-gradientFrom to-gradientTo ">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h1 className=" text-2xl md:text-3xl font-bold text-center mb-6">
            Welcome To Gifty
          </h1>
          <div className="space-y-4">
            <div>
              <Input
                {...register("name")}
                type="text"
                id="name"
                placeholder="Name"
                className="w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Email"
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Password"
                className="w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center">
              <Button
                className="min-w-28 bg-gradient-to-r from-gradientFrom to-gradientTo text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
              <p className="text-sm mt-4">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-500 hover:text-blue-800"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
