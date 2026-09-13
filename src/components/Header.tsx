"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { nav, site, whatsappLink } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-night">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:h-[88px] md:px-14">
        <Link href="/" onClick={close} className="shrink-0" aria-label={`${site.name} home`}>
          <Image
            src="/brand/logo-white.png"
            alt={site.name}
            width={1283}
            height={190}
            loading="eager"
            className="h-[22px] w-auto md:h-8"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 text-sm font-medium tracking-[0.04em] lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={isActive(item.href) ? "text-bone" : "text-smoke transition-colors hover:text-bone"}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full border border-bone px-5 py-[11px] font-semibold transition-colors hover:bg-bone hover:text-ink"
          >
            Book a shoot
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-11 items-center justify-center rounded-full border border-[#3a3a38] text-bone lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 flex flex-col overflow-y-auto bg-night px-4 pb-10 pt-4 md:top-[88px] lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col border-b border-line-dark">
            {[...nav, { label: "Contact", href: "/contact" }].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex items-baseline gap-4 border-t border-line-dark py-5"
              >
                <span className="font-mono text-[11px] text-smoke">0{index + 1}</span>
                <span className="font-display text-[min(6.6vw,30px)] leading-none">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-10 flex flex-col gap-3">
            <a
              href={whatsappLink("Namaste Makalu Flow! I'd like to talk about a shoot.")}
              className="flex h-[52px] items-center justify-center rounded-full bg-bone font-bold text-ink"
            >
              Message on WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className="flex h-[52px] items-center justify-center rounded-full border border-[#5a5a58] font-semibold">
              {site.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
