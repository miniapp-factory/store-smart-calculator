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

export default function SavageCfoUltimateERP() {
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

  // form fields for adding product
  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);

  const totalInventoryValue = inventory.reduce(
    (sum, item) => sum + item.cost * item.stock,
    0
  );

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
    setCurrentView("dashboard");
    setSelectedProduct(null);
  };

  const calculateMargin = (item: typeof inventory[0]) => {
    return item.price > 0
      ? ((item.price - item.cost) / item.price) * 100
      : 0;
  };

  const calculateMonths = (item: typeof inventory[0]) => {
    return item.monthlySales > 0
      ? item.stock / item.monthlySales
      : 0;
  };

  const generateScore = () => {
    let score = 100;
    inventory.forEach((item) => {
      const margin = calculateMargin(item);
      const months = calculateMonths(item);
      if (months > 6) score -= 10;
      if (margin < 20) score -= 15;
      if (margin > 50) score += 5;
    });
    return Math.max(0, Math.min(100, score));
  };

  const score = generateScore();
  const verdict =
    score < 50
      ? "I'm calling the liquidators. You are finished."
      : score < 70
      ? "You might want to consider a bailout."
      : "You are in the green. Keep it up!";

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        {currentView === "home" && (
          <h2 className="text-2xl font-semibold">🕵️‍♂️ The Savage CFO</h2>
        )}
        {currentView === "dashboard" && (
          <>
            <h2 className="text-2xl font-semibold">
              {companyName} Dashboard
            </h2>
            <p className="text-sm text-muted-foreground">
              Total Inventory Value: ${totalInventoryValue.toFixed(2)}
            </p>
          </>
        )}
        {currentView === "detail" && selectedProduct && (
          <h2 className="text-2xl font-semibold">
            Analysis for: {selectedProduct.productName}
          </h2>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {currentView === "home" && (
          <>
            <p className="text-lg">
              Welcome to the ultimate business audit tool. I am here to judge
              your pricing strategy. I will analyze your inventory, roast your
              bad decisions, and help you find hidden profits.
            </p>
            <p className="text-sm text-muted-foreground">
              Enter your business name to hire me.
            </p>
            <div className="flex flex-col gap-2">
              <label htmlFor="business-name" className="text-sm font-medium">
                Business Name
              </label>
              <Input
                id="business-name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            <Button
              onClick={() => {
                if (companyName.trim()) setCurrentView("dashboard");
              }}
            >
              Start Audit
            </Button>
          </>
        )}
        {currentView === "dashboard" && (
          <>
            {/* Section A: Fast Add */}
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
                Cost to Buy/Make ($)
              </label>
              <Input
                id="cost"
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                placeholder="0"
              />

              <label htmlFor="price" className="text-sm font-medium">
                Selling Price ($)
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

              <Button onClick={addItem}>Add Item</Button>
            </div>

            {/* Section B: Inventory List */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Stock Level</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item, idx) => (
                    <tr
                      key={idx}
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => {
                        setSelectedProduct(item);
                        setCurrentView("detail");
                      }}
                    >
                      <td>{item.productName}</td>
                      <td>{item.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section C: Global Audit */}
            <div className="mt-4">
              <Button onClick={() => {}}>Judge My Entire Business</Button>
              <p className="mt-2">
                Bankruptcy Score: {score} / 100
              </p>
              <p className="mt-1 font-semibold">{verdict}</p>
            </div>
          </>
        )}
        {currentView === "detail" && selectedProduct && (
          <>
            {/* Logic Display */}
            <div className="p-4 bg-muted rounded-md">
              <p className="text-lg font-semibold">
                Margin %: {calculateMargin(selectedProduct).toFixed(1)}%
              </p>
              <p className="text-lg font-semibold">
                Months of Inventory: {calculateMonths(selectedProduct).toFixed(1)}
              </p>
              {calculateMargin(selectedProduct) < 20 && (
                <p className="text-red-600 mt-2">
                  ROAST: You are running a charity. Raise prices or quit.
                </p>
              )}
              {calculateMonths(selectedProduct) > 6 && (
                <p className="text-red-600 mt-2">
                  ROAST: You are a hoarder. Why is your cash stuck in boxes?
                </p>
              )}
              {calculateMargin(selectedProduct) >= 20 &&
                calculateMonths(selectedProduct) <= 6 && (
                  <p className="text-green-600 mt-2">
                    VERDICT: Surprisingly adequate.
                  </p>
                )}
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-medium">Cost:</p>
                <p>${selectedProduct.cost.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-medium">Price:</p>
                <p>${selectedProduct.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-medium">Margin %:</p>
                <p>{calculateMargin(selectedProduct).toFixed(1)}%</p>
              </div>
              <div>
                <p className="font-medium">Total Value:</p>
                <p>
                  ${(selectedProduct.cost * selectedProduct.stock).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-4 flex gap-2">
              <Button
                variant="destructive"
                onClick={() => deleteItem(selectedProduct)}
              >
                Delete This Item
              </Button>
              <Button onClick={() => setCurrentView("dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
