/** Numele iconițelor disponibile (desenate în components/icons.tsx). */
export const iconNames = [
  "leaf",
  "lotus",
  "stones",
  "hands",
  "towel",
  "oil",
  "candle",
  "steam",
  "cup",
  "cups",
  "gift",
  "breath",
  "phone",
  "chat",
  "mail",
  "pin",
  "clock",
  "calendar",
  "check",
  "arrow",
  "menu",
  "close",
  "print",
] as const;

export type IconName = (typeof iconNames)[number];
