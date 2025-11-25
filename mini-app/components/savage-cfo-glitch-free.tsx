"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SavageCfoGlitchFree() {
  const [inventory, setInventory] = useState<
    {
      productName: string;
      cost: number;
      adCost: number;
      price: number;
      stock: number;
      monthlySales: number;
    }[]
  >([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<
    {
      productName: string;
      cost: number;
      adCost: number;
      price: number;
      stock: number;
      monthlySales: number;
    } | null
  >(null);

  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adCost, setAdCost] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);

  const addItem = () => {
    const newItem = {
      productName,
      cost,
      adCost,
      price,
      stock,
      monthlySales,
    };
    setInventory((prev) => [...prev, newItem]);
    setProductName("");
    setCost(0);
    setAdCost(0);
    setPrice(0);
    setStock(0);
    setMonthlySales(0);
  };

  const deleteItem = (index: number) => {
    setInventory((prev) => prev.filter((_, i) => i !== index));
    setCurrentView("dashboard");
  };

  const totalInvestedCapital = inventory.reduce(
    (sum, item) => sum + (item.cost + item.adCost) * item.stock,
    0
  );
  const potentialNetProfit = inventory.reduce(
    (sum, item) => sum + (item.price - item.cost - item.adCost) * item.stock,
    0
  );
  const totalRevenue = inventory.reduce(
    (sum, item) => sum + item.price * item.stock,
    0
  );
  const totalProfit = potentialNetProfit;
  const efficiencyScore =
    totalRevenue > 0 ? Math.min((totalProfit / totalRevenue) * 100, 100) : 0;

  const renderBar = (percentage: number, color: string) => (
    <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
      <div
        className={`h-full ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  const renderDetail = () => {
    if (!selectedProduct) return null;
    const { productName, cost, adCost, price, stock, monthlySales } =
      selectedProduct;
    const netProfit = price - cost - adCost;
    const grossMargin = price > 0 ? ((price - cost - adCost) / price) * 100 : 0;
    const marketingImpact = price > 0 ? (adCost / price) * 100 : 0;
    const roi = (netProfit / (cost + adCost)) * 100;
    const totalCost = cost + adCost;
    const breakEvenPrice = totalCost;
    const verdict =
      netProfit < 0
        ? "ROAST: You are losing money on every sale! Stop ads immediately."
        : "VERDICT: This is a scalable product. Good job.";

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          📂 Analysis: {productName}
        </h2>
        <div className="space-y-2">
          <div>
            <Label>Gross Margin ({grossMargin.toFixed(1)}%)</Label>
            {renderBar(grossMargin, "bg-blue-500")}
            <p className="text-sm text-muted-foreground">
              How much of the price is actually profit.
            </p>
          </div>
          <div>
            <Label>Marketing Impact ({marketingImpact.toFixed(1)}%)</Label>
            {renderBar(marketingImpact, "bg-red-500")}
            <p className="text-sm text-muted-foreground">
              How much of the price goes to Mark Zuckerberg.
            </p>
          </div>
          <div>
            <Label>ROI ({roi.toFixed(1)}%)</Label>
            {renderBar(roi, "bg-green-500")}
            <p className="text-sm text-muted-foreground">
              For every $1 you spend, you get this much back.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <p className="font-medium">Total Cost: ${totalCost.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                Item Cost + Ads
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="font-medium">Selling Price: ${price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                What customer pays
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="font-medium">
                Real Net Profit: ${netProfit.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                Cash in your pocket
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="font-medium">
                Break-Even Price: ${breakEvenPrice.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                Minimum price to not lose money
              </p>
            </CardContent>
          </Card>
        </div>
        <p className="text-lg font-semibold">{verdict}</p>
        <div className="flex gap-2 w-full">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => {
              const index = inventory.findIndex(
                (i) => i.productName === productName
              );
              if (index !== -1) deleteItem(index);
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
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="space-y-4 w-full max-w-md">
      <h1 className="text-2xl font-bold">🕵️‍♂️ The Savage CFO</h1>
      <p className="text-muted-foreground">
        The ultimate tool for starting and managing a business. I will audit your inventory, calculate your true costs (including ads), and explain complex business math in simple terms. Enter your company name to begin.
      </p>
      <Input
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <Button
        className="w-full bg-black text-white"
        onClick={() => setCurrentView("dashboard")}
      >
        Start Audit 🚀
      </Button>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6 w-full max-w-4xl">
      <h1 className="text-2xl font-bold">🏢 {companyName} HQ</h1>
      <Card>
        <CardContent>
          <p>Total Invested Capital: ${totalInvestedCapital.toFixed(2)}</p>
          <p>Potential Net Profit: ${potentialNetProfit.toFixed(2)}</p>
          <p>Business Efficiency Score:</p>
          {renderBar(efficiencyScore, "bg-blue-500")}
          <p className="text-sm text-muted-foreground">
            This score shows if your business is healthy.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Advanced Product Entry</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Making/Buying Cost ($)"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Ad Spend per Item ($)"
            value={adCost}
            onChange={(e) => setAdCost(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Selling Price ($)"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Stock Qty"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Monthly Sales"
            value={monthlySales}
            onChange={(e) => setMonthlySales(Number(e.target.value))}
          />
        </CardContent>
        <CardFooter>
          <Button
            variant="default"
            className="w-full bg-green-500 text-white"
            onClick={addItem}
          >
            ➕ Add Item
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">
            Inventory List
          </h2>
        </CardHeader>
        <CardContent>
          <p>Tap a card below to view the ROI Report.</p>
          <ScrollArea className="h-64">
            <div className="grid gap-2">
              {inventory.map((item, idx) => {
                const netProfit = item.price - item.cost - item.adCost;
                const roi = (netProfit / (item.cost + item.adCost)) * 100;
                return (
                  <Card
                    key={idx}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(item);
                      setCurrentView("detail");
                    }}
                  >
                    <CardContent className="flex justify-between items-center">
                      <span className="font-semibold">{item.productName}</span>
                      <Badge>
                        {roi < 100 ? "⚠️ RISKY" : "🚀 SCALABLE"}
                      </Badge>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                      Stock: {item.stock} | Net Profit: $
                      {(item.price - item.cost - item.adCost).toFixed(2)}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-4">
      {currentView === "home" && renderHome()}
      {currentView === "dashboard" && renderDashboard()}
      {currentView === "detail" && renderDetail()}
    </div>
  );
}
