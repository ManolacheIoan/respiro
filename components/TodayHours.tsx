"use client";

import { useSyncExternalStore } from "react";
import { holidays, hours } from "@/config/site";
import { toIsoDate } from "@/lib/validation";

const noop = () => () => {};
/** Data de azi ca text (stabil între randări, deci sigur pentru useSyncExternalStore). */
const today = () => toIsoDate(new Date());

/** Programul de azi; pe server (build static) afișează un text neutru de aceeași lungime. */
export function TodayHours() {
  const iso = useSyncExternalStore(noop, today, () => "");
  if (!iso) return <span>Program: luni–sâmbătă</span>;
  const holiday = holidays.find((h) => h.date === iso);
  if (holiday?.status === "închis") return <span>Azi: închis ({holiday.name})</span>;
  if (holiday?.hours) return <span>Azi: {holiday.hours} (program redus)</span>;
  const [y, m, d] = iso.split("-").map(Number);
  const day = hours.find((h) => h.day === new Date(y, m - 1, d).getDay());
  return <span>{day?.open ? `Azi: deschis ${day.open}–${day.close}` : "Azi: închis"}</span>;
}

/** Ziua curentă a săptămânii (0–6) sau -1 pe server. */
export function useWeekday() {
  return useSyncExternalStore(noop, () => new Date().getDay(), () => -1);
}
