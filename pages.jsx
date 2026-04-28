/* AmAm  page sections + App root.
 * Loaded after app.jsx so all the constants/primitives on `window` are available. */

const { useState: useS, useEffect: useE } = React;

// ---------- Reusable bits ----------
function MStripe() {
  return <div aria-hidden="true" className="m-stripe" style={{ width: "100%" }}/>;
}

function Kicker({ children, color }) {
  return (
    <span style={{
      fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "1.5px",
      color: color || "var(--color-cream)",
      display: "inline-flex", alignItems: "center", gap: 8,
    }}>
      <span aria-hidden="true" style={{ width: 24, height: 2, background: color || "var(--color-cream)" }}/>
      {children}
    </span>
  );
}

function SectionHead({ kicker, title, lead, align = "left" }) {
  return (
    <div style={{ marginBottom: 40, textAlign: align, maxWidth: align === "center" ? 760 : 900, margin: align === "center" ? "0 auto 40px" : "0 0 40px" }}>
      {kicker && <div style={{ marginBottom: 16 }}><Kicker>{kicker}</Kicker></div>}
      <h2 className="section-h">{title}</h2>
      {lead && <p className="lead" style={{ marginTop: 16, color: "var(--color-body-strong)", maxWidth: 640, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>{lead}</p>}
    </div>
  );
}

// ---------- HOME ----------
function HomePage() {
  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--color-hairline)" }}>
        <div className="hero-grid">
          <div className="hero-copy">
            <Kicker>Pinehurst · North Seattle</Kicker>
            <h1 className="hero-h1">
              Fifteen years<br/>of skilled cuts.<br/>
              <span style={{ color: "var(--color-cream)" }}>One chair.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 480, marginTop: 24 }}>
              Ghebre cuts hair the way it used to be done  one client at a time, no rushing,
              no upselling. Clients have followed him across three salons over a decade.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
              <a href={PHONE_SMS} className="btn" style={{ background: "var(--color-cream)", color: "#fff", borderColor: "var(--color-cream)", height: 56, padding: "0 28px" }}>
                Text to Book
              </a>
              <a href="#/services" onClick={(e) => { e.preventDefault(); navTo("services"); }} className="btn" style={{ height: 56, padding: "0 28px" }}>
                See Services
              </a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 20 }}>
              <span style={{ background: "var(--color-surface-soft)", border: "1px solid var(--color-hairline)", padding: "5px 14px", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Cuts from $20</span>
              <span style={{ fontSize: 13, color: "var(--color-body)" }}>Walk-ins welcome if the chair is open</span>
            </div>
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 16, color: "var(--color-body)" }}>
              <a href={PHONE_TEL} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: "0.5px", color: "var(--color-on-dark)" }}>
                {PHONE_DISPLAY}
              </a>
              <span style={{ width: 1, height: 16, background: "var(--color-hairline)" }}/>
              <span style={{ fontSize: 13, letterSpacing: "0.5px" }}>Tap to call</span>
            </div>
          </div>
          <div className="hero-photo">
            <Photo kind="chair" label="Ghebre at the chair" aspect="4 / 5"/>
          </div>
        </div>
        <MStripe/>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "var(--color-surface-soft)", borderBottom: "1px solid var(--color-hairline)" }}>
        <div className="container" style={{ padding: "20px 20px" }}>
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr" }} className="trust-bar-grid">
            {REVIEWS.slice(0, 2).map(r => (
              <div key={r.name} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span aria-hidden="true" style={{ color: "var(--color-pole-red)", fontSize: 28, lineHeight: 1, flexShrink: 0, fontFamily: "Georgia, serif" }}>"</span>
                <div>
                  <p style={{ margin: "0 0 4px", fontSize: 14, color: "var(--color-body-strong)", fontStyle: "italic", lineHeight: 1.5 }}>{r.text.slice(0, 110)}…</p>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--color-muted)" }}> {r.name} · {r.cut}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (min-width: 640px) { .trust-bar-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </section>

      {/* VALUE STRIP */}
      <section style={{ background: "var(--color-surface-soft)", borderBottom: "1px solid var(--color-hairline)" }}>
        <div className="container" style={{ padding: "40px 20px" }}>
          <div className="values-grid">
            {VALUES.map(v => (
              <div key={v.title} style={{ paddingRight: 16 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", color: "var(--color-pole-red)" }}>{v.kicker}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0", marginTop: 8, color: "var(--color-on-dark)" }}>{v.title}</div>
                <p style={{ fontSize: 14, marginTop: 8, marginBottom: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET GHEBRE */}
      <section style={{ borderBottom: "1px solid var(--color-hairline)" }}>
        <div className="container" style={{ padding: "64px 20px" }}>
          <div className="meet-grid">
            <div>
              <Kicker>Meet Ghebre</Kicker>
              <h2 className="section-h" style={{ marginTop: 16 }}>A barber, not a brand.</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                Ghebre cut hair for fifteen years at Hairmasters and Mastercuts in Northgate Mall before
                opening AmAm in his own one-chair shop in Pinehurst.
              </p>
              <p style={{ marginTop: 16 }}>
                His clients followed him. Some have been coming for over ten years, across three different
                salons. The reason is simple: he listens, he checks in during the cut, and he charges a
                fair price. No upsell, no signature treatments, no membership. Just a good cut.
              </p>
              <div style={{ marginTop: 24 }}>
                <a href="#/about" onClick={(e) => { e.preventDefault(); navTo("about"); }} className="text-link">Read his story</a>
              </div>
            </div>
            <Photo kind="portrait" label="Ghebre, owner" aspect="4 / 5"/>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ borderBottom: "1px solid var(--color-hairline)", background: "var(--color-surface-soft)" }}>
        <div className="container" style={{ padding: "64px 20px" }}>
          <SectionHead kicker="Services" title="What he cuts." lead="Cuts and trims for everyone  thin, grey, curly, kids, fades, line-ups, full shaves."/>
          <div className="svc-preview">
            {SERVICES.slice(0, 6).map(s => (
              <div key={s.name} className="svc-row">
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
                  <h3 className="svc-name">{s.name}</h3>
                  <span className="svc-price">{s.price}</span>
                </div>
                <p style={{ marginTop: 8, marginBottom: 0, fontSize: 14 }}>{s.blurb}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <a href="#/services" onClick={(e) => { e.preventDefault(); navTo("services"); }} className="text-link">See all services & prices</a>
          </div>
        </div>
      </section>

      {/* REVIEWS PREVIEW */}
      <section style={{ borderBottom: "1px solid var(--color-hairline)" }}>
        <div className="container" style={{ padding: "64px 20px" }}>
          <SectionHead kicker="What clients say" title="Ten years of returning customers." lead="Pulled from Google reviews. Ghebre doesn't ask for them  they just keep coming in."/>
          <div className="reviews-grid">
            {REVIEWS.slice(0, 4).map(r => (
              <ReviewCard key={r.name} review={r}/>
            ))}
          </div>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 16 }}>
            <a href="#/reviews" onClick={(e) => { e.preventDefault(); navTo("reviews"); }} className="text-link">Read more reviews</a>
            <a href={REVIEWS_URL} target="_blank" rel="noopener" className="text-link">View on Google →</a>
          </div>
        </div>
      </section>

      {/* MAP + HOURS */}
      <section style={{ borderBottom: "1px solid var(--color-hairline)", background: "var(--color-surface-soft)" }}>
        <div className="container" style={{ padding: "64px 20px" }}>
          <div className="map-grid">
            <div>
              <Kicker>Visit</Kicker>
              <h2 className="section-h" style={{ marginTop: 16 }}>11702 15th Ave NE.</h2>
              <p style={{ marginTop: 16 }}>Pinehurst neighborhood, North Seattle. Street parking out front.</p>
              <a href={MAPS_URL} target="_blank" rel="noopener" className="btn" style={{ marginTop: 16 }}>Get Directions</a>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--color-muted)", marginTop: 40, marginBottom: 16 }}>Hours</h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {HOURS.map(h => (
                  <li key={h.day} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--color-hairline)", maxWidth: 360 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontSize: 14 }}>{h.day}</span>
                    <span style={{ color: h.hours === "Closed" ? "var(--color-muted)" : "var(--color-body-strong)", fontSize: 14 }}>{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ minHeight: 360, border: "1px solid var(--color-hairline)" }}>
              <iframe
                title="Map to AmAm Hair Salon"
                src={MAPS_EMBED}
                style={{ width: "100%", height: "100%", minHeight: 360, border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReviewCard({ review }) {
  return (
    <article style={{
      border: "1px solid var(--color-hairline)",
      padding: 24, background: "var(--color-canvas)",
      display: "flex", flexDirection: "column",
    }}>
      <div aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--color-pole-red)", lineHeight: 1, marginBottom: 8 }}>“</div>
      <p style={{ color: "var(--color-body-strong)", fontWeight: 400, marginBottom: 24, flex: 1 }}>{review.text}</p>
      <div style={{ borderTop: "1px solid var(--color-hairline)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "0.5px", textTransform: "uppercase" }}>{review.name}</span>
        <span style={{ fontSize: 12, color: "var(--color-muted)", letterSpacing: "0.5px" }}>{review.cut}</span>
      </div>
    </article>
  );
}

// ---------- SERVICES ----------
function ServicesPage() {
  return (
    <>
      <PageHero kicker="Services" title="One barber. Every cut." lead="Fifteen years of practice with thin, grey, curly, coarse, and fine hair  plus kids, mostly-bald styles, fades, line-ups, and full shaves."/>
      <section>
        <div className="container" style={{ padding: "0 20px 64px" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--color-hairline)" }}>
            {SERVICES.map(s => (
              <li key={s.name} style={{ borderBottom: "1px solid var(--color-hairline)", padding: "28px 0" }}>
                <div className="svc-list-row">
                  <div style={{ flex: 1 }}>
                    <h3 className="svc-name" style={{ fontSize: 28 }}>{s.name}</h3>
                    <p style={{ marginTop: 8, marginBottom: 0, maxWidth: 640 }}>{s.blurb}</p>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: "right" }}>
                    <span className="svc-price" style={{ fontSize: 24 }}>{s.price}</span>
                    <div style={{ fontSize: 12, color: "var(--color-muted)", letterSpacing: "0.5px", marginTop: 4 }}>STARTING</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 48, padding: 24, background: "var(--color-surface-soft)", border: "1px solid var(--color-hairline)" }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0", margin: 0 }}>A note on pricing.</h3>
            <p style={{ marginTop: 12, marginBottom: 0 }}>
              Prices start at the listed amount and depend on hair length and time required. Ghebre will tell you up front
              before he starts. No surprises, no upsells, no membership. Cash, card, Apple Pay, and Venmo accepted.
            </p>
          </div>

          <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={PHONE_SMS} className="btn" style={{ background: "var(--color-cream)", color: "#fff", borderColor: "var(--color-cream)", height: 56, padding: "0 28px" }}>Text to Book</a>
            <a href={PHONE_TEL} className="btn" style={{ height: 56, padding: "0 28px" }}>Call {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- ABOUT ----------
function AboutPage() {
  const yearsAgo = new Date().getFullYear() - 2011; // ~15 years of cutting
  return (
    <>
      <PageHero kicker="About" title="A real barber, real loyalty." lead="The story of AmAm is short. Ghebre cuts hair well. People keep coming back."/>

      <section style={{ borderBottom: "1px solid var(--color-hairline)" }}>
        <div className="container" style={{ padding: "0 20px 64px" }}>
          <div className="about-grid">
            <Photo kind="portrait" label="Ghebre at work" aspect="4 / 5"/>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 700, textTransform: "none", letterSpacing: "0", margin: 0 }}>Fifteen years at Northgate.</h3>
              <p style={{ marginTop: 16 }}>
                Ghebre started cutting hair at Hairmasters in Northgate Mall, then moved to Mastercuts (Regis Corporation)
                in the same mall. For over a decade he built a clientele the slow way  one good cut at a time.
              </p>
              <p style={{ marginTop: 16 }}>
                When the mall closed, he opened his own shop two miles north in Pinehurst. AmAm Hair Salon is one room,
                one chair, and one barber. Most of the clients you'll see in there have been with him for years.
              </p>

              <h3 style={{ fontSize: 24, fontWeight: 700, textTransform: "none", letterSpacing: "0", marginTop: 40 }}>How he works.</h3>
              <p style={{ marginTop: 16 }}>
                Ghebre listens before he picks up a comb. He'll ask what you usually get, what you didn't like about your
                last cut, and what you actually want this time. He checks in during the cut. He focuses on what fits your
                hair rather than what's trending. If something won't work, he'll say so.
              </p>
              <p style={{ marginTop: 16 }}>
                He's good with thin, grey, and curly hair. He's a specialist with mostly-bald men's styles. He's patient
                with kids, including first-time cuts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers strip  borrowed from BMW M's spec-cell pattern */}
      <section style={{ borderBottom: "1px solid var(--color-hairline)", background: "var(--color-surface-soft)" }}>
        <div className="container" style={{ padding: "64px 20px" }}>
          <div className="spec-row">
            {[
              { value: yearsAgo + "+", label: "Years cutting hair" },
              { value: "3", label: "Salons, one barber" },
              { value: "1", label: "Chair, one client at a time" },
              { value: "10+", label: "Years of returning clients" },
            ].map(s => (
              <div key={s.label} className="spec-cell">
                <div className="spec-cell__value" style={{ color: "var(--color-cream)" }}>{s.value}</div>
                <div className="spec-cell__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid var(--color-hairline)" }}>
        <div className="container" style={{ padding: "64px 20px" }}>
          <SectionHead kicker="In their words" title="What clients say."/>
          <div className="reviews-grid">
            {REVIEWS.slice(0, 3).map(r => <ReviewCard key={r.name} review={r}/>)}
          </div>
        </div>
      </section>

      <CtaBand/>
    </>
  );
}

// ---------- BOOKING ----------
function BookingPage() {
  return (
    <>
      <PageHero kicker="Book" title="Call or text. He'll get back to you." lead="One chair means appointments are best. Walk-ins welcome if the chair is open  call ahead."/>

      {/* ONLINE BOOKING */}
      <section style={{ borderBottom: "1px solid var(--color-hairline)", background: "var(--color-surface-soft)" }}>
        <div className="container" style={{ padding: "48px 20px" }}>
          <Kicker>Book Online</Kicker>
          <h2 className="section-h" style={{ marginTop: 12, fontSize: "clamp(28px, 5vw, 44px)" }}>Pick a time. Confirmed instantly.</h2>
          <p style={{ marginTop: 12, maxWidth: 560 }}>Select a service and a time below. Your appointment is confirmed on the spot  no waiting for a reply.</p>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/amamhairsalon"
            style={{ minWidth: 320, height: 630, marginTop: 24, border: "1px solid var(--color-hairline)" }}
          />
          <p style={{ marginTop: 12, fontSize: 13, color: "var(--color-muted)", textAlign: "center" }}>
            Prefer to call or text? <a href={PHONE_TEL} style={{ color: "var(--color-cream)", fontWeight: 700 }}>{PHONE_DISPLAY}</a>
          </p>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid var(--color-hairline)" }}>
        <div className="container" style={{ padding: "0 20px 48px" }}>
          {/* Big phone */}
          <div style={{ border: "1px solid var(--color-hairline)", padding: "32px 24px", textAlign: "center" }}>
            <div className="label-upper" style={{ color: "var(--color-muted)" }}>Tap to call</div>
            <a href={PHONE_TEL} style={{
              display: "inline-block", marginTop: 12,
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(40px, 9vw, 80px)", lineHeight: 1, letterSpacing: "-0.01em",
              color: "var(--color-cream)",
            }}>{PHONE_DISPLAY}</a>
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 480, margin: "32px auto 0" }}>
              <a href={PHONE_TEL} className="btn" style={{ background: "var(--color-cream)", color: "#fff", borderColor: "var(--color-cream)", height: 60 }}>Call to Book</a>
              <a href={PHONE_SMS} className="btn" style={{ height: 60 }}>Text to Book</a>
            </div>
            <p style={{ marginTop: 24, marginBottom: 0, color: "var(--color-muted)", fontSize: 14 }}>
              Texts get the fastest response  Ghebre is often mid-cut and can't pick up the phone.
            </p>
          </div>
        </div>
      </section>

      {/* Map + Hours */}
      <section style={{ borderBottom: "1px solid var(--color-hairline)", background: "var(--color-surface-soft)" }}>
        <div className="container" style={{ padding: "64px 20px" }}>
          <div className="map-grid">
            <div>
              <Kicker>Where</Kicker>
              <h2 className="section-h" style={{ marginTop: 16, fontSize: "clamp(28px, 5vw, 48px)" }}>11702 15th Ave NE,<br/>Seattle, WA 98125.</h2>
              <p style={{ marginTop: 16 }}>Pinehurst neighborhood, just south of 117th. Street parking out front. Wheelchair accessible  ground-level entry, no steps.</p>
              <a href={MAPS_URL} target="_blank" rel="noopener" className="btn" style={{ marginTop: 16 }}>Open in Maps</a>

              <h3 className="footer-h" style={{ marginTop: 40, color: "var(--color-muted)" }}>Hours</h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {HOURS.map(h => (
                  <li key={h.day} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--color-hairline)" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontSize: 14 }}>{h.day}</span>
                    <span style={{ color: h.hours === "Closed" ? "var(--color-muted)" : "var(--color-body-strong)", fontSize: 14 }}>{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ minHeight: 420, border: "1px solid var(--color-hairline)" }}>
              <iframe
                title="Map to AmAm Hair Salon"
                src={MAPS_EMBED}
                style={{ width: "100%", height: "100%", minHeight: 420, border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ borderBottom: "1px solid var(--color-hairline)" }}>
        <div className="container" style={{ padding: "64px 20px" }}>
          <SectionHead kicker="FAQ" title="Common questions."/>
          <div style={{ borderTop: "1px solid var(--color-hairline)" }}>
            {FAQ.map((f, i) => <FaqItem key={i} q={f.q} a={f.a}/>)}
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useS(false);
  return (
    <div style={{ borderBottom: "1px solid var(--color-hairline)" }}>
      <button onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: "100%", textAlign: "left", background: "transparent", border: 0,
          padding: "20px 0", color: "var(--color-on-dark)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0",
        }}>
        <span>{q}</span>
        <span aria-hidden="true" style={{ color: "var(--color-pole-red)", fontSize: 24, lineHeight: 1, transform: open ? "rotate(45deg)" : "none", transition: "transform 220ms" }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 24, color: "var(--color-body)", maxWidth: 720 }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ---------- REVIEWS ----------
function ReviewsPage() {
  return (
    <>
      <PageHero kicker="Reviews" title="From the Google reviews." lead="Real lines from real clients. Many have been coming for over ten years."/>
      <section style={{ borderBottom: "1px solid var(--color-hairline)" }}>
        <div className="container" style={{ padding: "0 20px 64px" }}>
          <div className="reviews-grid reviews-grid--lg">
            {REVIEWS.map(r => <ReviewCard key={r.name} review={r}/>)}
          </div>
          <div style={{ marginTop: 48, padding: 32, border: "1px solid var(--color-hairline)", textAlign: "center" }}>
            <Kicker>Google reviews</Kicker>
            <h3 style={{ fontSize: "clamp(24px, 4vw, 40px)", marginTop: 12 }}>Read more or leave one.</h3>
            <a href={REVIEWS_URL} target="_blank" rel="noopener" className="btn" style={{ marginTop: 24, background: "var(--color-cream)", color: "#fff", borderColor: "var(--color-cream)" }}>View on Google</a>
          </div>
        </div>
      </section>
      <CtaBand/>
    </>
  );
}

// ---------- Shared ----------
function PageHero({ kicker, title, lead }) {
  return (
    <section style={{ borderBottom: "1px solid var(--color-hairline)" }}>
      <div className="container" style={{ padding: "48px 20px 48px" }}>
        <Kicker>{kicker}</Kicker>
        <h1 className="page-h1" style={{ marginTop: 16 }}>{title}</h1>
        {lead && <p className="lead" style={{ marginTop: 20, maxWidth: 720 }}>{lead}</p>}
      </div>
      <MStripe/>
    </section>
  );
}

function CtaBand() {
  return (
    <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--color-hairline)" }}>
      <Photo kind="shop" label="The shop interior" aspect="auto" style={{ position: "absolute", inset: 0, aspectRatio: "auto" }}/>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.75) 100%)" }}/>
      <div className="container" style={{ position: "relative", padding: "80px 20px", textAlign: "center" }}>
        <h2 className="section-h" style={{ fontSize: "clamp(32px, 6vw, 56px)", color: "#fff" }}>One chair is open.</h2>
        <p className="lead" style={{ marginTop: 16, maxWidth: 520, marginLeft: "auto", marginRight: "auto", color: "rgba(255,255,255,0.85)" }}>Text or call to book. Ghebre will get back to you between cuts.</p>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <a href={PHONE_SMS} className="btn" style={{ background: "var(--color-cream)", color: "#fff", borderColor: "var(--color-cream)", height: 56, padding: "0 28px" }}>Text {PHONE_DISPLAY}</a>
          <a href={PHONE_TEL} className="btn" style={{ height: 56, padding: "0 28px", color: "#fff", borderColor: "rgba(255,255,255,0.7)" }}>Call</a>
        </div>
      </div>
    </section>
  );
}

// ---------- GALLERY ----------
function GalleryPage() {
  const GALLERY = [
    { url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80", alt: "Shop interior" },
    { url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80", alt: "Barber chair" },
    { url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80", alt: "Fade haircut in progress" },
    { url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80", alt: "Barber at work" },
    { url: "https://images.unsplash.com/photo-1540518842087-03d0bd940a83?w=600&auto=format&fit=crop&q=80", alt: "Straight razor detail" },
    { url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&auto=format&fit=crop&q=80", alt: "Barber pole" },
    { url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80", alt: "Barbershop scene" },
    { url: "https://images.unsplash.com/photo-1593702288056-7cc3b9e19091?w=600&auto=format&fit=crop&q=80", alt: "Men's haircut" },
    { url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format&fit=crop&q=80", alt: "Barber cutting hair" },
    { url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop&q=80", alt: "Clippers and tools" },
    { url: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=600&auto=format&fit=crop&q=80", alt: "Barber tools" },
    { url: "https://images.unsplash.com/photo-1590159763121-7c9fd312190a?w=600&auto=format&fit=crop&q=80", alt: "Scissors close-up" },
    { url: "https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=600&auto=format&fit=crop&q=80", alt: "Barbershop detail" },
    { url: "https://images.unsplash.com/photo-1541795795-b38bb4f25e41?w=600&auto=format&fit=crop&q=80", alt: "Men's hairstyle" },
    { url: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80", alt: "Scissor cut" },
    { url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&auto=format&fit=crop&q=80", alt: "Fresh haircut" },
    { url: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=600&auto=format&fit=crop&q=80", alt: "Barbershop interior" },
    { url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&auto=format&fit=crop&q=80", alt: "Styled hair" },
    { url: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&auto=format&fit=crop&q=80", alt: "Hair styling" },
    { url: "https://images.unsplash.com/photo-1521490683712-35a1cb235d1f?w=600&auto=format&fit=crop&q=80", alt: "Barbershop window" },
  ];
  return (
    <>
      <PageHero kicker="Gallery" title="The shop, the work." lead="A look at AmAm Hair Salon and the cuts Ghebre delivers."/>
      <section>
        <div className="container" style={{ padding: "0 20px 64px" }}>
          <div className="gallery-grid">
            {GALLERY.map((img, i) => (
              <div key={i} style={{ overflow: "hidden", border: "1px solid var(--color-hairline)", background: "var(--color-surface-card)" }}>
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .gallery-grid {
            display: grid;
            gap: 12px;
            grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 640px) {
            .gallery-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
          }
          @media (min-width: 1000px) {
            .gallery-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
          }
        `}</style>
      </section>
      <CtaBand/>
    </>
  );
}

// ---------- App root ----------
function App() {
  const route = useRoute();
  // Update <title> per route  for SEO and shared links
  useE(() => {
    const titles = {
      home: "AmAm Hair Salon | Barber North Seattle | Ghebre",
      services: "Services & Prices | AmAm Hair Salon | Ghebre",
      about: "About Ghebre | AmAm Hair Salon | Barber North Seattle",
      booking: "Book an Appointment | AmAm Hair Salon | (206) 405-0539",
      reviews: "Reviews | AmAm Hair Salon | Ghebre",
      gallery: "Gallery | AmAm Hair Salon | Ghebre",
    };
    document.title = titles[route] || titles.home;
  }, [route]);

  return (
    <div data-screen-label={route}>
      <Header route={route}/>
      <main id="main">
        {route === "home" && <HomePage/>}
        {route === "services" && <ServicesPage/>}
        {route === "about" && <AboutPage/>}
        {route === "booking" && <BookingPage/>}
        {route === "reviews" && <ReviewsPage/>}
        {route === "gallery" && <GalleryPage/>}
      </main>
      <Footer/>
      <StickyMobileBar/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
