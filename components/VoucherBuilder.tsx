"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/icons";
import { Voucher } from "@/components/Voucher";
import { BUSINESS_NAME, site, whatsappLink } from "@/config/site";
import { lei } from "@/lib/format";
import { VOUCHER_MAX, VOUCHER_MIN, VOUCHER_PRESETS, validateVoucherAmount } from "@/lib/validation";

const MESSAGE_MAX = 120;
const NAME_MAX = 40;

const noop = () => () => {};
/** Data de expirare: azi + 6 luni (calculată în browser). */
const validUntil = () =>
  new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(new Date().setMonth(new Date().getMonth() + 6)),
  );

export function VoucherBuilder() {
  const id = useId();
  const [preset, setPreset] = useState<number | "alta">(250);
  const [custom, setCustom] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const until = useSyncExternalStore(noop, validUntil, () => "");

  const customCheck = preset === "alta" ? validateVoucherAmount(custom) : null;
  const amount = preset === "alta" ? (customCheck?.ok ? customCheck.value : null) : preset;
  const showCustomError = preset === "alta" && custom !== "" && customCheck && !customCheck.ok;

  const summary = [
    `Bună ziua! Aș dori un card cadou ${BUSINESS_NAME}${amount ? ` în valoare de ${lei(amount)}` : ""}.`,
    to && `Pentru: ${to}`,
    from && `De la: ${from}`,
    message && `Dedicație: ${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="builder">
      <form className="builder__form card" onSubmit={(e) => e.preventDefault()} noValidate>
        <fieldset className="field">
          <legend className="field__label">Valoarea cardului</legend>
          <div className="amounts">
            {VOUCHER_PRESETS.map((v) => (
              <label key={v} className="amount">
                <input type="radio" name={`${id}-suma`} checked={preset === v} onChange={() => setPreset(v)} />
                <span>{lei(v)}</span>
              </label>
            ))}
            <label className="amount">
              <input type="radio" name={`${id}-suma`} checked={preset === "alta"} onChange={() => setPreset("alta")} />
              <span>Altă sumă</span>
            </label>
          </div>
          {preset === "alta" ? (
            <div className="field field--inline">
              <label className="field__label" htmlFor={`${id}-alta`}>
                Suma dorită (lei)
              </label>
              <input
                id={`${id}-alta`}
                className="input"
                inputMode="numeric"
                autoComplete="off"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                aria-invalid={showCustomError ? true : undefined}
                aria-describedby={`${id}-alta-ajutor${showCustomError ? ` ${id}-alta-eroare` : ""}`}
                placeholder="ex.: 300"
              />
              <p id={`${id}-alta-ajutor`} className="field__hint">
                Între {VOUCHER_MIN} și {VOUCHER_MAX} lei, multiplu de 10.
              </p>
              {showCustomError ? (
                <p id={`${id}-alta-eroare`} className="field__error">
                  {customCheck.error}
                </p>
              ) : null}
            </div>
          ) : null}
        </fieldset>

        <div className="field">
          <label className="field__label" htmlFor={`${id}-pentru`}>
            Pentru <span className="field__optional">(opțional)</span>
          </label>
          <input
            id={`${id}-pentru`}
            className="input"
            value={to}
            maxLength={NAME_MAX}
            onChange={(e) => setTo(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="field">
          <label className="field__label" htmlFor={`${id}-de-la`}>
            De la <span className="field__optional">(opțional)</span>
          </label>
          <input
            id={`${id}-de-la`}
            className="input"
            value={from}
            maxLength={NAME_MAX}
            onChange={(e) => setFrom(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="field">
          <label className="field__label" htmlFor={`${id}-mesaj`}>
            Dedicație <span className="field__optional">(opțional)</span>
          </label>
          <textarea
            id={`${id}-mesaj`}
            className="input"
            rows={3}
            value={message}
            maxLength={MESSAGE_MAX}
            onChange={(e) => setMessage(e.target.value)}
            aria-describedby={`${id}-mesaj-numar`}
          />
          <p id={`${id}-mesaj-numar`} className="field__hint">
            {message.length}/{MESSAGE_MAX} caractere
          </p>
        </div>
      </form>

      <div className="builder__preview">
        <h2 className="builder__title" id={`${id}-previzualizare`}>
          Previzualizare
        </h2>
        <div className="print-area" aria-labelledby={`${id}-previzualizare`} role="group">
          <div aria-live="polite" aria-atomic="true" className="visually-hidden">
            {amount ? `Card cadou de ${lei(amount)}` : "Alege o sumă validă"}
          </div>
          <Voucher
            amount={amount ?? VOUCHER_MIN}
            to={to.trim() || undefined}
            from={from.trim() || undefined}
            message={message.trim() || undefined}
            validUntil={until || undefined}
            className={amount ? undefined : "voucher--dim"}
          />
          <p className="print-note">
            Previzualizare. Cardul devine valabil după achitare la studio, când primește un cod unic. {site.phone} ·{" "}
            {site.email}
          </p>
        </div>
        <div className="btn-row">
          <button type="button" className="btn" onClick={() => window.print()} disabled={!amount}>
            <Icon name="print" /> Tipărește previzualizarea
          </button>
          <a className="btn btn--primary" href={whatsappLink(summary)}>
            <Icon name="chat" /> Rezervă cardul pe WhatsApp
          </a>
        </div>
        <p className="small muted">
          Plata nu se face online. Ne scrii sau ne suni, iar cardul se achită și se ridică de la studio (sau îl
          trimitem pe e-mail după plată).
        </p>
      </div>
    </div>
  );
}
