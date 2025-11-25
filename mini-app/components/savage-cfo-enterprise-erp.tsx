"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function SavageCfoEnterpriseERP() {
  const [companyName, setCompanyName] = useState<string>("");
  const [inventoryList, setInventoryList] = useState<
    {
      productName: string;
      cost: number;
      price: number;
      stock: number;
      monthlySales: number;
    }[]
  >([]);
  const [currentView, setCurrentView] = useState<"start" | "dashboard">("start");

  // Form fields for adding product
  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);

  const totalInventoryValue = inventoryList.reduce((sum, item) => sum + item.cost * item.stock, 0);

  const addToInventory = () => {
    if (!productName) return;
    const newItem = { productName, cost, price, stock, monthlySales };
    setInventoryList([...inventoryList, newItem]);
    setProductName("");
    setCost(0);
    setPrice(0);
    setStock(0);
    setMonthlySales(0);
  };

  const calculateMargin = (item: typeof inventoryList[0]) => {
    return item.price > 0 ? ((item.price - item.cost) / item.price) * 100 : 0;
  };

  const calculateStockDuration = (item: typeof inventoryList[0]) => {
    return item.monthlySales > 0 ? item.stock / item.monthlySales : 0;
  };

  const getStatus = (item: typeof inventoryList[0]) => {
    const duration = calculateStockDuration(item);
    const margin = calculateMargin(item);
    if (duration > 6) return "💀 Dead Stock";
    if (margin < 20) return "💸 Charity";
    return "✅ Healthy";
  };

  const generateReport = () => {
    let score = 100;
    inventoryList.forEach((item) => {
      const status = getStatus(item);
      if (status === "💀 Dead Stock") score -= 10;
      if (status === "💸 Charity") score -= 15;
      if (calculateMargin(item) > 50) score += 5;
    });
    return score;
  };

  const score = generateReport();
  const verdict =
    score < 50
      ? "I'm calling the liquidators. You are finished."
      : score < 70
      ? "You might want to consider a bailout."
      : "You are in the green. Keep it up!";

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <h2 className="text-2xl font-semibold">
          {currentView === "start"
            ? "💼 The Savage CFO Enterprise Edition"
            : `${companyName} HQ`}
        </h2>
        {currentView === "dashboard" && (
          <p className="text-sm text-muted-foreground">
            Total Inventory Value: ${totalInventoryValue.toFixed(2)}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {currentView === "start" && (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="company-name" className="text-sm font-medium">
                Enter Company Name
              </label>
              <Input
                id="company-name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company name"
              />
            </div>
            <Button
              onClick={() => {
                if (companyName.trim()) setCurrentView("dashboard");
              }}
            >
              Hire CFO & Begin
            </Button>
          </>
        )}
        {currentView === "dashboard" && (
          <>
            {/* Section A: Product Entry */}
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="product-name" className="text-sm font-medium">
                Product Name
              </label>
              <Input
                id="product-name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />

              <label htmlFor="cost" className="text-sm font-medium">
                Cost ($)
              </label>
              <Input
                id="cost"
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                placeholder="0"
              />

              <label htmlFor="price" className="text-sm font-medium">
                Price ($)
              </label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="0"
              />

              <label htmlFor="stock" className="text-sm font-medium">
                Stock Qty
              </label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                placeholder="0"
              />

              <label htmlFor="monthly-sales" className="text-sm font-medium">
                Monthly Sales
              </label>
              <Input
                id="monthly-sales"
                type="number"
                value={monthlySales}
                onChange={(e) => setMonthlySales(Number(e.target.value))}
                placeholder="0"
              />

              <Button onClick={addToInventory}>Add to Inventory</Button>
            </div>

            {/* Section B: Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Margin %</th>
                    <th className="text-left">Stock Duration (Months)</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryList.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.productName}</td>
                      <td>{calculateMargin(item).toFixed(1)}%</td>
                      <td>{calculateStockDuration(item).toFixed(1)}</td>
                      <td>{getStatus(item)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section C: Savage Algorithm */}
            <div className="mt-4">
              <Button onClick={() => {}}>Generate Company Report</Button>
              <p className="mt-2">
                Bankruptcy Score: {score} / 100
              </p>
              <p className="mt-1 font-semibold">{verdict}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
