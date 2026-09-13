import Link from "next/link";
import { PageTitle } from "@/components/PageTitle";
import { button, container } from "@/lib/ui";

export default function NotFound() {
  return (
    <section className="bg-ink">
      <div className={`${container} flex min-h-[70svh] flex-col justify-center gap-8 py-20`}>
        <span className="font-mono text-xs tracking-[0.14em] text-smoke">404 · OFF THE MAP</span>
        <PageTitle display="Lost" serif="the trail." max="8rem" serifScale={1} />
        <p className="max-w-md text-lg text-smoke">This page doesn&apos;t exist — but the films and photographs do.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={button.light}>
            Back to home
          </Link>
          <Link href="/documentaries" className={button.outlineOnDark}>
            Documentaries
          </Link>
        </div>
      </div>
    </section>
  );
}
