"use client";
import logo from "@/public/logo/logo.jpg";
import star from "@/public/icons/star.png";
import home from "@/public/icons/home.svg";
import group from "@/public/icons/group.svg";
import assignments from "@/public/icons/assignments.svg";
import toolkit from "@/public/icons/toolkit.svg";
import library from "@/public/icons/library.svg";
import settings from "@/public/icons/setting.svg";
import Image from "next/image";
import avatar from "@/public/assets/avatar.jpg";
import { useGetMeQuery } from "@/redux/services/authApi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
const navItems = [
  {
    label: "Home",
    active: false,
    icon: home,
    href: "/",
  },

  {
    label: "My Groups",
    active: false,
    icon: group,
    href: "/",
  },

  {
    label: "Assignments",
    active: true,
    icon: assignments,
    href: "/assignments",
  },

  {
    label: "AI Teacher's Toolkit",
    active: false,
    icon: toolkit,
    href: "/",
  },

  {
    label: "My Library",
    active: false,
    icon: library,
    href: "/",
  },
];

export default function Sidebar() {
  const { data: user } = useGetMeQuery();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="hidden ml-[12px] my-[12px] w-[304px] flex-col border-r border-border bg-surface p-[24px] lg:flex rounded-[16px] h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image src={logo} alt="VedaAI Logo" width={40} height={40} />
        <h1 className="font-display text-[28px] font-bold tracking-tight text-foreground">
          VedaAI
        </h1>
      </div>

      {/* CTA */}
      <div className="mt-8 rounded-full bg-gradient-to-b from-[#FF7950] to-[#C0350A] p-[4px] transition-all duration-300 h-[fit-content]">
        <Link
          href="/assignments/create"
          className="
      flex
      w-full
      items-center
      justify-center
      rounded-full
      bg-create-assignment
      px-2
      py-3
      text-sm
      text-[16px]
      font-medium
      text-white
      flex
      gap-2
      leading-[-4%]
      cursor-pointer
    "
        >
          <Image src={star} alt="Create Assignment" width={18} height={17} />{" "}
          Create Assignment
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() =>
              item.href &&
              router.push(item.href)
            }
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 cursor-pointer font-display text-[16px]
  font-normal
  leading-[140%]
  tracking-[-0.04em] ${
    pathname === item.href
      ? "bg-[#F0F0F0] text-foreground"
      : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
  }`}
          >
            <Image
              src={item.icon}
              alt={`${item.label} Icon`}
              width={16}
              height={16}
            />

            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button
          key={"settings"}
          className={`cursor-pointer font-display
  text-[16px]
  font-normal
  leading-[140%]
  tracking-[-0.04em] flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 text-muted-foreground hover:bg-surface-secondary hover:text-foreground`}
        >
          <Image src={settings} alt={`Settings Icon`} width={20} height={20} />
          Settings
        </button>

        {/* School Card */}
        <div className="rounded-[16px] bg-[#F0F0F0] p-[12px] h-[80px]">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <Image
              src={avatar}
              className="rounded-full"
              alt="School Avatar"
              width={59}
              height={56}
            />

            {/* School Info */}
            <div className="">
              <h3
                className="
  font-display
  text-[16px]
  font-bold
  leading-[140%]
  tracking-[-0.04em]
"
              >
                {user?.schoolName}
              </h3>

              <p className="
  font-display
  text-[14px]
  font-normal
  leading-[140%]
  tracking-[-0.04em]
  text-[#5E5E5E]
">{user?.city}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
