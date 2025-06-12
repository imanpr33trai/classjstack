"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Github, Loader2 } from "lucide-react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input"; // <-- Import new component
import { SignInSchema, signInSchema } from "@/types/user"; // <-- Import schema

// Assuming you have an authClient setup like in the previous example
// import { authClient } from "@/lib/authClient";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1. Set up react-hook-form with the Zod schema
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // 2. Create the onSubmit handler
  const onSubmit = async (data: SignInSchema) => {
    setLoading(true);
    console.log(data); // To see the form data

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Signed in successfully!");
      router.push("/"); // Redirect to dashboard or home
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen font-poppins flex items-center">
      <MaxWidthWrapper>
        {/* IMPROVEMENT: Card-like structure for better presentation */}
        <div className="container flex h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg border">
          {/* Left Panel: Image/Graphic (Hidden on small screens) */}
          <div className="hidden md:flex w-1/2 items-center justify-center bg-muted">
            {/* You can place an illustration or brand graphic here */}
            <div className="text-muted-foreground">Image Placeholder</div>
          </div>

          {/* Right Panel: Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Welcome Back!</h1>
                <p className="text-muted-foreground text-sm mt-2">
                  Sign in to continue to your account.
                </p>
              </div>

              <Form {...form}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <FormControl>
                        {/* USE of the new reusable component */}
                        <PasswordInput placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>

                {/* "OR" Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or sign in with
                    </span>
                  </div>
                </div>

                {/* Social Login Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  disabled={loading}
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Button>
              </Form>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
