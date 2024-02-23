import { Metadata } from "next";
import Navagation from "../components/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Next Movoies",
    default: "Next Movies",
  },
  description: "The best moveis on the bset framework",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navagation />
        {children}
      </body>
    </html>
  );
}
