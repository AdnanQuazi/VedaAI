"use client";

import { CalendarDays } from "lucide-react";

interface DueDatePickerProps {
  value: string;

  onChange: (
    value: string
  ) => void;
}

export default function DueDatePicker({
  value,
  onChange,
}: DueDatePickerProps) {
  return (
    <div>
      <h3 className="mb-3 font-display text-[18px] font-semibold text-foreground">
        Due Date
      </h3>

      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) =>
            onChange(
              e.target.value
            )
          }
          className="
            h-[56px]
            w-full
            rounded-full
            border
            border-border
            bg-background
            px-5
            pr-14
            text-sm
            outline-none
          "
        />

        <CalendarDays
          className="
            absolute
            right-5
            top-1/2
            h-5
            w-5
            -translate-y-1/2
            text-muted
          "
        />
      </div>
    </div>
  );
}