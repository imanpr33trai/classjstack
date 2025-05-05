import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import Image from "next/image";
import { InputComponent } from "./input";
import { ChevronDownIcon, ChevronDownSquareIcon } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const user = true;
  return (
    <nav className="sticky z-[100] h-24 inset-x-0 top-0 w-full bg-[#191919] transition-all">
      <MaxWidthWrapper className="py-0 max-w-full">
        <div className="flex h-24 items-center justify-between gap-14">
          <Link href="/" className="z-40 ">
            <Image src="/Logo.png" alt="logo" width={355} height={75} />
          </Link>

          <div className="flex gap-6 h-full items-center">
            <Button href="/articles" variant={"default"}>Articles</Button>
            <div className="flex items-center">
              <div className="w-[150px] h-[50px] bg-[#383838] text-white flex items-center justify-center gap-2">
                All Categories
                <span>
                  <ChevronDownIcon className="size-5" />
                </span>
                <div className="h-6 w-px bg-[#707070]" />
              </div>
              <InputComponent
                placeholder="Search..."
                className="w-[305px] bg-[#383838] text-white border-0"
                isMic={true}
              />
            </div>

            <div className="flex flex-row gap-2">
              <Button className="bg-[#191919]" href="/sign-in" variant={"destructive"}>
                LogIn
              </Button>
              {user ? (
                <Button href="/ads/ad" variant={"default"}>
                  Post Ad
                </Button>
              ) : (
                <Button href="/sign-up">SignUp</Button>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
