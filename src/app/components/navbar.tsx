"use client";

import Image from "next/image";
import logo from "../../images/LIGGANDE_LOGO.png";
import styles from "./navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLDivElement | null>(null);

  const getLinkClass = (href: string) => {
    const isActive =
      href === "/" ? pathName === "/" : pathName?.startsWith(href);
    return `${styles["nav-link"]} ${isActive ? styles.active : ""}`.trim();
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        burgerRef.current &&
        !burgerRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image
          src={logo}
          alt="Student Event logo"
          className={styles["nav-img"]}
          aria-hidden={true}
          priority
        />
      </Link>

      <div className={styles["nav-buttons-container"]}>
        <Link href="/" className={getLinkClass("/")}>
          Hem
        </Link>
        <Link href="/calendar" className={getLinkClass("/calendar")}>
          Kalender
        </Link>
        <Link href="/create-event" className={getLinkClass("/create-event")}>
          Skapa Event
        </Link>
      </div>

      {/* Hamburger */}
      <div
        ref={burgerRef}
        className={`${styles["nav-icon"]} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Öppna meny"
        role="button"
        tabIndex={0}
      >
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`${styles["mobile-menu"]} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={getLinkClass("/")}
        >
          Hem
        </Link>

        <Link
          href="/calendar"
          onClick={() => setMenuOpen(false)}
          className={getLinkClass("/calendar")}
        >
          Kalender
        </Link>

        <Link
          href="/create-event"
          onClick={() => setMenuOpen(false)}
          className={getLinkClass("/create-event")}
        >
          Skapa Event
        </Link>
      </div>
    </nav>
  );
}
