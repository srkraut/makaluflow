import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageTitle } from "@/components/PageTitle";
import { SectionLabel } from "@/components/SectionLabel";
import { site, whatsappLink } from "@/content/site";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book Makalu Flow Creations for documentaries, cinematography and travel films. Based in Itahari, Sunsari, Nepal.",
};

const details = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "WhatsApp", value: site.phoneDisplay, href: whatsappLink() },
  { label: "Phone", value: site.phoneDisplay, href: `tel:${site.phone}` },
  { label: "Based in", value: `${site.location.city}, ${site.location.district}, ${site.location.country}` },
];

export default function ContactPage() {
  return (
    <div className="bg-paper text-charcoal">
      <section className={`${container} flex flex-col gap-10 py-12 md:gap-16 md:py-20`}>
        <SectionLabel
          index="01"
          title="Work with Makalu Flow"
          aside={
            <span className="font-mono text-[11px] tracking-[0.12em] text-stone md:text-xs">
              DOCUMENTARIES · BRAND FILMS · CINEMATOGRAPHY
            </span>
          }
        />
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <div className="flex flex-col gap-10">
            <PageTitle display="Have a story" serif="worth filming?" max="5.5rem" serifScale={1.2} />
            <p className="max-w-md text-lg leading-relaxed text-graphite">
              Share the place, the people and the dates. WhatsApp is the quickest way to reach Makalu Flow.
            </p>
            <dl className="flex flex-col border-b border-line-light">
              {details.map((detail) => (
                <div key={detail.label} className="flex items-baseline justify-between gap-6 border-t border-line-light py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-stone">{detail.label}</dt>
                  <dd className="text-right font-serif text-xl md:text-2xl">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        {...(detail.href.startsWith("https") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="hover:underline"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
