
import { Footer } from "../../components/footer";
import { InputComponent } from "../../components/input";
import { MaxWidthWrapper } from "../../components/max-width-wrapper";
import Product from "../../components/product";

import { ChevronDownIcon } from "lucide-react";
import { CategoriesIcons } from "../../components/categories-title";
import { Button } from "@/components/ui/button";

export const Page = () => {
  const ads = [
    {
      id:1,
      price: 1200,
      location: "New York",
      title: "Brand New iPhone 14 Pro Max - 256GB",
    },
    {id:2,
      title: "2019 Toyota Corolla LE - Low Mileage",
      price: 18000,
      location: "California",
    },
    {id:3,
      title: "2 BHK Apartment for Rent in Downtown",
      price: 2500,
      location: "Illinois",
    },
    {id:4,
      title: "Hiring Full-Stack Developer - Remote",
      price: 500,
      location: "Texas",
    },
    {id:5,
      title: "Luxury Leather Sofa Set - 3 Seater",
      price: 750,
      location: "Florida",
    },
    {id:6,
      title: "Professional Home Cleaning Service",
      price: "50",
      location: "Washington",
    },
    {id:7,
      title: "Golden Retriever Puppies for Sale",
      price: 1200,
      location: "Nevada",
    },
    {id:8,
      title: "Rolex Submariner - Authentic Luxury Watch",
      price: 9500,
      location: "New Jersey",
    },
    {id:9,
      title: "MacBook Pro 16-inch M1 Max - 1TB SSD",
      price: 2300,
      location: "Arizona",
    },
    {id:10,
      title: "Brand New Ninja Air Fryer - 6 Quart",
      price: 100,
      location: "Colorado",
    },
  ];

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
          <div className="grid mt-5 grid-cols-4 grid-rows-2 gap-6 items-center justify-center">
            {ads.map(({ title, price, location,id }) => (
              <Product
                key={id}
                name={title}
                price={String(price)}
                location={location}
                href={`/ads/${id}`}
              />
            ))}
          </div>
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
