"use client";

import Link from "next/link";

export default function MobileCreateButton() {
  return (
    <Link
      href="/assignments/create"
      aria-label="Create assignment"
      className="
        fixed
        bottom-28
        right-5
        z-50
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-surface
        text-3xl
        text-accent
        shadow-[0px_16px_48px_0px_#0000001F]
        transition-all
        duration-300
        hover:scale-105
        lg:hidden
      "
    >
      +
    </Link>
  );
}