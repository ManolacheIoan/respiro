/** Ritmurile ghidului de respirație și calculul fazei curente (funcții pure). */

export type PhaseKind = "inspira" | "tine" | "expira" | "pauza";

export interface Phase {
  kind: PhaseKind;
  seconds: number;
}

export interface BreathPattern {
  id: string;
  name: string;
  description: string;
  phases: Phase[];
}

export const phaseLabel: Record<PhaseKind, string> = {
  inspira: "Inspiră",
  tine: "Ține aerul",
  expira: "Expiră",
  pauza: "Pauză",
};

export const patterns: BreathPattern[] = [
  {
    id: "linistita",
    name: "Liniștită",
    description: "Inspiră 4 · ține 2 · expiră 6. Expirația lungă ajută la calmare.",
    phases: [
      { kind: "inspira", seconds: 4 },
      { kind: "tine", seconds: 2 },
      { kind: "expira", seconds: 6 },
    ],
  },
  {
    id: "patrat",
    name: "În pătrat",
    description: "Inspiră 4 · ține 4 · expiră 4 · pauză 4. Ritm egal, bun pentru concentrare.",
    phases: [
      { kind: "inspira", seconds: 4 },
      { kind: "tine", seconds: 4 },
      { kind: "expira", seconds: 4 },
      { kind: "pauza", seconds: 4 },
    ],
  },
  {
    id: "4-7-8",
    name: "4-7-8",
    description: "Inspiră 4 · ține 7 · expiră 8. Mai lentă; potrivită seara, înainte de somn.",
    phases: [
      { kind: "inspira", seconds: 4 },
      { kind: "tine", seconds: 7 },
      { kind: "expira", seconds: 8 },
    ],
  },
];

export const cycleSeconds = (p: BreathPattern) => p.phases.reduce((s, ph) => s + ph.seconds, 0);

export interface BreathState {
  phase: Phase;
  index: number;
  /** Secunde rămase din faza curentă (rotunjit în sus, minim 1). */
  remaining: number;
  /** Cicluri complete. */
  rounds: number;
}

/** Faza în care se află ghidul după `elapsedMs` milisecunde. */
export function breathAt(pattern: BreathPattern, elapsedMs: number): BreathState {
  const cycle = cycleSeconds(pattern) * 1000;
  const t = Math.max(0, elapsedMs);
  const rounds = Math.floor(t / cycle);
  let pos = t % cycle;
  for (let i = 0; i < pattern.phases.length; i++) {
    const len = pattern.phases[i].seconds * 1000;
    if (pos < len) {
      return { phase: pattern.phases[i], index: i, remaining: Math.max(1, Math.ceil((len - pos) / 1000)), rounds };
    }
    pos -= len;
  }
  // Nu se ajunge aici (pos < cycle), dar TypeScript cere un rezultat.
  return { phase: pattern.phases[0], index: 0, remaining: pattern.phases[0].seconds, rounds };
}
