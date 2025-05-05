import Image from "next/image";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { CategoriesIcons } from "./categories-title";
import { InputComponent } from "./input";
import { InputUI } from "./ui/input";

export const Footer = () => {
  return (
    <>
      <footer className="font-poppins">
        <MaxWidthWrapper className="bg-[#191919] py-12 max-w-full text-white">
          <div className="flex flex-row justify-between border-b border-white/20 pb-5">
            <div className="gap-10 flex flex-col">
              <Image src="/Logo.png" alt="Logo" width={355} height={75} />
              <CategoriesIcons className="gap-3" isLine={true} />
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-sm">Send me updates & offers.</h6>
              <InputComponent
                placeholder="Your email"
                className="bg-black mt-3 border border-white text-white placeholder:text-white/50 ps-3"
                isSearch={false}
                isSend={true}
              />
              <h6 className="text-xs ">
                Unsubscribe any time. <span className="underline">Privacy Policy</span>
              </h6>
            </div>
          </div>
            
        </MaxWidthWrapper>
      </footer>
    </>
  );
};
