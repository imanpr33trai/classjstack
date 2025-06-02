"use client";
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Decimal } from "../../generated/prisma/runtime/library";

const Product = ({
  className,
  price,
  name,
  location,
  isPic = false,
  picSrc,
  href = "/post/1",
}: {
  className?: string;
  price?: string;
  name: string;
  location: string;
  isPic?: boolean;
  href?: string;
  picSrc?: string;
}) => {
  const router = useRouter();
  return (
    <div
      className="w-full relative border border-gray-300 flex flex-col items-center hover:bg-gray-100 h-full"
      onClick={() => router.push(href)}
    >
      {isPic ? (
        <>
          {picSrc && <Image src={picSrc} alt={name} width={300} height={238} />}
        </>
      ) : (
        <>
          <div className="bg-gray-300 w-full min-h-[238px] ">
            <span className="bg-brand-100 px-3 py-1 m-2 text-center text-white absolute">
              Ad
            </span>
          </div>
        </>
      )}

      <div className="w-full relative p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between items-center ">
            <span className="text-brand-100 text-xl font-bold">${price}</span>

            <Button className="group size-7 rounded-full bg-gray-300 hover:bg-brand-100">
              <Heart className="size-5 text-black group-hover:text-white" />
            </Button>
          </div>
          <span className="text-[#F32E2E] text-lg ">{name}</span>
        </div>
        <div className="w-full h-px bg-brand-100/50" />
        <div className="w-full flex flex-row items-center gap-5">
          <MapPin className="text-brand-100" />
          <span className="text-pretty break-words inline-flex">
            {location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
