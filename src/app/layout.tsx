import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Metadata } from "next";

import "./styles/fullcalendar.css";
import "./styles/globals.css";

import favicon from "../images/student_event_logo_2.png";
//Authentication för framtida buckets
import EnsureAuth from "./components/EnsureAuth";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export const metadata: Metadata = {
  description: "Alla evenemang på ett ställe för studenter vid LiU",
  authors: [
    { name: "Nils Marion" },
    { name: "Axel Jakobsson" },
    { name: "Gustaf Segersson" },
    { name: "William Lundgren" },
    { name: "Fredrik Göransson" },
  ],
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
        <EnsureAuth /> {/*Authentication för framtida buckets*/}
        <Navbar />
        <div className="main">{children}</div>
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
