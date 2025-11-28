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
  const [companyName, setCompanyName] = useState<string>("");
  const [inventory, setInventory] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);

  const addProduct = () => {
    if (!productName) return;
    const newProduct: Product = {
      productName,
      cost,
      adSpend,
      price,
      competitorPrice,
      qty,
    };
    setInventory(prev => [...prev, newProduct]);
    setProductName("");
    setCost(0);
    setAdSpend(0);
    setPrice(0);
    setCompetitorPrice(0);
    setQty(0);
  };

  const deleteProduct = (index: number) => {
    setInventory(prev => prev.filter((_, i) => i !== index));
    setCurrentView("dashboard");
  };

  const totalCapitalAtRisk = inventory.reduce((sum, p) => sum + (p.cost + p.adSpend) * p.qty, 0);
  const projectedProfit = inventory.reduce((sum, p) => sum + (p.price - p.cost - p.adSpend) * p.qty, 0);
  const totalRevenue = inventory.reduce((sum, p) => sum + p.price * p.qty, 0);
  const totalProfit = projectedProfit;
  const globalEfficiency = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const totalInventoryQty = inventory.reduce((sum, p) => sum + p.qty, 0);
  const sumNetProfit = inventory.reduce((sum, p) => sum + (p.price - p.cost - p.adSpend) * p.qty, 0);
  const sumTotalCost = inventory.reduce((sum, p) => sum + p.cost * p.qty, 0);

  let grade = "F (Bankrupt)";
  if (globalEfficiency > 30) grade = "A (Excellent)";
  else if (globalEfficiency > 15) grade = "B (Good)";
  else if (globalEfficiency > 0) grade = "C (Surviving)";

  const inputStyle: React.CSSProperties = {
    appearance: "none",
    WebkitAppearance: "none",
    margin: 0,
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: "#ffffff",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "black",
    color: "white",
    width: "100%",
    padding: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const greenButtonStyle: React.CSSProperties = {
    backgroundColor: "green",
    color: "white",
    width: "100%",
    padding: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const redButtonStyle: React.CSSProperties = {
    backgroundColor: "red",
    color: "white",
    width: "100%",
    padding: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const backButtonStyle: React.CSSProperties = {
    backgroundColor: "#333",
    color: "white",
    width: "100%",
    padding: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "15px",
    marginBottom: "10px",
    cursor: "pointer",
  };

  const badgeStyle = (isPremium: boolean): React.CSSProperties => ({
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "4px",
    backgroundColor: isPremium ? "#ffd700" : "#add8e6",
    color: "#000",
    fontSize: "12px",
    marginLeft: "8px",
  });

  const renderHome = () => (
    <div>
      <h1>💼 The Business Auditor</h1>
      <p>I am your personal Business Auditor. I will analyze your inventory, calculate your true ROI, roast your bad decisions, and help you find hidden profits. Enter your Company Name to begin the audit.</p>
      <label htmlFor="company-name">Company Name</label>
      <input
        id="company-name"
        type="text"
        value={companyName}
        onChange={e => setCompanyName(e.target.value)}
        style={inputStyle}
      />
      <button style={buttonStyle} onClick={() => setCurrentView("dashboard")}>Open Dashboard</button>
    </div>
  );

  const renderDashboard = () => (
    <div>
      <h2>📊 {companyName} Report Card</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "10px" }}>
        <div style={cardStyle}>
          <strong>Capital at Risk</strong>
          <p>${totalCapitalAtRisk.toFixed(2)}</p>
        </div>
        <div style={cardStyle}>
          <strong>Projected Profit</strong>
          <p>${projectedProfit.toFixed(2)}</p>
        </div>
        <div style={cardStyle}>
          <strong>Total Inventory</strong>
          <p>{totalInventoryQty} units</p>
        </div>
        <div style={cardStyle}>
          <strong>Global Efficiency</strong>
          <p>{globalEfficiency.toFixed(1)}%</p>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Add Product</h3>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="product-name">PRODUCT NAME</label>
          <p style={{ fontSize: "12px", color: "#666" }}>What is the item name?</p>
          <input
            id="product-name"
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="unit-cost">UNIT COST</label>
          <p style={{ fontSize: "12px", color: "#666" }}>Cost to make/buy ONE item?</p>
          <input
            id="unit-cost"
            type="number"
            value={cost}
            onChange={e => setCost(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="ad-spend">AD SPEND</label>
          <p style={{ fontSize: "12px", color: "#666" }}>Marketing cost per item?</p>
          <input
            id="ad-spend"
            type="number"
            value={adSpend}
            onChange={e => setAdSpend(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="selling-price">SELLING PRICE</label>
          <p style={{ fontSize: "12px", color: "#666" }}>Final price the customer pays?</p>
          <input
            id="selling-price"
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="competitor-price">COMPETITOR PRICE</label>
          <p style={{ fontSize: "12px", color: "#666" }}>What does your rival charge?</p>
          <input
            id="competitor-price"
            type="number"
            value={competitorPrice}
            onChange={e => setCompetitorPrice(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="stock-qty">STOCK QTY</label>
          <p style={{ fontSize: "12px", color: "#666" }}>How many units do you have?</p>
          <input
            id="stock-qty"
            type="number"
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
            style={inputStyle}
          />
        </div>
        <button style={greenButtonStyle} onClick={addProduct}>➕ Add to Inventory</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Inventory List</h3>
        {inventory.map((p, idx) => {
          const netProfit = (p.price - p.cost - p.adSpend) * p.qty;
          const isPremium = p.price > p.competitorPrice;
          return (
            <div
              key={idx}
              style={cardStyle}
              onClick={() => { setSelectedProduct(p); setCurrentView("detail"); }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{p.productName}</strong>
                <span style={badgeStyle(isPremium)}>{isPremium ? "💎 PREMIUM" : "⚡ COMPETITIVE"}</span>
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
    const { productName: pname, cost: c, adSpend: a, price: p, competitorPrice: cp, qty: q } = selectedProduct;
    const netProfit = p - c - a;
    const marginPercent = p > 0 ? ((p - c - a) / p) * 100 : 0;
    const breakEvenVolume = p > c + a ? Math.ceil((c + a) / (p - c - a)) : Infinity;
    const roas = a > 0 ? p / a : Infinity;
    const competitorVariance = p - cp;

    let scenarioTitle = "";
    let scenarioVerdict = "";
    if (p < cp && marginPercent > 20) {
      scenarioTitle = "🏆 STRATEGY: SMART DISRUPTION";
      scenarioVerdict = "Verdict: You are cheaper than your rival BUT you still make high profit. You will destroy them.";
    } else if (p < cp && marginPercent < 20) {
      scenarioTitle = "⚠️ STRATEGY: RACE TO THE BOTTOM";
      scenarioVerdict = "Verdict: You are undercutting the rival, but your profit is too thin. One bad month will bankrupt you.";
    } else if (p > cp && marginPercent > 30) {
      scenarioTitle = "💎 STRATEGY: LUXURY BRANDING";
      scenarioVerdict = "Verdict: You are expensive, but your margins prove you have a premium product. Keep quality high.";
    } else if (p > cp && marginPercent < 30) {
      scenarioTitle = "💀 STRATEGY: DEAD ON ARRIVAL";
      scenarioVerdict = "Verdict: You are more expensive than the rival AND you make less money. You are inefficient. Fix costs immediately.";
    }

    return (
      <div>
        <button style={backButtonStyle} onClick={() => setCurrentView("dashboard")}>← Back</button>
        <h2>📊 {companyName} - {pname}</h2>
        <h3>{scenarioTitle}</h3>
        <p>{scenarioVerdict}</p>
        <div style={{ marginTop: "10px" }}>
          <p>True Net Profit: ${netProfit.toFixed(2)}</p>
          <p>Contribution Margin: ${ (p - c).toFixed(2) }</p>
          <p>Competitor Variance: ${ competitorVariance.toFixed(2) }</p>
          <p>Margin %: {marginPercent.toFixed(1)}%</p>
          <p>Break Even Volume: {breakEvenVolume === Infinity ? "∞" : breakEvenVolume}</p>
          <p>ROAS: {roas === Infinity ? "∞" : roas.toFixed(2)}</p>
        </div>
        <button style={redButtonStyle} onClick={() => deleteProduct(inventory.indexOf(selectedProduct))}>🗑️ Delete Product</button>
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
