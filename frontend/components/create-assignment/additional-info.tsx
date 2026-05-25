"use client";

import { Mic } from "lucide-react";

interface AdditionalInfoProps {
  value: string;

  onChange: (
    value: string
  ) => void;
}

export default function AdditionalInfo({
  value,
  onChange,
}: AdditionalInfoProps) {
  return (
    <div>
      <h3 className="font-display text-[18px] font-semibold text-foreground">
        Additional Information
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        For better AI generated output
      </p>

      <div className="relative mt-4">
        <textarea
          value={value}
          onChange={(e) =>
            onChange(
              e.target.value
            )
          }
          placeholder="e.g Generate a question paper for 3 hour exam duration..."
          className="
            min-h-[160px]
            w-full
            resize-none
            rounded-[24px]
            border
            border-border
            bg-background
            p-5
            pr-14
            text-sm
            outline-none
            placeholder:text-muted-foreground
          "
        />

        <button
          className="
            absolute
            bottom-5
            right-5
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-surface
            transition-all
            hover:bg-[#F0F0F0]
          "
        >
          <Mic className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}