import { createContext, useContext, useState, useEffect, useCallback } from "react";

const API = "http://localhost:5000/api";
// ─── Helpers ──────────────────────────────────────────────────────────────────
export const genId   = () => `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
export const genInv  = () => `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
export const fmtCurr = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
export const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
export const fmtTime = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveLS(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

// ─── Initial Catalogs ─────────────────────────────────────────────────────────
const INITIAL_CATALOGS = {
  entrance: [
    { id: "e1", name: "Adult Ticket",   price: 250,  icon: "🎫", category: "entrance" },
    { id: "e2", name: "Child Ticket",   price: 120,  icon: "🧒", category: "entrance" },
    { id: "e3", name: "Senior Ticket",  price: 150,  icon: "👴", category: "entrance" },
    { id: "e4", name: "VIP Pass",       price: 750,  icon: "⭐", category: "entrance" },
    { id: "e5", name: "Group (10+)",    price: 180,  icon: "👥", category: "entrance" },
  ],
  donation: [
    { id: "d1", name: "Bronze Donor",   price: 100,  icon: "🥉", category: "donation" },
    { id: "d2", name: "Silver Donor",   price: 500,  icon: "🥈", category: "donation" },
    { id: "d3", name: "Gold Donor",     price: 1000, icon: "🥇", category: "donation" },
    { id: "d4", name: "Platinum Donor", price: 5000, icon: "💎", category: "donation" },
    { id: "d5", name: "Custom Donation",price: 0,    icon: "❤️", category: "donation", customPrice: true },
  ],
  selling: [
    { id: "s1", name: "Museum T-Shirt",    price: 499, icon: "👕", category: "selling" },
    { id: "s2", name: "Souvenir Mug",      price: 199, icon: "☕", category: "selling" },
    { id: "s3", name: "Art Print",         price: 350, icon: "🖼️", category: "selling" },
    { id: "s4", name: "Guidebook",         price: 150, icon: "📖", category: "selling" },
    { id: "s5", name: "Snack Combo",       price: 120, icon: "🍿", category: "selling" },
    { id: "s6", name: "Premium Keychain",  price: 99,  icon: "🔑", category: "selling" },
  ],
};

export const CAT_META = {
  entrance: { label: "Entrance", color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  donation:  { label: "Donation", color: "#f472b6", bg: "rgba(244,114,182,0.12)" },
  selling:   { label: "Selling",  color: "#34d399", bg: "rgba(52,211,153,0.12)"  },
  custom:    { label: "Custom",   color: "#f0a500", bg: "rgba(240,165,0,0.12)"   },
};

// ─── Context ──────────────────────────────────────────────────────────────────
export const BillContext = createContext(null);
export const useBill = () => useContext(BillContext);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function BillProvider({ children }) {
  const [bills,     setBills]     = useState(() => loadLS("vcbg_bills", []));
  const [catalogs,  setCatalogs]  = useState(() => loadLS("vcbg_catalogs", INITIAL_CATALOGS));
  const [draftBill, setDraftBill] = useState(null);
  const [view,      setView]      = useState("home");
  const [toasts,    setToasts]    = useState([]);

  // Load bills from API instead of localStorage
useEffect(() => {
  fetch(`${API}/bills`)
    .then(r => r.json())
    .then(data => setBills(data));
}, []);

 // Load catalogs from API
useEffect(() => {
  fetch(`${API}/catalogs`)
    .then(r => r.json())
    .then(data => setCatalogs(data));
}, []);

  // ── Toast ────────────────────────────────────────────────────────────────────
  const toast = useCallback((type, msg) => {
    const id = genId();
    setToasts(t => [...t, { id, type, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  // ── Bill Actions ─────────────────────────────────────────────────────────────
  const newBill = () => {
    setDraftBill({
      id: genId(), invoiceNo: genInv(),
      createdAt: new Date().toISOString(),
      items: [], discount: 0, discType: "pct",
      taxRate: 18, customer: null, notes: "", total: 0,
    });
    setView("builder");
  };

  const saveBill = async (bill, total) => {
  if (bill.items.length === 0) { toast("error", "Add at least one item"); return; }
  const res = await fetch(`${API}/bills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...bill, total,
      customerName: bill.customer?.name,
      customerEmail: bill.customer?.email,
      customerPhone: bill.customer?.phone,
    }),
  });
  const saved = await res.json();
  setBills(b => [saved, ...b]);
  setDraftBill(null);
  setView("past");
  toast("success", `Bill ${saved.invoiceNo} saved!`);
};

  const deleteBill = async (id) => {
  await fetch(`${API}/bills/${id}`, { method: "DELETE" });
  setBills(b => b.filter(x => x.id !== id));
  toast("success", "Bill deleted");
};

  // ── Catalog Actions ──────────────────────────────────────────────────────────
  const addCatalogItem = async (cat, item) => {
  const res = await fetch(`${API}/catalogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...item, category: cat }),
  });
  const saved = await res.json();
  setCatalogs(c => ({ ...c, [cat]: [...c[cat], saved] }));
  toast("success", "Item added to catalog");
};

  const updateCatalogItem = async (cat, id, data) => {
    const res = await fetch(`${API}/catalogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, price: Number(data.price) }),
    });
    
    const updated = await res.json();
    setCatalogs(c => ({ ...c, [cat]: c[cat].map(i => i.id === id ? updated : i) }));
    toast("success", "Item updated");
  };

  const deleteCatalogItem = async (cat, id) => {
  await fetch(`${API}/catalogs/${id}`, { method: "DELETE" });
  setCatalogs(c => ({ ...c, [cat]: c[cat].filter(i => i.dbId !== id) }));
  toast("success", "Item removed");
};

  return (
    <BillContext.Provider value={{
      bills, catalogs, draftBill, setDraftBill,
      view, setView,  toasts,
      toast, newBill, saveBill, deleteBill,
      setCatalogs, addCatalogItem, updateCatalogItem, deleteCatalogItem,
    }}>
      {children}
    </BillContext.Provider>
  );
}