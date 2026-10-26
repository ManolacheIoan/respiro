"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { site, whatsappLink } from "@/config/site";
import { serviceGroups, services } from "@/data/services";
import { composeMessage, getFormAdapter, readable, type SendResult } from "@/lib/form";
import {
  dayInfo,
  MAX_DAYS_AHEAD,
  timeSlots,
  toIsoDate,
  UNDECIDED,
  validateContact,
  type ContactData,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/validation";

const MESSAGE_MAX = 1000;

/** Ordinea câmpurilor (pentru rezumatul erorilor și focus). */
const FIELDS: { name: ContactField; label: string }[] = [
  { name: "name", label: "Nume și prenume" },
  { name: "phone", label: "Telefon" },
  { name: "email", label: "E-mail" },
  { name: "service", label: "Serviciu" },
  { name: "day", label: "Ziua preferată" },
  { name: "time", label: "Interval orar" },
  { name: "message", label: "Mesaj" },
  { name: "consent", label: "Acord" },
];

function readForm(form: HTMLFormElement): ContactInput {
  const fd = new FormData(form);
  const s = (k: string) => String(fd.get(k) ?? "");
  return {
    name: s("name"),
    phone: s("phone"),
    email: s("email"),
    service: s("service"),
    day: s("day"),
    time: s("time"),
    message: s("message"),
    consent: fd.get("consent") === "on",
    website: s("website"),
  };
}

type Outcome = { data: ContactData; result: SendResult } | null;

export function ContactForm() {
  const id = useId();
  const f = (name: string) => `${id}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [sending, setSending] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [sendError, setSendError] = useState("");
  const [dayHint, setDayHint] = useState("");
  const [msgLen, setMsgLen] = useState(0);

  // Limitele calendarului și serviciul din adresă (?serviciu=…), setate direct în DOM
  // după încărcare: pagina rămâne statică, fără salt de layout.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const today = new Date();
    const max = new Date(today);
    max.setDate(max.getDate() + MAX_DAYS_AHEAD);
    const day = form.elements.namedItem("day") as HTMLInputElement;
    day.min = toIsoDate(today);
    day.max = toIsoDate(max);
    const wanted = new URLSearchParams(window.location.search).get("serviciu");
    const select = form.elements.namedItem("service") as HTMLSelectElement;
    if (wanted && services.some((s) => s.id === wanted)) select.value = wanted;
  }, []);

  useEffect(() => {
    if (outcome) doneRef.current?.focus();
  }, [outcome]);

  const revalidate = () => {
    if (!attempted || !formRef.current) return;
    const r = validateContact(readForm(formRef.current));
    setErrors(r.ok ? {} : r.errors);
  };

  const onDayChange = (value: string) => {
    if (!value) return setDayHint("");
    const info = dayInfo(value);
    setDayHint(info.open ? (info.reason ?? `Program în ziua aleasă: ${info.openAt}–${info.close}.`) : "");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setAttempted(true);
    setSendError("");
    const r = validateContact(readForm(e.currentTarget));
    if (!r.ok) {
      setErrors(r.errors);
      // Rezumatul primește focus ca să fie citit; din el se poate sări la fiecare câmp.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    if (r.spam) {
      setOutcome({ data: r.data, result: { status: getFormAdapter().mode === "local" ? "local" : "sent" } });
      return;
    }
    setSending(true);
    const result = await getFormAdapter().send(r.data);
    setSending(false);
    if (result.status === "error") setSendError(result.message);
    else setOutcome({ data: r.data, result });
  };

  const errorList = FIELDS.filter((x) => errors[x.name]);
  const describedBy = (name: ContactField, hint?: string) =>
    [hint, errors[name] ? f(`${name}-eroare`) : ""].filter(Boolean).join(" ") || undefined;
  const fieldError = (name: ContactField) =>
    errors[name] ? (
      <p id={f(`${name}-eroare`)} className="field__error">
        {errors[name]}
      </p>
    ) : null;

  return (
    <>
      {outcome ? <Done outcome={outcome} headingRef={doneRef} onEdit={() => setOutcome(null)} /> : null}

      <form
        ref={formRef}
        className="contact-form card"
        noValidate
        onSubmit={onSubmit}
        onChange={revalidate}
        hidden={outcome !== null}
        aria-labelledby={f("titlu")}
      >
        <h2 id={f("titlu")} className="h3-like">
          Cere o programare
        </h2>
        <p className="small muted">
          Câmpurile marcate cu <span aria-hidden="true">*</span>
          <span className="visually-hidden">steluță</span> sunt obligatorii. Îți confirmăm ora telefonic sau prin
          mesaj.
        </p>

        {errorList.length ? (
          <div ref={summaryRef} className="alert alert--error" role="alert" tabIndex={-1}>
            <p className="alert__title">
              {errorList.length === 1 ? "Mai e un câmp de corectat:" : `Mai sunt ${errorList.length} câmpuri de corectat:`}
            </p>
            <ul>
              {errorList.map((x) => (
                <li key={x.name}>
                  <a href={`#${f(x.name)}`}>
                    {x.label}: {errors[x.name]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {sendError ? (
          <div className="alert alert--error" role="alert">
            <p className="alert__title">Mesajul nu a putut fi trimis.</p>
            <p>
              {sendError} Încearcă din nou sau sună-ne la <a href={`tel:${site.phoneHref}`}>{site.phone}</a>.
            </p>
          </div>
        ) : null}

        <div className="form-grid">
          <div className="field">
            <label className="field__label" htmlFor={f("name")}>
              Nume și prenume <span aria-hidden="true">*</span>
            </label>
            <input
              id={f("name")}
              name="name"
              className="input"
              autoComplete="name"
              required
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy("name")}
            />
            {fieldError("name")}
          </div>

          <div className="field">
            <label className="field__label" htmlFor={f("phone")}>
              Telefon <span aria-hidden="true">*</span>
            </label>
            <input
              id={f("phone")}
              name="phone"
              type="tel"
              className="input"
              autoComplete="tel"
              inputMode="tel"
              required
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy("phone", f("phone-ajutor"))}
            />
            <p id={f("phone-ajutor")} className="field__hint">
              Exemplu: 0712 345 678
            </p>
            {fieldError("phone")}
          </div>

          <div className="field field--full">
            <label className="field__label" htmlFor={f("email")}>
              E-mail <span className="field__optional">(opțional)</span>
            </label>
            <input
              id={f("email")}
              name="email"
              type="email"
              className="input"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
            />
            {fieldError("email")}
          </div>

          <div className="field field--full">
            <label className="field__label" htmlFor={f("service")}>
              Serviciu <span aria-hidden="true">*</span>
            </label>
            <select
              id={f("service")}
              name="service"
              className="input"
              required
              defaultValue=""
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={describedBy("service")}
            >
              <option value="" disabled>
                Alege un serviciu
              </option>
              {serviceGroups.map((g) => (
                <optgroup key={g.id} label={g.title}>
                  {services
                    .filter((s) => s.group === g.id)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                </optgroup>
              ))}
              <option value={UNDECIDED}>Încă nu știu, aș vrea o recomandare</option>
            </select>
            {fieldError("service")}
          </div>

          <div className="field">
            <label className="field__label" htmlFor={f("day")}>
              Ziua preferată <span aria-hidden="true">*</span>
            </label>
            <input
              id={f("day")}
              name="day"
              type="date"
              className="input"
              required
              onChange={(e) => onDayChange(e.target.value)}
              aria-invalid={errors.day ? true : undefined}
              aria-describedby={describedBy("day", f("day-ajutor"))}
            />
            <p id={f("day-ajutor")} className="field__hint" aria-live="polite">
              {dayHint || "Luni–vineri 10–21, sâmbătă 10–18. Duminica e închis."}
            </p>
            {fieldError("day")}
          </div>

          <div className="field">
            <label className="field__label" htmlFor={f("time")}>
              Interval orar <span aria-hidden="true">*</span>
            </label>
            <select
              id={f("time")}
              name="time"
              className="input"
              required
              defaultValue=""
              aria-invalid={errors.time ? true : undefined}
              aria-describedby={describedBy("time")}
            >
              <option value="" disabled>
                Alege intervalul
              </option>
              {timeSlots.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            {fieldError("time")}
          </div>

          <div className="field field--full">
            <label className="field__label" htmlFor={f("message")}>
              Mesaj <span className="field__optional">(opțional)</span>
            </label>
            <textarea
              id={f("message")}
              name="message"
              className="input"
              rows={4}
              onInput={(e) => setMsgLen(e.currentTarget.value.length)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy("message", f("message-ajutor"))}
            />
            <p id={f("message-ajutor")} className="field__hint">
              Ex.: prima vizită, zone sensibile, terapeutul preferat. {msgLen}/{MESSAGE_MAX}
            </p>
            {fieldError("message")}
          </div>

          {/* Capcană pentru roboți: ascunsă vizual și pentru cititoarele de ecran. */}
          <div className="hp" aria-hidden="true">
            <label htmlFor={f("website")}>Site web</label>
            <input id={f("website")} name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="field field--full">
            <label className="check">
              <input
                id={f("consent")}
                name="consent"
                type="checkbox"
                required
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={describedBy("consent")}
              />
              <span>
                Sunt de acord să fiu contactat(ă) pentru această cerere. Detalii în{" "}
                <Link href="/confidentialitate/">politica de confidențialitate</Link>.{" "}
                <span aria-hidden="true">*</span>
              </span>
            </label>
            {fieldError("consent")}
          </div>
        </div>

        <button type="submit" className="btn btn--primary contact-form__submit" disabled={sending}>
          <Icon name="calendar" /> {sending ? "Se trimite…" : "Trimite cererea"}
        </button>
      </form>
    </>
  );
}

function Done({
  outcome,
  headingRef,
  onEdit,
}: {
  outcome: NonNullable<Outcome>;
  headingRef: React.Ref<HTMLHeadingElement>;
  onEdit: () => void;
}) {
  const { data, result } = outcome;
  const text = composeMessage(data);
  const sent = result.status === "sent";
  return (
    <div className="card done" data-result={result.status}>
      <span className="done__badge" aria-hidden="true">
        <Icon name={sent ? "check" : "chat"} size={34} />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="h3-like">
        {sent ? "Am primit cererea ta" : "Cererea ta e pregătită. Mai e un pas"}
      </h2>
      {sent ? (
        <p>
          Îți mulțumim! Te contactăm în cel mult o zi lucrătoare ca să confirmăm ora. Programarea devine sigură doar
          după confirmare.
        </p>
      ) : (
        <p>
          Formularul de pe site <strong>nu a trimis</strong> cererea. Ca să ajungă la noi, trimite-o cu un clic pe
          WhatsApp (textul e deja completat) sau sună-ne. Îți confirmăm ora cât mai repede.
        </p>
      )}

      <dl className="done__summary">
        {Object.entries(readable(data)).map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <div className="btn-row">
        {sent ? null : (
          <a className="btn btn--primary" href={whatsappLink(text)}>
            <Icon name="chat" /> Trimite pe WhatsApp
          </a>
        )}
        <a className={sent ? "btn btn--primary" : "btn"} href={`tel:${site.phoneHref}`}>
          <Icon name="phone" /> Sună: {site.phone}
        </a>
        {sent ? null : (
          <a className="btn" href={`sms:${site.phoneHref}?body=${encodeURIComponent(text)}`}>
            SMS
          </a>
        )}
        {sent ? null : (
          <a
            className="btn"
            href={`mailto:${site.email}?subject=${encodeURIComponent("Cerere de programare")}&body=${encodeURIComponent(text)}`}
          >
            <Icon name="mail" /> E-mail
          </a>
        )}
      </div>
      <button type="button" className="btn-link" onClick={onEdit}>
        Modifică cererea
      </button>
    </div>
  );
}
