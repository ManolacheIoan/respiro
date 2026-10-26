"use client";

import { useWeekday } from "@/components/TodayHours";
import { hours } from "@/config/site";

/** Programul pe zile; ziua curentă e evidențiată după încărcare (fără salt de layout). */
export function HoursTable() {
  const today = useWeekday();
  return (
    <table className="hours-table">
      <caption className="visually-hidden">Program pe zilele săptămânii</caption>
      <thead>
        <tr>
          <th scope="col">Ziua</th>
          <th scope="col">Program</th>
        </tr>
      </thead>
      <tbody>
        {hours.map((h) => {
          const isToday = h.day === today;
          return (
            <tr key={h.day} className={isToday ? "is-today" : undefined} aria-current={isToday ? "date" : undefined}>
              <th scope="row">
                {h.label}
                <span className="hours-table__today">{isToday ? " · azi" : ""}</span>
              </th>
              <td>{h.open ? `${h.open} – ${h.close}` : (h.note ?? "Închis")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
