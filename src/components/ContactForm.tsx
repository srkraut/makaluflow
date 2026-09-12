"use client";

import type { FormEvent } from "react";
import { site, whatsappLink } from "@/content/site";
import { button } from "@/lib/ui";

const projectTypes = [
  "Documentary",
  "Brand or promotional film",
  "Event coverage",
  "Travel or destination film",
  "Photography",
  "Something else",
];

const field =
  "w-full border-b border-charcoal/35 bg-transparent py-3 text-lg text-charcoal placeholder:text-stone/70 focus:border-charcoal focus:outline-none";
const label = "font-mono text-[11px] uppercase tracking-[0.14em] text-stone";

function compose(form: HTMLFormElement) {
  const data = new FormData(form);
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const lines = [`Namaste Makalu Flow! My name is ${value("name")}.`, `Project: ${value("type")}`];
  if (value("when")) lines.push(`When: ${value("when")}`);
  if (value("where")) lines.push(`Where: ${value("where")}`);
  lines.push("", value("message"));
  return lines.join("\n");
}

export function ContactForm() {
  const sendOnWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(whatsappLink(compose(event.currentTarget)), "_blank", "noopener,noreferrer");
  };

  const sendByEmail = (form: HTMLFormElement | null) => {
    if (!form?.reportValidity()) return;
    const subject = `Project enquiry — ${new FormData(form).get("type")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compose(form))}`;
  };

  return (
    <form onSubmit={sendOnWhatsApp} className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className={label}>Your name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>Project</span>
          <select name="type" defaultValue={projectTypes[0]} className={field}>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>When</span>
          <input name="when" placeholder="Dates or month" className={field} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={label}>Where</span>
          <input name="where" placeholder="Place or district" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className={label}>The story</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What's happening, who's involved, and what you'd like to make."
          className={`${field} resize-y`}
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className={button.dark}>
          Send on WhatsApp
        </button>
        <button type="button" onClick={(event) => sendByEmail(event.currentTarget.form)} className={button.outlineOnLight}>
          Send by email
        </button>
      </div>
      <p className="text-sm text-stone">Both buttons open WhatsApp or your email app with the message ready to send.</p>
    </form>
  );
}
