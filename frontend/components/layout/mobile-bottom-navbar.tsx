"use client";

import home from "@/public/icons/home.svg";
import group from "@/public/icons/group.svg";
import assignments from "@/public/icons/Calendar.svg";
import toolkit from "@/public/icons/star_dark.svg";
import library from "@/public/icons/file-text_plus.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
const navItems = [
  {
    label: "Home",
    active: false,
    icon: home,
    href: "/",
  },
  {
    label: "Assignments",
    active: true,
    icon: assignments,
    href: "/assignments",
  },
  {
    label: "My Library",
    active: false,
    icon: library,
    href: "/",
  },
  {
    label: "AI Toolkit",
    active: false,
    icon: toolkit,
    href: "/",
  },
];
export default function MobileBottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex w-[92%] -translate-x-1/2 items-center justify-around rounded-[24px] bg-primary px-4 py-3 shadow-2xl lg:hidden h-[72px]">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() =>
            item.href &&
            router.push(item.href)
          }
          className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-[11px] transition-all duration-200 ${
            pathname === item.href ? "text-white" : "text-muted"
          }`}
        >
          <Image
            src={item.icon}
            alt={`${item.label} Icon`}
            width={20}
            height={20}
          />
          {item.label}
        </button>
      ))}
    </nav>
  );
}
