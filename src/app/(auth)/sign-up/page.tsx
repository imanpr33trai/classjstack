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
import {} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/authClient";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { FaGithub } from "react-icons/fa";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpSchema, signUpSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const id = useId();

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      acceptTerms: true,
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    setLoading(true);

    try {
      await signUp.email({
        email: values.email,
        password: values.password,
        name: `${values.firstName} ${values.lastName}`,
        callbackURL: "/articles",
        fetchOptions: {
          onResponse: () => setLoading(false),
          onRequest: () => setLoading(true),
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            router.push("/articles");
          },
        },
      });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen font-poppins my-20">
      <MaxWidthWrapper className="flex container gap-3">
        <div className="w-1/2 sm:hidden md:hidden lg:block xl:block">
          <div className="bg-[#E6E6E6] h-full w-full" />
        </div>
        <Card className="z-50 px-[50px] py-[40px] rounded-md rounded-t-none">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-xl">Sign Up</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <div className="grid grid-cols-2 gap-4">
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
                        <IntlTelInput
                          preferredCountries={["IN"]}
                          defaultCountry="IN"
                          value={phoneNumber}
                          onPhoneNumberChange={(status, value) => {
                            setPhoneNumber(value);
                            form.setValue("phone", value.replace(/\D/g, ""));
                          }}
                          inputClassName="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border-input flex h-9 w-full border bg-transparent px-3 py-1 text-base aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                          telInputProps={{
                            "aria-invalid": "false",
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
                            id={id}
                            type={isVisible ? "text" : "password"}
                            {...field}
                            autoComplete="new-password"
                          />
                          <button
                            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label={
                              isVisible ? "Hide Password" : "Show password"
                            }
                            aria-pressed={isVisible}
                            aria-controls="password"
                          >
                            {isVisible ? (
                              <EyeOff
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ) : (
                              <Eye
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-2">
                  <Label htmlFor="password_confirmation">
                    Confirm Password
                  </Label>
                  <Input id="password_confirmation" type="password" />
                  <span className="text-xs text-neutral-500">
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols
                  </span>
                </div>

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label className="text-xs text-neutral-500">
                        <span>
                          By creating an account, I agree to the{" "}
                          <span className="text-brand-100 hover:underline">
                            Terms of use
                          </span>{" "}
                          &{" "}
                          <span className="text-brand-100 hover:underline">
                            Privacy Policy
                          </span>
                        </span>
                      </Label>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Create an account"
                  )}
                </Button>

                <div className="flex flex-col gap-5 items-center">
                  <Label>Sign Up With</Label>
                  <FaGithub className="text-[#5C6BC0] hover:text-[#283ca8] size-12" />
                </div>

                <div className="text-center">
                  <h6>
                    Already have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="hover:underline text-brand-100 font-semibold"
                    >
                      Log in
                    </Link>
                  </h6>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </section>
  );
}

// <section className="min-h-screen font-poppins my-20">
//   <MaxWidthWrapper className="flex container gap-3">
//     <div className="w-1/2 sm:hidden md:hidden lg:block xl:block">
//       <div className="bg-[#E6E6E6] h-full  w-full" />
//     </div>
//     <Card className="z-50 px-[50px] py-[40px] rounded-md rounded-t-none max-w ">
//       <CardHeader className="text-center">
//         <CardTitle className="text-3xl  md:text-xl">Sign Up</CardTitle>
//         <CardDescription className="text-xs md:text-sm">
//           Enter your information to create an account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="grid gap-4"
//           >
//             <div className="grid gap-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="first-name">First name</Label>
//                   <Input
//                     id="first-name"
//                     placeholder="Max"
//                     required
//                     onChange={(e) => {
//                       setFirstName(e.target.value);
//                     }}
//                     value={firstName}
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="last-name">Last name</Label>
//                   <Input
//                     id="last-name"
//                     placeholder="Robinson"
//                     required
//                     onChange={(e) => {
//                       setLastName(e.target.value);
//                     }}
//                     value={lastName}
//                   />
//                 </div>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                   }}
//                   value={email}
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="phone">Phone Number (Optional)</Label>
//                 <IntlTelInput
//                   // defaultValue="+91"
//                   defaultCountry="IN"
//                   inputClassName="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
//     aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0  border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
//                   preferredCountries={["IN"]}
//                   placeholder=""
//                 />
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   autoComplete="new-password"
//                   placeholder="Password"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Confirm Password</Label>
//                 <Input
//                   id="password_confirmation"
//                   type="password"
//                   value={passwordConfirmation}
//                   onChange={(e) => setPasswordConfirmation(e.target.value)}
//                   autoComplete="new-password"
//                   placeholder="Confirm Password"
//                 />
//                 <span className="text-xs text-neutral-500">
//                   Use 8 or more characters with a mix of letters,numbers &
//                   symbols
//                 </span>
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center gap-2">
//                   <Checkbox className="transition-all" />
//                   <Label className="text-xs text-neutral-500">
//                     <span>
//                       By creating an account, I agree to our{" "}
//                       <span className="hover:underline text-brand-100">
//                         Terms of use
//                       </span>{" "}
//                       &{" "}
//                       <span className="hover:underline text-brand-100">
//                         Privacy Policy
//                       </span>
//                     </span>
//                   </Label>
//                 </div>
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex flex-col gap-5 items-center">
//                   <Label>Sign Up With</Label>

//                   <FaGithub className="text-[#5C6BC0] hover:text-[#283ca8] size-12" />
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full"
//                 disabled={loading}
//                 onClick={async () => {
//                   await signUp.email({
//                     email,
//                     password,
//                     name: `${firstName} ${lastName}`,

//                     callbackURL: "/articles",
//                     fetchOptions: {
//                       onResponse: () => {
//                         setLoading(false);
//                       },
//                       onRequest: () => {
//                         setLoading(true);
//                       },
//                       onError: (ctx) => {
//                         toast.error(ctx.error.message);
//                       },
//                       onSuccess: async () => {
//                         router.push("/articles");
//                       },
//                     },
//                   });
//                 }}
//               >
//                 {loading ? (
//                   <Loader2 size={16} className="animate-spin" />
//                 ) : (
//                   "Create an account"
//                 )}
//               </Button>
//               <div className="text-center">
//                 <h6>
//                   Already have an account?{" "}
//                   <Link
//                     href="/sign-in"
//                     className="hover:underline text-brand-100 font-semibold"
//                   >
//                     Log in
//                   </Link>
//                 </h6>
//               </div>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   </MaxWidthWrapper>
//     // </section>
//   );
// }

// "use client";
// import { InputComponent } from "@/components/input";
// import { MaxWidthWrapper } from "@/components/max-width-wrapper";
// import { EyeOff } from "lucide-react";
// import { FaGithub } from "react-icons/fa";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export const Page = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirmation, setPasswordConfirmation] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   return (
//     <section className="min-h-screen font-poppins">
//       <MaxWidthWrapper className="my-20">
//         <div className="container border border-gray-300 flex h-full">
//           <div className="w-1/2 p-5">
//             <div className="bg-[#E6E6E6] h-full w-full" />
//           </div>
//           <div className="w-1/2 p-[50px] flex flex-col gap-10">
//             <div className="w-full h-full max-w-[478px] mx-auto my-auto flex flex-col gap-5 text-[#666666]">
//               <h1 className="text-3xl text-center">Sign up now</h1>
//               {/* First and Last Name */}
//               <div className="w-full flex justify-between gap-4">
//                 <div className="w-1/2">
//                   <h1>First Name*</h1>
//                   <InputComponent
//                     className="border border-[#66666659] w-full pe-0 ps-2"
//                     type="text"
//                     isSearch={false}
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   {/* Added w-1/2 */}
//                   <h1>Last Name*</h1>
//                   <InputComponent
//                     className="border border-[#66666659] w-full pe-0 ps-2"
//                     type="text"
//                     isSearch={false}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <h6>Email Address*</h6>
//                 <InputComponent
//                   type="email"
//                   isSearch={false}
//                   className="pe-0 ps-2 border border-[#66666659]"
//                 />
//               </div>
//               <div>
//                 <h6>Phone Number(Optional)</h6>
//                 <InputComponent
//                   type="tel"
//                   isSearch={false}
//                   className="pe-0 ps-2 border border-[#66666659]"
//                 />
//               </div>
//               <div>
//                 <div className="flex justify-between">
//                   <h6>Password*</h6>
//                   <h6 className="flex gap-2">
//                     <EyeOff />
//                     Hide
//                   </h6>
//                 </div>
//                 <InputComponent
//                   type="password"
//                   isSearch={false}
//                   className="pe-0 ps-2 border border-[#66666659]"
//                 />
//                 <h6>
//                   Use 8 or more characters with a mix of letters,numbers &
//                   symbols
//                 </h6>
//               </div>

//               <div className="flex items-center gap-2 w-full max-w-[478px] ">
//                 <InputComponent
//                   type="checkbox"
//                   className="size-5"
//                   isSearch={false}
//                   divClasses="min-w-fit"
//                 />
//                 <h6>
//                   By creating an account, I agree to our{" "}
//                   <span className="hover:underline text-brand-100">
//                     Terms of use
//                   </span>{" "}
//                   &{" "}
//                   <span className="hover:underline text-brand-100">
//                     Privacy Policy
//                   </span>
//                 </h6>
//               </div>
//               <div className="flex flex-col gap-10">
//                 <div className="flex flex-col gap-5 items-center">
//                   <h6>Sign Up With</h6>
//                   <FaGithub className="text-[#5C6BC0] hover:text-[#283ca8] size-12" />
//                 </div>
//                 <div className="flex items-center gap-6">
//                   <Button>Sign up</Button>
//                   <h6>
//                     Already have an account?{" "}
//                     <Link
//                       href="/sign-in"
//                       className="hover:underline text-brand-100 font-semibold"
//                     >
//                       Log in
//                     </Link>
//                   </h6>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </MaxWidthWrapper>
//     </section>
//   );
// };
// export default Page;
