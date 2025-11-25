import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";

import "./styles/fullcalendar.css";
import "./styles/globals.css";

import favicon from "../images/student_event_logo_2.png";
import Navbar from "./components/navbar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Student Event",
  description: "Alla evenemang på ett ställe för studenter vid LiU",
  authors: [{ name: "Nils Marion" }, { name: "Axel Jakobsson" }, { name: "Gustaf Segersson" }, { name: "William Lundgren" }, { name: "Fredrik Göransson" }],
  icons: {
    icon: favicon.src,
    shortcut: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
