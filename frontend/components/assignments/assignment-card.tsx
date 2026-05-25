"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Assignment } from "@/types/assignment";

import Morevertical from "@/public/icons/More-vertical.svg";

interface AssignmentCardProps {
  assignment: Assignment;
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="
        group
        relative
        overflow-visible
        rounded-[24px]
        bg-surface
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-soft
        cursor-pointer
        h-[162px]
        flex
        flex-col
        justify-between
      "
      onClick={() =>
        router.push(
          `/assignments/${assignment._id}`
        )
      }
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <h2
          className="
            font-display
            text-[18px]
            font-bold
            leading-[140%]
            tracking-[-0.04em]
            text-foreground
          "
        >
          {assignment.fileName || "Untitled Assignment"}
        </h2>

        {/* Actions */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();

              setOpen(!open);
            }}
            className="
              opacity-70
              transition-all
              hover:opacity-100
              cursor-pointer
            "
          >
            <Image src={Morevertical} alt="Options" width={24} height={24} />
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="
                absolute
                right-0
                top-10
                z-50
                w-[160px]
                overflow-hidden
                rounded-[20px]
                bg-surface
                p-2
                shadow-[0px_16px_48px_0px_#0000001F]
                animate-in
                fade-in
                zoom-in-95
                duration-200
              "
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  router.push(
                    `/assignments/${assignment._id}`
                  );
                }}
                className="
    flex
    w-full
    cursor-pointer
    items-center
    rounded-xl
    px-4
    py-3
    text-left
    text-sm
    font-medium
    text-foreground
    transition-all
    duration-200
    hover:bg-[#F0F0F0]
  "
              >
                View Assignment
              </button>

              <button
                className="
    mt-1
    flex
    w-full
    cursor-pointer
    items-center
    rounded-xl
    px-4
    py-3
    text-left
    text-sm
    font-medium
    text-error
    transition-all
    duration-200
    hover:bg-[#F0F0F0]
  "
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <span className="font-semibold text-foreground">Assigned :</span>

          <span className="font-display text-muted-foreground">
            {new Date(assignment.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <span className="font-semibold text-foreground">Due :</span>

          <span className="font-display text-muted-foreground">
            {new Date(assignment.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
