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

export default function SavageCfoUXRemastered() {
  const [companyName, setCompanyName] = useState<string>("");
  const [inventory, setInventory] = useState<
    {
      productName: string;
      cost: number;
      price: number;
      stock: number;
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
      price: number;
      stock: number;
      monthlySales: number;
    } | null
  >(null);

  // Form fields for adding a product
  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);

  const totalInvested = inventory.reduce(
    (sum, item) => sum + item.cost * item.stock,
    0
  );
  const totalProfit = inventory.reduce(
    (sum, item) => sum + (item.price - item.cost) * item.stock,
    0
  );
  const portfolioHealth =
    totalProfit > totalInvested ? "✅ Green" : "🔻 Red";

  const addItem = () => {
    if (!productName) return;
    const newItem = { productName, cost, price, stock, monthlySales };
    setInventory([...inventory, newItem]);
    setProductName("");
    setCost(0);
    setPrice(0);
    setStock(0);
    setMonthlySales(0);
  };

  const deleteItem = (item: typeof inventory[0]) => {
    setInventory(inventory.filter((i) => i !== item));
    setSelectedProduct(null);
    setCurrentView("dashboard");
  };

  const calculateMargin = (item: typeof inventory[0]) => {
    return item.price > 0
      ? ((item.price - item.cost) / item.price) * 100
      : 0;
  };

  const calculateStockDuration = (item: typeof inventory[0]) => {
    return item.monthlySales > 0
      ? item.stock / item.monthlySales
      : 0;
  };

  const breakEven = (item: typeof inventory[0]) => {
    return item.cost * 1.15;
  };

  const totalAssetValue = (item: typeof inventory[0]) => {
    return item.cost * item.stock;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        {currentView === "home" && (
          <h2 className="text-2xl font-semibold">🕵️‍♂️ The Savage CFO</h2>
        )}
        {currentView === "dashboard" && (
          <>
            <h2 className="text-2xl font-semibold">
              🏢 {companyName} HQ
            </h2>
          </>
        )}
        {currentView === "detail" && selectedProduct && (
          <h2 className="text-2xl font-semibold">
            📂 Case File: {selectedProduct.productName}
          </h2>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {currentView === "home" && (
          <>
            <p className="text-lg">
              I am here to audit your business. Enter your company name to begin.
            </p>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="company-name"
                className="text-sm font-medium"
              >
                Company Name
              </label>
              <Input
                id="company-name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            <Button
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={() => {
                if (companyName.trim()) setCurrentView("dashboard");
              }}
            >
              Start Audit 🚀
            </Button>
          </>
        )}
        {currentView === "dashboard" && (
          <>
            {/* Section A: Global Stats Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="font-medium">Total Invested Capital:</p>
                <p>${totalInvested.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-medium">Total Potential Profit:</p>
                <p>${totalProfit.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-medium">Portfolio Health:</p>
                <p>{portfolioHealth}</p>
              </div>
            </div>

            {/* Section B: Fast Add */}
            <div className="grid grid-cols-1 gap-2">
              <label
                htmlFor="product-name"
                className="text-sm font-medium"
              >
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

              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={addItem}
              >
                ➕ Add Item to Inventory
              </Button>
            </div>

            {/* Section C: Inventory List */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Tap a product below to open its file.
              </p>
              <div className="grid grid-cols-1 gap-2">
                {inventory.map((item, idx) => (
                  <Card
                    key={idx}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => {
                      setSelectedProduct(item);
                      setCurrentView("detail");
                    }}
                  >
                    <CardContent className="flex justify-between items-center">
                      <span>
                        {item.productName} (Qty: {item.stock})
                      </span>
                      <span className="text-sm text-muted-foreground">
                        View Stats 👉
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
        {currentView === "detail" && selectedProduct && (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <p className="font-medium">Unit Margin:</p>
                <p>
                  {calculateMargin(selectedProduct).toFixed(1)}%
                </p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-medium">Break‑Even Point:</p>
                <p>${breakEven(selectedProduct).toFixed(2)}</p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-medium">Stock Duration:</p>
                <p>
                  {calculateStockDuration(selectedProduct).toFixed(1)} Months
                </p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-medium">Total Asset Value:</p>
                <p>${totalAssetValue(selectedProduct).toFixed(2)}</p>
              </div>
            </div>

            {/* Judgement */}
            <div className="mt-4 p-4 bg-muted rounded-md">
              {calculateMargin(selectedProduct) < 20 ||
              calculateStockDuration(selectedProduct) > 6 ? (
                <p className="text-red-600 font-semibold">
                  ROAST: Why do you hate money?
                </p>
              ) : (
                <p className="text-green-600 font-semibold">PASSED</p>
              )}
            </div>

            {/* Navigation */}
            <div className="mt-4 flex gap-2">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => deleteItem(selectedProduct)}
              >
                🗑️ Delete Item
              </Button>
              <Button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-full"
                onClick={() => setCurrentView("dashboard")}
              >
                ⬅️ Back to Dashboard
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
