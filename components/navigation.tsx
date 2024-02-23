"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navagation() {
  const path = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
          {path === "/" ? "😼" : ""}
        </li>
        <li>
          <Link href="/about-us">About us</Link>
          {path === "/about-us" ? "😼" : ""}ㅂ
        </li>
      </ul>
    </nav>
  );
}
