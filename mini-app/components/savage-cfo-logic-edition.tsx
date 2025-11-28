"use client";
import { useState } from "react";

interface Product {
  productName: string;
  cost: number;
  adSpend: number;
  price: number;
  competitorPrice: number;
  qty: number;
  monthlySales: number;
}

export default function SavageCfoLogicEdition() {
  // State
  const [companyName, setCompanyName] = useState<string>("");
  const [inventory, setInventory] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form fields
  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);

  // Helpers
  const addProduct = () => {
    if (!productName) return;
    const newProduct: Product = {
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

  // Calculations
  const totalCapitalInvested = inventory.reduce(
    (sum, p) => sum + (p.cost + p.adSpend) * p.qty,
    0
  );
  const totalRevenue = inventory.reduce((sum, p) => sum + p.price * p.qty, 0);
  const totalProfit = inventory.reduce(
    (sum, p) => sum + (p.price - p.cost - p.adSpend) * p.qty,
    0
  );
  const globalEfficiency =
    totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  const grade =
    globalEfficiency > 30
      ? "A (Excellent)"
      : globalEfficiency > 15
      ? "B (Good)"
      : globalEfficiency > 0
      ? "C (Surviving)"
      : "F (Bankrupt)";

  // Render functions
  const renderHome = () => (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>💼 The Business Auditor</h1>
      <p>
        I am your personal Business Auditor. I will analyze your inventory,
        calculate your true ROI, and help you find hidden profits. Enter your
        Company Name to begin the audit.
      </p>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />
      <button
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => setCurrentView("dashboard")}
      >
        Open Dashboard
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>📊 {companyName} Report Card</h2>

      {/* Section A: Grading System */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "4px",
        }}
      >
        <h3>Business Grade: {grade}</h3>
        <p>Total Potential Profit: ${totalProfit.toFixed(2)}</p>
        <p>Total Capital Invested: ${totalCapitalInvested.toFixed(2)}</p>
      </div>

      {/* Section B: Add Product */}
      <div style={{ marginBottom: "12px" }}>
        <h3>Add Product</h3>
        <p>What are you selling?</p>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <p>Cost to make/buy ONE item?</p>
        <input
          type="number"
          placeholder="Unit Cost"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <p>Marketing cost per item?</p>
        <input
          type="number"
          placeholder="Ad Spend"
          value={adSpend}
          onChange={(e) => setAdSpend(Number(e.target.value))}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <p>What customers pay you?</p>
        <input
          type="number"
          placeholder="Selling Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <p>What rivals charge?</p>
        <input
          type="number"
          placeholder="Competitor Price"
          value={competitorPrice}
          onChange={(e) => setCompetitorPrice(Number(e.target.value))}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <p>How many do you have?</p>
        <input
          type="number"
          placeholder="Stock Quantity"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <p>Estimated sales per month?</p>
        <input
          type="number"
          placeholder="Monthly Sales"
          value={monthlySales}
          onChange={(e) => setMonthlySales(Number(e.target.value))}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "green",
            color: "white",
            cursor: "pointer",
          }}
          onClick={addProduct}
        >
          ➕ Add to Inventory
        </button>
      </div>

      {/* Section C: Inventory List */}
      <div>
        <h3>Inventory List</h3>
        {inventory.map((p, idx) => {
          const isPremium = p.price > p.competitorPrice;
          return (
            <div
              key={idx}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                marginBottom: "8px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedProduct(p);
                setCurrentView("detail");
              }}
            >
              <strong>{p.productName}</strong>
              <span
                style={{
                  marginLeft: "8px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  backgroundColor: isPremium ? "#ffd700" : "#00bfff",
                  color: "white",
                }}
              >
                {isPremium ? "💎 PREMIUM" : "⚡ COMPETITIVE"}
              </span>
              <p>In Stock: {p.qty}</p>
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
    const diff = price - competitorPrice;
    const trueNetProfit = price - cost - adSpend;
    const contributionMargin = price - cost;
    const breakEvenVolume =
      price - cost - adSpend > 0
        ? Math.ceil((cost + adSpend) / (price - cost - adSpend))
        : 0;
    const monthsOfInventory =
      monthlySales > 0 ? qty / monthlySales : 0;
    const roas = adSpend > 0 ? price / adSpend : 0;

    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <button
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#555",
            color: "white",
            cursor: "pointer",
            marginBottom: "12px",
          }}
          onClick={() => setCurrentView("dashboard")}
        >
          ⬅️ Back to Dashboard
        </button>
        <h2>📈 Analysis: {productName}</h2>

        <p>
          Price Difference: You are ${diff.toFixed(2)} vs Competitor.
        </p>

        <ul>
          <li>True Net Profit: ${trueNetProfit.toFixed(2)}</li>
          <li>Contribution Margin: ${contributionMargin.toFixed(2)}</li>
          <li>
            Break‑Even Volume: {breakEvenVolume} units
          </li>
          <li>
            Months of Inventory: {monthsOfInventory.toFixed(2)} months
          </li>
          <li>Ad Efficiency (ROAS): {roas.toFixed(2)}x</li>
        </ul>

        <button
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "red",
            color: "white",
            cursor: "pointer",
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
    <div>
      {currentView === "home" && renderHome()}
      {currentView === "dashboard" && renderDashboard()}
      {currentView === "detail" && renderDetail()}
    </div>
  );
}
