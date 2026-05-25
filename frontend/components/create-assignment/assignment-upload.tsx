"use client";

import { UploadCloud } from "lucide-react";

interface AssignmentUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function AssignmentUpload({
  file,
  onChange,
}: AssignmentUploadProps) {

  return (
    <label
      className="
        flex
        min-h-[260px]
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-[28px]
        border-2
        border-dashed
        border-border
        bg-background
        px-6
        text-center
        transition-all
        hover:border-primary
      "
    >
      <input
        type="file"
        className="hidden"
        accept=".pdf,.txt"
        onChange={(e) => {
          const file =
            e.target.files?.[0];

          onChange(file || null);
        }}
      />

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface shadow-soft">
        <UploadCloud className="h-6 w-6 text-foreground" />
      </div>

      <h3 className="mt-6 font-display text-[20px] font-semibold text-foreground">
        Choose a file or drag & drop it here
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        PDF, TXT up to 10MB
      </p>

      {file?.name && (
        <p className="mt-4 text-sm font-medium text-foreground">
          {file.name}
        </p>
      )}

      <div className="mt-6 rounded-full bg-surface px-6 py-3 shadow-soft bg-[#F6F6F6]">
        Browse Files
      </div>
    </label>
  );
}