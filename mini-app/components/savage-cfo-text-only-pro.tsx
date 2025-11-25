"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SavageCfoTextOnlyPro() {
  // State
  const [inventory, setInventory] = useState<
    {
      productName: string;
      cost: number;
      adSpend: number;
      price: number;
      qty: number;
      monthlySales: number;
    }[]
  >([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [currentView, setCurrentView] = useState<
    "home" | "dashboard" | "detail"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<
    | {
        productName: string;
        cost: number;
        adSpend: number;
        price: number;
        qty: number;
        monthlySales: number;
      }
    | undefined
  >(undefined);

  // Temporary fields for product entry
  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);

  // Helpers
  const addItem = () => {
    if (!productName) return;
    setInventory((prev) => [
      ...prev,
      { productName, cost, adSpend, price, qty, monthlySales },
    ]);
    // Reset fields
    setProductName("");
    setCost(0);
    setAdSpend(0);
    setPrice(0);
    setQty(0);
    setMonthlySales(0);
  };

  const deleteItem = (index: number) => {
    setInventory((prev) => prev.filter((_, i) => i !== index));
    if (selectedProduct && selectedProduct.productName === inventory[index].productName) {
      setSelectedProduct(undefined);
      setCurrentView("dashboard");
    }
  };

  const totalInvested = inventory.reduce(
    (sum, item) => sum + (item.cost + item.adSpend) * item.qty,
    0
  );
  const totalProfit = inventory.reduce(
    (sum, item) => sum + (item.price - item.cost - item.adSpend) * item.qty,
    0
  );
  const totalRevenue = inventory.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const globalEfficiency = totalRevenue
    ? (totalProfit / totalRevenue) * 100
    : 0;
  const grade =
    globalEfficiency > 30
      ? "A+"
      : globalEfficiency > 10
      ? "B"
      : "F";

  // Render functions
  const renderHome = () => (
    <div className="w-full max-w-md space-y-4">
      <h1 className="text-3xl font-bold text-center">🕵️‍♂️ The Savage CFO</h1>
      <p className="text-center">
        I am your business auditor. I will calculate your true ROI and roast your bad decisions. No charts, just hard numbers. Enter Company Name to begin.
      </p>
      <Label className="font-semibold">Company Name</Label>
      <Input
        placeholder="Enter company name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <Button
        className="w-full mt-4"
        onClick={() => setCurrentView("dashboard")}
      >
        Start Audit 🚀
      </Button>
    </div>
  );

  const renderDashboard = () => (
    <div className="w-full max-w-4xl space-y-6">
      <h2 className="text-2xl font-semibold">🏢 {companyName} HQ</h2>

      {/* Global Report Card */}
      <div className="flex flex-wrap gap-4">
        <Card className="flex-1 p-4">
          <h3 className="font-medium">Invested</h3>
          <p className="text-2xl font-bold">${totalInvested.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Total Cash Out</p>
        </Card>
        <Card className="flex-1 p-4">
          <h3 className="font-medium">Potential Profit</h3>
          <p className="text-2xl font-bold">${totalProfit.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Total Cash In</p>
        </Card>
        <Card className="flex-1 p-4">
          <h3 className="font-medium">Health Score</h3>
          <p className="text-2xl font-bold">{globalEfficiency.toFixed(1)}%</p>
          <p className="text-sm text-muted-foreground">Grade</p>
          <Badge variant={grade === "A+" ? "success" : grade === "B" ? "warning" : "destructive"} className="mt-2">
            {grade}
          </Badge>
        </Card>
      </div>

      {/* Product Entry */}
      <div className="space-y-4">
        <Label className="font-semibold">PRODUCT NAME</Label>
        <p className="text-xs text-muted-foreground">What is the name of the item you are selling?</p>
        <Input
          placeholder="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <Label className="font-semibold">UNIT COST ($)</Label>
        <p className="text-xs text-muted-foreground">How much does it cost to make or buy ONE item? (Materials + Labor)</p>
        <Input
          type="number"
          placeholder="Unit cost"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
        />

        <Label className="font-semibold">AD SPEND PER ITEM ($)</Label>
        <p className="text-xs text-muted-foreground">Estimated advertising cost per sale (e.g. Facebook Ads cost).</p>
        <Input
          type="number"
          placeholder="Ad spend"
          value={adSpend}
          onChange={(e) => setAdSpend(Number(e.target.value))}
        />

        <Label className="font-semibold">SELLING PRICE ($)</Label>
        <p className="text-xs text-muted-foreground">The final price the customer pays you.</p>
        <Input
          type="number"
          placeholder="Selling price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <Label className="font-semibold">STOCK QUANTITY</Label>
        <p className="text-xs text-muted-foreground">How many units are sitting in your house right now?</p>
        <Input
          type="number"
          placeholder="Stock quantity"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <Button
          className="w-full mt-4 bg-green-600 text-white"
          onClick={addItem}
        >
          ➕ Add Item to Inventory
        </Button>
      </div>

      {/* Inventory List */}
      <div>
        <h3 className="font-medium mb-2">Inventory List</h3>
        <ScrollArea className="h-48 rounded-md border p-2">
          {inventory.map((item, index) => {
            const itemProfit = (item.price - item.cost - item.adSpend) * item.qty;
            return (
              <Card
                key={index}
                className="mb-2 p-3 cursor-pointer hover:bg-muted"
                onClick={() => {
                  setSelectedProduct(item);
                  setCurrentView("detail");
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.productName}</span>
                  <Badge variant={itemProfit > 0 ? "success" : "destructive"}>
                    {itemProfit > 0 ? "✅ PROFITABLE" : "⚠️ LOSS"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  In Stock: {item.qty}
                </p>
              </Card>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedProduct) return null;
    const { productName, cost, adSpend, price, qty } = selectedProduct;
    const invested = (cost + adSpend) * qty;
    const profitPerUnit = price - cost - adSpend;
    const totalProfit = profitPerUnit * qty;
    const margin = price ? (profitPerUnit / price) * 100 : 0;
    const maxSafeDiscount = price - (cost + adSpend);
    const breakEvenVolume = profitPerUnit > 0 ? invested / profitPerUnit : Infinity;

    return (
      <div className="w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-semibold">📂 Analysis: {productName}</h2>

        {/* Break-even Analysis */}
        <Card className="p-4">
          <h3 className="font-medium">⚖️ Survival Metric</h3>
          <p>
            You need to sell {breakEvenVolume.toFixed(2)} units just to pay back your costs.
          </p>
          <p>After that, everything is pure profit.</p>
        </Card>

        {/* Financial Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-medium">Total Cost</h3>
            <p className="text-2xl font-bold">${(cost + adSpend) * qty}</p>
            <p className="text-sm text-muted-foreground">Money out (Item + Ads)</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium">Real Profit</h3>
            <p className="text-2xl font-bold">${totalProfit}</p>
            <p className="text-sm text-muted-foreground">Actual Pocket Money</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium">Margin %</h3>
            <p className="text-2xl font-bold">{margin.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">Margin</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium">Max Safe Discount</h3>
            <p className="text-2xl font-bold">${maxSafeDiscount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              You can lower price by this much
            </p>
          </Card>
        </div>

        {/* Verdict */}
        <Card className="p-4">
          {totalProfit < 0 ? (
            <p className="text-red-600">
              ROAST: You are losing money on every sale. Stop ads.
            </p>
          ) : (
            <p className="text-green-600">
              VERDICT: Solid business. Keep scaling.
            </p>
          )}
        </Card>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => deleteItem(inventory.findIndex((i) => i.productName === productName))}
          >
            🗑️ Delete
          </Button>
          <Button
            variant="outline"
            className="flex-2"
            onClick={() => setCurrentView("dashboard")}
          >
            ⬅️ Dashboard
          </Button>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="p-4">
      {currentView === "home" && renderHome()}
      {currentView === "dashboard" && renderDashboard()}
      {currentView === "detail" && renderDetail()}
    </div>
  );
}
