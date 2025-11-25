"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SavageCfoUltimateHybrid() {
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
  const potentialRevenue = inventory.reduce(
    (sum, item) => sum + item.price * item.stock,
    0
  );
  const totalProfit = inventory.reduce(
    (sum, item) => sum + (item.price - item.cost) * item.stock,
    0
  );
  const globalMargin = potentialRevenue > 0 ? (totalProfit / potentialRevenue) * 100 : 0;

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
    return item.price > 0 ? ((item.price - item.cost) / item.price) * 100 : 0;
  };

  const stockSalesRatio = (item: typeof inventory[0]) => {
    return item.monthlySales > 0 ? item.stock / item.monthlySales : 0;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        {currentView === "home" && (
          <h2 className="text-2xl font-semibold">🕵️‍♂️ The Savage CFO</h2>
        )}
        {currentView === "dashboard" && (
          <h2 className="text-2xl font-semibold">🏢 {companyName} HQ</h2>
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
              Welcome, Entrepreneur. I am here to audit your business. I will analyze your inventory, calculate your true margins, and roast your bad decisions. Enter your company name to begin the audit.
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
            {/* SECTION A: GLOBAL INTELLIGENCE */}
            <div className="flex flex-col gap-2">
              <p className="font-medium">Total Invested Capital: ${totalInvested.toLocaleString()}</p>
              <p className="font-medium">Potential Revenue: ${potentialRevenue.toLocaleString()}</p>
              <p className="font-medium">Company Efficiency Score:</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${globalMargin}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {globalMargin.toFixed(1)}% Efficiency
              </p>
            </div>

            {/* SECTION B: PRODUCT ENTRY */}
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
                ➕ Add Item
              </Button>
            </div>

            {/* SECTION C: INVENTORY LIST */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Tap a card below to view full Case File.
              </p>
              <div className="flex flex-col gap-2">
                {inventory.map((item, idx) => {
                  const margin = calculateMargin(item);
                  const ratio = stockSalesRatio(item);
                  const isRoast = margin < 20 || ratio > 6;
                  return (
                    <Card
                      key={idx}
                      className="bg-white rounded-md shadow-sm p-4 cursor-pointer hover:bg-muted"
                      onClick={() => {
                        setSelectedProduct(item);
                        setCurrentView("detail");
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{item.productName}</span>
                        <Badge
                          className={`text-xs ${
                            isRoast
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {isRoast ? "🔥 ROAST ME" : "✅ GOOD"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Stock: {item.stock} | Net Profit: $
                        {(item.price - item.cost).toFixed(2)}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {currentView === "detail" && selectedProduct && (
          <>
            {/* PART 1: VISUAL ANALYSIS */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="font-medium">Profit Margin ({calculateMargin(selectedProduct).toFixed(1)}%)</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{
                      width: `${calculateMargin(selectedProduct)}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <p className="font-medium">Stock Health ({stockSalesRatio(selectedProduct).toFixed(2)} Months)</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-yellow-500 h-4 rounded-full"
                    style={{
                      width: `${Math.min(
                        stockSalesRatio(selectedProduct) * 10,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* PART 2: HARD NUMBERS */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-2 bg-muted rounded-md">
                <p className="text-sm font-medium">Unit Cost</p>
                <p className="text-lg">${selectedProduct.cost.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-sm font-medium">Selling Price</p>
                <p className="text-lg">${selectedProduct.price.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-sm font-medium">Net Profit Per Item</p>
                <p className="text-lg">
                  ${ (selectedProduct.price - selectedProduct.cost).toFixed(2) }
                </p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-sm font-medium">Break-Even Price</p>
                <p className="text-lg">
                  ${ (selectedProduct.cost * 1.15).toFixed(2) }
                </p>
              </div>
            </div>

            {/* PART 3: VERDICT */}
            <div className="mt-4 p-4 bg-muted rounded-md">
              {calculateMargin(selectedProduct) < 20 ? (
                <p className="text-red-600 font-semibold">
                  ROAST: You are running a charity. Raise your price immediately.
                </p>
              ) : stockSalesRatio(selectedProduct) > 6 ? (
                <p className="text-red-600 font-semibold">
                  ROAST: Cash flow nightmare. You are hoarding stock.
                </p>
              ) : (
                <p className="text-green-600 font-semibold">
                  PASSED: This product is actually making money. Good job.
                </p>
              )}
            </div>

            {/* NAVIGATION */}
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
                ⬅️ BACK TO DASHBOARD
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
