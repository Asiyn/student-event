"use client";

import Image from "next/image";
import logo from "../../images/student_event_logo_1.png";
import styles from "./navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navbar() {
  const pathName = usePathname();

  const getLinkClass = (href: string) => {
    const isActive =
      href === "/" ? pathName === "/" : pathName?.startsWith(href);
    return `${styles["nav-link"]} ${isActive ? styles.active : ""}`.trim();
  };

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
    </nav>
  );
}
