import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}&copy; Next JS is great!</div>;
}
