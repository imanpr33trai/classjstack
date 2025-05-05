'use client';

import AdForm from '@/components/ad-form';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';
import Link from 'next/link';

export default function PostAdPage() {
  return (
    <div className="py-12 ">
      <MaxWidthWrapper>
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm font-poppins text-gray-500 mb-2">
            <Link href="/" className="hover:text-brand-100">Home</Link>
            <span>&gt;&gt;</span>
            <span>Post Ad</span>
          </div>
          <h1 className="text-4xl  font-playfair font-bold">Create Your Free Classified Ad</h1>
        </div>
        <AdForm />
      </MaxWidthWrapper>
    </div>
  );
}