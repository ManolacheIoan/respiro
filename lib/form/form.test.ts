import { describe, expect, it, vi } from "vitest";
import { composeMessage, getFormAdapter, httpAdapter, localAdapter } from "./index";
import { BUSINESS_NAME } from "@/config/site";
import type { ContactData } from "@/lib/validation";

const data: ContactData = {
  name: "Ana Popescu",
  phone: "+40712345678",
  service: "pietre-calde",
  day: "2026-11-04",
  time: "seara",
  message: "Prima vizită",
};

describe("adaptorul formularului", () => {
  it("fără endpoint folosește modul local, care nu face cereri", async () => {
    const spy = vi.spyOn(globalThis, "fetch");
    expect(getFormAdapter("")).toBe(localAdapter);
    expect(await localAdapter.send(data)).toEqual({ status: "local" });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("cu endpoint trimite JSON prin POST", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    const r = await httpAdapter("https://formspree.io/f/test", fetchMock).send(data);
    expect(r).toEqual({ status: "sent" });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://formspree.io/f/test");
    expect(init.method).toBe("POST");
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ Nume: "Ana Popescu", Serviciu: "Masaj cu pietre calde", Interval: "Seara (18–21)" });
    expect(body["Ziua preferată"]).toBe("miercuri, 4 noiembrie");
  });

  it("întoarce o eroare (fără să arunce) la răspuns greșit sau rețea căzută", async () => {
    expect(await httpAdapter("x", async () => new Response("", { status: 500 })).send(data)).toMatchObject({ status: "error" });
    expect(
      await httpAdapter("x", async () => {
        throw new TypeError("offline");
      }).send(data),
    ).toMatchObject({ status: "error" });
  });

  it("compune mesajul pentru WhatsApp", () => {
    const text = composeMessage(data);
    expect(text).toContain(BUSINESS_NAME);
    expect(text).toContain("Telefon: +40712345678");
    expect(text).not.toContain("E-mail");
  });
});
