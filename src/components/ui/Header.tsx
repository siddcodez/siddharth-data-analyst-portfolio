"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

const Header = () => {
  const activeRoute = usePathname();
  return (
    <div className="w-screen flex justify-center items-center h-[60px] container-xl mx-auto px-4 absolute top-0">
      {activeRoute !== "/" && (
        <Link
          href={"/"}
          className="p-4 absolute top-0 left-2 text-sm duration-500 hover:text-accent"
        >
          Home
        </Link>
      )}
      <nav>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-4 text-sm duration-500 text-muted-foreground hover:text-foreground ${activeRoute === link.href ? "text-foreground" : ""
              }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Header;
