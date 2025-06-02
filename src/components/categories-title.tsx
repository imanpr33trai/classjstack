"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";


interface CategoriesIconsProps {
  className?: string;
  iconsrc?: string;
  isIcon?: boolean;
  isLine?: boolean;
}

export const CategoriesIcons = ({
  className,
  isLine = false,
  isIcon = false,
  iconsrc,
}: CategoriesIconsProps) => {
  const categories = [
    { title: "Furniture", icon: Icons.furniture, },
    { title: "Services", icon: Icons.setting },
    { title: "Sports", icon: Icons.sport },
    { title: "Education", icon: Icons.education },
    { title: "Announcement", icon: Icons.announcement },
    { title: "Vehicles", icon: Icons.vehicle },
    { title: "Clothes", icon: Icons.clothes },
    { title: "Electronics", icon: Icons.electronic },
    { title: "Property", icon: Icons.property },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  

  const handleCategoryClick = (categoryid: string) => {
    setSelectedCategory(categoryid);
  };



  return (
    <div
      className={cn("flex flex-row cursor-default font-poppins items-center justify-center", className)}
    >
      {categories.map(({ title, icon: Icon }) =>
        isIcon ? (
          <div 
            className="group h-48" 
            key={title} // Key should only be on the outermost element
          >
            <div
              className={`flex w-40 flex-col gap-2 items-center h-full group-hover:bg-brand-100  justify-center transition-colors ${
                selectedCategory === title ? "bg-brand-100" : ""
              }`}
              onClick={() => handleCategoryClick(title)}
            >
              <Icon color="black" className={cn(selectedCategory === title
                  ? "invert" 
                  : "group-hover:invert")}  />
              <h6 className={cn(
                "transition-colors",
                selectedCategory === title 
                  ? "text-white" 
                  : "group-hover:text-white"
              )}>
                {title}
              </h6>
            </div>
          </div>
        ) : (
          <React.Fragment key={title}> {/* Use Fragment with key instead of empty fragment */}
            <Button
              className="bg-[#191919] h-auto w-auto"
              // spanClass="group-hover:text-brand-100 transition-colors"
            >
              {title}
            </Button>
            {categories[categories.length - 1]?.title !== title && (
              <div className="h-6 w-px bg-[#707070]" />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};

