import { describe, expect, it } from "vitest";
import { breathAt, cycleSeconds, patterns } from "./breathing";

const calm = patterns.find((p) => p.id === "linistita")!;
const square = patterns.find((p) => p.id === "patrat")!;

describe("ghidul de respirație", () => {
  it("durata unui ciclu", () => {
    expect(cycleSeconds(calm)).toBe(12);
    expect(cycleSeconds(square)).toBe(16);
  });

  it("parcurge fazele în ordine", () => {
    expect(breathAt(calm, 0)).toMatchObject({ phase: { kind: "inspira" }, remaining: 4, rounds: 0 });
    expect(breathAt(calm, 3500)).toMatchObject({ phase: { kind: "inspira" }, remaining: 1 });
    expect(breathAt(calm, 4000)).toMatchObject({ phase: { kind: "tine" }, remaining: 2 });
    expect(breathAt(calm, 6000)).toMatchObject({ phase: { kind: "expira" }, remaining: 6 });
    expect(breathAt(calm, 11_999)).toMatchObject({ phase: { kind: "expira" }, remaining: 1 });
  });

  it("reia ciclul și numără rundele", () => {
    expect(breathAt(calm, 12_000)).toMatchObject({ phase: { kind: "inspira" }, rounds: 1 });
    expect(breathAt(square, 16_000 * 3 + 12_500)).toMatchObject({ phase: { kind: "pauza" }, rounds: 3, remaining: 4 });
  });

  it("timp negativ = începutul", () => {
    expect(breathAt(calm, -50).index).toBe(0);
  });
});
