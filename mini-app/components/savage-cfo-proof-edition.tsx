import { useState } from "react";

export default function SavageCfoProofEdition() {
  // State
  const [companyName, setCompanyName] = useState<string>("");
  const [inventory, setInventory] = useState<
    {
      productName: string;
      cost: number;
      adSpend: number;
      price: number;
      competitorPrice: number;
      qty: number;
      monthlySales: number;
    }[]
  >([]);
  const [currentView, setCurrentView] = useState<
    "home" | "dashboard" | "detail"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<
    {
      productName: string;
      cost: number;
      adSpend: number;
      price: number;
      competitorPrice: number;
      qty: number;
      monthlySales: number;
    } | null
  >(null);

  // Form fields for adding a product
  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);

  // Calculations
  const totalCapitalAtRisk = inventory.reduce(
    (sum, p) => sum + (p.cost + p.adSpend) * p.qty,
    0
  );
  const totalInventory = inventory.reduce((sum, p) => sum + p.qty, 0);
  const totalRevenue = inventory.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );
  const totalProfit = inventory.reduce(
    (sum, p) => sum + (p.price - p.cost - p.adSpend) * p.qty,
    0
  );
  const efficiency = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const businessGrade =
    efficiency >= 90
      ? "A"
      : efficiency >= 70
      ? "B"
      : efficiency >= 50
      ? "C"
      : "F";
  const totalPotentialProfit = inventory.reduce(
    (sum, p) => sum + (p.price - p.cost - p.adSpend) * p.qty,
    0
  );

  // Handlers
  const addProduct = () => {
    if (!productName) return;
    const newProduct = {
      productName,
      cost,
      adSpend,
      price,
      competitorPrice,
      qty,
      monthlySales,
    };
    setInventory((prev) => [...prev, newProduct]);
    setProductName("");
    setCost(0);
    setAdSpend(0);
    setPrice(0);
    setCompetitorPrice(0);
    setQty(0);
    setMonthlySales(0);
  };

  const deleteProduct = (index: number) => {
    setInventory((prev) => prev.filter((_, i) => i !== index));
    setCurrentView("dashboard");
  };

  // Styles
  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
    appearance: "none",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "15px",
    marginBottom: "10px",
    cursor: "pointer",
  };

  const badgeStyle = (isPremium: boolean): React.CSSProperties => ({
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "4px",
    background: isPremium ? "#ffd700" : "#add8e6",
    color: "#000",
    fontSize: "12px",
    marginLeft: "8px",
  });

  // Render functions
  const renderHome = () => (
    <div>
      <h1>💼 The Business Auditor</h1>
      <p>
        I am your personal Business Auditor. I will analyze your inventory,
        calculate your true ROI, roast your bad decisions, and help you find
        hidden profits. Most people fail because they don't know their numbers.
        Enter your Company Name to begin the audit.
      </p>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={inputStyle}
      />
      <button
        style={{
          ...buttonStyle,
          background: "#000",
          color: "#fff",
        }}
        onClick={() => setCurrentView("dashboard")}
      >
        Open Dashboard
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div>
      <h2>📊 {companyName} Report Card</h2>

      {/* Section A: Grading System */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div style={cardStyle}>
          <strong>Business Grade</strong>
          <p>{businessGrade}</p>
        </div>
        <div style={cardStyle}>
          <strong>Total Potential Profit</strong>
          <p>${totalPotentialProfit.toFixed(2)}</p>
        </div>
        <div style={cardStyle}>
          <strong>Capital at Risk</strong>
          <p>${totalCapitalAtRisk.toFixed(2)}</p>
        </div>
        <div style={cardStyle}>
          <strong>Total Inventory</strong>
          <p>{totalInventory} units</p>
        </div>
      </div>

      {/* Section B: Add Product */}
      <div>
        <h3>Add Product</h3>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#666" }}>
            PRODUCT NAME
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#666" }}>
            UNIT COST
          </label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#666" }}>
            AD SPEND
          </label>
          <input
            type="number"
            value={adSpend}
            onChange={(e) => setAdSpend(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#666" }}>
            SELLING PRICE
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#666" }}>
            COMPETITOR PRICE
          </label>
          <input
            type="number"
            value={competitorPrice}
            onChange={(e) => setCompetitorPrice(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#666" }}>
            STOCK QTY
          </label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#666" }}>
            MONTHLY SALES
          </label>
          <input
            type="number"
            value={monthlySales}
            onChange={(e) => setMonthlySales(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <button
          style={{
            ...buttonStyle,
            background: "#28a745",
            color: "#fff",
          }}
          onClick={addProduct}
        >
          ➕ Add to Inventory
        </button>
      </div>

      {/* Section C: Inventory List */}
      <div style={{ marginTop: "20px" }}>
        <h3>Inventory List</h3>
        {inventory.map((p, idx) => {
          const netProfit = (p.price - p.cost - p.adSpend) * p.qty;
          const isPremium = p.price > p.competitorPrice;
          return (
            <div
              key={idx}
              style={cardStyle}
              onClick={() => {
                setSelectedProduct(p);
                setCurrentView("detail");
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>{p.productName}</strong>
                <span style={badgeStyle(isPremium)}>
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
  );

  const renderDetail = () => {
    if (!selectedProduct) return null;
    const {
      productName,
      cost,
      adSpend,
      price,
      competitorPrice,
      qty,
      monthlySales,
    } = selectedProduct;
    const netProfit = price - cost - adSpend;
    const diff = price - competitorPrice;
    const markupPercent = cost > 0 ? ((price - cost) / cost) * 100 : 0;
    const breakEvenVolume =
      price - cost - adSpend > 0
        ? Math.ceil((cost + adSpend) / (price - cost - adSpend))
        : 0;
    const roas = adSpend > 0 ? (price / adSpend).toFixed(2) : "N/A";

    const competitiveAnalysis =
      diff < 0
        ? `✅ ADVANTAGE: You are cheaper by $${Math.abs(diff).toFixed(
            2
          )}.`
        : diff > 0
        ? `💎 PREMIUM: You charge $${diff.toFixed(2)} premium.`
        : "⚖️ Prices match.";

    return (
      <div>
        <button
          style={{
            ...buttonStyle,
            background: "#555",
            color: "#fff",
            marginBottom: "12px",
          }}
          onClick={() => setCurrentView("dashboard")}
        >
          ⬅️ Back to Dashboard
        </button>
        <h2>📈 Analysis: {productName}</h2>

        <div style={{ marginBottom: "12px" }}>
          <p>{competitiveAnalysis}</p>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <p>
            <strong>True Net Profit:</strong> ${netProfit.toFixed(2)}
          </p>
          <p>
            <strong>Contribution Margin:</strong> ${(price - cost).toFixed(2)}
          </p>
          <p>
            <strong>Markup %:</strong> {markupPercent.toFixed(1)}%
          </p>
          <p>
            <strong>Break‑Even Volume:</strong> {breakEvenVolume} units
          </p>
          <p>
            <strong>ROAS (Ad Efficiency):</strong> {roas}x
          </p>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <p>
            <strong>Months of Inventory:</strong>{" "}
            {monthlySales > 0 ? (qty / monthlySales).toFixed(1) : "N/A"}
          </p>
        </div>

        <button
          style={{
            ...buttonStyle,
            background: "#dc3545",
            color: "#fff",
          }}
          onClick={() => {
            const idx = inventory.findIndex((p) => p === selectedProduct);
            if (idx !== -1) deleteProduct(idx);
          }}
        >
          🗑️ Delete Product
        </button>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {currentView === "home" && renderHome()}
      {currentView === "dashboard" && renderDashboard()}
      {currentView === "detail" && renderDetail()}
    </div>
  );
}
