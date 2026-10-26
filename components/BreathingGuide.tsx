"use client";

import { useEffect, useId, useState } from "react";
import { breathAt, patterns, phaseLabel, type PhaseKind } from "@/lib/breathing";

const DURATIONS = [
  { minutes: 1, label: "1 minut" },
  { minutes: 3, label: "3 minute" },
  { minutes: 5, label: "5 minute" },
] as const;

/** Mărimea cercului la finalul fiecărei faze. */
const SCALE: Record<PhaseKind, number> = { inspira: 1, tine: 1, expira: 0.56, pauza: 0.56 };

type Status = "oprit" | "ruleaza" | "pauza" | "gata";

/**
 * Ghid de respirație: cercul crește la inspirație și scade la expirație.
 * Cu prefers-reduced-motion cercul rămâne nemișcat; fazele și secundele se
 * afișează ca text. Schimbarea fazei e anunțată cititoarelor de ecran.
 */
export function BreathingGuide() {
  const id = useId();
  const [patternId, setPatternId] = useState(patterns[0].id);
  const [minutes, setMinutes] = useState<number>(3);
  const [status, setStatus] = useState<Status>("oprit");
  /** Timp acumulat înainte de ultima pornire. */
  const [banked, setBanked] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  const pattern = patterns.find((p) => p.id === patternId)!;
  const limitMs = minutes * 60_000;
  const elapsed = Math.min(limitMs, banked + (status === "ruleaza" && startedAt !== null ? now - startedAt : 0));
  const state = breathAt(pattern, elapsed);
  const active = status === "ruleaza" || status === "pauza";

  useEffect(() => {
    if (status !== "ruleaza") return;
    const timer = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (startedAt !== null && banked + (t - startedAt) >= limitMs) {
        setStatus("gata");
        setBanked(limitMs);
        setStartedAt(null);
      }
    }, 200);
    return () => clearInterval(timer);
  }, [status, startedAt, banked, limitMs]);

  const start = () => {
    const t = Date.now();
    setBanked(0);
    setNow(t);
    setStartedAt(t);
    setStatus("ruleaza");
  };
  const pause = () => {
    setBanked(elapsed);
    setStartedAt(null);
    setStatus("pauza");
  };
  const resume = () => {
    const t = Date.now();
    setNow(t);
    setStartedAt(t);
    setStatus("ruleaza");
  };
  const stop = () => {
    setBanked(0);
    setStartedAt(null);
    setStatus("oprit");
  };

  const kind = state.phase.kind;
  const scale = active ? SCALE[kind] : 0.72;
  const moving = status === "ruleaza" && (kind === "inspira" || kind === "expira");
  const totalLeft = Math.max(0, Math.ceil((limitMs - elapsed) / 1000));
  const clock = `${Math.floor(totalLeft / 60)}:${String(totalLeft % 60).padStart(2, "0")}`;

  const announce =
    status === "gata"
      ? "Exercițiu încheiat."
      : status === "pauza"
        ? "Pauză."
        : status === "ruleaza"
          ? phaseLabel[kind]
          : "";

  return (
    <div className="breath" data-status={status} data-phase={active ? kind : "oprit"}>
      <div className="breath__stage">
        <div className="breath__ring" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="98" className="breath__guide" />
            <circle cx="100" cy="100" r="55" className="breath__guide breath__guide--inner" />
          </svg>
        </div>
        <div
          className="breath__circle"
          aria-hidden="true"
          style={{
            transform: `scale(${scale})`,
            transitionDuration: moving ? `${state.phase.seconds}s` : "0.8s",
          }}
        />
        <div className="breath__text">
          <p className="breath__phase" aria-hidden="true">
            {status === "gata" ? "Gata" : active ? phaseLabel[kind] : "Respiră"}
          </p>
          <p className="breath__count" aria-hidden="true">
            {active ? state.remaining : status === "gata" ? "✓" : "·"}
          </p>
        </div>
        <p className="visually-hidden" aria-live="polite" aria-atomic="true">
          {announce}
        </p>
      </div>

      <div className="breath__panel">
        <fieldset className="field" disabled={active}>
          <legend className="field__label">Ritm</legend>
          <div className="choice-list">
            {patterns.map((p) => (
              <label key={p.id} className="choice">
                <input
                  type="radio"
                  name={`${id}-ritm`}
                  value={p.id}
                  checked={patternId === p.id}
                  onChange={() => setPatternId(p.id)}
                />
                <span>
                  <strong>{p.name}</strong>
                  <span className="choice__desc">{p.description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="field" disabled={active}>
          <legend className="field__label">Durată</legend>
          <div className="amounts">
            {DURATIONS.map((d) => (
              <label key={d.minutes} className="amount">
                <input
                  type="radio"
                  name={`${id}-durata`}
                  checked={minutes === d.minutes}
                  onChange={() => setMinutes(d.minutes)}
                />
                <span>{d.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="btn-row">
          {status === "oprit" || status === "gata" ? (
            <button type="button" className="btn btn--primary" onClick={start}>
              {status === "gata" ? "Începe din nou" : "Începe"}
            </button>
          ) : status === "ruleaza" ? (
            <button type="button" className="btn btn--primary" onClick={pause}>
              Pauză
            </button>
          ) : (
            <button type="button" className="btn btn--primary" onClick={resume}>
              Continuă
            </button>
          )}
          {active ? (
            <button type="button" className="btn" onClick={stop}>
              Oprește
            </button>
          ) : null}
        </div>
        <p className="breath__meta" aria-live="off">
          {active || status === "gata" ? (
            <>
              <span>Timp rămas: {clock}</span>
              <span>Cicluri complete: {state.rounds}</span>
            </>
          ) : (
            <span>Așază-te comod, cu umerii relaxați. Respiră pe nas, dacă poți.</span>
          )}
        </p>
      </div>
    </div>
  );
}
