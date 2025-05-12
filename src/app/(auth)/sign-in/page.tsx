import { InputComponent } from "@/components/input";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { EyeClosed, EyeOff, Github, GithubIcon } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const Page = () => {
  return (
    <section className="max-h-screen font-poppins">
      <MaxWidthWrapper className="my-24">
        <div className="container border border-gray-300 flex h-full">
        <div className="w-1/2 p-5">
            <div className="bg-[#E6E6E6] h-[890px] w-full" />
          </div>
          <div className="w-1/2 px-[50px] py-[50px] my-auto">
            <div className="flex flex-col gap-8 items-center w-full max-w-[478px] my-auto mx-auto text-[#666666]">
              {/* Title Section */}
              <div className="flex flex-col items-center gap-1">
                <h1 className="font-medium text-4xl">Sign In</h1>
                <h6 className="text-base">
                  Welcome back, enter your details below
                </h6>
              </div>

              <div className="space-y-6 w-full max-w-[478px] relative">
                <div>
                  <h1>Email</h1>
                  <InputComponent
                    className="pe-0 ps-2 border border-[#66666659] w-full"
                    type="email"
                    isSearch={false}
                  />
                </div>
                <div>
                  <div className="flex flex-row justify-between">
                    <h1>Password</h1>
                    <h1 className="flex">
                      <EyeOff />
                      Hide
                    </h1>
                  </div>
                  <InputComponent
                    className="pe-2 ps-1 border border-[#66666659] w-full"
                    type="password"
                    isSearch={false}
                  />
                </div>
                <h6 className="text-brand-100 text-end  hover:underline ">Forget Password</h6>
              </div>

              {/* Checkbox Section Fix */}
              <div className="flex items-center gap-2 w-full max-w-[478px] flex-wrap">
                <InputComponent
                  type="checkbox"
                  className="size-4"
                  divClasses="min-w-fit"
                  isSearch={false}
                />
                <h6 className="text-sm">
                  By Login an account, I agree to our{" "}
                  <span className="hover:underline text-brand-100">Terms of use</span> &{" "}
                  <span className="hover:underline text-brand-100">Privacy Policy</span>
                </h6>
              </div>
              <div className="w-full flex flex-col items-center gap-8">
                <Button className="w-full text-lg">Log In</Button>
                <div className="w-full flex items-center text-[#666666] text-lg justify-center gap-6">
                  <div className="h-px bg-[#66666640] w-full" />
                  <span>OR</span>
                  <div className="h-px bg-[#66666640] w-full" />
                </div>
                <Button className="w-full text-lg">
                  Continue With Google
                </Button>
                <div className="flex flex-col items-center">
                  <h1>Sign In With</h1>
                  <FaGithub className="size-12 hover:text-[#283ca8] text-[#5C6BC0]"/>
                </div>
                <h6 className="flex gap-2">Don't have an account?
                  <Link href='/sign-up' className="text-brand-100 hover:underline font-semibold ">Signup</Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Page;