"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
// import { signUp } from "@/lib/authClient";
import { toast } from "sonner";
import { signUp } from "@/server/actions";
import { auth } from "@/server/auth";
import { SignUpSchema } from "@/types/user";

export default function Page() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setImage(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp({ email, lastname, firstname, password });
  };
  return (
    <Card className="z-50 rounded-md rounded-t-none max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Max"
                required
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                value={firstname}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                required
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                value={lastname}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="password_confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="new-password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Profile Image (optional)</Label>
            <div className="flex items-end gap-4">
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 w-full">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="w-full"
                />
                {imagePreview && (
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Secured by <span className="text-orange-400">better-auth.</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

// async function convertImageToBase64(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result as string);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }
// "use client";

// import { MaxWidthWrapper } from "@/components/max-width-wrapper";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import {} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { authClient, signUp } from "@/lib/authClient";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useId, useState } from "react";
// import { FaGithub } from "react-icons/fa";
// import IntlTelInput from "react-intl-tel-input";
// import "react-intl-tel-input/dist/main.css";
// import "react-phone-number-input/style.css";
// import { toast } from "sonner";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { SignUpSchema, signUpSchema } from "@/types/user";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { auth } from "@/server/auth";

// export default function SignUp() {
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const id = useId();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState<File>();
//   const toggleVisibility = () => setIsVisible((prevState) => !prevState);

//   const form = useForm<SignUpSchema>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       email: "",
//       firstName: "",
//       lastName: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//       acceptTerms: true,
//     },
//   });

//   const onSubmit = async (values: SignUpSchema) => {
//     setLoading(true);
//     try {
//       await authClient.({
//         email: values.email,
//         password: values.password,
//         name: `${values.firstName} ${values.lastName}`,
//         callbackURL: "/articles",
//         image: "image",
//         fetchOptions: {
//           onResponse: () => setLoading(false),
//           onRequest: () => setLoading(true),
//           onError: (ctx) => {
//             toast.error(ctx.error.message);
//           },
//           onSuccess: async () => {
//             router.push("/articles");
//           },
//         },
//       });
//     } catch (err: any) {
//       toast.error(err.message || "Something went wrong");
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen font-poppins my-20">
//       <MaxWidthWrapper className="flex container gap-3">
//         <div className="w-1/2 sm:hidden md:hidden lg:block xl:block">
//           <div className="bg-[#E6E6E6] h-full w-full" />
//         </div>
//         <Card className="z-50 px-[50px] py-[40px] rounded-md rounded-t-none">
//           <CardHeader className="text-center">
//             <CardTitle className="text-3xl md:text-xl">Sign Up</CardTitle>
//             <CardDescription className="text-xs md:text-sm">
//               Enter your information to create an account
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="grid gap-4"
//               >
//                 <div className="grid grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>First name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Max" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Last name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Robinson" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="email"
//                           placeholder="m@example.com"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone Number (Optional)</FormLabel>
//                       <FormControl>
//                         <IntlTelInput
//                           preferredCountries={["IN"]}
//                           defaultCountry="IN"
//                           value={phoneNumber}
//                           onPhoneNumberChange={(status, value) => {
//                             setPhoneNumber(value);
//                             form.setValue("phone", value.replace(/\D/g, ""));
//                           }}
//                           inputClassName="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border-input flex h-9 w-full border bg-transparent px-3 py-1 text-base aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
//                           telInputProps={{
//                             "aria-invalid": "false",
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Input
//                             id={id}
//                             type={isVisible ? "text" : "password"}
//                             autoComplete="new-password"
//                             placeholder="Password"
//                             {...field}
//                           />
//                           <button
//                             className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
//                             type="button"
//                             onClick={toggleVisibility}
//                             aria-label={
//                               isVisible ? "Hide Password" : "Show password"
//                             }
//                             aria-pressed={isVisible}
//                             aria-controls="password"
//                           >
//                             {isVisible ? (
//                               <EyeOff
//                                 size={16}
//                                 strokeWidth={2}
//                                 aria-hidden="true"
//                               />
//                             ) : (
//                               <Eye
//                                 size={16}
//                                 strokeWidth={2}
//                                 aria-hidden="true"
//                               />
//                             )}
//                           </button>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="confirmPassword"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Confirm Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           autoComplete="new-password"
//                           placeholder="Confirm Password"
//                           {...field}
//                         />
//                       </FormControl>
//                       <span className="text-xs text-neutral-500">
//                         Use 8 or more characters with a mix of letters, numbers
//                         & symbols
//                       </span>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="acceptTerms"
//                   render={({ field }) => (
//                     <FormItem className="flex items-center gap-2">
//                       <FormControl>
//                         <Checkbox
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                       <Label className="text-xs text-neutral-500">
//                         <span>
//                           By creating an account, I agree to the{" "}
//                           <span className="text-brand-100 hover:underline">
//                             Terms of use
//                           </span>{" "}
//                           &{" "}
//                           <span className="text-brand-100 hover:underline">
//                             Privacy Policy
//                           </span>
//                         </span>
//                       </Label>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? (
//                     <Loader2 size={16} className="animate-spin" />
//                   ) : (
//                     "Create an account"
//                   )}
//                 </Button>

//                 <div className="flex flex-col gap-5 items-center">
//                   <Label>Sign Up With</Label>
//                   <FaGithub className="text-[#5C6BC0] hover:text-[#283ca8] size-12" />
//                 </div>

//                 <div className="text-center">
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
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </MaxWidthWrapper>
//     </section>
//   );
// }
