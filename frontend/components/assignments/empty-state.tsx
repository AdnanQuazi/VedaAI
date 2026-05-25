"use client";

import Image from "next/image";
import illustrations from "@/public/assets/illustrations.svg";
import plus from "@/public/icons/plus.svg";
import plus_color from "@/public/icons/plus_color.svg";
import Link from "next/link";
export default function AssignmentsEmptyState() {
  return (
    <section className="relative flex min-h-[calc(100vh-88px)] items-center justify-center overflow-hidden px-6 py-12">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_60%)]" />

      <div className="relative z-10 flex max-w-[580px] flex-col items-center text-center">
        {/* Illustration */}
        <Image src={illustrations} alt="No assignments yet" />

        {/* Heading */}
        <h2
          className="
    font-display
    text-[20px]
    font-bold
    leading-[140%]
    tracking-[-0.04em]
    text-center
    text-foreground
  "
        >
          No assignments yet
        </h2>

        {/* Description */}
        <p
          className="
    mt-1
    max-w-[520px]
    font-display
    text-[16px]
    font-normal
    leading-[140%]
    tracking-[-0.04em]
    text-center
    text-[#5E5E5ECC]
  "
        >
          Create your first assignment to start collecting and grading student
          submissions. Set up rubrics, define marking criteria, and let AI
          assist with grading.
        </p>

        {/* CTA */}
        <div className="mt-10 rounded-full bg-gradient-to-b from-[rgba(255,255,255,0.5)] to-[rgba(102,102,102,0)] p-[1.5px]">
          <Link
            href="/assignments/create"
            className="
      flex
      h-[46px]
      w-[277px]
      items-center
      justify-center
      gap-1
      rounded-full
      bg-[#181818]
      px-6
      py-3
      font-display
      text-[14px]
      font-semibold
      leading-[140%]
      tracking-[-0.04em]
      text-white
      transition-all
      duration-300
      hover:scale-[1.02]
      hover:opacity-95
      cursor-pointer
      flex-row
      gap-2
    "
          >
            <Image src={plus} alt="Plus" width={20} height={20} />
            Create Your First Assignment
          </Link>
        </div>
      </div>

      {/* Mobile Floating CTA */}
      <Link
        href="/assignments/create"
        aria-label="Create assignment"
        className="fixed bottom-28 right-5 z-50 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-surface text-accent shadow-2xl lg:hidden cursor-pointer"
      >
        <span className="sr-only">
          Create assignment
        </span>
        <Image src={plus_color} alt="Plus" width={20} height={20} />
      </Link>
    </section>
  );
}
