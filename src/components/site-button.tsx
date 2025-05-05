import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  spanClass?: string;
}

export const SiteButto = ({
  className,
  spanClass,
  children,
  href,
  ...props
}: ButtonProps) => {
  return (
    <Link
      href={href ?? "#"}
      className={cn(
        "group relative font-poppins font-medium flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap bg-brand-100 h-[50px] w-[126px] text-base/7  text-white  transition-colors",
        className
      )}
      {...props}
    >
      <span
        className={cn("relative z-10 flex items-center gap-2 group", spanClass)}
      >
        {children}
      </span>
    </Link>
  );
};
