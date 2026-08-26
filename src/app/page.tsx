"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Data ─────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "Noir de Roses",
    category: "Fragrance",
    desc: "Dark rose, black oud & sandalwood",
    price: "$285",
    oldPrice: "$340",
    badge: "Bestseller",
    img: "https://images.pexels.com/photos/11860930/pexels-photo-11860930.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "fragrance",
  },
  {
    id: 2,
    name: "Velvet Bloom",
    category: "Candle",
    desc: "Hand-poured soy wax, 70hr burn",
    price: "$95",
    oldPrice: null,
    badge: null,
    img: "https://images.pexels.com/photos/19536400/pexels-photo-19536400.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "candle",
  },
  {
    id: 3,
    name: "Crimson Garden",
    category: "Bouquet",
    desc: "Deep red & blush artisan arrangement",
    price: "$175",
    oldPrice: "$200",
    badge: "Limited",
    img: "https://images.pexels.com/photos/19269253/pexels-photo-19269253.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "floral",
  },
  {
    id: 4,
    name: "Ambre Mystique",
    category: "Fragrance",
    desc: "Warm amber, vanilla & dark musk",
    price: "$320",
    oldPrice: null,
    badge: "New",
    img: "https://images.pexels.com/photos/29805437/pexels-photo-29805437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "fragrance",
  },
  {
    id: 5,
    name: "Eden Eternal",
    category: "Bouquet",
    desc: "Blush peonies, ranunculus & eucalyptus",
    price: "$145",
    oldPrice: null,
    badge: null,
    img: "https://images.pexels.com/photos/3392982/pexels-photo-3392982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "floral",
  },
  {
    id: 6,
    name: "Lumière Nuit",
    category: "Candle",
    desc: "Black fig, tobacco & beeswax blend",
    price: "$115",
    oldPrice: "$130",
    badge: "Sale",
    img: "https://images.pexels.com/photos/6332042/pexels-photo-6332042.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "candle",
  },
];

const testimonials = [
  {
    text: "I never imagined a motorcycle brand could transform my home like this. The candles burn beautifully and the fragrance lingers for days.",
    name: "Isabelle M.",
    loc: "Paris, France",
    stars: 5,
  },
  {
    text: "The bouquets are simply extraordinary. Every arrangement feels like a painting. My third order this year and every one has been perfection.",
    name: "Charlotte W.",
    loc: "London, UK",
    stars: 5,
  },
  {
    text: "Noir de Roses is my signature scent now. I get compliments every single time I wear it. Worth every penny of the price.",
    name: "Sofia A.",
    loc: "Milan, Italy",
    stars: 5,
  },
  {
    text: "The packaging alone made me emotional. Harlow understands luxury in a way no fragrance house — or motorcycle brand — ever has. Absolutely remarkable.",
    name: "Elena R.",
    loc: "New York, USA",
    stars: 5,
  },
  {
    text: "I ordered the Ambre Mystique as a gift and the recipient cried. The quality is so far above anything else I've found. Outstanding.",
    name: "Priya S.",
    loc: "Mumbai, India",
    stars: 5,
  },
  {
    text: "Every petal, every note, every wax pour is done with intention. Harlow is the rarest kind of luxury — honest and soul-stirring.",
    name: "Margaux D.",
    loc: "Bordeaux, France",
    stars: 5,
  },
];

const steps = [
  {
    icon: "🌹",
    title: "Artisan Sourcing",
    desc: "We hand-select the finest blooms from sustainable estates across Europe and the Orient.",
    step: "01",
  },
  {
    icon: "🧪",
    title: "Master Blending",
    desc: "Our in-house perfumers craft each scent using rare materials aged in oak barrels for complexity.",
    step: "02",
  },
  {
    icon: "🕯️",
    title: "Hand Poured",
    desc: "Every candle is poured by hand in small batches, ensuring no two are exactly alike.",
    step: "03",
  },
  {
    icon: "✨",
    title: "Ritual Delivery",
    desc: "Arrive in bespoke black velvet packaging that turns every unboxing into a ceremony.",
    step: "04",
  },
];

const scentNotes = [
  { label: "Top", note: "Bergamot, Rose", val: 85 },
  { label: "Heart", note: "Oud, Jasmine", val: 72 },
  { label: "Base", note: "Sandalwood, Musk", val: 60 },
  { label: "Dry", note: "Amber, Vanilla", val: 90 },
];

/* ─── Component ────────────────────────────────────────── */
export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [bootDone, setBootDone] = useState(false);
  const [bootExiting, setBootExiting] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState("");
  const [toastLabel, setToastLabel] = useState("Added to cart!");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scentVisible, setScentVisible] = useState(false);
  const [bootParticles, setBootParticles] = useState<
    { left: string; top: string; animationDuration: string; animationDelay: string }[]
  >([]);
  const scentRef = useRef<HTMLDivElement>(null);
  const bootRef = useRef<HTMLDivElement>(null);

  /* Boot animation */
  useEffect(() => {
    const timer = setTimeout(() => {
      setBootExiting(true);
      setTimeout(() => setBootDone(true), 900);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  /* Boot particle positions — generated client-side only, after mount,
     so server and client HTML match on first render (fixes hydration error) */
  useEffect(() => {
    setBootParticles(
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100 + "vw",
        top: Math.random() * 100 + "vh",
        animationDuration: 3 + Math.random() * 5 + "s",
        animationDelay: Math.random() * 3 + "s",
      }))
    );
  }, []);

  /* Theme init */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* Scroll effects */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Intersection reveal */
  useEffect(() => {
    if (!bootDone) return;
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [bootDone, activeCategory]);

  /* Scent bars animation */
  useEffect(() => {
    if (!scentRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setScentVisible(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(scentRef.current);
    return () => obs.disconnect();
  }, [bootDone]);

  /* Floating petals */
  useEffect(() => {
    if (!bootDone) return;
    const container = document.getElementById("petals");
    if (!container) return;
    let count = 0;
    const spawn = () => {
      if (count > 12) return;
      const p = document.createElement("div");
      p.className = "petal";
      const size = 8 + Math.random() * 8;
      p.style.width = size + "px";
      p.style.height = size * 0.75 + "px";
      p.style.left = Math.random() * 100 + "vw";
      p.style.setProperty("--rot-start", Math.random() * 360 + "deg");
      const dur = 8 + Math.random() * 12;
      p.style.animationDuration = dur + "s";
      p.style.animationDelay = Math.random() * 5 + "s";
      container.appendChild(p);
      count++;
      setTimeout(() => {
        p.remove();
        count--;
      }, (dur + 5) * 1000);
    };
    const interval = setInterval(spawn, 3000);
    spawn();
    return () => clearInterval(interval);
  }, [bootDone]);

  const addToCart = (name: string) => {
    setCartCount((c) => c + 1);
    setToastLabel("Added to cart!");
    setToastProduct(name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Data ─────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "Noir de Roses",
    category: "Fragrance",
    desc: "Dark rose, black oud & sandalwood",
    price: "$285",
    oldPrice: "$340",
    badge: "Bestseller",
    img: "https://images.pexels.com/photos/11860930/pexels-photo-11860930.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "fragrance",
  },
  {
    id: 2,
    name: "Velvet Bloom",
    category: "Candle",
    desc: "Hand-poured soy wax, 70hr burn",
    price: "$95",
    oldPrice: null,
    badge: null,
    img: "https://images.pexels.com/photos/19536400/pexels-photo-19536400.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "candle",
  },
  {
    id: 3,
    name: "Crimson Garden",
    category: "Bouquet",
    desc: "Deep red & blush artisan arrangement",
    price: "$175",
    oldPrice: "$200",
    badge: "Limited",
    img: "https://images.pexels.com/photos/19269253/pexels-photo-19269253.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "floral",
  },
  {
    id: 4,
    name: "Ambre Mystique",
    category: "Fragrance",
    desc: "Warm amber, vanilla & dark musk",
    price: "$320",
    oldPrice: null,
    badge: "New",
    img: "https://images.pexels.com/photos/29805437/pexels-photo-29805437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "fragrance",
  },
  {
    id: 5,
    name: "Eden Eternal",
    category: "Bouquet",
    desc: "Blush peonies, ranunculus & eucalyptus",
    price: "$145",
    oldPrice: null,
    badge: null,
    img: "https://images.pexels.com/photos/3392982/pexels-photo-3392982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "floral",
  },
  {
    id: 6,
    name: "Lumière Nuit",
    category: "Candle",
    desc: "Black fig, tobacco & beeswax blend",
    price: "$115",
    oldPrice: "$130",
    badge: "Sale",
    img: "https://images.pexels.com/photos/6332042/pexels-photo-6332042.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=500",
    cat: "candle",
  },
];

const testimonials = [
  {
    text: "I never imagined a motorcycle brand could transform my home like this. The candles burn beautifully and the fragrance lingers for days.",
    name: "Isabelle M.",
    loc: "Paris, France",
    stars: 5,
  },
  {
    text: "The bouquets are simply extraordinary. Every arrangement feels like a painting. My third order this year and every one has been perfection.",
    name: "Charlotte W.",
    loc: "London, UK",
    stars: 5,
  },
  {
    text: "Noir de Roses is my signature scent now. I get compliments every single time I wear it. Worth every penny of the price.",
    name: "Sofia A.",
    loc: "Milan, Italy",
    stars: 5,
  },
  {
    text: "The packaging alone made me emotional. Harlow understands luxury in a way no fragrance house — or motorcycle brand — ever has. Absolutely remarkable.",
    name: "Elena R.",
    loc: "New York, USA",
    stars: 5,
  },
  {
    text: "I ordered the Ambre Mystique as a gift and the recipient cried. The quality is so far above anything else I've found. Outstanding.",
    name: "Priya S.",
    loc: "Mumbai, India",
    stars: 5,
  },
  {
    text: "Every petal, every note, every wax pour is done with intention. Harlow is the rarest kind of luxury — honest and soul-stirring.",
    name: "Margaux D.",
    loc: "Bordeaux, France",
    stars: 5,
  },
];

const steps = [
  {
    icon: "🌹",
    title: "Artisan Sourcing",
    desc: "We hand-select the finest blooms from sustainable estates across Europe and the Orient.",
    step: "01",
  },
  {
    icon: "🧪",
    title: "Master Blending",
    desc: "Our in-house perfumers craft each scent using rare materials aged in oak barrels for complexity.",
    step: "02",
  },
  {
    icon: "🕯️",
    title: "Hand Poured",
    desc: "Every candle is poured by hand in small batches, ensuring no two are exactly alike.",
    step: "03",
  },
  {
    icon: "✨",
    title: "Ritual Delivery",
    desc: "Arrive in bespoke black velvet packaging that turns every unboxing into a ceremony.",
    step: "04",
  },
];

const scentNotes = [
  { label: "Top", note: "Bergamot, Rose", val: 85 },
  { label: "Heart", note: "Oud, Jasmine", val: 72 },
  { label: "Base", note: "Sandalwood, Musk", val: 60 },
  { label: "Dry", note: "Amber, Vanilla", val: 90 },
];

/* ─── Component ────────────────────────────────────────── */
export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [bootDone, setBootDone] = useState(false);
  const [bootRiding, setBootRiding] = useState(false);
  const [bootExiting, setBootExiting] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState("");
  const [toastLabel, setToastLabel] = useState("Added to cart!");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scentVisible, setScentVisible] = useState(false);
  const [bootParticles, setBootParticles] = useState<
    { left: string; top: string; animationDuration: string; animationDelay: string }[]
  >([]);
  const scentRef = useRef<HTMLDivElement>(null);
  const bootRef = useRef<HTMLDivElement>(null);

  /* Boot animation: logo/bar, then a motorcycle rides across the
     screen, then the boot screen fades out to reveal the landing page */
  useEffect(() => {
    const t1 = setTimeout(() => setBootRiding(true), 2200);
    const t2 = setTimeout(() => setBootExiting(true), 2200 + 1150);
    const t3 = setTimeout(() => setBootDone(true), 2200 + 1150 + 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  /* Boot particle positions — generated client-side only, after mount,
     so server and client HTML match on first render (fixes hydration error) */
  useEffect(() => {
    setBootParticles(
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100 + "vw",
        top: Math.random() * 100 + "vh",
        animationDuration: 3 + Math.random() * 5 + "s",
        animationDelay: Math.random() * 3 + "s",
      }))
    );
  }, []);

  /* Theme init */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* Scroll effects */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Intersection reveal */
  useEffect(() => {
    if (!bootDone) return;
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [bootDone, activeCategory]);

  /* Scent bars animation */
  useEffect(() => {
    if (!scentRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setScentVisible(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(scentRef.current);
    return () => obs.disconnect();
  }, [bootDone]);

  /* Floating petals */
  useEffect(() => {
    if (!bootDone) return;
    const container = document.getElementById("petals");
    if (!container) return;
    let count = 0;
    const spawn = () => {
      if (count > 12) return;
      const p = document.createElement("div");
      p.className = "petal";
      const size = 8 + Math.random() * 8;
      p.style.width = size + "px";
      p.style.height = size * 0.75 + "px";
      p.style.left = Math.random() * 100 + "vw";
      p.style.setProperty("--rot-start", Math.random() * 360 + "deg");
      const dur = 8 + Math.random() * 12;
      p.style.animationDuration = dur + "s";
      p.style.animationDelay = Math.random() * 5 + "s";
      container.appendChild(p);
      count++;
      setTimeout(() => {
        p.remove();
        count--;
      }, (dur + 5) * 1000);
    };
    const interval = setInterval(spawn, 3000);
    spawn();
    return () => clearInterval(interval);
  }, [bootDone]);

  const addToCart = (name: string) => {
    setCartCount((c) => c + 1);
    setToastLabel("Added to cart!");
    setToastProduct(name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.cat === activeCategory);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      {/* Floating Petals */}
      <div className="petals-container" id="petals" />

      {/* ── Boot Screen ──────────────────────────────────── */}
      {!bootDone && (
        <div
          ref={bootRef}
          id="boot-screen"
          className={bootExiting ? "boot-exit" : ""}
        >
          {/* Particles */}
          <div className="boot-particles">
            {bootParticles.map((style, i) => (
              <div key={i} className="particle" style={style} />
            ))}
          </div>

          {/* Logo, tagline, progress bar — fade out once the ride starts */}
          <div className={bootRiding ? "boot-logo boot-fade-out" : "boot-logo"}>
            <svg width="360" height="60" viewBox="0 0 360 60" fill="none">
              <text
                x="50%"
                y="48"
                textAnchor="middle"
                fontFamily="Playfair Display, serif"
                fontWeight="900"
                fontSize="48"
                letterSpacing="8"
                fill="url(#goldGrad)"
              >
                HARLOW
              </text>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8b4a5c" />
                  <stop offset="50%" stopColor="#c9a24a" />
                  <stop offset="100%" stopColor="#8b4a5c" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={bootRiding ? "boot-tagline boot-fade-out" : "boot-tagline"}>
            A Motorcycle Brand &nbsp;—&nbsp; Reimagined in Bloom
          </div>
          <div className={bootRiding ? "boot-bar-container boot-fade-out" : "boot-bar-container"}>
            <div className="boot-bar" />
          </div>

          {/* Motorcycle passing across the screen — ends the intro */}
          {bootRiding && (
            <div className="boot-ride">
              <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bikeGrad" x1="0" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#c9a24a" />
                    <stop offset="100%" stopColor="#b5516e" />
                  </linearGradient>
                </defs>

                {/* rider silhouette */}
                <path
                  d="M96 52 Q106 22 132 26 Q142 30 138 42 Q130 44 124 52 Z"
                  fill="#2e1a20"
                />

                {/* frame */}
                <path
                  d="M55 90 L92 55 L138 55 L160 40 L185 90 M92 55 L102 90 M138 55 L150 40 L172 40"
                  stroke="url(#bikeGrad)"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* rear wheel */}
                <g className="boot-wheel" style={{ transformOrigin: "55px 90px" }}>
                  <circle cx="55" cy="90" r="24" stroke="url(#bikeGrad)" strokeWidth="5" fill="none" />
                  <circle cx="55" cy="90" r="4" fill="url(#bikeGrad)" />
                  <path d="M55 68 L55 112 M33 90 L77 90 M39 74 L71 106 M71 74 L39 106" stroke="url(#bikeGrad)" strokeWidth="1.5" opacity="0.6" />
                </g>

                {/* front wheel */}
                <g className="boot-wheel" style={{ transformOrigin: "185px 90px" }}>
                  <circle cx="185" cy="90" r="24" stroke="url(#bikeGrad)" strokeWidth="5" fill="none" />
                  <circle cx="185" cy="90" r="4" fill="url(#bikeGrad)" />
                  <path d="M185 68 L185 112 M163 90 L207 90 M169 74 L201 106 M201 74 L169 106" stroke="url(#bikeGrad)" strokeWidth="1.5" opacity="0.6" />
                </g>
              </svg>
            </div>
          )}
        </div>
      )}

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            Har<span>low</span>
          </a>

          <ul className="nav-links">
            {["Collections", "Fragrance", "Florals", "Candles", "About"].map(
              (l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`}>{l}</a>
                </li>
              )
            )}
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle nav-theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? (
                <>
                  <span>☀️</span>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>Light</span>
                </>
              ) : (
                <>
                  <span>🌙</span>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>Dark</span>
                </>
              )}
            </button>
            <a href="#collections" className="nav-cta">
              Shop Now
            </a>
            <button
              className="theme-toggle nav-cart-toggle"
              style={{ position: "relative" }}
              aria-label="View cart"
              onClick={() => {
                if (cartCount > 0) {
                  setToastLabel("Your cart");
                  setToastProduct(
                    `${cartCount} item${cartCount > 1 ? "s" : ""} in your cart`
                  );
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }
                document
                  .getElementById("collections")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🛒
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    background: "linear-gradient(135deg,#c47a3a,#d4a853)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["Collections", "Fragrance", "Florals", "Candles", "About"].map(
          (l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          )
        )}
        <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={() => setMenuOpen(false)}>
          Shop Now ↗
        </button>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-content section-inner">
          <div className="hero-badge">
            <span>✦</span>
            <span>A Motorcycle Brand — Reimagined</span>
          </div>
          <h1 className="hero-title">
            Born On
            <em>Open Roads.</em>
            Reborn in Bloom.
          </h1>
          <p className="hero-desc">
            What if the loudest engine in motoring history had chosen silence
            instead? Harlow takes the rebel spirit of the open road — chrome,
            leather, and horsepower — and pours it into rare fragrances,
            couture florals & hand-poured candles.
          </p>
          <div className="hero-actions">
            <a href="#collections" className="btn-primary">
              Explore Collections ↗
            </a>
            <a href="#about" className="btn-ghost">
              Our Story →
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          {[
            { num: "12K+", label: "Happy Clients" },
            { num: "48", label: "Rare Scents" },
            { num: "99%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="hero-stat">
              <div className="hero-stat-num">{s.num}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span>Scroll</span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path
              d="M8 1v18M1 13l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[
            "Rose & Oud",
            "Artisan Candles",
            "Dark Florals",
            "Rare Fragrance",
            "Couture Bouquets",
            "Hand Poured",
            "Sustainable Luxury",
            "Bespoke Scents",
            "Rose & Oud",
            "Artisan Candles",
            "Dark Florals",
            "Rare Fragrance",
            "Couture Bouquets",
            "Hand Poured",
            "Sustainable Luxury",
            "Bespoke Scents",
          ].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Products ─────────────────────────────────────── */}
      <section className="products-section" id="collections">
        <div className="section-inner">
          <div className="products-header">
            <div>
              <div className="section-label reveal">Our Curations</div>
              <h2 className="section-title reveal reveal-delay-1">
                Signature <em>Collections</em>
              </h2>
              <p className="section-desc reveal reveal-delay-2">
                Each piece is a conversation between nature's rarest materials
                and our master artisans' obsessive craft.
              </p>
            </div>
            <div className="category-tabs reveal">
              {["all", "fragrance", "floral", "candle"].map((cat) => (
                <button
                  key={cat}
                  className={`category-tab${activeCategory === cat ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "all"
                    ? "All"
                    : cat === "floral"
                    ? "Florals"
                    : cat.charAt(0).toUpperCase() + cat.slice(1) + "s"}
                </button>
              ))}
            </div>
          </div>

          <div className="products-grid">
            {filtered.map((product, idx) => (
              <div
                key={product.id}
                className={`product-card glass-card reveal reveal-delay-${Math.min(idx + 1, 5)}`}
              >
                <div className="product-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.img} alt={product.name} loading="lazy" />
                  {product.badge && (
                    <div className="product-badge">{product.badge}</div>
                  )}
                  <div className="product-overlay">
                    <button
                      className="product-quick-add"
                      onClick={() => addToCart(product.name)}
                    >
                      Quick Add to Cart
                    </button>
                  </div>
                </div>
                <div className="product-body">
                  <div className="product-category">{product.category}</div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-desc">{product.desc}</div>
                  <div className="product-footer">
                    <div>
                      <span className="product-price">{product.price}</span>
                      {product.oldPrice && (
                        <span className="product-price-old">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>
                    <button
                      className="product-add-btn"
                      onClick={() => addToCart(product.name)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All */}
          <div
            style={{ textAlign: "center", marginTop: "4rem" }}
            className="reveal"
          >
            <a href="#" className="btn-primary" style={{ display: "inline-flex" }}>
              View All Products ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Feature Panels ───────────────────────────────── */}
      <section className="feature-section" id="fragrance">
        <div className="section-inner">
          <div className="section-label reveal">Discover</div>
          <h2 className="section-title reveal reveal-delay-1">
            The Art of <em>Rarity</em>
          </h2>
          <div className="feature-grid" style={{ marginTop: "3rem" }}>
            {/* Big Feature */}
            <div className="feature-big reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="feature-img"
                src="https://images.pexels.com/photos/36779952/pexels-photo-36779952.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600"
                alt="Luxury Fragrance"
                loading="lazy"
              />
              <div className="feature-overlay" />
              <div className="feature-content">
                <div className="feature-label">Signature Scents</div>
                <div className="feature-title">
                  Fragrances that tell stories only you can hear
                </div>
                <a href="#collections" className="feature-link">
                  Explore Fragrances →
                </a>
              </div>
            </div>
            {/* Small Features */}
            <div className="feature-small reveal reveal-delay-1" id="florals">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="feature-img"
                src="https://images.pexels.com/photos/7814535/pexels-photo-7814535.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                alt="Floral Arrangements"
                loading="lazy"
              />
              <div className="feature-overlay" />
              <div className="feature-content">
                <div className="feature-label">Couture Florals</div>
                <div className="feature-title">
                  Every bloom hand-selected at dawn
                </div>
                <a
                  href="#collections"
                  className="feature-link"
                  onClick={() => setActiveCategory("floral")}
                >
                  View Bouquets →
                </a>
              </div>
            </div>
            <div className="feature-small reveal reveal-delay-2" id="candles">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="feature-img"
                src="https://images.pexels.com/photos/34200613/pexels-photo-34200613.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                alt="Luxury Candles"
                loading="lazy"
              />
              <div className="feature-overlay" />
              <div className="feature-content">
                <div className="feature-label">Ritual Candles</div>
                <div className="feature-title">
                  70-hour journeys of warmth & wonder
                </div>
                <a
                  href="#collections"
                  className="feature-link"
                  onClick={() => setActiveCategory("candle")}
                >
                  Shop Candles →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scent Profile ─────────────────────────────────── */}
      <section className="scent-section" id="about" ref={scentRef}>
        <div className="section-inner">
          <div className="scent-layout">
            {/* Visual */}
            <div className="scent-visual" style={{ display: "flex", justifyContent: "center" }}>
              <div className="scent-circle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="scent-img"
                  src="https://images.pexels.com/photos/7814724/pexels-photo-7814724.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=300"
                  alt="Signature Scent"
                />
                <div className="scent-dot" style={{ width: 50, height: 50, top: "5%", left: "5%", position: "absolute", animationDelay: "0.5s" }}>🌹</div>
                <div className="scent-dot" style={{ width: 42, height: 42, bottom: "10%", left: "8%", position: "absolute", animationDelay: "1s" }}>🕯️</div>
                <div className="scent-dot" style={{ width: 38, height: 38, top: "15%", right: "3%", position: "absolute", animationDelay: "1.5s" }}>🌸</div>
                <div className="scent-dot" style={{ width: 46, height: 46, bottom: "5%", right: "8%", position: "absolute", animationDelay: "2s" }}>✨</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="section-label reveal">Our Philosophy</div>
              <h2 className="section-title reveal reveal-delay-1">
                Crafted for the <em>Discerning</em> Soul
              </h2>
              <p className="section-desc reveal reveal-delay-2">
                We believe beauty should be felt before it's seen. Harlow was
                born from a simple question: what does a legendary motorcycle
                marque smell like once you strip away the engine? Every
                creation begins as a memory — leather warmed by a thousand
                miles, rain on chrome at dusk — and becomes something you can
                hold in your hands.
              </p>

              {/* Scent Notes */}
              <div className="scent-notes" style={{ marginTop: "2.5rem" }}>
                {scentNotes.map((note, i) => (
                  <div key={note.label} className={`scent-note-item reveal reveal-delay-${i + 1}`}>
                    <div className="scent-note-label">{note.label}</div>
                    <div
                      style={{ flex: 1, fontSize: "0.8rem", color: "var(--text-muted)", marginRight: "1rem" }}
                    >
                      {note.note}
                    </div>
                    <div className="scent-note-bar-wrap">
                      <div
                        className="scent-note-bar"
                        style={{ width: scentVisible ? note.val + "%" : "0%" }}
                      />
                    </div>
                    <div className="scent-note-val">{note.val}%</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "3rem" }} className="reveal reveal-delay-4">
                <a href="#collections" className="btn-primary" style={{ display: "inline-flex" }}>
                  Discover Your Scent ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="process-section">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "0" }}>
            <div className="section-label reveal" style={{ justifyContent: "center" }}>
              The Ritual
            </div>
            <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: "center" }}>
              How We <em>Create</em>
            </h2>
            <p
              className="section-desc reveal reveal-delay-2"
              style={{ margin: "0 auto", textAlign: "center" }}
            >
              From earth to essence — our four-step ritual transforms the
              world's finest materials into objects of enduring beauty.
            </p>
          </div>

          <div className="process-grid">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`process-step reveal reveal-delay-${i + 1}`}
                data-step={step.step}
              >
                <span className="process-icon">{step.icon}</span>
                <div className="process-title">{step.title}</div>
                <div className="process-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="testimonials-section">
        <div className="section-inner">
          <div className="section-label reveal">Reviews</div>
          <h2 className="section-title reveal reveal-delay-1">
            Words from Our <em>Devotees</em>
          </h2>
        </div>
        <div className="testimonials-track-wrap">
          <div className="testimonials-track">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {"★".repeat(t.stars)}
                </div>
                <div className="testimonial-text">"{t.text}"</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-loc">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Banner ─────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))",
          padding: "5rem 0",
          borderTop: "1px solid var(--glass-border)",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <div className="section-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "3rem",
              textAlign: "center",
            }}
          >
            {[
              { num: "12,400+", label: "Happy Customers" },
              { num: "48", label: "Rare Scent Profiles" },
              { num: "18", label: "Countries Served" },
              { num: "99.4%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="reveal">
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA / Newsletter ─────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="section-inner">
          <div className="cta-content reveal">
            <div className="section-label" style={{ justifyContent: "center" }}>
              Join the Circle
            </div>
            <h2 className="cta-title">
              Receive Beauty <em>First</em>
            </h2>
            <p className="cta-desc">
              Be the first to discover new collections, exclusive drops, and
              private events. Your inbox will never be the same.
            </p>
            <form
              className="cta-form"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.querySelector("input") as HTMLInputElement;
                if (input.value) {
                  alert(`Welcome to Harlow, ${input.value}! 🌹`);
                  input.value = "";
                }
              }}
            >
              <input
                className="cta-input"
                type="email"
                placeholder="your@email.com"
                required
              />
              <button type="submit" className="btn-primary">
                Join ✦
              </button>
            </form>
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: "rgba(245,237,227,0.45)",
                letterSpacing: "0.05em",
              }}
            >
              No spam, ever. Unsubscribe any time.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                Har<span>low</span>
              </div>
              <p className="footer-brand-desc">
                A legendary motorcycle brand, reimagined as artisan luxury
                florals, rare fragrances & hand-poured candles for those who
                demand the extraordinary. Crafted with obsession, delivered
                with reverence.
              </p>
              <div className="footer-socials">
                {["𝕏", "◈", "⬡", "♫"].map((icon, i) => (
                  <a key={i} href="#" className="social-link">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="footer-col-title">Collections</div>
              <ul className="footer-links">
                {["Fragrances", "Bouquets", "Candles", "Gift Sets", "Seasonal"].map(
                  (l) => (
                    <li key={l}>
                      <a href="#">→ {l}</a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {["Our Story", "Artisans", "Sustainability", "Press", "Careers"].map(
                  (l) => (
                    <li key={l}>
                      <a href="#">→ {l}</a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Support</div>
              <ul className="footer-links">
                {[
                  "Concierge",
                  "Shipping & Returns",
                  "Care Guide",
                  "Corporate",
                  "FAQ",
                ].map((l) => (
                  <li key={l}>
                    <a href="#">→ {l}</a>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  CONCIERGE LINE
                </div>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.1rem",
                    color: "var(--accent-gold)",
                    marginTop: "0.3rem",
                  }}
                >
                  +1 (800) HAR-LOWLUX
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              © 2025 Harlow. All rights reserved. Crafted with obsession. An
              independent, unaffiliated creative reimagining of a motorcycle
              brand as a fragrance house — not a real product.
            </div>
            <div className="footer-legal">
              {["Privacy", "Terms", "Cookies"].map((l) => (
                <a key={l} href="#">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Cart Toast ────────────────────────────────────── */}
      <div className={`cart-toast${showToast ? " show" : ""}`}>
        <div className="cart-toast-icon">🛒</div>
        <div>
          <div className="cart-toast-text">{toastLabel}</div>
          <div className="cart-toast-sub">{toastProduct}</div>
        </div>
      </div>
    </>
  );
}

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.cat === activeCategory);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      {/* Floating Petals */}
      <div className="petals-container" id="petals" />

      {/* ── Boot Screen ──────────────────────────────────── */}
      {!bootDone && (
        <div
          ref={bootRef}
          id="boot-screen"
          className={bootExiting ? "boot-exit" : ""}
        >
          {/* Particles */}
          <div className="boot-particles">
            {bootParticles.map((style, i) => (
              <div key={i} className="particle" style={style} />
            ))}
          </div>

          {/* Logo */}
          <div className="boot-logo">
            <svg width="360" height="60" viewBox="0 0 360 60" fill="none">
              <text
                x="50%"
                y="48"
                textAnchor="middle"
                fontFamily="Playfair Display, serif"
                fontWeight="900"
                fontSize="48"
                letterSpacing="8"
                fill="url(#goldGrad)"
              >
                HARLOW
              </text>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c47a3a" />
                  <stop offset="50%" stopColor="#d4a853" />
                  <stop offset="100%" stopColor="#c47a3a" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="boot-tagline">A Motorcycle Brand &nbsp;—&nbsp; Reimagined in Bloom</div>
          <div className="boot-bar-container">
            <div className="boot-bar" />
          </div>
        </div>
      )}

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            Har<span>low</span>
          </a>

          <ul className="nav-links">
            {["Collections", "Fragrance", "Florals", "Candles", "About"].map(
              (l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`}>{l}</a>
                </li>
              )
            )}
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle nav-theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? (
                <>
                  <span>☀️</span>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>Light</span>
                </>
              ) : (
                <>
                  <span>🌙</span>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>Dark</span>
                </>
              )}
            </button>
            <a href="#collections" className="nav-cta">
              Shop Now
            </a>
            <button
              className="theme-toggle nav-cart-toggle"
              style={{ position: "relative" }}
              aria-label="View cart"
              onClick={() => {
                if (cartCount > 0) {
                  setToastLabel("Your cart");
                  setToastProduct(
                    `${cartCount} item${cartCount > 1 ? "s" : ""} in your cart`
                  );
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }
                document
                  .getElementById("collections")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🛒
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    background: "linear-gradient(135deg,#c47a3a,#d4a853)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["Collections", "Fragrance", "Florals", "Candles", "About"].map(
          (l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          )
        )}
        <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={() => setMenuOpen(false)}>
          Shop Now ↗
        </button>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-content section-inner">
          <div className="hero-badge">
            <span>✦</span>
            <span>A Motorcycle Brand — Reimagined</span>
          </div>
          <h1 className="hero-title">
            Born On
            <em>Open Roads.</em>
            Reborn in Bloom.
          </h1>
          <p className="hero-desc">
            What if the loudest engine in motoring history had chosen silence
            instead? Harlow takes the rebel spirit of the open road — chrome,
            leather, and horsepower — and pours it into rare fragrances,
            couture florals & hand-poured candles.
          </p>
          <div className="hero-actions">
            <a href="#collections" className="btn-primary">
              Explore Collections ↗
            </a>
            <a href="#about" className="btn-ghost">
              Our Story →
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          {[
            { num: "12K+", label: "Happy Clients" },
            { num: "48", label: "Rare Scents" },
            { num: "99%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="hero-stat">
              <div className="hero-stat-num">{s.num}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span>Scroll</span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path
              d="M8 1v18M1 13l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[
            "Rose & Oud",
            "Artisan Candles",
            "Dark Florals",
            "Rare Fragrance",
            "Couture Bouquets",
            "Hand Poured",
            "Sustainable Luxury",
            "Bespoke Scents",
            "Rose & Oud",
            "Artisan Candles",
            "Dark Florals",
            "Rare Fragrance",
            "Couture Bouquets",
            "Hand Poured",
            "Sustainable Luxury",
            "Bespoke Scents",
          ].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Products ─────────────────────────────────────── */}
      <section className="products-section" id="collections">
        <div className="section-inner">
          <div className="products-header">
            <div>
              <div className="section-label reveal">Our Curations</div>
              <h2 className="section-title reveal reveal-delay-1">
                Signature <em>Collections</em>
              </h2>
              <p className="section-desc reveal reveal-delay-2">
                Each piece is a conversation between nature's rarest materials
                and our master artisans' obsessive craft.
              </p>
            </div>
            <div className="category-tabs reveal">
              {["all", "fragrance", "floral", "candle"].map((cat) => (
                <button
                  key={cat}
                  className={`category-tab${activeCategory === cat ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "all"
                    ? "All"
                    : cat === "floral"
                    ? "Florals"
                    : cat.charAt(0).toUpperCase() + cat.slice(1) + "s"}
                </button>
              ))}
            </div>
          </div>

          <div className="products-grid">
            {filtered.map((product, idx) => (
              <div
                key={product.id}
                className={`product-card glass-card reveal reveal-delay-${Math.min(idx + 1, 5)}`}
              >
                <div className="product-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.img} alt={product.name} loading="lazy" />
                  {product.badge && (
                    <div className="product-badge">{product.badge}</div>
                  )}
                  <div className="product-overlay">
                    <button
                      className="product-quick-add"
                      onClick={() => addToCart(product.name)}
                    >
                      Quick Add to Cart
                    </button>
                  </div>
                </div>
                <div className="product-body">
                  <div className="product-category">{product.category}</div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-desc">{product.desc}</div>
                  <div className="product-footer">
                    <div>
                      <span className="product-price">{product.price}</span>
                      {product.oldPrice && (
                        <span className="product-price-old">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>
                    <button
                      className="product-add-btn"
                      onClick={() => addToCart(product.name)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All */}
          <div
            style={{ textAlign: "center", marginTop: "4rem" }}
            className="reveal"
          >
            <a href="#" className="btn-primary" style={{ display: "inline-flex" }}>
              View All Products ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Feature Panels ───────────────────────────────── */}
      <section className="feature-section" id="fragrance">
        <div className="section-inner">
          <div className="section-label reveal">Discover</div>
          <h2 className="section-title reveal reveal-delay-1">
            The Art of <em>Rarity</em>
          </h2>
          <div className="feature-grid" style={{ marginTop: "3rem" }}>
            {/* Big Feature */}
            <div className="feature-big reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="feature-img"
                src="https://images.pexels.com/photos/36779952/pexels-photo-36779952.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600"
                alt="Luxury Fragrance"
                loading="lazy"
              />
              <div className="feature-overlay" />
              <div className="feature-content">
                <div className="feature-label">Signature Scents</div>
                <div className="feature-title">
                  Fragrances that tell stories only you can hear
                </div>
                <a href="#collections" className="feature-link">
                  Explore Fragrances →
                </a>
              </div>
            </div>
            {/* Small Features */}
            <div className="feature-small reveal reveal-delay-1" id="florals">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="feature-img"
                src="https://images.pexels.com/photos/7814535/pexels-photo-7814535.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                alt="Floral Arrangements"
                loading="lazy"
              />
              <div className="feature-overlay" />
              <div className="feature-content">
                <div className="feature-label">Couture Florals</div>
                <div className="feature-title">
                  Every bloom hand-selected at dawn
                </div>
                <a
                  href="#collections"
                  className="feature-link"
                  onClick={() => setActiveCategory("floral")}
                >
                  View Bouquets →
                </a>
              </div>
            </div>
            <div className="feature-small reveal reveal-delay-2" id="candles">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="feature-img"
                src="https://images.pexels.com/photos/34200613/pexels-photo-34200613.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                alt="Luxury Candles"
                loading="lazy"
              />
              <div className="feature-overlay" />
              <div className="feature-content">
                <div className="feature-label">Ritual Candles</div>
                <div className="feature-title">
                  70-hour journeys of warmth & wonder
                </div>
                <a
                  href="#collections"
                  className="feature-link"
                  onClick={() => setActiveCategory("candle")}
                >
                  Shop Candles →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scent Profile ─────────────────────────────────── */}
      <section className="scent-section" id="about" ref={scentRef}>
        <div className="section-inner">
          <div className="scent-layout">
            {/* Visual */}
            <div className="scent-visual" style={{ display: "flex", justifyContent: "center" }}>
              <div className="scent-circle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="scent-img"
                  src="https://images.pexels.com/photos/7814724/pexels-photo-7814724.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=300"
                  alt="Signature Scent"
                />
                <div className="scent-dot" style={{ width: 50, height: 50, top: "5%", left: "5%", position: "absolute", animationDelay: "0.5s" }}>🌹</div>
                <div className="scent-dot" style={{ width: 42, height: 42, bottom: "10%", left: "8%", position: "absolute", animationDelay: "1s" }}>🕯️</div>
                <div className="scent-dot" style={{ width: 38, height: 38, top: "15%", right: "3%", position: "absolute", animationDelay: "1.5s" }}>🌸</div>
                <div className="scent-dot" style={{ width: 46, height: 46, bottom: "5%", right: "8%", position: "absolute", animationDelay: "2s" }}>✨</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="section-label reveal">Our Philosophy</div>
              <h2 className="section-title reveal reveal-delay-1">
                Crafted for the <em>Discerning</em> Soul
              </h2>
              <p className="section-desc reveal reveal-delay-2">
                We believe beauty should be felt before it's seen. Harlow was
                born from a simple question: what does a legendary motorcycle
                marque smell like once you strip away the engine? Every
                creation begins as a memory — leather warmed by a thousand
                miles, rain on chrome at dusk — and becomes something you can
                hold in your hands.
              </p>

              {/* Scent Notes */}
              <div className="scent-notes" style={{ marginTop: "2.5rem" }}>
                {scentNotes.map((note, i) => (
                  <div key={note.label} className={`scent-note-item reveal reveal-delay-${i + 1}`}>
                    <div className="scent-note-label">{note.label}</div>
                    <div
                      style={{ flex: 1, fontSize: "0.8rem", color: "var(--text-muted)", marginRight: "1rem" }}
                    >
                      {note.note}
                    </div>
                    <div className="scent-note-bar-wrap">
                      <div
                        className="scent-note-bar"
                        style={{ width: scentVisible ? note.val + "%" : "0%" }}
                      />
                    </div>
                    <div className="scent-note-val">{note.val}%</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "3rem" }} className="reveal reveal-delay-4">
                <a href="#collections" className="btn-primary" style={{ display: "inline-flex" }}>
                  Discover Your Scent ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="process-section">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "0" }}>
            <div className="section-label reveal" style={{ justifyContent: "center" }}>
              The Ritual
            </div>
            <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: "center" }}>
              How We <em>Create</em>
            </h2>
            <p
              className="section-desc reveal reveal-delay-2"
              style={{ margin: "0 auto", textAlign: "center" }}
            >
              From earth to essence — our four-step ritual transforms the
              world's finest materials into objects of enduring beauty.
            </p>
          </div>

          <div className="process-grid">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`process-step reveal reveal-delay-${i + 1}`}
                data-step={step.step}
              >
                <span className="process-icon">{step.icon}</span>
                <div className="process-title">{step.title}</div>
                <div className="process-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="testimonials-section">
        <div className="section-inner">
          <div className="section-label reveal">Reviews</div>
          <h2 className="section-title reveal reveal-delay-1">
            Words from Our <em>Devotees</em>
          </h2>
        </div>
        <div className="testimonials-track-wrap">
          <div className="testimonials-track">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {"★".repeat(t.stars)}
                </div>
                <div className="testimonial-text">"{t.text}"</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-loc">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Banner ─────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))",
          padding: "5rem 0",
          borderTop: "1px solid var(--glass-border)",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <div className="section-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "3rem",
              textAlign: "center",
            }}
          >
            {[
              { num: "12,400+", label: "Happy Customers" },
              { num: "48", label: "Rare Scent Profiles" },
              { num: "18", label: "Countries Served" },
              { num: "99.4%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="reveal">
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA / Newsletter ─────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="section-inner">
          <div className="cta-content reveal">
            <div className="section-label" style={{ justifyContent: "center" }}>
              Join the Circle
            </div>
            <h2 className="cta-title">
              Receive Beauty <em>First</em>
            </h2>
            <p className="cta-desc">
              Be the first to discover new collections, exclusive drops, and
              private events. Your inbox will never be the same.
            </p>
            <form
              className="cta-form"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.querySelector("input") as HTMLInputElement;
                if (input.value) {
                  alert(`Welcome to Harlow, ${input.value}! 🌹`);
                  input.value = "";
                }
              }}
            >
              <input
                className="cta-input"
                type="email"
                placeholder="your@email.com"
                required
              />
              <button type="submit" className="btn-primary">
                Join ✦
              </button>
            </form>
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: "rgba(245,237,227,0.45)",
                letterSpacing: "0.05em",
              }}
            >
              No spam, ever. Unsubscribe any time.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                Har<span>low</span>
              </div>
              <p className="footer-brand-desc">
                A legendary motorcycle brand, reimagined as artisan luxury
                florals, rare fragrances & hand-poured candles for those who
                demand the extraordinary. Crafted with obsession, delivered
                with reverence.
              </p>
              <div className="footer-socials">
                {["𝕏", "◈", "⬡", "♫"].map((icon, i) => (
                  <a key={i} href="#" className="social-link">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="footer-col-title">Collections</div>
              <ul className="footer-links">
                {["Fragrances", "Bouquets", "Candles", "Gift Sets", "Seasonal"].map(
                  (l) => (
                    <li key={l}>
                      <a href="#">→ {l}</a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {["Our Story", "Artisans", "Sustainability", "Press", "Careers"].map(
                  (l) => (
                    <li key={l}>
                      <a href="#">→ {l}</a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Support</div>
              <ul className="footer-links">
                {[
                  "Concierge",
                  "Shipping & Returns",
                  "Care Guide",
                  "Corporate",
                  "FAQ",
                ].map((l) => (
                  <li key={l}>
                    <a href="#">→ {l}</a>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  CONCIERGE LINE
                </div>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.1rem",
                    color: "var(--accent-gold)",
                    marginTop: "0.3rem",
                  }}
                >
                  +1 (800) HAR-LOWLUX
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              © 2025 Harlow. All rights reserved. Crafted with obsession. An
              independent, unaffiliated creative reimagining of a motorcycle
              brand as a fragrance house — not a real product.
            </div>
            <div className="footer-legal">
              {["Privacy", "Terms", "Cookies"].map((l) => (
                <a key={l} href="#">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Cart Toast ────────────────────────────────────── */}
      <div className={`cart-toast${showToast ? " show" : ""}`}>
        <div className="cart-toast-icon">🛒</div>
        <div>
          <div className="cart-toast-text">{toastLabel}</div>
          <div className="cart-toast-sub">{toastProduct}</div>
        </div>
      </div>
    </>
  );
}
