import { InputComponent } from "@/components/input";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { EyeOff } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Page = () => {
  return (
    <section className="max-h-screen font-poppins">
      <MaxWidthWrapper className="my-24">
        <div className="container border border-gray-300 flex h-full">
          <div className="w-1/2 p-5">
            <div className="bg-[#E6E6E6] h-[890px] w-full" />
          </div>
          <div className="w-1/2 p-[50px] flex flex-col gap-10">
            <div className="w-full max-w-[478px] mx-auto my-auto flex flex-col gap-5 text-[#666666]">
            <h1 className="text-3xl text-center">Sign up now</h1>
              {/* First and Last Name */}
              <div className="w-full flex justify-between gap-4">
                <div className="w-1/2">
                  <h1>First Name*</h1>
                  <InputComponent
                    className="border border-[#66666659] w-full pe-0 ps-2"
                    type="text"
                    isSearch={false}
                  />
                </div>
                <div className="w-1/2">
                  {/* Added w-1/2 */}
                  <h1>Last Name*</h1>
                  <InputComponent
                    className="border border-[#66666659] w-full pe-0 ps-2"
                    type="text"
                    isSearch={false}
                  />
                </div>
              </div>
              <div>
                <h6>Email Address*</h6>
                <InputComponent
                  type="email"
                  isSearch={false}
                  className="pe-0 ps-2 border border-[#66666659]"
                />
              </div>
              <div>
                <h6>Phone Number(Optional)</h6>
                <InputComponent
                  type="tel"
                  isSearch={false}
                  className="pe-0 ps-2 border border-[#66666659]"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <h6>Password*</h6>
                  <h6 className="flex gap-2">
                    <EyeOff />
                    Hide
                  </h6>
                </div>
                <InputComponent
                  type="password"
                  isSearch={false}
                  className="pe-0 ps-2 border border-[#66666659]"
                />
                <h6>
                  Use 8 or more characters with a mix of letters,numbers &
                  symbols
                </h6>
              </div>

              <div className="flex items-center gap-2 w-full max-w-[478px] ">
                <InputComponent
                  type="checkbox"
                  className="size-5"
                  isSearch={false}
                  divClasses="min-w-fit"
                />
                <h6>
                  By creating an account, I agree to our{" "}
                  <span className="hover:underline text-brand-100">Terms of use</span> &{" "}
                  <span className="hover:underline text-brand-100">Privacy Policy</span>
                </h6>
              </div>
              <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5 items-center">
                <h6>Sign Up With</h6>
                <FaGithub className="text-[#5C6BC0] hover:text-[#283ca8] size-12" />
              </div>
              <div className="flex items-center gap-6">
                <Button>Sign up</Button>
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
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
export default Page;
