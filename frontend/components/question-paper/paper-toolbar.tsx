"use client";

import { Download } from "lucide-react";

import { JWT_TOKEN } from "@/lib/constants";

export default function PaperToolbar({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const handleDownloadPDF =
    async () => {
      try {
        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/assignments/${assignmentId}/download-pdf`,
            {
              method: "POST",

              headers: {
                Authorization: `Bearer ${JWT_TOKEN}`,
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to download PDF"
          );
        }

        const blob =
          await response.blob();

        const url =
          window.URL.createObjectURL(
            blob
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.download = `question-paper-${assignmentId}.pdf`;

        document.body.appendChild(
          link
        );

        link.click();

        link.remove();

        window.URL.revokeObjectURL(
          url
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="mx-auto flex max-w-[1100px] items-center justify-between rounded-[32px] bg-[#1F1F1F] p-6 text-white shadow-soft">
      <div>
        <h1 className="font-display text-[28px] font-semibold tracking-[-0.04em]">
          Generated Question
          Paper
        </h1>

        <p className="mt-2 text-sm text-white/70">
          AI generated assignment
          paper ready for download.
        </p>
      </div>

      <button
        onClick={
          handleDownloadPDF
        }
        className="
          flex
          h-[48px]
          items-center
          gap-2
          rounded-full
          bg-white
          px-6
          text-sm
          font-medium
          text-black
          transition-all
          hover:scale-[1.02]
        "
      >
        <Download className="h-4 w-4" />

        Download PDF
      </button>
    </div>
  );
}