"use client";

import { InputUI } from "./ui/input";

import { cn } from "@/lib/utils";
import { LoaderCircle, Mic, Search, Send } from "lucide-react";
import { useEffect, useId, useState } from "react";

function InputComponent({
  placeholder,
  className,
  isMic = false,
  divClasses,
  isSearch = true,
  isSend = false,
  type="search",
  id,
  name,
}: {
  placeholder?: string;
  className?: string;
  isMic?: boolean;
  divClasses?: string;
  isSearch?: boolean;
  isSend?: boolean;
  type?:'text' | 'password' | 'email' | 'search' | 'tel' | 'url'|'checkbox';
 id?:string;
 name?:string;
}) {
  
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  return (
    <div className={cn("space-y-2 min-w-[100px]", divClasses)}>
      <div className="relative">
        <InputUI
          id={id}
          className={cn("peer pe-9 ps-9 h-[50px] ", className)}
          placeholder={placeholder}
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {isSearch && (
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={2}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <Search size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </div>
      )}

        {isMic ? (
          <>
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Press to speak"
              type="submit"
            >
              <Mic size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </>
        ) : null}
        {isSend ? (
          <>
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-brand-100 focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send the message"
              type="submit"
            >
              <Send size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </>
        ) : null}
        
      </div>
    </div>
  );
}

export { InputComponent };
