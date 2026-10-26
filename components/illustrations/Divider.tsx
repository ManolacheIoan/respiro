/** Separator: undă fină cu o frunză aurie; linia se „desenează” la apariție. */
export function Divider({ className }: { className?: string }) {
  return (
    <div className={className ? `divider ${className}` : "divider"} aria-hidden="true">
      <svg viewBox="0 0 240 24" width="240" height="24" fill="none" strokeLinecap="round" focusable="false">
        <path pathLength={1} className="divider__line" d="M4 12c18-7 34 7 52 0s34-7 52 0" />
        <path pathLength={1} className="divider__line" d="M132 12c18-7 34 7 52 0s34-7 52 0" />
        <path pathLength={1} className="divider__leaf" d="M110 14c2-7 8-10 16-9-1 7-7 11-16 9ZM112 13l9-5" />
      </svg>
    </div>
  );
}
