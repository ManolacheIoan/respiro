import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BUSINESS_NAME, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Politica de confidențialitate și cookie-uri",
  description: "Ce date colectăm, de ce, cât timp le păstrăm și ce drepturi ai.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Confidențialitate"
        title="Politica de confidențialitate și cookie-uri"
        lead="Pe scurt: folosim datele tale doar ca să-ți programăm ședința și să te contactăm. Nu le vindem, nu le folosim pentru reclame și nu avem cookie-uri de urmărire."
      />
      <section className="section">
        <div className="container container--narrow prose">
          <p className="muted small">Ultima actualizare: octombrie 2026</p>

          <h2>1. Cine suntem</h2>
          <p>
            Operatorul datelor este {BUSINESS_NAME}, cu sediul la {site.address.street}, {site.area}. Ne poți
            contacta la <a href={`mailto:${site.email}`}>{site.email}</a> sau la{" "}
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a>.
          </p>

          <h2>2. Ce date colectăm</h2>
          <ul>
            <li>
              <strong>Date de contact</strong>: nume, telefon și, opțional, e-mail, când ne scrii prin formular, pe
              WhatsApp, prin SMS sau ne suni.
            </li>
            <li>
              <strong>Detalii despre programare</strong>: serviciul ales, ziua și intervalul preferat, mesajul tău.
            </li>
            <li>
              <strong>Informații despre starea de sănătate</strong>, doar dacă ni le spui tu (de exemplu o
              contraindicație), pentru a adapta sau a amâna ședința. Nu le notăm în formulare online.
            </li>
          </ul>

          <h2>3. De ce le folosim</h2>
          <ul>
            <li>ca să răspundem cererii tale și să confirmăm programarea (pași premergători unui contract);</li>
            <li>ca să îți oferim un masaj sigur, adaptat situației tale (consimțământul tău);</li>
            <li>pentru evidențele contabile obligatorii, dacă achiziționezi un serviciu (obligație legală).</li>
          </ul>
          <p>Nu trimitem mesaje de marketing fără acordul tău separat și nu facem profilare.</p>

          <h2>4. Cât timp le păstrăm</h2>
          <p>
            Cererile care nu devin programări se șterg în cel mult 30 de zile. Datele clienților se păstrează cât
            timp colaborăm și cel mult 2 ani de la ultima vizită, cu excepția documentelor contabile, păstrate
            conform legii.
          </p>

          <h2>5. Cui le transmitem</h2>
          <p>
            Datele nu se vând și nu se transmit altor firme, cu excepția furnizorilor care ne ajută tehnic (de
            exemplu serviciul de e-mail sau de formulare, dacă e folosit), cu care avem contracte de confidențialitate,
            și a autorităților, când legea o cere. Dacă ne scrii pe WhatsApp, se aplică și politica de
            confidențialitate a acelei aplicații.
          </p>

          <h2>6. Drepturile tale</h2>
          <p>
            Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție, precum și dreptul
            de a-ți retrage consimțământul oricând. Scrie-ne la <a href={`mailto:${site.email}`}>{site.email}</a>.
            Dacă ești nemulțumit, te poți adresa Autorității Naționale de Supraveghere a Prelucrării Datelor cu
            Caracter Personal (ANSPDCP).
          </p>

          <h2 id="cookie-uri">7. Cookie-uri și stocare locală</h2>
          <p>
            Site-ul <strong>nu folosește cookie-uri</strong> de analiză, de publicitate sau de la terți și nu încarcă
            scripturi externe. Fonturile și ilustrațiile sunt găzduite pe același server. Formularul de programare
            păstrează datele doar în pagina deschisă, până le trimiți sau închizi pagina.
          </p>
          <p>Dacă pe viitor vom adăuga instrumente care folosesc cookie-uri, îți vom cere acordul înainte.</p>

          <h2>8. Modificări</h2>
          <p>Putem actualiza această politică. Data ultimei modificări apare la începutul paginii.</p>
        </div>
      </section>
    </>
  );
}
