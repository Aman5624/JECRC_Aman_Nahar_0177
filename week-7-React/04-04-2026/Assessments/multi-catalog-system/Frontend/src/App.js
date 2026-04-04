import { useState, useCallback } from "react";
import { BillProvider, useBill, CAT_META, fmtCurr, fmtDate, fmtTime, genId } from "./components/BillGenerator";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#0c0e17", surface: "#13151f", card: "#1a1d2e",
  border: "rgba(255,255,255,0.07)", accent: "#f0a500",
  accentL: "rgba(240,165,0,0.12)", green: "#22c55e",
  red: "#ef4444", blue: "#3b82f6",
  text: "#f0f0f0", muted: "rgba(255,255,255,0.38)", sub: "rgba(255,255,255,0.6)",
};

const btn = (variant = "ghost", extra = {}) => {
  const base = {
    border: "none", borderRadius: "8px", cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
    fontSize: "13px", transition: "all 0.18s",
    display: "inline-flex", alignItems: "center", gap: "6px", ...extra,
  };
  if (variant === "primary") return { ...base, background: C.accent, color: "#000", padding: "10px 20px" };
  if (variant === "danger")  return { ...base, background: "rgba(239,68,68,0.12)", color: C.red, border: `1px solid rgba(239,68,68,0.25)`, padding: "7px 14px" };
  if (variant === "success") return { ...base, background: "rgba(34,197,94,0.12)", color: C.green, border: `1px solid rgba(34,197,94,0.25)`, padding: "10px 20px" };
  if (variant === "outline") return { ...base, background: "transparent", color: C.sub, border: `1px solid ${C.border}`, padding: "9px 16px" };
  return { ...base, background: C.accentL, color: C.accent, padding: "7px 14px" };
};

const inputSt = () => ({
  width: "100%", padding: "10px 13px", borderRadius: "8px",
  border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.04)",
  color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "13px", outline: "none", boxSizing: "border-box",
});

// ─── Small Shared Components ──────────────────────────────────────────────────
function CatTag({ cat }) {
  const m = CAT_META[cat] || CAT_META.custom;
  return (
    <span style={{ padding: "2px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700,
      background: m.bg, color: m.color, letterSpacing: "0.06em", textTransform: "uppercase",
      fontFamily: "'Plus Jakarta Sans'" }}>{m.label}</span>
  );
}

function Toast({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: "11px 18px", borderRadius: "8px", fontSize: "13px",
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
          background: t.type === "success" ? "rgba(34,197,94,0.15)" : t.type === "error" ? "rgba(239,68,68,0.15)" : "rgba(59,130,246,0.15)",
          border: `1px solid ${t.type === "success" ? "rgba(34,197,94,0.3)" : t.type === "error" ? "rgba(239,68,68,0.3)" : "rgba(59,130,246,0.3)"}`,
          color: t.type === "success" ? C.green : t.type === "error" ? C.red : C.blue,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}>{t.msg}</div>
      ))}
    </div>
  );
}

function Modal({ title, onClose, children, width = 480 }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.72)",
      backdropFilter: "blur(6px)", display: "flex", alignItems: "center",
      justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
        padding: 32, width: "100%", maxWidth: width, boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
        maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ color: C.text, fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 18, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Invoice Print ────────────────────────────────────────────────────────────
function InvoicePrint({ bill, onClose }) {
  const sub    = bill.items.reduce((s, i) => s + i.price * i.qty, 0);
  const disc   = bill.discType === "pct" ? sub * bill.discount / 100 : Number(bill.discount);
  const tax    = (sub - disc) * bill.taxRate / 100;
  const total  = sub - disc + tax;
  return (
    <Modal title="Invoice Preview" onClose={onClose} width={640}>
      <div style={{ background: "#fff", color: "#111", borderRadius: 10, padding: 32, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, paddingBottom: 16, borderBottom: "2px solid #f0f0f0" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>🏛️ VenuePro</div>
            <div style={{ fontSize: 11, color: "#888" }}>support@venuepro.in · +91-98000-00000</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#f0a500" }}>INVOICE</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{bill.invoiceNo}</div>
            <div style={{ fontSize: 11, color: "#888" }}>{fmtDate(bill.createdAt)} · {fmtTime(bill.createdAt)}</div>
          </div>
        </div>
        {bill.customer?.name && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: "#999", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Bill To</div>
            <div style={{ fontWeight: 700 }}>{bill.customer.name}</div>
            {bill.customer.email && <div style={{ fontSize: 12, color: "#555" }}>{bill.customer.email}</div>}
          </div>
        )}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
          <thead>
            <tr style={{ background: "#f8f8f8" }}>
              {["Item","Qty","Price","Total"].map(h => (
                <th key={h} style={{ padding: "8px 10px", textAlign: h === "Qty" || h === "Price" || h === "Total" ? "right" : "left", fontSize: 10, fontWeight: 700, color: "#888", textTransform: "uppercase", borderBottom: "1px solid #eee" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bill.items.map(item => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "8px 10px", fontSize: 13, fontWeight: 600 }}>{item.icon} {item.name}</td>
                <td style={{ padding: "8px 10px", textAlign: "right", fontSize: 13 }}>{item.qty}</td>
                <td style={{ padding: "8px 10px", textAlign: "right", fontSize: 13 }}>{fmtCurr(item.price)}</td>
                <td style={{ padding: "8px 10px", textAlign: "right", fontSize: 13, fontWeight: 700 }}>{fmtCurr(item.price * item.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: 220 }}>
            {[["Subtotal", fmtCurr(sub)], ["Discount", `- ${fmtCurr(disc)}`], [`GST (${bill.taxRate}%)`, fmtCurr(tax)]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 12, color: "#555", borderBottom: "1px solid #f0f0f0" }}>
                <span>{l}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontSize: 16, fontWeight: 800 }}>
              <span>TOTAL</span><span style={{ color: "#f0a500" }}>{fmtCurr(total)}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
        <button style={btn("outline")} onClick={onClose}>Close</button>
        <button style={btn("primary")} onClick={() => window.print()}>🖨️ Print</button>
      </div>
    </Modal>
  );
}

// ─── Bill Builder ─────────────────────────────────────────────────────────────
function BillBuilder() {
  const { draftBill, setDraftBill, catalogs, saveBill, setView, toast } = useBill();
  const [activeCat, setActiveCat] = useState("entrance");
  const [customItem, setCustomItem] = useState({ name: "", price: "", icon: "📦", qty: 1 });
  const [customDonation, setCustomDonation] = useState("");
  const [catSearch, setCatSearch] = useState("");
  const bill = draftBill;
  const update = (patch) => setDraftBill(b => ({ ...b, ...patch }));

  const addItem = (product, overridePrice) => {
    const price = overridePrice !== undefined ? overridePrice : product.price;
    setDraftBill(b => {
      const existing = b.items.find(i => i.catalogId === product.id && !product.customPrice);
      if (existing) return { ...b, items: b.items.map(i => i.catalogId === product.id ? { ...i, qty: i.qty + 1 } : i) };
      return { ...b, items: [...b.items, { ...product, catalogId: product.id, id: genId(), price, qty: 1 }] };
    });
    toast("success", `${product.icon} ${product.name} added`);
  };

  const removeItem = (id) => setDraftBill(b => ({ ...b, items: b.items.filter(i => i.id !== id) }));
  const updateItem = (id, patch) => setDraftBill(b => ({ ...b, items: b.items.map(i => i.id === id ? { ...i, ...patch } : i) }));
  const addCustom = () => {
    if (!customItem.name || !customItem.price) return;
    setDraftBill(b => ({ ...b, items: [...b.items, { ...customItem, id: genId(), price: Number(customItem.price), category: "custom" }] }));
    setCustomItem({ name: "", price: "", icon: "📦", qty: 1 });
    toast("success", "Custom item added");
  };

  const subtotal = bill.items.reduce((s, i) => s + i.price * i.qty, 0);
  const discAmt  = bill.discType === "pct" ? subtotal * Number(bill.discount || 0) / 100 : Number(bill.discount || 0);
  const taxAmt   = (subtotal - discAmt) * Number(bill.taxRate || 0) / 100;
  const total    = subtotal - discAmt + taxAmt;

  const filtered = (catalogs[activeCat] || []).filter(i => i.name.toLowerCase().includes(catSearch.toLowerCase()));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, height: "calc(100vh - 120px)" }}>
      {/* LEFT */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, overflow: "hidden" }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginBottom: 12, textTransform: "uppercase" }}>Customer Info (Optional)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[["name","Name","Ravi Kumar"],["email","Email","ravi@example.com"],["phone","Phone","+91-9XXXXXXXXX"]].map(([key,label,ph]) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 5 }}>{label}</label>
                <input placeholder={ph} value={bill.customer?.[key] || ""} onChange={e => update({ customer: { ...bill.customer, [key]: e.target.value } })} style={inputSt()} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            {["entrance","donation","selling","custom"].map(cat => (
              <button key={cat} onClick={() => { setActiveCat(cat); setCatSearch(""); }}
                style={{ ...btn(activeCat === cat ? "ghost" : "outline"),
                  background: activeCat === cat ? CAT_META[cat].bg : "transparent",
                  color: activeCat === cat ? CAT_META[cat].color : C.muted,
                  border: `1px solid ${activeCat === cat ? CAT_META[cat].color + "44" : C.border}`,
                }}>
                {cat === "entrance" ? "🎫" : cat === "donation" ? "❤️" : cat === "selling" ? "🛍️" : "✏️"} {CAT_META[cat]?.label || "Custom"}
              </button>
            ))}
          </div>

          {activeCat !== "custom" ? (
            <>
              <input placeholder="Search items…" value={catSearch} onChange={e => setCatSearch(e.target.value)} style={{ ...inputSt(), marginBottom: 14 }} />
              <div style={{ overflowY: "auto", flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, alignContent: "start" }}>
                {filtered.map(product => (
                  <button key={product.id} onClick={() => {
                    if (product.customPrice) {
                      const amt = parseFloat(customDonation);
                      if (!isNaN(amt) && amt > 0) addItem(product, amt);
                      else toast("error", "Enter custom donation amount first");
                    } else addItem(product);
                  }} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 12px", cursor: "pointer", textAlign: "left", transition: "all 0.18s", color: C.text }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = C.accent + "66"; e.currentTarget.style.background = C.accentL; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{product.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{product.name}</div>
                    {product.customPrice ? <div style={{ fontSize: 11, color: C.muted }}>Custom amount</div>
                      : <div style={{ fontSize: 13, color: C.accent, fontWeight: 600 }}>{fmtCurr(product.price)}</div>}
                  </button>
                ))}
              </div>
              {activeCat === "donation" && (
                <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
                  <label style={{ fontSize: 12, color: C.muted, whiteSpace: "nowrap" }}>Custom ₹:</label>
                  <input type="number" placeholder="Enter amount" value={customDonation} onChange={e => setCustomDonation(e.target.value)} style={{ ...inputSt(), flex: 1 }} />
                </div>
              )}
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>Add a completely custom item not in any catalog.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["name","Item Name","e.g. Parking Fee","text"],["price","Price (₹)","0.00","number"],["icon","Icon","📦","text"]].map(([key,label,ph,type]) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 5 }}>{label}</label>
                    <input type={type} placeholder={ph} value={customItem[key]} onChange={e => setCustomItem(p => ({ ...p, [key]: e.target.value }))} style={inputSt()} />
                  </div>
                ))}
              </div>
              <button style={btn("primary")} onClick={addCustom}>＋ Add Custom Item</button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Invoice</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.accent }}>{bill.invoiceNo}</div>
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: C.muted }}>
              <div>{fmtDate(bill.createdAt)}</div><div>{fmtTime(bill.createdAt)}</div>
            </div>
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, flex: 1, overflowY: "auto" }}>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Bill Items ({bill.items.length})</div>
          {bill.items.length === 0 && <div style={{ textAlign: "center", padding: "40px 0", color: C.muted }}><div style={{ fontSize: 32, marginBottom: 8 }}>🛒</div>Add items from the catalog</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {bill.items.map(item => (
              <div key={item.id} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span>{item.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{item.name}</span>
                    <CatTag cat={item.category} />
                  </div>
                  <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 14 }}>✕</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => updateItem(item.id, { qty: Math.max(1, item.qty - 1) })} style={{ width: 24, height: 24, borderRadius: 5, border: `1px solid ${C.border}`, background: "none", color: C.text, cursor: "pointer" }}>−</button>
                  <span style={{ fontSize: 13, width: 28, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => updateItem(item.id, { qty: item.qty + 1 })} style={{ width: 24, height: 24, borderRadius: 5, border: `1px solid ${C.border}`, background: "none", color: C.text, cursor: "pointer" }}>＋</button>
                  <input type="number" value={item.price} onChange={e => updateItem(item.id, { price: parseFloat(e.target.value) || 0 })}
                    style={{ width: 80, padding: "3px 8px", borderRadius: 5, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.04)", color: C.accent, fontSize: 12, outline: "none" }} />
                  <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 700 }}>{fmtCurr(item.price * item.qty)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
            {[["discount","Discount","0"],["discType","Type",""],["taxRate","GST %","18"]].map(([key,label,ph]) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 5 }}>{label}</label>
                {key === "discType"
                  ? <select value={bill.discType} onChange={e => update({ discType: e.target.value })} style={{ ...inputSt(), appearance: "none" }}>
                      <option value="pct" style={{ background: C.card }}>% Percent</option>
                      <option value="fixed" style={{ background: C.card }}>₹ Fixed</option>
                    </select>
                  : <input type="number" placeholder={ph} value={bill[key] || ""} onChange={e => update({ [key]: e.target.value })} style={inputSt()} />
                }
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
            {[["Subtotal", fmtCurr(subtotal), C.sub],["Discount", `- ${fmtCurr(discAmt)}`, C.red],[`GST (${bill.taxRate || 0}%)`, fmtCurr(taxAmt), C.blue]].map(([l, v, color]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color, marginBottom: 5 }}>
                <span>{l}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: C.accent, borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 4 }}>
              <span>TOTAL</span><span>{fmtCurr(total)}</span>
            </div>
          </div>
        </div>

        <textarea rows={2} placeholder="Notes…" value={bill.notes || ""} onChange={e => update({ notes: e.target.value })}
          style={{ ...inputSt(), resize: "none", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }} />

        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...btn("outline"), flex: 1 }} onClick={() => { setDraftBill(null); setView("home"); }}>Discard</button>
          <button style={{ ...btn("success"), flex: 1 }} onClick={() => saveBill(bill, total)}>✅ Save Bill</button>
        </div>
      </div>
    </div>
  );
}

// ─── Past Bills ───────────────────────────────────────────────────────────────
function PastBills() {
  const { bills, deleteBill } = useBill();
  const [search, setSearch]   = useState("");
  const [dateFilter, setDate] = useState("");
  const [printBill, setPrint] = useState(null);

  const filtered = bills.filter(b => {
    const q = search.toLowerCase();
    return (!q || b.invoiceNo.toLowerCase().includes(q) || (b.customer?.name || "").toLowerCase().includes(q))
      && (!dateFilter || b.createdAt.startsWith(dateFilter));
  });
  const revenue = filtered.reduce((s, b) => s + b.total, 0);

  return (
    <div>
      {printBill && <InvoicePrint bill={printBill} onClose={() => setPrint(null)} />}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input placeholder="🔍 Search invoice or customer…" value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputSt(), flex: 1, minWidth: 200 }} />
        <input type="date" value={dateFilter} onChange={e => setDate(e.target.value)} style={{ ...inputSt(), width: 160 }} />
        {dateFilter && <button style={btn("outline")} onClick={() => setDate("")}>Clear</button>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
        {[["Total Bills", filtered.length, "📋"],["Revenue", fmtCurr(revenue), "💰"],["Avg. Bill", fmtCurr(filtered.length ? revenue / filtered.length : 0), "📊"]].map(([l, v, icon]) => (
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.accent }}>{v}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{l}</div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}><div style={{ fontSize: 48, marginBottom: 12 }}>🗃️</div>No bills found</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(b => (
          <div key={b.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, transition: "border-color 0.18s" }}
            onMouseOver={e => e.currentTarget.style.borderColor = C.accent + "44"}
            onMouseOut={e => e.currentTarget.style.borderColor = C.border}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>{b.invoiceNo}</span>
                <span style={{ fontSize: 11, color: C.muted }}>{fmtDate(b.createdAt)} · {fmtTime(b.createdAt)}</span>
              </div>
              <div style={{ fontSize: 13, color: C.sub, fontWeight: 600 }}>{b.customer?.name || "Walk-in Customer"}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{b.items.length} items · {b.items.map(i => i.name).slice(0, 3).join(", ")}{b.items.length > 3 ? "…" : ""}</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{fmtCurr(b.total)}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={btn("ghost")} onClick={() => setPrint(b)}>🖨️ Print</button>
              <button style={btn("danger")} onClick={() => deleteBill(b.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Catalog Manager ──────────────────────────────────────────────────────────
function CatalogManager() {
  const { catalogs, addCatalogItem, updateCatalogItem, deleteCatalogItem } = useBill();
  const [activeCat, setActiveCat] = useState("entrance");
  const [form, setForm]   = useState({ name: "", price: "", icon: "🎫" });
  const [editId, setEditId] = useState(null);

  const save = () => {
    if (!form.name || !form.price) return;
    if (editId) { updateCatalogItem(activeCat, editId, form); setEditId(null); }
    else addCatalogItem(activeCat, form);
    setForm({ name: "", price: "", icon: "🎫" });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["entrance","donation","selling"].map(cat => (
            <button key={cat} onClick={() => { setActiveCat(cat); setEditId(null); setForm({ name: "", price: "", icon: "🎫" }); }}
              style={{ ...btn(activeCat === cat ? "ghost" : "outline"), background: activeCat === cat ? CAT_META[cat].bg : "transparent", color: activeCat === cat ? CAT_META[cat].color : C.muted, border: `1px solid ${activeCat === cat ? CAT_META[cat].color + "44" : C.border}` }}>
              {CAT_META[cat].label}
            </button>
          ))}
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          {catalogs[activeCat].map(item => (
            <div key={item.id} style={{ padding: "11px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{item.icon} {item.name}</span>
              <span style={{ fontSize: 12, color: C.accent }}>{item.customPrice ? "—" : fmtCurr(item.price)}</span>
              <button style={btn("ghost")} onClick={() => { setEditId(item.id); setForm({ name: item.name, price: item.price, icon: item.icon }); }}>✏️</button>
              <button style={btn("danger")} onClick={() => deleteCatalogItem(activeCat, item.id)}>✕</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
        <h3 style={{ color: C.text, fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 16, margin: "0 0 20px" }}>{editId ? "✏️ Edit Item" : "➕ Add to Catalog"}</h3>
        {[["icon","Icon","🎫","text"],["name","Item Name","e.g. Family Pass","text"],["price","Price (₹)","0.00","number"]].map(([key,label,ph,type]) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, color: C.muted, marginBottom: 6 }}>{label}</label>
            <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} style={inputSt()} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 8 }}>
          {editId && <button style={btn("outline")} onClick={() => { setEditId(null); setForm({ name: "", price: "", icon: "🎫" }); }}>Cancel</button>}
          <button style={{ ...btn("primary"), flex: 1 }} onClick={save}>{editId ? "Save Changes" : "Add Item"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Daily Summary ────────────────────────────────────────────────────────────
function DailySummary() {
  const { bills } = useBill();
  const today = new Date().toISOString().slice(0, 10);
  const todayBills = bills.filter(b => b.createdAt.startsWith(today));
  const total = todayBills.reduce((s, b) => s + b.total, 0);
  const byCat = {};
  todayBills.forEach(b => b.items.forEach(i => { byCat[i.category] = (byCat[i.category] || 0) + i.price * i.qty; }));

  const exportCSV = () => {
    const rows = [["Invoice","Date","Customer","Items","Total"], ...bills.map(b => [b.invoiceNo, fmtDate(b.createdAt), b.customer?.name || "Walk-in", b.items.map(i => `${i.name}(${i.qty})`).join("|"), b.total.toFixed(2)])];
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(rows.map(r => r.join(",")).join("\n"));
    a.download = `bills-${today}.csv`; a.click();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ color: C.text, fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 22, margin: 0 }}>Daily Summary — {fmtDate(new Date().toISOString())}</h2>
        <button style={btn("success")} onClick={exportCSV}>⬇️ Export CSV</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
        {[["Today's Bills", todayBills.length, "📋", "#a78bfa"],["Today's Revenue", fmtCurr(total), "💰", C.accent],["Avg. Ticket", fmtCurr(todayBills.length ? total/todayBills.length : 0), "🎯", "#34d399"],["All-Time Bills", bills.length, "📊", "#f472b6"]].map(([l,v,icon,color]) => (
          <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color, marginBottom: 4 }}>{v}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
        <h3 style={{ color: C.text, fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 14, margin: "0 0 16px" }}>Revenue by Category (Today)</h3>
        {Object.entries(byCat).length === 0 && <div style={{ color: C.muted, fontSize: 13 }}>No sales today yet.</div>}
        {Object.entries(byCat).map(([cat, amt]) => {
          const pct = total > 0 ? Math.round(amt / total * 100) : 0;
          const m = CAT_META[cat] || CAT_META.custom;
          return (
            <div key={cat} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: m.color, fontWeight: 600 }}>{m.label}</span>
                <span style={{ fontSize: 12, color: C.sub }}>{fmtCurr(amt)}</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                <div style={{ height: "100%", width: `${pct}%`, borderRadius: 4, background: m.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
function Portal() {
  const { view, setView, newBill, toasts, draftBill, bills } = useBill();
  const navItems = [
    { key: "home",    label: "🏠 Home" },
    { key: "builder", label: "➕ New Bill", action: newBill },
    { key: "past",    label: "📋 Past Bills" },
    { key: "catalog", label: "🗂️ Catalogs" },
    { key: "summary", label: "📊 Summary" },
  ];

  return (
    <>
      <Toast toasts={toasts} />
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 60, background: `${C.surface}ee`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#f0a500,#e05c00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏛️</div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 15, color: C.text }}>VenuePro</div>
            <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Bill Generator</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {navItems.map(item => (
            <button key={item.key} onClick={item.action || (() => setView(item.key))}
              style={{ ...btn("outline"), background: view === item.key ? C.accentL : "transparent", color: view === item.key ? C.accent : C.sub, border: `1px solid ${view === item.key ? C.accent + "44" : "transparent"}`, fontSize: 12 }}>
              {item.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: C.muted }}>{bills.length} bills · {fmtCurr(bills.reduce((s, b) => s + b.total, 0))}</div>
      </nav>

      <main style={{ paddingTop: 80, paddingBottom: 40, paddingLeft: 28, paddingRight: 28, maxWidth: 1400, margin: "0 auto" }}>
        {view === "home" && (
          <div style={{ textAlign: "center", paddingTop: 60 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🏛️</div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 36, color: C.text, marginBottom: 12, letterSpacing: "-0.02em" }}>
              VenuePro <span style={{ color: C.accent }}>Bill Generator</span>
            </h1>
            <p style={{ color: C.muted, fontSize: 15, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
              Multi-catalog billing for museums, events & venues.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 60 }}>
              <button style={{ ...btn("primary"), padding: "14px 36px", fontSize: 15 }} onClick={newBill}>➕ Create New Bill</button>
              <button style={{ ...btn("outline"), padding: "14px 28px", fontSize: 15 }} onClick={() => setView("past")}>📋 View Past Bills</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, maxWidth: 900, margin: "0 auto" }}>
              {[["🎫","Entrance Fees","Adult, Child, Senior, VIP"],["❤️","Donations","Pre-set & custom tiers"],["🛍️","Merchandise","Products & services"],["✏️","Custom Items","Anything not in catalog"]].map(([icon,title,sub]) => (
                <div key={title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, textAlign: "left" }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {view === "builder" && draftBill && <BillBuilder />}
        {view === "past"    && <PastBills />}
        {view === "catalog" && (<div><h2 style={{ color: C.text, fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 22, marginBottom: 24 }}>🗂️ Catalog Manager</h2><CatalogManager /></div>)}
        {view === "summary" && <DailySummary />}
      </main>
    </>
  );
}

export default function App() {
  return (
    <BillProvider>
      <div style={{ background: "#0c0e17", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #0c0e17; }
          input, select, textarea { color-scheme: dark; }
          ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #13151f; }
          ::-webkit-scrollbar-thumb { background: rgba(240,165,0,0.3); border-radius: 3px; }
        `}</style>
        <Portal />
      </div>
    </BillProvider>
  );
}