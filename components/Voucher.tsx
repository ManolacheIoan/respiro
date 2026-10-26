import { LogoMark } from "@/components/Logo";
import { Sprig } from "@/components/illustrations/shapes";
import { BUSINESS_NAME } from "@/config/site";
import { lei } from "@/lib/format";

export interface VoucherProps {
  amount: number;
  to?: string;
  from?: string;
  message?: string;
  /** Cod afișat pe card (în demo: generat local, fără valoare reală). */
  code?: string;
  validUntil?: string;
  className?: string;
}

/** Cardul cadou ilustrat. Textul e HTML real (lizibil și la tipărire). */
export function Voucher({ amount, to, from, message, code, validUntil, className }: VoucherProps) {
  return (
    <div className={className ? `voucher ${className}` : "voucher"}>
      <Sprig className="voucher__sprig" />
      <Sprig className="voucher__sprig voucher__sprig--2" flip />
      <div className="voucher__frame" aria-hidden="true" />
      <div className="voucher__body">
        <div className="voucher__brand">
          <LogoMark size={44} />
          <span>{BUSINESS_NAME}</span>
        </div>
        <p className="voucher__label">Card cadou</p>
        <p className="voucher__amount">{lei(amount)}</p>
        {to || from || message ? (
          <div className="voucher__note">
            {to ? (
              <p>
                <span>Pentru</span> {to}
              </p>
            ) : null}
            {message ? <p className="voucher__message">„{message}”</p> : null}
            {from ? (
              <p>
                <span>Cu drag, de la</span> {from}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="voucher__hint">pentru o oră de liniște, la alegere</p>
        )}
        {code || validUntil ? (
          <p className="voucher__meta">
            {code ? <span>Cod: {code}</span> : null}
            {validUntil ? <span>Valabil până la {validUntil}</span> : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}
