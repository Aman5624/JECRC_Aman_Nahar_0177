import { LangProvider, useLang, LangSwitcher } from "./Components/language-settings";

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { t } = useLang();
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", height: "70px",
      background: "rgba(8,10,18,0.85)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <span style={{ color: "#fff", fontSize: "20px", fontWeight: 700 }}>🌐 LinguaFlow</span>
      <div style={{ display: "flex", gap: "28px" }}>
        {Object.values(t.nav).map((item, i) => (
          <a key={i} href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "13px" }}>
            {item}
          </a>
        ))}
      </div>
      <LangSwitcher />
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useLang();
  return (
    <section dir={t.dir} style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "120px 24px 80px",
    }}>
      <div style={{
        display: "inline-block", padding: "6px 18px", marginBottom: "24px",
        border: "1px solid rgba(232,201,122,0.4)", borderRadius: "30px",
        color: "#e8c97a", fontSize: "12px", letterSpacing: "0.1em",
        background: "rgba(232,201,122,0.07)",
      }}>
        {t.hero.badge}
      </div>
      <h1 style={{ fontSize: "clamp(40px,7vw,76px)", color: "#fff", marginBottom: "20px", fontWeight: 700 }}>
        {t.hero.headline}
      </h1>
      <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", maxWidth: "540px", marginBottom: "40px", lineHeight: 1.7 }}>
        {t.hero.sub}
      </p>
      <div style={{ display: "flex", gap: "14px" }}>
        <button style={{
          padding: "13px 34px", background: "linear-gradient(135deg,#e8c97a,#c8902a)",
          border: "none", borderRadius: "4px", color: "#080a12",
          fontSize: "14px", fontWeight: 700, cursor: "pointer",
        }}>{t.hero.cta}</button>
        <button style={{
          padding: "13px 34px", background: "transparent",
          border: "1px solid rgba(255,255,255,0.2)", borderRadius: "4px",
          color: "rgba(255,255,255,0.8)", fontSize: "14px", cursor: "pointer",
        }}>{t.hero.secondary}</button>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const { t } = useLang();
  return (
    <section dir={t.dir} style={{ padding: "80px 40px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", fontSize: "36px", color: "#fff", marginBottom: "48px" }}>
        {t.features.title}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {t.features.list.map((f, i) => (
          <div key={i} style={{
            padding: "30px", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4px", background: "rgba(255,255,255,0.02)",
          }}>
            <div style={{ fontSize: "26px", marginBottom: "12px" }}>{f.icon}</div>
            <h3 style={{ color: "#fff", marginBottom: "8px", fontSize: "17px" }}>{f.title}</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useLang();
  return (
    <footer style={{
      padding: "28px 40px", textAlign: "center",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      color: "rgba(255,255,255,0.25)", fontSize: "12px",
    }}>
      {t.footer}
    </footer>
  );
}

// ─── App (Root) ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <LangProvider>
      <div style={{ background: "#080a12", minHeight: "100vh", color: "#fff" }}>
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>
    </LangProvider>
  );
}