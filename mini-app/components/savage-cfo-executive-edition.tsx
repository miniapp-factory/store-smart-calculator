"use client";
import { useState } from "react";

interface Product {
  productName: string;
  cost: number;
  adSpend: number;
  price: number;
  competitorPrice: number;
  qty: number;
}

export default function App() {
  /* ---------- State ---------- */
  const [inventory, setInventory] = useState<Product[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /* ---------- Form fields ---------- */
  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);

  /* ---------- Helpers ---------- */
  const addProduct = () => {
    if (!productName) return;
    setInventory((prev) => [
      ...prev,
      { productName, cost, adSpend, price, competitorPrice, qty },
    ]);
    setProductName("");
    setCost(0);
    setAdSpend(0);
    setPrice(0);
    setCompetitorPrice(0);
    setQty(0);
  };

  const deleteProduct = (index: number) => {
    setInventory((prev) => prev.filter((_, i) => i !== index));
    setCurrentView("dashboard");
  };

  /* ---------- Calculations ---------- */
  const totalCapitalAtRisk = inventory.reduce(
    (sum, p) => sum + (p.cost + p.adSpend) * p.qty,
    0
  );
  const projectedProfit = inventory.reduce(
    (sum, p) => sum + (p.price - p.cost - p.adSpend) * p.qty,
    0
  );
  const totalRevenue = inventory.reduce((sum, p) => sum + p.price * p.qty, 0);
  const totalProfit = projectedProfit;
  const blendedMargin =
    totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const totalInventory = inventory.reduce((sum, p) => sum + p.qty, 0);

  /* ---------- Render helpers ---------- */
  const renderHome = () => (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1 className="text-3xl font-bold mb-4">💼 The Business Auditor</h1>
      <p className="mb-6">Professional financial audit tool. Enter Company Name.</p>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          margin: 0,
          width: "100%",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginBottom: "12px",
        }}
      />
      <button
        onClick={() => setCurrentView("dashboard")}
        style={{
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
          padding: "12px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Open Dashboard
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h2 className="text-2xl font-semibold mb-6">📊 {companyName} Financials</h2>

      {/* Section A – Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px", marginBottom: "24px" }}>
        <div style={{ border: "1px solid #e5e7eb", padding: "12px", borderRadius: "8px" }}>
          <p className="text-sm text-gray-500">Capital at Risk</p>
          <p className="text-xl font-bold">${totalCapitalAtRisk.toFixed(2)}</p>
          <p className="text-xs text-gray-600">Cash tied up in stock</p>
        </div>
        <div style={{ border: "1px solid #e5e7eb", padding: "12px", borderRadius: "8px" }}>
          <p className="text-sm text-gray-500">Projected Profit</p>
          <p className="text-xl font-bold">${projectedProfit.toFixed(2)}</p>
          <p className="text-xs text-gray-600">Total potential earnings</p>
        </div>
        <div style={{ border: "1px solid #e5e7eb", padding: "12px", borderRadius: "8px" }}>
          <p className="text-sm text-gray-500">Global Efficiency</p>
          <p className="text-xl font-bold">{blendedMargin.toFixed(1)}%</p>
          <p className="text-xs text-gray-600">Average company efficiency</p>
        </div>
        <div style={{ border: "1px solid #e5e7eb", padding: "12px", borderRadius: "8px" }}>
          <p className="text-sm text-gray-500">Total Inventory</p>
          <p className="text-xl font-bold">{totalInventory} units</p>
          <p className="text-xs text-gray-600">Total items in warehouse</p>
        </div>
      </div>

      {/* Section B – Add Product Form */}
      <div style={{ marginBottom: "24px" }}>
        <h3 className="font-semibold mb-4">Add New Product</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
          <label className="text-sm font-medium">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              margin: 0,
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <label className="text-sm font-medium">Unit Cost (Make/Buy)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              margin: 0,
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <label className="text-sm font-medium">Ad Spend per Item</label>
          <input
            type="number"
            value={adSpend}
            onChange={(e) => setAdSpend(Number(e.target.value))}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              margin: 0,
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <label className="text-sm font-medium">Selling Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              margin: 0,
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <label className="text-sm font-medium">Competitor Price</label>
          <input
            type="number"
            value={competitorPrice}
            onChange={(e) => setCompetitorPrice(Number(e.target.value))}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              margin: 0,
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <label className="text-sm font-medium">Stock Quantity</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              margin: 0,
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />

          <button
            onClick={addProduct}
            style={{
              width: "100%",
              backgroundColor: "#22c55e",
              color: "#fff",
              padding: "12px",
              border: "none",
              cursor: "pointer",
            }}
          >
            ➕ Add to Inventory
          </button>
        </div>
      </div>

      {/* Section C – Inventory List */}
      <div>
        <h3 className="font-semibold mb-4">Inventory List</h3>
        <div style={{ display: "grid", gap: "12px" }}>
          {inventory.map((p, idx) => {
            const netProfit = (p.price - p.cost - p.adSpend) * p.qty;
            const badge = p.price > p.competitorPrice ? "💎 PREMIUM" : "⚡ COMPETITIVE";
            const badgeColor = p.price > p.competitorPrice ? "#d1fae5" : "#fef3c7";
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  padding: "15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedProduct(p);
                  setCurrentView("detail");
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontWeight: "bold" }}>{p.productName}</span>
                  <span style={{ backgroundColor: badgeColor, padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>{badge}</span>
                </div>
                <p style={{ fontSize: "12px", color: "#6b7280" }}>
                  Stock: {p.qty} | Net Profit: ${netProfit.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedProduct) return null;
    const { productName, cost, adSpend, price, competitorPrice, qty } = selectedProduct;
    const trueNetProfit = price - cost - adSpend;
    const contributionMargin = price - cost;
    const markupPercent = cost > 0 ? ((price - cost) / cost) * 100 : 0;
    const breakEvenVolume = trueNetProfit > 0
      ? Math.ceil((cost + adSpend) / trueNetProfit)
      : Infinity;
    const roas = adSpend > 0 ? (price / adSpend).toFixed(2) : "N/A";
    const diff = Math.abs(price - competitorPrice).toFixed(2);
    const competitiveAnalysis =
      price < competitorPrice
        ? `✅ MARKET ADVANTAGE: Undercutting rival by $${diff}.`
        : `💎 PREMIUM POSITION: Charging $${diff} premium.`;

    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
        <button
          onClick={() => setCurrentView("dashboard")}
          style={{
            width: "100%",
            backgroundColor: "#374151",
            color: "#fff",
            padding: "12px",
            border: "none",
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          ⬅️ Back to Dashboard
        </button>

        <h2 className="text-2xl font-semibold mb-4">📈 Audit: {productName}</h2>

        <p className="mb-4">{competitiveAnalysis}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px", marginBottom: "12px" }}>
          <div>
            <strong>True Net Profit:</strong> ${trueNetProfit.toFixed(2)}
          </div>
          <div>
            <strong>Contribution Margin:</strong> ${contributionMargin.toFixed(2)}
          </div>
          <div>
            <strong>Markup %:</strong> {markupPercent.toFixed(1)}%
          </div>
          <div>
            <strong>Break‑Even Volume:</strong> {breakEvenVolume} units
          </div>
          <div>
            <strong>ROAS (Ad Efficiency):</strong> {roas}x
          </div>
        </div>

        <button
          onClick={() => {
            const idx = inventory.findIndex((i) => i === selectedProduct);
            if (idx !== -1) deleteProduct(idx);
          }}
          style={{
            width: "100%",
            backgroundColor: "#ef4444",
            color: "#fff",
            padding: "12px",
            border: "none",
            cursor: "pointer",
          }}
        >
          🗑️ Delete Product
        </button>
      </div>
    );
  };

  /* ---------- Main Render ---------- */
  return (
    <div>
      {currentView === "home" && renderHome()}
      {currentView === "dashboard" && renderDashboard()}
      {currentView === "detail" && renderDetail()}
    </div>
  );
}
