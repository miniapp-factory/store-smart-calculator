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
  const [companyName, setCompanyName] = useState<string>("");
  const [inventory, setInventory] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<
    "home" | "dashboard" | "detail"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form fields
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);

  const addProduct = () => {
    if (!name) return;
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      cost,
      adSpend,
      price,
      competitorPrice,
      qty,
    };
    setInventory((prev) => [...prev, newProduct]);

    // reset form
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

  // Calculations
  const totalRevenue = inventory.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );
  const totalProfit = inventory.reduce(
    (sum, p) => sum + (p.price - p.cost - p.adSpend) * p.qty,
    0
  );
  const capitalInvested = inventory.reduce(
    (sum, p) => sum + (p.cost + p.adSpend) * p.qty,
    0
  );
  const efficiency =
    totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const grade =
    efficiency > 30
      ? "A (Excellent)"
      : efficiency > 15
      ? "B (Good)"
      : efficiency > 0
      ? "C (Surviving)"
      : "F (Bankrupt)";

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

  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif",
  };

  const buttonStyle = (bg: string) => ({
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: bg,
    color: "#fff",
  });

  const badgeStyle = (isPremium: boolean) => ({
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
      <p>
        I am your personal Business Auditor. I will analyze your inventory,
        calculate your true ROI, roast your bad decisions, and help you find
        hidden profits. Enter your Company Name to begin the audit.
      </p>
      <label htmlFor="company-name">Company Name</label>
      <input
        id="company-name"
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={inputStyle}
      />
      <button
        style={buttonStyle("#000")}
        onClick={() => setCurrentView("dashboard")}
      >
        Open Dashboard
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div>
      <h2>📊 {companyName} Report Card</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{ border: "1px solid #ccc", padding: "12px", borderRadius: "4px" }}>
          <strong>Business Grade: {grade}</strong>
          <p>Total Potential Profit: ${totalProfit.toFixed(2)}</p>
          <p>Capital Invested: ${capitalInvested.toFixed(2)}</p>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3>Add Product</h3>

        <label htmlFor="product-name">PRODUCT NAME</label>
        <p style={{ fontSize: "12px", color: "#666" }}>What is the item name?</p>
        <input
          id="product-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label htmlFor="unit-cost">UNIT COST</label>
        <p style={{ fontSize: "12px", color: "#666" }}>Cost to make/buy ONE item?</p>
        <input
          id="unit-cost"
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="ad-spend">AD SPEND</label>
        <p style={{ fontSize: "12px", color: "#666" }}>Marketing cost per item?</p>
        <input
          id="ad-spend"
          type="number"
          value={adSpend}
          onChange={(e) => setAdSpend(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="selling-price">SELLING PRICE</label>
        <p style={{ fontSize: "12px", color: "#666" }}>Final price the customer pays?</p>
        <input
          id="selling-price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="competitor-price">COMPETITOR PRICE</label>
        <p style={{ fontSize: "12px", color: "#666" }}>What does your rival charge?</p>
        <input
          id="competitor-price"
          type="number"
          value={competitorPrice}
          onChange={(e) => setCompetitorPrice(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="stock-qty">STOCK QTY</label>
        <p style={{ fontSize: "12px", color: "#666" }}>How many units do you have?</p>
        <input
          id="stock-qty"
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          style={inputStyle}
        />

        <button
          style={buttonStyle("#28a745")}
          onClick={addProduct}
        >
          ➕ Add to Inventory
        </button>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3>Inventory List</h3>
        {inventory.map((p) => {
          const isPremium = p.price > p.competitorPrice;
          const netProfit = p.price - p.cost - p.adSpend;
          return (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "4px",
                marginBottom: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedProduct(p);
                setCurrentView("detail");
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{p.name}</strong>
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
    const { name, price, cost, adSpend, competitorPrice, qty } = selectedProduct;
    const netProfit = price - cost - adSpend;
    const margin =
      price > 0 ? ((price - cost - adSpend) / price) * 100 : 0;

    const strategy = () => {
      if (price < competitorPrice && margin > 20) {
        return {
          title: "🏆 STRATEGY: SMART DISRUPTION",
          verdict:
            "You are cheaper than your rival BUT you still make high profit. You will destroy them.",
        };
      }
      if (price <= competitorPrice && margin <= 20) {
        return {
          title: "⚠️ STRATEGY: RACE TO THE BOTTOM",
          verdict:
            "You are undercutting the rival, but your profit is too thin. One bad month will bankrupt you.",
        };
      }
      if (price > competitorPrice && margin > 30) {
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

    const { title, verdict } = strategy();

    return (
      <div>
        <button
          style={buttonStyle("#555")}
          onClick={() => setCurrentView("dashboard")}
        >
          ⬅️ Back to Dashboard
        </button>

        <h2>📈 Analysis: {name}</h2>

        <div style={{ marginTop: "12px" }}>
          <p>{title}</p>
          <p>{verdict}</p>
        </div>

        <div style={{ marginTop: "12px" }}>
          <p>
            <strong>True Net Profit:</strong> ${netProfit.toFixed(2)}
          </p>
          <p>
            <strong>Contribution Margin:</strong> ${(price - cost).toFixed(2)}
          </p>
          <p>
            <strong>Competitor Variance:</strong> ${(price - competitorPrice).toFixed(2)}
          </p>
        </div>

        <button
          style={buttonStyle("#dc3545")}
          onClick={() => {
            if (selectedProduct) deleteProduct(selectedProduct.id);
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
  const [companyName, setCompanyName] = useState<string>("");
  const [inventory, setInventory] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<
    "home" | "dashboard" | "detail"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form fields
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);

  const addProduct = () => {
    if (!name) return;
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      cost,
      adSpend,
      price,
      competitorPrice,
      qty,
    };
    setInventory((prev) => [...prev, newProduct]);

    // reset form
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

  // Calculations
  const totalRevenue = inventory.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );
  const totalProfit = inventory.reduce(
    (sum, p) => sum + (p.price - p.cost - p.adSpend) * p.qty,
    0
  );
  const capitalInvested = inventory.reduce(
    (sum, p) => sum + (p.cost + p.adSpend) * p.qty,
    0
  );
  const efficiency =
    totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const grade =
    efficiency > 30
      ? "A (Excellent)"
      : efficiency > 15
      ? "B (Good)"
      : efficiency > 0
      ? "C (Surviving)"
      : "F (Bankrupt)";

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

  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif",
  };

  const buttonStyle = (bg: string) => ({
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: bg,
    color: "#fff",
  });

  const badgeStyle = (isPremium: boolean) => ({
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
      <p>
        I am your personal Business Auditor. I will analyze your inventory,
        calculate your true ROI, roast your bad decisions, and help you find
        hidden profits. Enter your Company Name to begin the audit.
      </p>
      <label htmlFor="company-name">Company Name</label>
      <input
        id="company-name"
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={inputStyle}
      />
      <button
        style={buttonStyle("#000")}
        onClick={() => setCurrentView("dashboard")}
      >
        Open Dashboard
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div>
      <h2>📊 {companyName} Report Card</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{ border: "1px solid #ccc", padding: "12px", borderRadius: "4px" }}>
          <strong>Business Grade: {grade}</strong>
          <p>Total Potential Profit: ${totalProfit.toFixed(2)}</p>
          <p>Capital Invested: ${capitalInvested.toFixed(2)}</p>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3>Add Product</h3>

        <label htmlFor="product-name">PRODUCT NAME</label>
        <p style={{ fontSize: "12px", color: "#666" }}>What is the item name?</p>
        <input
          id="product-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label htmlFor="unit-cost">UNIT COST</label>
        <p style={{ fontSize: "12px", color: "#666" }}>Cost to make/buy ONE item?</p>
        <input
          id="unit-cost"
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="ad-spend">AD SPEND</label>
        <p style={{ fontSize: "12px", color: "#666" }}>Marketing cost per item?</p>
        <input
          id="ad-spend"
          type="number"
          value={adSpend}
          onChange={(e) => setAdSpend(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="selling-price">SELLING PRICE</label>
        <p style={{ fontSize: "12px", color: "#666" }}>Final price the customer pays?</p>
        <input
          id="selling-price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="competitor-price">COMPETITOR PRICE</label>
        <p style={{ fontSize: "12px", color: "#666" }}>What does your rival charge?</p>
        <input
          id="competitor-price"
          type="number"
          value={competitorPrice}
          onChange={(e) => setCompetitorPrice(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="stock-qty">STOCK QTY</label>
        <p style={{ fontSize: "12px", color: "#666" }}>How many units do you have?</p>
        <input
          id="stock-qty"
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          style={inputStyle}
        />

        <button
          style={buttonStyle("#28a745")}
          onClick={addProduct}
        >
          ➕ Add to Inventory
        </button>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3>Inventory List</h3>
        {inventory.map((p) => {
          const isPremium = p.price > p.competitorPrice;
          const netProfit = p.price - p.cost - p.adSpend;
          return (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "4px",
                marginBottom: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedProduct(p);
                setCurrentView("detail");
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{p.name}</strong>
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
    const { name, price, cost, adSpend, competitorPrice, qty } = selectedProduct;
    const netProfit = price - cost - adSpend;
    const margin =
      price > 0 ? ((price - cost - adSpend) / price) * 100 : 0;

    const strategy = () => {
      if (price < competitorPrice && margin > 20) {
        return {
          title: "🏆 STRATEGY: SMART DISRUPTION",
          verdict:
            "You are cheaper than your rival BUT you still make high profit. You will destroy them.",
        };
      }
      if (price <= competitorPrice && margin <= 20) {
        return {
          title: "⚠️ STRATEGY: RACE TO THE BOTTOM",
          verdict:
            "You are undercutting the rival, but your profit is too thin. One bad month will bankrupt you.",
        };
      }
      if (price > competitorPrice && margin > 30) {
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

    const { title, verdict } = strategy();

    return (
      <div>
        <button
          style={buttonStyle("#555")}
          onClick={() => setCurrentView("dashboard")}
        >
          ⬅️ Back to Dashboard
        </button>

        <h2>📈 Analysis: {name}</h2>

        <div style={{ marginTop: "12px" }}>
          <p>{title}</p>
          <p>{verdict}</p>
        </div>

        <div style={{ marginTop: "12px" }}>
          <p>
            <strong>True Net Profit:</strong> ${netProfit.toFixed(2)}
          </p>
          <p>
            <strong>Contribution Margin:</strong> ${(price - cost).toFixed(2)}
          </p>
          <p>
            <strong>Competitor Variance:</strong> ${(price - competitorPrice).toFixed(2)}
          </p>
        </div>

        <button
          style={buttonStyle("#dc3545")}
          onClick={() => {
            if (selectedProduct) deleteProduct(selectedProduct.id);
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
"use client";
import { useState } from "react";

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
  const [companyName, setCompanyName] = useState<string>("");
  const [inventory, setInventory] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<
    "home" | "dashboard" | "detail"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form fields
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);

  const addProduct = () => {
    if (!name) return;
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      cost,
      adSpend,
      price,
      competitorPrice,
      qty,
    };
    setInventory((prev) => [...prev, newProduct]);

    // reset form
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

  // Calculations
  const totalRevenue = inventory.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );
  const totalProfit = inventory.reduce(
    (sum, p) => sum + (p.price - p.cost - p.adSpend) * p.qty,
    0
  );
  const capitalInvested = inventory.reduce(
    (sum, p) => sum + (p.cost + p.adSpend) * p.qty,
    0
  );
  const efficiency =
    totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const grade =
    efficiency > 30
      ? "A (Excellent)"
      : efficiency > 15
      ? "B (Good)"
      : efficiency > 0
      ? "C (Surviving)"
      : "F (Bankrupt)";

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

  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif",
  };

  const buttonStyle = (bg: string) => ({
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: bg,
    color: "#fff",
  });

  const badgeStyle = (isPremium: boolean) => ({
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
      <p>
        I am your personal Business Auditor. I will analyze your inventory,
        calculate your true ROI, roast your bad decisions, and help you find
        hidden profits. Enter your Company Name to begin the audit.
      </p>
      <label htmlFor="company-name">Company Name</label>
      <input
        id="company-name"
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={inputStyle}
      />
      <button
        style={buttonStyle("#000")}
        onClick={() => setCurrentView("dashboard")}
      >
        Open Dashboard
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div>
      <h2>📊 {companyName} Report Card</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{ border: "1px solid #ccc", padding: "12px", borderRadius: "4px" }}>
          <strong>Business Grade: {grade}</strong>
          <p>Total Potential Profit: ${totalProfit.toFixed(2)}</p>
          <p>Capital Invested: ${capitalInvested.toFixed(2)}</p>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3>Add Product</h3>

        <label htmlFor="product-name">PRODUCT NAME</label>
        <p style={{ fontSize: "12px", color: "#666" }}>What is the item name?</p>
        <input
          id="product-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label htmlFor="unit-cost">UNIT COST</label>
        <p style={{ fontSize: "12px", color: "#666" }}>Cost to make/buy ONE item?</p>
        <input
          id="unit-cost"
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="ad-spend">AD SPEND</label>
        <p style={{ fontSize: "12px", color: "#666" }}>Marketing cost per item?</p>
        <input
          id="ad-spend"
          type="number"
          value={adSpend}
          onChange={(e) => setAdSpend(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="selling-price">SELLING PRICE</label>
        <p style={{ fontSize: "12px", color: "#666" }}>Final price the customer pays?</p>
        <input
          id="selling-price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="competitor-price">COMPETITOR PRICE</label>
        <p style={{ fontSize: "12px", color: "#666" }}>What does your rival charge?</p>
        <input
          id="competitor-price"
          type="number"
          value={competitorPrice}
          onChange={(e) => setCompetitorPrice(Number(e.target.value))}
          style={inputStyle}
        />

        <label htmlFor="stock-qty">STOCK QTY</label>
        <p style={{ fontSize: "12px", color: "#666" }}>How many units do you have?</p>
        <input
          id="stock-qty"
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          style={inputStyle}
        />

        <button
          style={buttonStyle("#28a745")}
          onClick={addProduct}
        >
          ➕ Add to Inventory
        </button>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3>Inventory List</h3>
        {inventory.map((p) => {
          const isPremium = p.price > p.competitorPrice;
          const netProfit = p.price - p.cost - p.adSpend;
          return (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "4px",
                marginBottom: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedProduct(p);
                setCurrentView("detail");
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{p.name}</strong>
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
    const { name, price, cost, adSpend, competitorPrice } = selectedProduct;
    const netProfit = price - cost - adSpend;
    const margin =
      price > 0 ? ((price - cost - adSpend) / price) * 100 : 0;

    const strategy = () => {
      if (price < competitorPrice && margin > 20) {
        return {
          title: "🏆 STRATEGY: SMART DISRUPTION",
          verdict:
            "You are cheaper than your rival BUT you still make high profit. You will destroy them.",
        };
      }
      if (price <= competitorPrice && margin <= 20) {
        return {
          title: "⚠️ STRATEGY: RACE TO THE BOTTOM",
          verdict:
            "You are undercutting the rival, but your profit is too thin. One bad month will bankrupt you.",
        };
      }
      if (price > competitorPrice && margin > 30) {
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

    const { title, verdict } = strategy();

    return (
      <div>
        <button
          style={buttonStyle("#555")}
          onClick={() => setCurrentView("dashboard")}
        >
          ⬅️ Back to Dashboard
        </button>

        <h2>📈 Analysis: {name}</h2>

        <div style={{ marginTop: "12px" }}>
          <p>{title}</p>
          <p>{verdict}</p>
        </div>

        <div style={{ marginTop: "12px" }}>
          <p>
            <strong>True Net Profit:</strong> ${netProfit.toFixed(2)}
          </p>
          <p>
            <strong>Contribution Margin:</strong> ${(price - cost).toFixed(2)}
          </p>
          <p>
            <strong>Competitor Variance:</strong> ${(price - competitorPrice).toFixed(2)}
          </p>
        </div>

        <button
          style={buttonStyle("#dc3545")}
          onClick={() => {
            if (selectedProduct) deleteProduct(selectedProduct.id);
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
