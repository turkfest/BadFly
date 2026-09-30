"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type FormEvent } from "react";
import type { Dictionary } from "@/dictionaries/types";
import { buttonClasses } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type Field = "name" | "company" | "country" | "email" | "message";
type Values = Record<Field, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS: Record<Field, number> = { name: 100, company: 120, country: 60, email: 160, message: 3000 };
const empty: Values = { name: "", company: "", country: "", email: "", message: "" };

export function ContactForm({ dict, recipient }: { dict: Dictionary["contactPage"]["form"]; recipient: string }) {
  const formId = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);

  const validate = (v: Values) => {
    const next: Partial<Record<Field, string>> = {};
    (Object.keys(v) as Field[]).forEach((k) => {
      if (!v[k].trim()) next[k] = dict.required;
    });
    if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) next.email = dict.invalidEmail;
    return next;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0] as Field;
      document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }

    const clean = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
    const subject = `${dict.subject} — ${clean(values.company)} (${clean(values.country)})`;
    const body = [
      `${dict.name}: ${clean(values.name)}`,
      `${dict.company}: ${clean(values.company)}`,
      `${dict.country}: ${clean(values.country)}`,
      `${dict.email}: ${clean(values.email)}`,
      "",
      values.message.trim(),
    ].join("\n");

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const update = (k: Field, v: string) => {
    setValues((prev) => ({ ...prev, [k]: v.slice(0, LIMITS[k]) }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const field = (k: Field, type: "text" | "email" = "text", autoComplete?: string) => (
    <div>
      <label htmlFor={`${formId}-${k}`} className="text-xs font-medium uppercase tracking-wider text-ink-500">
        {dict[k]} <span aria-hidden="true">*</span>
      </label>
      <input
        id={`${formId}-${k}`}
        name={k}
        type={type}
        autoComplete={autoComplete}
        required
        maxLength={LIMITS[k]}
        value={values[k]}
        onChange={(e) => update(k, e.target.value)}
        placeholder={dict[`${k}Placeholder` as const]}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${formId}-${k}-error` : undefined}
        className={cn("input", errors[k] && "border-clay-500")}
      />
      {errors[k] && (
        <p id={`${formId}-${k}-error`} className="mt-2 text-sm text-clay-600">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <div className="grid gap-10 md:grid-cols-2">
        {field("name", "text", "name")}
        {field("company", "text", "organization")}
        {field("country", "text", "country-name")}
        {field("email", "email", "email")}
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="text-xs font-medium uppercase tracking-wider text-ink-500">
          {dict.message} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={6}
          maxLength={LIMITS.message}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={dict.messagePlaceholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          className={cn("input resize-y", errors.message && "border-clay-500")}
        />
        {errors.message && (
          <p id={`${formId}-message-error`} className="mt-2 text-sm text-clay-600">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-ink-500">{dict.note}</p>
        <button type="submit" className={buttonClasses("primary")}>
          <span>{dict.submit}</span>
          <ArrowRight size={18} className="transition-transform duration-500 ease-premium group-hover:translate-x-1" />
        </button>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border-l-2 border-clay-500 bg-bone-100 px-5 py-4 text-sm text-ink-700"
          >
            {dict.success}{" "}
            <a href={`mailto:${recipient}`} className="font-medium underline underline-offset-4">
              {recipient}
            </a>
            .
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
