import type { CSSProperties } from "react";

type PageTitleProps = {
  display: string;
  serif?: string;
  as?: "h1" | "h2";
  /** "line" keeps the display text on one line; "word" lets it wrap and only guarantees the longest word fits. */
  fit?: "line" | "word";
  /** Largest size the display text may grow to. */
  max?: string;
  /** Serif line size relative to the display line. */
  serifScale?: number;
  className?: string;
  displayClassName?: string;
  serifClassName?: string;
};

// Archivo at weight 900 and 125% width averages just under 0.95em per capital letter;
// the padding covers wide letters (M, W) and side bearings in short words.
const EM_PER_CHAR = 0.95;
const EM_PADDING = 0.4;

/** Wide display line over an italic serif line, sized to its container so it never overflows. */
export function PageTitle({
  display,
  serif,
  as: Tag = "h1",
  fit = "line",
  max = "8.5rem",
  serifScale = 1.08,
  className = "",
  displayClassName = "",
  serifClassName = "",
}: PageTitleProps) {
  const chars = fit === "line" ? display.length : Math.max(...display.split(/[\s-]+/).map((word) => word.length));
  const size = `min(calc(100cqw / ${(chars * EM_PER_CHAR + EM_PADDING).toFixed(2)}), ${max})`;

  return (
    <Tag className={`@container flex flex-col font-normal ${className}`} style={{ "--title-size": size } as CSSProperties}>
      <span className={`font-display leading-[0.9] ${displayClassName}`} style={{ fontSize: "var(--title-size)" }}>
        {display}
      </span>
      {serif && (
        <span
          className={`font-serif italic leading-[0.98] tracking-[-0.02em] ${serifClassName}`}
          style={{ fontSize: `calc(var(--title-size) * ${serifScale})` }}
        >
          {serif}
        </span>
      )}
    </Tag>
  );
}
