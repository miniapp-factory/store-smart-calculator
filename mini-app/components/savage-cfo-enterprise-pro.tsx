"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Product {
  name: string;
  cost: number;
  adCost: number;
  price: number;
  stock: number;
  monthlySales: number;
}

export default function SavageCfoEnterprisePro() {
  const [inventory, setInventory] = useState<Product[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [productName, setProductName] = useState<string>("");
  const [makingCost, setMakingCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [stockQty, setStockQty] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);

  const addItem = () => {
    const newItem: Product = {
      name: productName,
      cost: makingCost,
      adCost: adSpend,
      price: sellingPrice,
      stock: stockQty,
      monthlySales,
    };
    setInventory((prev) => [...prev, newItem]);
    setProductName("");
    setMakingCost(0);
    setAdSpend(0);
    setSellingPrice(0);
    setStockQty(0);
    setMonthlySales(0);
  };

  const deleteItem = (index: number) => {
    setInventory((prev) => prev.filter((_, i) => i !== index));
  };

  const totalInvestedCapital = inventory.reduce(
    (sum, p) => sum + (p.cost + p.adCost) * p.stock,
    0
  );

  const potentialNetProfit = inventory.reduce(
    (sum, p) => sum + (p.price - p.cost - p.adCost) * p.stock,
    0
  );

  const totalRevenue = inventory.reduce((sum, p) => sum + p.price * p.stock, 0);

  const scalabilityScore = totalRevenue ? (potentialNetProfit / totalRevenue) * 100 : 0;

  const renderHome = () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">🕵️‍♂️ The Savage CFO</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          The ultimate tool for starting and managing a business. I will audit your inventory, factor in your marketing costs, and determine if your business is scalable or just a hobby. Enter your company name to begin.
        </p>
        <Input
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mb-4"
        />
        <Button
          className="w-full bg-black text-white"
          onClick={() => setCurrentView("dashboard")}
        >
          Start Audit 🚀
        </Button>
      </CardContent>
    </Card>
  );

  const renderDashboard = () => (
    <div className="w-full max-w-4xl space-y-6">
      <h2 className="text-2xl font-bold">🏢 {companyName} HQ</h2>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">GLOBAL INTELLIGENCE</h3>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Total Invested Capital: ${totalInvestedCapital.toFixed(2)}</p>
          <p>Potential Net Profit: ${potentialNetProfit.toFixed(2)}</p>
          <p>Business Scalability Score:</p>
          <div className="w-full bg-gray-200 rounded h-4">
            <div
              className="bg-blue-500 h-full rounded"
              style={{ width: `${scalabilityScore}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">ADVANCED PRODUCT ENTRY</h3>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <Input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Making/Buying Cost ($)"
            value={makingCost}
            onChange={(e) => setMakingCost(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Marketing/Ad Spend per Item ($)"
            value={adSpend}
            onChange={(e) => setAdSpend(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Selling Price ($)"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Stock Qty"
            value={stockQty}
            onChange={(e) => setStockQty(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Monthly Sales"
            value={monthlySales}
            onChange={(e) => setMonthlySales(Number(e.target.value))}
          />
          <Button
            variant="outline"
            className="w-full bg-green-500 text-white"
            onClick={addItem}
          >
            ➕ Add Item
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">INVENTORY LIST</h3>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Tap a card below to view the ROI Report.</p>
          {inventory.map((p, idx) => {
            const netProfit = p.price - p.cost - p.adCost;
            const totalCost = p.cost + p.adCost;
            const roi = totalCost ? (netProfit / totalCost) * 100 : 0;
            const badgeText = roi < 100 ? "⚠️ RISKY" : "🚀 SCALABLE";
            return (
              <Card
                key={idx}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedProduct(p);
                  setCurrentView("detail");
                }}
              >
                <CardContent className="flex justify-between items-center">
                  <span className="font-bold">{p.name}</span>
                  <Badge variant={roi < 100 ? "destructive" : "success"}>
                    {badgeText}
                  </Badge>
                </CardContent>
                <CardFooter className="text-sm">
                  Stock: {p.stock}
                </CardFooter>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );

  const renderDetail = () => {
    if (!selectedProduct) return null;
    const { name, cost, adCost, price, stock, monthlySales } = selectedProduct;
    const netProfit = price - cost - adCost;
    const totalCost = cost + adCost;
    const grossMargin = price ? ((price - cost - adCost) / price) * 100 : 0;
    const marketingIntensity = price ? (adCost / price) * 100 : 0;
    const roi = totalCost ? (netProfit / totalCost) * 100 : 0;
    const breakEven = cost + adCost;

    const verdict =
      netProfit < 0
        ? "ROAST: You are losing money on every sale. Stop ads immediately."
        : adCost > netProfit
        ? "ROAST: You are working just to pay Mark Zuckerberg. Fix your ads."
        : "VERDICT: This is a money-printing machine. Scale it up!";

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-semibold">📂 Analysis: {name}</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>Gross Margin</p>
            <div className="w-full bg-gray-200 rounded h-4">
              <div
                className="bg-blue-500 h-full rounded"
                style={{ width: `${grossMargin}%` }}
              />
            </div>
          </div>
          <div>
            <p>Marketing Intensity</p>
            <div className="w-full bg-gray-200 rounded h-4">
              <div
                className="bg-red-500 h-full rounded"
                style={{ width: `${marketingIntensity}%` }}
              />
            </div>
          </div>
          <div>
            <p>ROI (Return on Investment)</p>
            <div className="w-full bg-gray-200 rounded h-4">
              <div
                className="bg-green-500 h-full rounded"
                style={{ width: `${roi}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Total Cost (Item + Ads):</p>
              <p className="text-sm">${totalCost.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Selling Price:</p>
              <p className="text-sm">${price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Real Net Profit:</p>
              <p className="text-sm">${netProfit.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Break-Even Price:</p>
              <p className="text-sm">${breakEven.toFixed(2)}</p>
            </div>
          </div>

          <p className="text-lg font-semibold">{verdict}</p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => {
              const idx = inventory.findIndex((p) => p === selectedProduct);
              if (idx !== -1) deleteItem(idx);
              setCurrentView("dashboard");
            }}
          >
            🗑️ Delete
          </Button>
          <Button
            variant="outline"
            className="flex-2"
            onClick={() => setCurrentView("dashboard")}
          >
            ⬅️ Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {currentView === "home" && renderHome()}
      {currentView === "dashboard" && renderDashboard()}
      {currentView === "detail" && renderDetail()}
    </div>
  );
}
