'use client';
import { useRouter } from 'next/router';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
type Props = {};

const Header = (props: Props) => {
  const router = useRouter();

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`)}>
      <div className="flex items-center justify-between w-full mb-4">
        <div className="items-center hidden md:flex gap-x-2">
          <button
            onClick={() => router.back()}
            className="items-center justify-center transition bg-black rounded-full -flex hover:opacity-75"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.push()}
            className="items-center justify-center transition bg-black rounded-full -flex hover:opacity-75"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex items-center md-hidden gap-x-2">
          <button className="flex items-center justify-center p-2 transition bg-white rounded-full hover:opacity-75">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="flex items-center justify-center p-2 transition bg-white rounded-full hover:opacity-75">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
