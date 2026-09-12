export const container = "mx-auto w-full max-w-[1440px] px-4 md:px-14";

const pill =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-bold transition-colors md:h-[50px]";

export const button = {
  light: `${pill} bg-bone text-ink hover:bg-white`,
  outlineOnDark: `${pill} border border-[#5a5a58] font-semibold text-bone hover:border-bone`,
  dark: `${pill} bg-charcoal text-paper hover:bg-black`,
  outlineOnLight: `${pill} border-[1.5px] border-charcoal text-charcoal hover:bg-charcoal hover:text-paper`,
};

export const mono = "font-mono uppercase tracking-[0.12em]";
