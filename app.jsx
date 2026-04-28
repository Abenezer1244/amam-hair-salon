/* AmAm Hair Salon  single-file SPA
 *
 * Architecture: hash-based routing (#/, #/services, #/about, #/booking, #/reviews)
 *  single page so it loads instantly, but every page has its own URL the
 * user can share. The header and sticky mobile bottom bar persist across pages.
 *
 * All copy is real (drawn from the brief). Photos are stylized SVG
 * placeholders with explicit "PHOTO PLACEHOLDER" labels so it's clear
 * Ghebre needs to drop in real shots  no stock-image trap.
 */

const { useState, useEffect, useRef } = React;

// ---------- Constants ----------
const PHONE_DISPLAY = "(206) 405-0539";
const PHONE_TEL = "tel:+12064050539";
const PHONE_SMS = "sms:+12064050539";
const ADDRESS_LINE = "11702 15th Ave NE, Seattle, WA 98125";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=11702+15th+Ave+NE+Seattle+WA+98125";
const MAPS_EMBED = "https://www.google.com/maps?q=11702+15th+Ave+NE+Seattle+WA+98125&output=embed";
const REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=AmAm+Hair+Salon+Seattle";

const HOURS = [
  { day: "Mon", hours: "Closed" },
  { day: "Tue", hours: "2 – 8 PM" },
  { day: "Wed", hours: "2 – 8 PM" },
  { day: "Thu", hours: "2 – 8 PM" },
  { day: "Fri", hours: "2 – 8 PM" },
  { day: "Sat", hours: "10 AM – 5 PM" },
  { day: "Sun", hours: "Closed" },
];

const SERVICES = [
  {
    name: "Men's Haircut",
    blurb: "Standard scissor or clipper cut, washed and finished. Works for thin, grey, curly  whatever you've got.",
    price: "$25 – $35",
  },
  {
    name: "Women's Haircut",
    blurb: "Cut, shape, and finish. Talk through length and style first, then take the time to get it right.",
    price: "$35 – $50",
  },
  {
    name: "Kids Haircut",
    blurb: "Patient cuts for little ones. Ghebre is unhurried and good with first-timers.",
    price: "$20",
  },
  {
    name: "Fade",
    blurb: "Low, mid, or high. Skin, taper, or burst. Clean transitions, sharp on top.",
    price: "$30",
  },
  {
    name: "Line-Up",
    blurb: "Edge-up on hairline, neck, and sideburns. Quick, precise, looks new for two weeks.",
    price: "$15",
  },
  {
    name: "Beard Trim",
    blurb: "Shape and clean up the beard. Hot towel finish if you want one.",
    price: "$15",
  },
  {
    name: "Hot Towel Shave",
    blurb: "Traditional straight-razor shave. Hot towel before and after.",
    price: "$30",
  },
  {
    name: "Head Shave",
    blurb: "Smooth all over. A specialty  clients with mostly-bald styles have followed Ghebre for years.",
    price: "$25",
  },
];

const REVIEWS = [
  {
    name: "Katherine Moore",
    text: "I've been going to Ghebre for over ten years now, across three different salons. He's the only person I'll let cut my hair. He listens, he takes his time, and he charges a fair price. Kind, thorough, and skilled.",
    cut: "Women's cut",
  },
  {
    name: "Oscar Abrina",
    text: "Best fade in North Seattle and not even close. Ghebre is professional, the shop is calm, and you're in and out without feeling rushed. Brought my son in too  he was great with him.",
    cut: "Fade",
  },
  {
    name: "Eleanor Preston",
    text: "Grey hair is tricky and most stylists don't really know what to do with it. Ghebre does. He checks in during the cut, asks the right questions, and the result is always exactly what I asked for.",
    cut: "Women's cut",
  },
  {
    name: "Ken Camper",
    text: "I've got very little hair left and Ghebre treats it like a real haircut anyway. Hot towel shave on top, line-up at the back, looks sharp every time. Reasonable prices and a real one-on-one experience.",
    cut: "Head shave + line-up",
  },
  {
    name: "Marcus Tate",
    text: "Followed him from Mastercuts at Northgate to his own shop. Worth the trip. One chair, one client, no upsell  just a good cut at a fair price.",
    cut: "Men's cut",
  },
  {
    name: "Priya Ramesh",
    text: "My son has thick curly hair and is shy with strangers. Ghebre was patient, talked to him the whole time, and gave him the best cut he's ever had. We'll keep coming back.",
    cut: "Kids cut",
  },
];

const VALUES = [
  { kicker: "01", title: "One Chair, One Client", body: "No double-booking, no rotating between people. You get the full appointment." },
  { kicker: "02", title: "By Appointment", body: "Text or call ahead. Walk-ins welcome if the chair is open." },
  { kicker: "03", title: "Fair Pricing", body: "Cuts from $20. No upsells, no membership, no signature treatments." },
  { kicker: "04", title: "Cuts For Everyone", body: "Thin, grey, curly, kids, mostly-bald styles, fades, line-ups." },
];

const FAQ = [
  {
    q: "Do you take walk-ins?",
    a: "Yes, but call or text first  it's one chair, so if Ghebre is mid-cut you'll be waiting. A two-minute text saves a trip.",
  },
  {
    q: "How far in advance should I book?",
    a: "A few days out is usually plenty. Saturdays fill up first. For a same-day cut, text in the morning.",
  },
  {
    q: "What payment do you take?",
    a: "Cash, all major cards, Apple Pay, and Venmo.",
  },
  {
    q: "Is the shop kid-friendly?",
    a: "Yes. Ghebre is unhurried with kids and good with first-time cuts. Bring a parent for the chair.",
  },
  {
    q: "Is the shop wheelchair accessible?",
    a: "Yes  ground-level entrance, no steps, and the chair lowers to a comfortable transfer height.",
  },
  {
    q: "Do you cut all hair types?",
    a: "Yes. Fifteen years of practice with thin, grey, curly, coarse, and fine hair, plus kids and mostly-bald styles.",
  },
];

// ---------- Routing ----------
const ROUTES = ["home", "services", "about", "booking", "reviews", "gallery"];

function useRoute() {
  const [route, setRoute] = useState(() => parseHash());
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [route]);
  return route;
}
function parseHash() {
  const h = (window.location.hash || "").replace(/^#\/?/, "").toLowerCase();
  return ROUTES.includes(h) ? h : "home";
}
function navTo(route) {
  window.location.hash = route === "home" ? "/" : "/" + route;
}

// ---------- Photo ----------
function Photo({ kind, label, aspect = "4 / 3", className = "", style = {} }) {
  const PHOTO_URLS = {
    shop:    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80",
    chair:   "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80",
    cut:     "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80",
    portrait:"https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80",
    detail:  "https://images.unsplash.com/photo-1540518842087-03d0bd940a83?w=800&auto=format&fit=crop&q=80",
    pole:    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&auto=format&fit=crop&q=80",
  };
  const url = PHOTO_URLS[kind];
  return (
    <div
      className={className}
      style={{
        aspectRatio: aspect,
        position: "relative",
        overflow: "hidden",
        background: "#eeecea",
        border: "1px solid var(--color-hairline)",
        ...style,
      }}
    >
      {url && (
        <img
          src={url}
          alt={label}
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}
    </div>
  );
}

// ---------- Logo ----------
function AmAmLogo({ size = 32 }) {
  // Wordmark + barber-pole micro-stripe. Feels grounded, not luxury.
  return (
    <a href="#/" onClick={(e) => { e.preventDefault(); navTo("home"); }}
       style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--color-on-dark)" }}
       aria-label="AmAm Hair Salon  home">
      <span style={{ position: "relative", display: "inline-block" }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: size * 0.6,
          textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1,
          color: "var(--color-cream)",
        }}>AmAm</span>
        <span aria-hidden="true" style={{
          position: "absolute", left: 0, right: 0, bottom: -6, height: 3,
          background: "var(--gradient-m-stripe)",
        }}/>
      </span>
      <span style={{
        fontFamily: "var(--font-display)", fontWeight: 300, fontSize: size * 0.42,
        textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--color-body)",
        marginLeft: 8, paddingLeft: 12, borderLeft: "1px solid var(--color-hairline)",
      }}>Hair Salon</span>
    </a>
  );
}

// ---------- Header ----------
function Header({ route }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [route]);

  const links = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "reviews", label: "Reviews" },
    { id: "gallery", label: "Gallery" },
    { id: "booking", label: "Book" },
  ];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(255,255,255,0.92)" : "var(--color-canvas)",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: "1px solid var(--color-hairline)",
      transition: "background 220ms",
    }}>
      <div className="container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64, gap: 16,
      }}>
        <AmAmLogo/>

        {/* Desktop nav */}
        <nav className="desktop-nav" aria-label="Primary">
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", gap: 28 }}>
            {links.slice(0, 5).map(l => (
              <li key={l.id}>
                <a href={"#/" + (l.id === "home" ? "" : l.id)}
                   onClick={(e) => { e.preventDefault(); navTo(l.id); }}
                   className="nav-link"
                   style={{
                     fontSize: 14, letterSpacing: "0.5px",
                     color: route === l.id ? "var(--color-on-dark)" : "var(--color-body)",
                     paddingBottom: 4,
                     borderBottom: "2px solid " + (route === l.id ? "var(--color-cream)" : "transparent"),
                   }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right cluster  call button always visible */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href={PHONE_TEL}
             className="header-call"
             aria-label={`Call AmAm Hair Salon at ${PHONE_DISPLAY}`}
             style={{
               display: "inline-flex", alignItems: "center", gap: 8,
               height: 40, padding: "0 16px",
               background: "var(--color-cream)", color: "#fff",
               fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13,
               letterSpacing: "1.5px", textTransform: "uppercase",
             }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.11-1.27a2 2 0 0 1 2.11-.45c.93.35 1.95.59 3 .72A2 2 0 0 1 22 16.92Z"/>
            </svg>
            <span className="header-call-label">Book</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            style={{
              width: 40, height: 40, padding: 0,
              background: "transparent", border: "1px solid var(--color-hairline)",
              color: "var(--color-on-dark)", cursor: "pointer",
              display: "none", alignItems: "center", justifyContent: "center",
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {open
                ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></>
                : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="mobile-drawer" style={{
          borderTop: "1px solid var(--color-hairline)",
          background: "var(--color-canvas)",
        }}>
          <div className="container" style={{ padding: "8px 20px 20px" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {links.map(l => (
                <li key={l.id} style={{ borderBottom: "1px solid var(--color-hairline)" }}>
                  <a href={"#/" + (l.id === "home" ? "" : l.id)}
                     onClick={(e) => { e.preventDefault(); navTo(l.id); setOpen(false); }}
                     style={{
                       display: "flex", alignItems: "center", justifyContent: "space-between",
                       padding: "20px 4px",
                       fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700,
                       textTransform: "uppercase", letterSpacing: "0.02em",
                       color: route === l.id ? "var(--color-cream)" : "var(--color-on-dark)",
                     }}>
                    <span>{l.label}</span>
                    <span style={{ color: "var(--color-muted)" }}>→</span>
                  </a>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <a href={PHONE_TEL} className="btn" style={{ flex: 1, height: 52, background: "var(--color-cream)", color: "#fff", borderColor: "var(--color-cream)" }}>Call</a>
              <a href={PHONE_SMS} className="btn" style={{ flex: 1, height: 52 }}>Text</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav { display: none; }
        @media (min-width: 880px) {
          .desktop-nav { display: block; }
          .menu-toggle { display: none !important; }
        }
        @media (max-width: 879px) {
          .menu-toggle { display: inline-flex !important; }
          .header-call-label { display: none; }
          .header-call { padding: 0 12px !important; }
        }
      `}</style>
    </header>
  );
}

// ---------- Sticky mobile bottom bar ----------
function StickyMobileBar() {
  return (
    <div className="sticky-bar" role="region" aria-label="Quick contact" style={{
      position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40,
      background: "rgba(255,255,255,0.96)",
      backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      borderTop: "1px solid var(--color-hairline)",
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      <div style={{ display: "flex" }}>
        <a href={PHONE_TEL} aria-label={`Call ${PHONE_DISPLAY}`} style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          padding: "16px 12px", background: "var(--color-cream)", color: "#fff",
          fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", fontSize: 14,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.11-1.27a2 2 0 0 1 2.11-.45c.93.35 1.95.59 3 .72A2 2 0 0 1 22 16.92Z"/>
          </svg>
          Call
        </a>
        <a href={PHONE_SMS} aria-label={`Text ${PHONE_DISPLAY}`} style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          padding: "16px 12px", background: "var(--color-canvas)", color: "var(--color-on-dark)",
          fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", fontSize: 14,
          borderLeft: "1px solid var(--color-hairline)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Text
        </a>
      </div>
      <style>{`
        .sticky-bar { display: block; }
        @media (min-width: 880px) { .sticky-bar { display: none; } }
        body { padding-bottom: 64px; }
        @media (min-width: 880px) { body { padding-bottom: 0; } }
      `}</style>
    </div>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-hairline)", background: "var(--color-canvas)" }}>
      <div aria-hidden="true" className="m-stripe"/>
      <div className="container" style={{ padding: "48px 20px 32px" }}>
        <div className="footer-grid">
          <div>
            <AmAmLogo/>
            <p style={{ marginTop: 16, color: "var(--color-body)", maxWidth: 320 }}>
              A one-chair barbershop in Pinehurst, North Seattle. Fifteen years of skilled cuts at fair prices.
            </p>
          </div>

          <div>
            <h4 className="footer-h">Visit</h4>
            <p style={{ margin: 0 }}>
              <a href={MAPS_URL} target="_blank" rel="noopener" style={{ color: "var(--color-body-strong)" }}>
                11702 15th Ave NE<br/>Seattle, WA 98125
              </a>
            </p>
            <p style={{ margin: "16px 0 0" }}>
              <a href={PHONE_TEL} style={{ color: "var(--color-body-strong)", fontWeight: 700, fontSize: 18, letterSpacing: "0.5px" }}>
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>

          <div>
            <h4 className="footer-h">Hours</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, fontSize: 14, color: "var(--color-body)" }}>
              {HOURS.map(h => (
                <li key={h.day} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", maxWidth: 220 }}>
                  <span style={{ fontWeight: 700, color: "var(--color-on-dark)", letterSpacing: "0.5px" }}>{h.day}</span>
                  <span>{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-h">Find Us</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, fontSize: 14 }}>
              <li style={{ padding: "4px 0" }}>
                <a href={REVIEWS_URL} target="_blank" rel="noopener" style={{ color: "var(--color-body-strong)" }}>Google Reviews →</a>
              </li>
              <li style={{ padding: "4px 0" }}>
                <a href={MAPS_URL} target="_blank" rel="noopener" style={{ color: "var(--color-body-strong)" }}>Google Maps →</a>
              </li>
              <li style={{ padding: "4px 0" }}>
                <a href={PHONE_SMS} style={{ color: "var(--color-body-strong)" }}>Text to book →</a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--color-hairline)",
          display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between",
          fontSize: 12, color: "var(--color-muted)", letterSpacing: "0.5px",
        }}>
          <span>© {new Date().getFullYear()} AmAm Hair Salon. Owner-operated by Ghebre.</span>
          <span>Wheelchair accessible · Kid friendly · By appointment</span>
        </div>
      </div>
      <style>{`
        .footer-h {
          font-family: var(--font-display);
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1.5px; margin: 0 0 16px;
          color: var(--color-muted);
        }
        .footer-grid {
          display: grid; gap: 32px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1000px) {
          .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px; }
        }
      `}</style>
    </footer>
  );
}

// Make routing/data + small primitives globally available so the
// page modules below can use them.
Object.assign(window, {
  PHONE_DISPLAY, PHONE_TEL, PHONE_SMS, ADDRESS_LINE, MAPS_URL, MAPS_EMBED, REVIEWS_URL,
  HOURS, SERVICES, REVIEWS, VALUES, FAQ,
  useRoute, navTo, Photo, Header, StickyMobileBar, Footer, AmAmLogo,
});
