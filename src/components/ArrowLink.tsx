import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 text-sm font-semibold ${className}`}>
      <span>{children}</span>
      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
