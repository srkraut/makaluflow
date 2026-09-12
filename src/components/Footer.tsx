import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-night">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-9 font-mono text-xs tracking-[0.1em] text-smoke md:flex-row md:items-center md:justify-between md:px-14 md:py-8">
        <Link href="/" aria-label={`${site.name} home`} className="self-start md:self-auto">
          <Image src="/brand/logo-white.png" alt={site.name} width={1283} height={190} className="h-[22px] w-auto md:h-[26px]" />
        </Link>
        <ul className="grid grid-cols-2 gap-2 md:flex md:gap-7">
          {site.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center rounded-full border border-[#2e2e2d] uppercase transition-colors hover:text-bone md:h-auto md:border-0"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-dim">© {new Date().getFullYear()} MAKALU FLOW CREATIONS</p>
      </div>
    </footer>
  );
}
