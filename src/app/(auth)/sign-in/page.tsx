import { InputUI } from "@/components/ui/input";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, EyeOff, Github, Loader2 } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <section className="max-h-screen font-poppins">
      <MaxWidthWrapper className="my-24">
        <div className="container border border-gray-300 flex h-full">
          <div className="w-1/2 p-5">
            <div className="bg-[#E6E6E6] h-[890px] w-full" />
          </div>
          <div className="w-1/2 p-[50px] flex flex-col gap-10">
            <form className="w-full max-w-[478px] mx-auto my-auto flex flex-col gap-5 text-[#666666]">
              <h1 className="text-3xl text-center">Sign In</h1>
              <div>
                <h6>Email Address*</h6>
                <InputUI
                  type="email"
                  required
                  className="border border-[#66666659]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <h6>Password*</h6>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex gap-2 items-center"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                    {showPassword ? "Show" : "Hide"}
                  </button>
                </div>
                <InputUI
                  type={showPassword ? "text" : "password"}
                  required
                  className="border border-[#66666659]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <h6 className="text-brand-100 text-end hover:underline cursor-pointer mt-1">
                  Forgot Password?
                </h6>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <h6>
                  By logging in, I agree to our{" "}
                  <Link
                    href="/terms"
                    className="hover:underline text-brand-100"
                  >
                    Terms of use
                  </Link>{" "}
                  &{" "}
                  <Link
                    href="/privacy"
                    className="hover:underline text-brand-100"
                  >
                    Privacy Policy
                  </Link>
                </h6>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5 items-center">
                  <h6>Sign In With</h6>
                  <button type="button" title="Sign in with GitHub">
                    <Github className="text-[#5C6BC0] hover:text-[#283ca8] size-12" />
                  </button>
                </div>
                <div className="flex items-center gap-6">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Log In"
                    )}
                  </Button>
                  <h6>
                    Don't have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="hover:underline text-brand-100 font-semibold"
                    >
                      Signup
                    </Link>
                  </h6>
                </div>
              </div>
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Page;
