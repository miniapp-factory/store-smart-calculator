"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function SavageCfoPriceJudge() {
  const [productName, setProductName] = useState<string>("");
  const [makingCost, setMakingCost] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [businessName, setBusinessName] = useState<string>("");

  const profit = sellingPrice - makingCost;
  const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  const getHeadline = () => {
    if (margin < 20) return "Broke CEO";
    if (margin < 50) return "Average Joe";
    return "Money Magnet";
  };

  const getRoast = () => {
    if (margin < 20)
      return `Your ${productName} is a charity project, not a business. Do you hate money?`;
    if (margin < 50)
      return `Your ${productName} is just basic. Maybe try a different niche?`;
    return `Your ${productName} is a masterpiece! The Wolf of Wall Street would be proud.`;
  };

  const getFix = () => {
    if (margin < 20) return "Raise your price by $5 or reduce costs by $3.";
    if (margin < 50) return "Consider a $2 price bump or a bulk discount.";
    return "Keep the momentum—maybe add a premium feature.";
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">{businessName || "The Savage CFO"}</h2>
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
            <h3 className="text-2xl font-bold">{getHeadline()}</h3>
            <p className="text-lg">🔥 {getRoast()}</p>
            <div className="text-sm">
              <p>💰 The Reality Check:</p>
              <p>You spend: ${makingCost.toFixed(2)}</p>
              <p>You keep: ${profit.toFixed(2)}</p>
              <p>Margin: {margin.toFixed(1)}%</p>
            </div>
            <p className="text-sm">🚑 The Fix: {getFix()}</p>
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
            setBusinessName("");
          }}
        >
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
