import type { ReactNode } from "react";

type SectionLabelProps = {
  index: string;
  title: string;
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "p";
  aside?: ReactNode;
};

export function SectionLabel({ index, title, tone = "light", as: Title = "p", aside }: SectionLabelProps) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-3 md:pt-4 ${
        dark ? "border-t border-line-dark" : "border-t-[1.5px] border-charcoal"
      }`}
    >
      <div className="flex items-baseline gap-2.5 md:gap-3.5">
        <span className={`font-mono text-[11px] md:text-[13px] ${dark ? "text-smoke" : "text-stone"}`}>{index}</span>
        <Title className="font-serif text-xl font-normal italic md:text-[28px]">{title}</Title>
      </div>
      {aside}
    </div>
  );
}

export function Viewfinder({ inset = "inset-3 md:inset-6" }: { inset?: string }) {
  const corner = "absolute size-5 border-bone/60 md:size-7";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${inset}`}>
      <span className={`${corner} left-0 top-0 border-l-[1.5px] border-t-[1.5px]`} />
      <span className={`${corner} right-0 top-0 border-r-[1.5px] border-t-[1.5px]`} />
      <span className={`${corner} bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]`} />
      <span className={`${corner} bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]`} />
    </div>
  );
}
