import { Footer } from "../../components/footer";
import { InputComponent } from "../../components/input";
import { MaxWidthWrapper } from "../../components/max-width-wrapper";
import Product from "../../components/product";

import { ChevronDownIcon } from "lucide-react";
import { CategoriesIcons } from "../../components/categories-title";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import AllAds from "@/components/all-ads";

export const Page = () => {
  return (
    <>
      <section>
        <MaxWidthWrapper className="px-0 max-w-full md:px-0">
          <div className="flex flex-1 flex-col items-center justify-center h-[550px] bg-black text-white">
            <h1 className="text-[86px] font-playfair">Free Classified Ads</h1>
            <div className="flex flex-col items-center gap-2">
              <h6>8,096,606 listings across 5,921 sites</h6>
              <div className="flex flex-row gap-5 justify-center items-center">
                <InputComponent
                  placeholder="Keyword"
                  className="w-[263px] bg-white"
                  divClasses="min-w-[263px]"
                />

                <InputComponent
                  placeholder="City or Postal Code"
                  className="w-[340px] bg-white"
                />
                <Button>Search</Button>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper>
          <div className="flex flex-col pt-20 items-center justify-center text-center ">
            <h1 className="text-[55px] font-playfair">
              Post Your Free Classified Ads
            </h1>
            <p className="text-base/6 text-[#666666] mt-5">
              Post your free classified ads on biggest and leading leading
              cross-category classifieds platform. Advertise for free in India &
              worldwide. Post free ads & create free business listing.
              <br /> Find the latest classified ads for flats, jobs, cars,
              motorbikes, furniture, tools, personals services and more for sale
              in India.
            </p>
          </div>
          <div className="flex flex-row items-center justify-center gap-5 mt-14">
            <div className="w-[1075px] h-[200px] bg-gray-300" />
            <div className="w-[200px] h-[200px] bg-gray-300" />
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="pt-14">
        <MaxWidthWrapper className="px-0 max-w-full md:px-0 ">
          <div className="bg-gray-200  min-h-48 relative  flex flex-row items-center justify-center ">
            <CategoriesIcons isIcon={true} className="" />
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper className="bg-white mt-[70px]">
          <div className="flex justify-between items-center ">
            <h1 className="text-[50px] font-playfair">All Classified Ads</h1>
            <div className="flex items-center gap-2">
              <div className="w-[532px] h-[50px] flex items-center justify-center gap-2 bg-gray-200 rounded-full">
                All Categories
                <span>
                  <ChevronDownIcon className="size-5" />
                </span>
                <div className="h-6 w-px bg-[#707070]" />
                <InputComponent
                  placeholder="Search..."
                  className="w-[305px] bg-gray-200 text-black"
                />
              </div>
            </div>
          </div>

          <AllAds />

          <div className="flex flex-row items-center justify-center gap-5 mt-14">
            <div className="w-[1075px] h-[200px] bg-gray-300" />
            <div className="w-[200px] h-[200px] bg-gray-300" />
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Page;
