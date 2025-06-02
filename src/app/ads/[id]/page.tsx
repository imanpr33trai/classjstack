import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import appRouter from "@/server";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const PostPage = async ({
  params,
}: {
  params: { id: string | string[] | undefined };
}) => {
  if (typeof params.id !== "string") return notFound();

  const d = await db.ad.findUnique({
    where: { id: params.id },
  });

  const ad = await db.ad.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  return (
    <section className="font-poppins">
      <MaxWidthWrapper className="py-[50px] cursor-default">
        {/* Removed extra space */}
        <div className="flex gap-3">
          <Link className="text-gray-400 hover:underline" href="/">
            Home{">>"}
          </Link>{" "}
          Detail Page
        </div>
        <div className="min-h-screen container mt-10 flex flex-row gap-[61px]">
          {/* Removed leading space */}
          <div>
            {/* Removed extra space */}
            <div className="bg-[#E6E6E6] h-[586px] w-[785px]" />
            {/* Removed extra space */}
            <div className="my-14 flex-col flex w-full">
              {/* Removed extra spaces, added padding */}
              <span className="font-bold">{ad?.user.email}</span>
              {/* Contact Information */}
              <div className="space-y-2">
                {/* Added spacing container */}
                <div className="flex items-center gap-2">
                  <span className="font-light">Skype:</span>
                  <span className="font-bold">Habibullah Misbah</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-light">WhatsApp No:</span>
                  <span className="font-bold">+8801716401415</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-light">Skype:</span>
                  <span className="font-bold">Habibullah Misbah</span>
                </div>
              </div>
              <hr className="my-3" />
              {/* Services Section */}
              <div>
                <span className="font-semibold">Services I Provide:</span>
                <ul className="list-disc ml-5 mt-2">
                  {/* Added proper spacing */}
                  <li>User Interface Design</li>
                  <li>UX Research & UX Design</li>
                  <li>Website & Mobile Design</li>
                  <li>Interaction Design</li>
                  <li>Mobile App Design</li>
                </ul>
              </div>
              <hr className="my-3" />
              <div>
                <div className="flex  items-center gap-2">
                  <span className="font-light">Follow My Other Portfolio:</span>
                  <span className="font-bold">Behance</span>
                </div>
                <div className="flex  items-center gap-2">
                  <span className="font-light">My Social Media Accounts:</span>
                  <span className="font-bold">Instagram, Linkedin</span>
                </div>
              </div>
            </div>
            <div>
              <span>Link:-</span>
              <Link
                className="text-brand-100 hover:underline"
                href="https://www.mumbai/ID_6863930387/Laptop-On-Rent-Start-At-Rs-899-Only-In-Mumbai.html"
              >
                https://www.mumbai/ID_6863930387/Laptop-On-Rent-Start-At-Rs-899-Only-In-Mumbai.html
              </Link>
            </div>
          </div>
          <div className=" flex flex-col gap-12">
            <div className=" flex flex-col gap-8">
              <div className="flex flex-row gap-4 items-center ">
                <div className="rounded-full size-12 bg-black" />
                <span className="text-2xl">
                  {ad?.user.firstName}
                  {ad?.user.lastName}
                </span>
              </div>
              <span className="text-4xl">{ad?.title}</span>
              <div className="flex items-center gap-2">
                <MapPin className="size-8" />
                <span>{ad?.location}</span>
              </div>
              <span className="text-4xl text-brand-100 font-bold">
                ${String(ad?.price)}
              </span>
              <Button>Contact Us</Button>
            </div>
            <div className="border border-gray-500 container flex flex-col gap-10 p-4 ">
              <div className="flex flex-col pt-3   gap-2">
                <span className="font-semibold text-2xl/10 ">
                  How would you rate the overall user experience of our App?
                </span>
                <span className="">Do you find the app easy to use?</span>
              </div>
              <div className="flex gap-14 justify-center">
                <Star className="size-8" />
                <Star className="size-8" />
                <Star className="size-8" />
                <Star className="size-8" />
                <Star className="size-8" />
              </div>
              <div className="flex flex-col gap-4">
                <span>Can you tell us more?</span>
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  cols={30}
                  placeholder="Add Feedback"
                  className="border ps-2 p border-gray-400 "
                ></textarea>
                <div className="flex gap-2">
                  <Button>Submit</Button>
                  <Button>Cancel</Button>
                </div>
              </div>
            </div>
          </div>
          {/* Removed extra space */}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default PostPage;
