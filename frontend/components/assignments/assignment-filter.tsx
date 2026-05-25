"use client";
import Image from "next/image";
import filter from "@/public/icons/Filter.svg";
import search from "@/public/icons/Search.svg";
export default function AssignmentFilters() {
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-[20px] bg-surface p-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Filter */}
      <button
        className="
          flex
          h-[48px]
          items-center
          gap-1
          rounded-full
          px-4
          text-sm
          text-muted-foreground
          transition-all
          hover:bg-surface-secondary
          font-bold
          font-display
          text-[#A9A9A9]
          font-weight-700
        "
      >
        <Image src={filter} alt="Filter" width={20} height={20} />
        Filter By
      </button>

      {/* Search */}
      <div
        className="
          flex
          h-[48px]
          w-[380px]
          items-center
          rounded-full
          border
          border-border
          bg-surface
          px-4
          lg:max-w-[320px]
          gap-2
        "
      >
        <Image src={search} alt="Search" width={20} height={20} />

        <input
          placeholder="Search Assignment"
          className="
            w-full
            bg-transparent
            text-sm
            outline-none
            placeholder:text-[#A9A9A9]
            font-bold
            font-display
            font-weight-700
    
          "
        />
      </div>
    </div>
  );
}