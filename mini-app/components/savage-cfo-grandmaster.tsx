"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SavageCfoGrandmaster() {
  const [companyName, setCompanyName] = useState<string>("");
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "detail">("home");
  const [inventory, setInventory] = useState<
    {
      productName: string;
      cost: number;
      price: number;
      competitorPrice: number;
      qty: number;
    }[]
  >([]);
  const [selectedProduct, setSelectedProduct] = useState<
    {
      productName: string;
      cost: number;
      price: number;
      competitorPrice: number;
      qty: number;
    } | null
  >(null);

  // form state
  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);

  const addStrategy = () => {
    if (!productName) return;
    setInventory((prev) => [
      ...prev,
      { productName, cost, price, competitorPrice, qty },
    ]);
    setProductName("");
    setCost(0);
    setPrice(0);
    setCompetitorPrice(0);
    setQty(0);
  };

  const deleteProduct = (index: number) => {
    setInventory((prev) => prev.filter((_, i) => i !== index));
    setCurrentView("dashboard");
  };

  const computeReport = () => {
    const totalProfit = inventory.reduce(
      (sum, p) => sum + (p.price - p.cost) * p.qty,
      0
    );
    const totalRevenue = inventory.reduce((sum, p) => sum + p.price * p.qty, 0);
    const efficiency = totalRevenue ? (totalProfit / totalRevenue) * 100 : 0;
    let grade = "F (Bankrupt)";
    if (efficiency > 40) grade = "A+ (Legendary)";
    else if (efficiency > 20) grade = "B (Solid)";
    else if (efficiency > 0) grade = "C (Surviving)";
    return { totalProfit, efficiency, grade };
  };

  const verdict = (p: typeof inventory[0]) => {
    const margin = p.price ? ((p.price - p.cost) / p.price) * 100 : 0;
    const priceDiff = p.price - p.competitorPrice;
    if (p.price < p.cost) return "💀 FATAL ERROR: You are selling at a loss. Stop immediately.";
    if (p.price < p.competitorPrice && margin > 20)
      return "🏆 THE HOLY GRAIL: You are cheaper than rivals AND profitable. This is how you win.";
    if (p.price > p.competitorPrice && margin > 40)
      return "💎 LUXURY BRAND: You are expensive, but your high margins prove people love your quality. Good job.";
    if (p.price > p.competitorPrice && margin < 20)
      return "⚠️ DANGER ZONE: You are expensive AND have low margins. You will lose to competitors. Lower your costs!";
    return "✅ STABLE: You are doing okay, but watch your ad spend.";
  };

  const statusBadge = (p: typeof inventory[0]) => {
    if (p.price > p.competitorPrice) return "DOMINATING";
    if (p.price < p.competitorPrice) return "LOSING MONEY";
    return "OVERPRICED";
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {currentView === "home" && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">⚔️ The Savage CFO</h1>
          <p className="text-center">
            I am your War General. I will grade your business performance and analyze your market position. Enter your Company Name to mobilize.
          </p>
          <Input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="p-3 border-2 border-black rounded-md"
          />
          <Button
            onClick={() => setCurrentView("dashboard")}
            className="font-bold shadow-[4px_4px_0px_#000] bg-black text-white"
          >
            ENTER WAR ROOM 🚀
          </Button>
        </div>
      )}

      {currentView === "dashboard" && (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">🏢 {companyName} HQ</h2>

          {/* Section A: Report Card */}
          <Card className="border-2 border-black p-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">
                Total Profit: ${computeReport().totalProfit.toFixed(2)}
              </p>
            </div>
            <Badge className="text-xl font-bold">
              {computeReport().grade}
            </Badge>
          </Card>

          {/* Section B: Intel Entry */}
          <Card className="p-4 bg-gray-100">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="uppercase font-bold">PRODUCT NAME</Label>
                <Input
                  placeholder="e.g. Super Burger"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="p-3 border-2 border-black rounded-md"
                />
              </div>
              <div>
                <Label className="uppercase font-bold">UNIT COST ($)</Label>
                <p className="text-sm text-muted-foreground">Cost to make + Ad Spend</p>
                <Input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="p-3 border-2 border-black rounded-md"
                />
              </div>
              <div>
                <Label className="uppercase font-bold">YOUR PRICE ($)</Label>
                <p className="text-sm text-muted-foreground">What you charge</p>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="p-3 border-2 border-black rounded-md"
                />
              </div>
              <div>
                <Label className="uppercase font-bold">COMPETITOR PRICE ($)</Label>
                <p className="text-sm text-muted-foreground">What rivals charge</p>
                <Input
                  type="number"
                  value={competitorPrice}
                  onChange={(e) => setCompetitorPrice(Number(e.target.value))}
                  className="p-3 border-2 border-black rounded-md"
                />
              </div>
              <div>
                <Label className="uppercase font-bold">STOCK QTY</Label>
                <Input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="p-3 border-2 border-black rounded-md"
                />
              </div>
              <Button
                onClick={addStrategy}
                className="font-bold shadow-[4px_4px_0px_#000] bg-green-600 text-black border-2 border-black"
              >
                ➕ ADD STRATEGY
              </Button>
            </div>
          </Card>

          {/* Section C: Inventory Cards */}
          <ScrollArea className="h-64">
            <div className="grid grid-cols-1 gap-4">
              {inventory.map((p, idx) => (
                <Card
                  key={idx}
                  className="border-2 border-black p-4 shadow-md cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(p);
                    setCurrentView("detail");
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{p.productName}</h3>
                    <Badge>{statusBadge(p)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Stock: {p.qty}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {currentView === "detail" && selectedProduct && (
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => setCurrentView("dashboard")}
            className="w-full font-bold shadow-[4px_4px_0px_#000] bg-black text-white py-3"
          >
            ⬅️ BACK TO DASHBOARD
          </Button>
          <h2 className="text-2xl font-bold">
            📂 Analysis: {selectedProduct.productName}
          </h2>

          {/* Part 1: Verdict */}
          <Card className="p-4 bg-gray-100">
            <p className="text-lg font-semibold">{verdict(selectedProduct)}</p>
          </Card>

          {/* Part 2: Numbers Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 border-2 border-black">
              <p className="text-sm text-muted-foreground">Total Cost</p>
              <p className="text-lg font-bold">
                ${selectedProduct.cost.toFixed(2)}
              </p>
            </Card>
            <Card className="p-4 border-2 border-black">
              <p className="text-sm text-muted-foreground">Competitor Price</p>
              <p className="text-lg font-bold">
                ${selectedProduct.competitorPrice.toFixed(2)}
              </p>
            </Card>
            <Card className="p-4 border-2 border-black">
              <p className="text-sm text-muted-foreground">Real Profit</p>
              <p className="text-lg font-bold">
                ${(selectedProduct.price - selectedProduct.cost).toFixed(2)}
              </p>
            </Card>
            <Card className="p-4 border-2 border-black">
              <p className="text-sm text-muted-foreground">Margin</p>
              <p className="text-lg font-bold">
                {(
                  selectedProduct.price
                    ? ((selectedProduct.price - selectedProduct.cost) /
                        selectedProduct.price) *
                      100
                    : 0
                ).toFixed(1)}
                %
              </p>
            </Card>
          </div>

          {/* Part 3: Delete Action */}
          <Button
            onClick={() => deleteProduct(inventory.indexOf(selectedProduct))}
            className="font-bold shadow-[4px_4px_0px_#000] bg-red-600 text-black border-2 border-black"
          >
            🗑️ BURN THIS PRODUCT
          </Button>
        </div>
      )}
    </div>
  );
}
