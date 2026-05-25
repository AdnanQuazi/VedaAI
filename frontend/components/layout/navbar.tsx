"use client";
import arrow_left from "@/public/icons/arrow_left.svg";
import bell from "@/public/icons/bell.svg";
import chevron_down from "@/public/icons/chevron_down.svg";
import avatar from "@/public/assets/avatar.jpg";
import logo_dark from "@/public/logo/logo_dark.svg";
import avatar2 from "@/public/assets/avatar_2.jpg";
import menu from "@/public/icons/menu.svg";
import Image from "next/image";
import assignments from "@/public/icons/assignments.svg";
import { useGetMeQuery } from "@/redux/services/authApi";
import { usePathname, useRouter } from "next/navigation";
export default function Navbar() {
  const { data: user } = useGetMeQuery();
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    if (
      pathname?.startsWith(
        "/assignments"
      )
    ) {
      router.push("/assignments");
      return;
    }

    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        router.back();
        return;
      }
    }

    router.push("/");
  };
  return (
    <>
      {/* Desktop */}
      <header
        className="
        sticky
        top-0
        z-40
        mx-3
        mt-3
        hidden
        min-h-[56px]
        items-center
        justify-between
        rounded-[16px]
        border
        border-border
        bg-surface-secondary
        pr-[12px]
        pl-[24px]
        py-[8px]
        lg:flex
        gap-[10px]
  "
      >
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-surface-secondary bg-white"
          >
            <Image src={arrow_left} alt="Back" width={20} height={20} />
          </button>

          <div>
            <h2
              className="
              font-display
              text-[16px]
              font-medium
              leading-[100%]
              tracking-[-0.04em]
              text-muted-foreground
              text-center
            "
            >
              <Image
                src={assignments}
                alt="Assignments"
                width={20}
                height={20}
                className="inline-block mr-2"
              />
              Assignments
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="relative flex h-11 w-11 items-center justify-center rounded-full transition-all  bg-[#F6F6F6]">
            <Image src={bell} alt="Notifications" width={20} height={20} />
            <span className="absolute right-1 top-1 h-[8px] w-[8px] rounded-full bg-error" />
          </button>

          <div
            className="
              flex
              items-center
              gap-3
              rounded-[12px]
              bg-surface
              px-3
              py-2
            "
          >
            <Image src={avatar} className="rounded-full" alt="User Avatar" width={32} height={32} />

            <p className="text-sm font-semibold text-foreground font-medium">{user?.name || "John Doe"}</p>
            <Image src={chevron_down} alt="Dropdown" width={23} height={23} />
          </div>
        </div>
      </header>

      {/* Mobile */}
      <header className="flex items-center justify-between rounded-[16px] bg-surface px-4 py-4 lg:hidden sticky
        top-0
        z-40
        mx-3
        mt-3 h-[56px]">
        <div className="flex items-center gap-3">
          <Image src={logo_dark} alt="Logo" width={32} height={32} />

          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            VedaAI
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full  bg-[#F6F6F6]">
            <Image src={bell} alt="Notifications" width={20} height={20} />
            <span className="absolute right-1 top-1 h-[8px] w-[8px] rounded-full bg-error" />
          </button>

          <Image src={avatar2} className="rounded-full" alt="User Avatar" width={32} height={32} />

          <button className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer">
            <Image src={menu} alt="Menu" width={20} height={20} />
          </button>
        </div>
      </header>
    </>
  );
}
