"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

type Product = {
  productName: string;
  cost: number;
  adSpend: number;
  price: number;
  competitorPrice: number;
  qty: number;
};

export default function SavageCfoMarketWar() {
  const [companyName, setCompanyName] = useState("");
  const [inventory, setInventory] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [form, setForm] = useState({
    productName: "",
    cost: "",
    adSpend: "",
    price: "",
    competitorPrice: "",
    qty: "",
  });

  const addItem = () => {
    const newItem: Product = {
      productName: form.productName,
      cost: parseFloat(form.cost),
      adSpend: parseFloat(form.adSpend),
      price: parseFloat(form.price),
      competitorPrice: parseFloat(form.competitorPrice),
      qty: parseInt(form.qty, 10),
    };
    setInventory([...inventory, newItem]);
    setForm({
      productName: "",
      cost: "",
      adSpend: "",
      price: "",
      competitorPrice: "",
      qty: "",
    });
  };

  const deleteItem = (index: number) => {
    const newInv = [...inventory];
    newInv.splice(index, 1);
    setInventory(newInv);
  };

  const renderHome = () => (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">⚔️ The Savage CFO</h1>
      <p className="text-center max-w-md">
        I am your war general. I will analyze your costs, compare you to competitors, and tell you if you will win or go bankrupt. Enter Company Name to mobilize.
      </p>
      <Label className="w-full">Company Name</Label>
      <Input
        className="w-full"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <Button
        className="w-full bg-black text-white"
        onClick={() => setCurrentView("dashboard")}
      >
        Enter War Room 🚀
      </Button>
    </div>
  );

  const renderDashboard = () => {
    const totalCost = inventory.reduce((sum, p) => sum + p.cost * p.qty, 0);
    const totalAd = inventory.reduce((sum, p) => sum + p.adSpend * p.qty, 0);
    const totalRevenue = inventory.reduce((sum, p) => sum + p.price * p.qty, 0);
    const totalProfit = totalRevenue - totalCost - totalAd;
    const efficiency = totalRevenue ? ((totalProfit / totalRevenue) * 100).toFixed(2) : "0";

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">🏢 {companyName} HQ</h2>
        <div className="flex space-x-4">
          <Card className="flex-1 p-4">
            <h3 className="font-medium">Cash Out</h3>
            <p className="text-xl">${totalCost + totalAd}</p>
          </Card>
          <Card className="flex-1 p-4">
            <h3 className="font-medium">Cash In</h3>
            <p className="text-xl">${totalRevenue}</p>
          </Card>
          <Card className="flex-1 p-4">
            <h3 className="font-medium">War Chest</h3>
            <p className="text-xl">{efficiency}%</p>
            <p className="text-sm text-muted-foreground">Efficiency Score</p>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">INTEL ENTRY</h3>
          <div className="grid grid-cols-1 gap-4">
            <Label className="w-full">PRODUCT NAME</Label>
            <p className="text-sm text-muted-foreground">What are we selling?</p>
            <Input
              className="w-full"
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
            />

            <Label className="w-full">UNIT COST ($)</Label>
            <p className="text-sm text-muted-foreground">Total cost to make one unit.</p>
            <Input
              type="number"
              className="w-full"
              value={form.cost}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
            />

            <Label className="w-full">AD SPEND ($)</Label>
            <p className="text-sm text-muted-foreground">Cost to acquire one customer (CAC).</p>
            <Input
              type="number"
              className="w-full"
              value={form.adSpend}
              onChange={(e) => setForm({ ...form, adSpend: e.target.value })}
            />

            <Label className="w-full">YOUR PRICE ($)</Label>
            <p className="text-sm text-muted-foreground">What you charge.</p>
            <Input
              type="number"
              className="w-full"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <Label className="w-full">COMPETITOR PRICE ($)</Label>
            <p className="text-sm text-muted-foreground">How much does your rival charge for this?</p>
            <Input
              type="number"
              className="w-full"
              value={form.competitorPrice}
              onChange={(e) => setForm({ ...form, competitorPrice: e.target.value })}
            />

            <Label className="w-full">STOCK QTY</Label>
            <p className="text-sm text-muted-foreground">Current inventory count.</p>
            <Input
              type="number"
              className="w-full"
              value={form.qty}
              onChange={(e) => setForm({ ...form, qty: e.target.value })}
            />

            <Button
              className="w-full bg-green-600 text-white mt-4"
              onClick={addItem}
            >
              ➕ Add Strategy
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-medium">INVENTORY LIST</h3>
          <ScrollArea className="h-64">
            {inventory.map((p, idx) => {
              const profit = (p.price - p.cost - p.adSpend) * p.qty;
              const status =
                p.price > p.competitorPrice
                  ? "⚠️ OVERPRICED"
                  : profit < 0
                  ? "💀 LOSING MONEY"
                  : "✅ DOMINATING";
              const statusColor =
                p.price > p.competitorPrice
                  ? "bg-yellow-500 text-white"
                  : profit < 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white";
              return (
                <Card
                  key={idx}
                  className="p-4 mb-2 cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(p);
                    setCurrentView("detail");
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{p.productName}</span>
                    <Badge className={statusColor}>{status}</Badge>
                  </div>
                </Card>
              );
            })}
          </ScrollArea>
        </div>
      </div>
    );
  };

  const renderDetail = () => {
    if (!selectedProduct) return null;
    const { price, competitorPrice, cost, adSpend } = selectedProduct;
    const difference = price - competitorPrice;
    const totalCost = cost + adSpend;
    const realProfit = price - cost - adSpend;
    const margin = ((realProfit / price) * 100).toFixed(2);

    let verdict = "";
    if (realProfit < 0) {
      verdict = "ROAST: You are donating money to your customers. Stop selling immediately.";
    } else if (price > competitorPrice && parseFloat(margin) < 20) {
      verdict = "ROAST: Worst case scenario. You are more expensive than your rival AND you make no money. Fix your supply chain.";
    } else if (price < competitorPrice && parseFloat(margin) > 30) {
      verdict = "VERDICT: The Holy Grail. You are cheaper than them and still rich. Destroy them.";
    } else {
      verdict = "VERDICT: You are surviving, but not thriving. Watch your ad spend.";
    }

    return (
      <div className="space-y-4">
        <Button
          className="w-full bg-black text-white font-bold"
          onClick={() => setCurrentView("dashboard")}
        >
          ⬅️ BACK TO DASHBOARD
        </Button>
        <h2 className="text-2xl font-semibold">📂 Analysis: {selectedProduct.productName}</h2>

        <div className="space-y-2">
          <p>
            {difference > 0
              ? `⚠️ You are $${difference.toFixed(2)} more expensive than your rival.`
              : difference < 0
              ? `✅ You are $${Math.abs(difference).toFixed(2)} cheaper. Good for volume.`
              : `⚖️ You are matched on price. It's a marketing war.`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-medium">Total Cost</h3>
            <p className="text-xl">${totalCost.toFixed(2)}</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium">Real Profit</h3>
            <p className="text-xl">${realProfit.toFixed(2)}</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium">Margin</h3>
            <p className="text-xl">{margin}%</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium">Competitor Price</h3>
            <p className="text-xl">${competitorPrice.toFixed(2)}</p>
          </Card>
        </div>

        <p className="font-medium">{verdict}</p>

        <Button
          className="w-full bg-red-600 text-white"
          onClick={() => {
            const idx = inventory.findIndex((p) => p === selectedProduct);
            if (idx !== -1) deleteItem(idx);
            setCurrentView("dashboard");
          }}
        >
          🗑️ Delete Product
        </Button>
      </div>
    );
  };

  return (
    <div className="p-4">
      {currentView === "home" && renderHome()}
      {currentView === "dashboard" && renderDashboard()}
      {currentView === "detail" && renderDetail()}
    </div>
  );
}
