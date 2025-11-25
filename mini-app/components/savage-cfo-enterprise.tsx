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

export default function SavageCfoEnterprise() {
  const [productName, setProductName] = useState<string>("");
  const [makingCost, setMakingCost] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);
  const [businessName, setBusinessName] = useState<string>("");

  const margin =
    sellingPrice > 0 ? ((sellingPrice - makingCost) / sellingPrice) * 100 : 0;
  const totalInventoryValue = makingCost * stock;
  const totalPotentialRevenue = sellingPrice * stock;
  const potentialNetProfit = (sellingPrice - makingCost) * stock;
  const breakEvenPrice =
    makingCost + makingCost * 0.15; // simplified overhead
  const monthsOfInventory =
    monthlySales > 0 ? stock / monthlySales : 0;
  const burnRateStatus =
    monthsOfInventory > 6
      ? "hoarding"
      : monthsOfInventory < 1
      ? "running dry"
      : "balanced";

  const headline =
    monthsOfInventory > 6
      ? "Inventory Hoarder"
      : margin < 20
      ? "Logistics Nightmare"
      : "Profit God";

  const status =
    monthsOfInventory > 6
      ? "Overstocked"
      : monthsOfInventory < 1
      ? "Critical Low"
      : "Balanced";

  const recommendedSalePrice = sellingPrice * 0.9;

  const roast =
    margin < 20
      ? "You are running a charity. Stop it."
      : monthsOfInventory > 6
      ? `You have way too much ${productName}. Are you building a fort with them? Sell them now!`
      : monthsOfInventory < 1
      ? "You're going to run out of stock next week. Do you hate making money? Restock!"
      : "Your inventory strategy is on point.";

  const jsonExport = {
    sku: productName,
    qty: stock,
    value: totalInventoryValue,
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">
          {businessName || "The Savage CFO"}
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
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
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="making-cost" className="text-sm font-medium">
            Making Cost ($)
          </label>
          <Input
            id="making-cost"
            type="number"
            value={makingCost}
            onChange={(e) => setMakingCost(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="selling-price" className="text-sm font-medium">
            Selling Price ($)
          </label>
          <Input
            id="selling-price"
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="stock" className="text-sm font-medium">
            Current Stock Level
          </label>
          <Input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="monthly-sales" className="text-sm font-medium">
            Estimated Monthly Sales (Units)
          </label>
          <Input
            id="monthly-sales"
            type="number"
            value={monthlySales}
            onChange={(e) => setMonthlySales(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="business-name" className="text-sm font-medium">
            Your Business Name
          </label>
          <Input
            id="business-name"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter business name"
          />
        </div>

        {sellingPrice > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-2xl font-bold">{headline}</h3>

            <div className="text-sm">
              <p>📊 The Inventory Array:</p>
              <p>Status: {status}</p>
              <p>Warehouse Value (Cost): ${totalInventoryValue.toFixed(2)}</p>
              <p>Potential Revenue: ${totalPotentialRevenue.toFixed(2)}</p>
              <p>Liquidity Trap: ${totalInventoryValue.toFixed(2)} (Cash stuck in boxes)</p>
            </div>

            <div className="text-sm">
              <p>💰 Pricing & Margin Deep Dive:</p>
              <p>Break‑Even Price: ${breakEvenPrice.toFixed(2)}</p>
              <p>Current Margin: {margin.toFixed(1)}%</p>
              <p>Recommended Sale Price: ${recommendedSalePrice.toFixed(2)}</p>
            </div>

            <div className="text-sm">
              <p>🔥 The Executive Roast:</p>
              <p>{roast}</p>
            </div>

            <div className="text-sm">
              <p>💾 JSON Export:</p>
              <pre>{JSON.stringify(jsonExport, null, 2)}</pre>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setProductName("");
            setMakingCost(0);
            setSellingPrice(0);
            setStock(0);
            setMonthlySales(0);
            setBusinessName("");
          }}
        >
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
