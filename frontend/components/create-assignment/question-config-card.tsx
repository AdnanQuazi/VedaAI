"use client";

import {
  ChevronDown,
  Minus,
  Plus,
  X,
} from "lucide-react";

interface QuestionConfig {
  type: string;

  count: number;

  marks: number;
}

interface QuestionConfigCardProps {
  config: QuestionConfig;

  onChange: (
    data: QuestionConfig
  ) => void;

  onRemove: () => void;
}

const questionTypes = [
  {
    label:
      "Multiple Choice Questions",

    value: "mcq",
  },

  {
    label:
      "Short Questions",

    value: "short",
  },

  {
    label:
      "Diagram/Graph-Based Questions",

    value: "diagram",
  },

  {
    label:
      "Numerical Problems",

    value: "numerical",
  },

  {
    label:
      "Long Answer Questions",

    value: "long",
  },
];

export default function QuestionConfigCard({
  config,
  onChange,
  onRemove,
}: QuestionConfigCardProps) {
  return (
    <div className="rounded-[24px] bg-background p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Select */}
        <div className="relative flex-1 bg-white  rounded-full">
          <select
            value={config.type}
            onChange={(e) =>
              onChange({
                ...config,
                type: e.target.value,
              })
            }
            className="
              h-[52px]
              w-full
              appearance-none
              rounded-full
              bg-surface
              px-5
              pr-12
              text-sm
              outline-none
            "
          >
            {questionTypes.map(
              (type) => (
                <option
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </option>
              )
            )}
          </select>

          <ChevronDown
            className="
              absolute
              right-4
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />
        </div>

        {/* Count */}
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <div>
            <div className="flex h-[52px] items-center rounded-full bg-surface px-4">
              <button
                onClick={() =>
                  onChange({
                    ...config,
                    count: Math.max(
                      1,
                      config.count - 1
                    ),
                  })
                }
                className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-[#F0F0F0]"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="w-10 text-center text-sm font-semibold">
                {config.count}
              </span>

              <button
                onClick={() =>
                  onChange({
                    ...config,
                    count:
                      config.count + 1,
                  })
                }
                className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-[#F0F0F0]"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Marks */}
          <div>
            <div className="flex h-[52px] items-center rounded-full bg-surface px-4">
              <button
                onClick={() =>
                  onChange({
                    ...config,
                    marks: Math.max(
                      1,
                      config.marks - 1
                    ),
                  })
                }
                className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-[#F0F0F0]"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="w-10 text-center text-sm font-semibold">
                {config.marks}
              </span>

              <button
                onClick={() =>
                  onChange({
                    ...config,
                    marks:
                      config.marks + 1,
                  })
                }
                className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-[#F0F0F0]"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Remove */}
          <button
            onClick={onRemove}
            className="mt-6 flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-[#F0F0F0]"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}