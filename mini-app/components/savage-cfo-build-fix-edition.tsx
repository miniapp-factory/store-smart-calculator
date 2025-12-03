import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  cost: number;
  price: number;
  adSpend: number;
  competitorPrice: number;
  qty: number;
}

export default function App() {
  // State
  const [companyName, setCompanyName] = useState<string>("");
  const [inventory, setInventory] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form fields for new product
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);

  // Styles
  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif",
  };

  const inputStyle: React.CSSProperties = {
    appearance: "none",
    WebkitAppearance: "none",
    margin: 0,
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: "#ffffff",
    fontSize: "16px",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#000",
    color: "#fff",
    padding: "12px",
    marginTop: "12px",
    width: "100%",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const greenButtonStyle: React.CSSProperties = {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px",
    marginTop: "12px",
    width: "100%",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const redButtonStyle: React.CSSProperties = {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "12px",
    marginTop: "12px",
    width: "100%",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const greyButtonStyle: React.CSSProperties = {
    backgroundColor: "#555",
    color: "#fff",
    padding: "12px",
    marginTop: "12px",
    width: "100%",
    fontWeight: "bold",
    cursor: "pointer",
  };

  // Helper functions
  const addProduct = () => {
    if (!name) return;
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      cost,
      adSpend,
      price,
      competitorPrice,
      qty,
    };
    setInventory((prev) => [...prev, newProduct]);

    // Reset form
    setName("");
    setCost(0);
    setAdSpend(0);
    setPrice(0);
    setCompetitorPrice(0);
    setQty(0);
  };

  const deleteProduct = (id: string) => {
    setInventory((prev) => prev.filter((p) => p.id !== id));
    setCurrentView("dashboard");
  };

  const getNetProfitPerUnit = (p: Product) => p.price - p.cost - p.adSpend;
  const getMarginPercent = (p: Product) =>
    p.price > 0 ? ((p.price - p.cost) / p.price) * 100 : 0;
  const getBreakEvenVolume = (p: Product) => {
    const profitPerUnit = getNetProfitPerUnit(p);
    return profitPerUnit > 0
      ? Math.ceil((p.cost + p.adSpend) / profitPerUnit)
      : Infinity;
  };
  const getROAS = (p: Product) => (p.adSpend > 0 ? p.price / p.adSpend : Infinity);

  // Dashboard calculations
  const totalRevenue = inventory.reduce((sum, p) => sum + p.price * p.qty, 0);
  const totalProfit = inventory.reduce(
    (sum, p) => sum + getNetProfitPerUnit(p) * p.qty,
    0
  );
  const efficiency = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const capitalInvested = inventory.reduce(
    (sum, p) => sum + (p.cost + p.adSpend) * p.qty,
    0
  );

  const getGrade = () => {
    if (efficiency > 30) return "A (Excellent)";
    if (efficiency > 15) return "B (Good)";
    if (efficiency > 0) return "C (Surviving)";
    return "F (Bankrupt)";
  };

  // Detail view logic
  const getStrategicMessage = (p: Product) => {
    const margin = getMarginPercent(p);
    if (p.price < p.competitorPrice && margin > 20) {
      return {
        title: "🏆 STRATEGY: SMART DISRUPTION",
        verdict:
          "You are cheaper than your rival BUT you still make high profit. You will destroy them.",
      };
    }
    if (p.price <= p.competitorPrice && margin <= 20) {
      return {
        title: "⚠️ STRATEGY: RACE TO THE BOTTOM",
        verdict:
          "You are undercutting the rival, but your profit is too thin. One bad month will bankrupt you.",
      };
    }
    if (p.price > p.competitorPrice && margin > 30) {
      return {
        title: "💎 STRATEGY: LUXURY BRANDING",
        verdict:
          "You are expensive, but your margins prove you have a premium product. Keep quality high.",
      };
    }
    return {
      title: "💀 STRATEGY: DEAD ON ARRIVAL",
      verdict:
        "You are more expensive than the rival AND you make less money. You are inefficient. Fix costs immediately.",
    };
  };

  // Render
  return (
    <div style={containerStyle}>
      {currentView === "home" && (
        <div>
          <h1>💼 The Business Auditor</h1>
          <p>
            I am your personal Business Auditor. I will analyze your inventory,
            calculate your true ROI, roast your bad decisions, and help you find
            hidden profits. Most businesses fail because they don't know their
            numbers. Enter your Company Name to begin the audit.
          </p>
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={inputStyle}
          />
          <button
            style={buttonStyle}
            onClick={() => setCurrentView("dashboard")}
          >
            Open Dashboard
          </button>
        </div>
      )}

      {currentView === "dashboard" && (
        <div>
          <h2>📊 {companyName} Report Card</h2>

          {/* Section A: Grading System */}
          <div
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "12px",
            }}
          >
            <h3>Business Grade: {getGrade()}</h3>
            <p>Total Potential Profit: ${totalProfit.toFixed(2)}</p>
            <p>Capital Invested: ${capitalInvested.toFixed(2)}</p>
          </div>

          {/* Section B: Add Product */}
          <div style={{ marginTop: "24px" }}>
            <h3>Add Product</h3>
            <label>PRODUCT NAME</label>
            <small>What is the item name?</small>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <label>UNIT COST</label>
            <small>Cost to make/buy ONE item?</small>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              style={inputStyle}
            />

            <label>AD SPEND</label>
            <small>Marketing cost per item?</small>
            <input
              type="number"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              style={inputStyle}
            />

            <label>SELLING PRICE</label>
            <small>Final price the customer pays?</small>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              style={inputStyle}
            />

            <label>COMPETITOR PRICE</label>
            <small>What does your rival charge?</small>
            <input
              type="number"
              value={competitorPrice}
              onChange={(e) => setCompetitorPrice(Number(e.target.value))}
              style={inputStyle}
            />

            <label>STOCK QTY</label>
            <small>How many units do you have?</small>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              style={inputStyle}
            />

            <button style={greenButtonStyle} onClick={addProduct}>
              ➕ Add to Inventory
            </button>
          </div>

          {/* Section C: Inventory List */}
          <div style={{ marginTop: "24px" }}>
            <h3>Inventory List</h3>
            {inventory.map((p) => {
              const netProfit = getNetProfitPerUnit(p);
              const isPremium = p.price > p.competitorPrice;
              return (
                <div
                  key={p.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "12px",
                    marginBottom: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedProduct(p);
                    setCurrentView("detail");
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong>{p.name}</strong>
                    <span
                      style={{
                        background: isPremium ? "#28a745" : "#ffc107",
                        color: isPremium ? "#fff" : "#000",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      {isPremium ? "💎 PREMIUM" : "⚡ COMPETITIVE"}
                    </span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#666" }}>
                    Stock: {p.qty} | Net Profit: ${netProfit.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {currentView === "detail" && selectedProduct && (
        <div>
          <button style={greyButtonStyle} onClick={() => setCurrentView("dashboard")}>
            ⬅️ Back to Dashboard
          </button>

          <h2>📈 Analysis: {selectedProduct.name}</h2>

          {/* Strategic Positioning */}
          <div style={{ marginTop: "12px" }}>
            <h3>{getStrategicMessage(selectedProduct).title}</h3>
            <p>{getStrategicMessage(selectedProduct).verdict}</p>
          </div>

          {/* Numbers */}
          <div style={{ marginTop: "12px" }}>
            <p>
              <strong>True Net Profit:</strong> $
              {(selectedProduct.price -
                selectedProduct.cost -
                selectedProduct.adSpend).toFixed(2)}
            </p>
            <p>
              <strong>Contribution Margin:</strong> $
              {(selectedProduct.price - selectedProduct.cost).toFixed(2)}
            </p>
            <p>
              <strong>Competitor Variance:</strong> $
              {(selectedProduct.price - selectedProduct.competitorPrice).toFixed(2)}
            </p>
          </div>

          {/* Delete */}
          <button
            style={redButtonStyle}
            onClick={() => deleteProduct(selectedProduct.id)}
          >
            🗑️ Delete Product
          </button>
        </div>
      )}
    </div>
  );
}
