// in /app/sign-up/page.tsx
"use client";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient"; // Assuming authClient is correctly configured
import { SignUpSchema, signUpSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { toast } from "sonner";

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false); // ADDED: State for confirm password visibility
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      confirmPassword: "",
      // CHANGED: Set to false by default to ensure user interaction
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    setLoading(true);
    try {
      // CHANGED: Correctly call the signUp method and pass the right fields
      // This assumes your better-auth config uses `firstName` and `lastName`
      await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.firstName,
        lastName: values.lastName,
        // You can add other fields like phone if configured in better-auth
        callbackURL: "/articles", // Redirect after successful sign-up
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message || "An unknown error occurred.");
            setLoading(false);
          },
          onSuccess: async () => {
            toast.success("Account created successfully! Redirecting...");
            router.push("/articles");
          },
        },
      });
    } catch (err: any) {
      // This catch block might be redundant if fetchOptions.onError is used, but good for safety
      toast.error(err.message || "Something went wrong during sign-up.");
      setLoading(false);
    }
  };

  return (
    // IMPROVEMENT: Added more vertical margin for better spacing on the page
    <section className="min-h-screen font-poppins my-16 md:my-24">
      <MaxWidthWrapper className="flex container gap-8">
        <div className="hidden lg:flex w-1/2 items-center justify-center">
          {/* IMPROVEMENT: Added a placeholder visual instead of a plain color */}
          <div className="bg-muted h-full w-full rounded-lg">
            {/* You can place an illustration or image here */}
          </div>
        </div>
        {/* IMPROVEMENT: Adjusted padding for better consistency and responsiveness */}
        <Card className="w-full lg:w-1/2 z-50 p-6 md:p-10 border-0 md:border shadow-none md:shadow-sm">
          <CardHeader className="text-center p-0 mb-6">
            {/* IMPROVEMENT: Corrected responsive text sizes */}
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Create an Account
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground pt-1">
              Enter your information to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Form {...form}>
              {/* IMPROVEMENT: Increased spacing between form elements */}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="Max" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Robinson" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        {/* NOTE: You may need a custom component to perfectly match shadcn styles */}
                        <IntlTelInput
                          preferredCountries={["IN"]}
                          containerClassName="intl-tel-input w-full"
                          inputClassName="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          onPhoneNumberChange={(
                            isValid,
                            value,
                            countryData,
                            fullNumber
                          ) => {
                            form.setValue("phone", fullNumber); // Use the full number
                          }}
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute inset-y-0 right-0 h-full px-3"
                            onClick={() =>
                              setIsPasswordVisible((prev) => !prev)
                            }
                            aria-label={
                              isPasswordVisible
                                ? "Hide password"
                                : "Show password"
                            }
                          >
                            {isPasswordVisible ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      {/* IMPROVEMENT: Used FormDescription for hint text */}
                      <FormDescription>
                        Use 8+ characters with a mix of letters, numbers &
                        symbols.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ADDED: Password Confirmation Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={
                              isConfirmPasswordVisible ? "text" : "password"
                            }
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute inset-y-0 right-0 h-full px-3"
                            onClick={() =>
                              setIsConfirmPasswordVisible((prev) => !prev)
                            }
                            aria-label={
                              isConfirmPasswordVisible
                                ? "Hide password"
                                : "Show password"
                            }
                          >
                            {isConfirmPasswordVisible ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ADDED: Terms and Conditions Checkbox */}
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        {/* IMPROVEMENT: Use Next.js Link for real navigation */}
                        <FormLabel className="text-sm font-normal text-muted-foreground">
                          By creating an account, you agree to our <br />
                          <Link
                            href="/terms"
                            className="text-primary hover:underline"
                          >
                            Terms of Use
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create an account
                </Button>

                {/* IMPROVEMENT: Added an "OR" divider for clarity */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* IMPROVEMENT: Styled social login as a button */}
                <Button variant="outline" className="w-full" type="button">
                  <FaGithub className="mr-2 h-5 w-5" />
                  Sign Up with GitHub
                </Button>

                <div className="text-center text-sm text-muted-foreground pt-4">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-semibold text-primary hover:underline"
                  >
                    Log in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </section>
  );
}
