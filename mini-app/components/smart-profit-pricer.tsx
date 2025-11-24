"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function SmartProfitPricer() {
  const [productName, setProductName] = useState<string>("");
  const [wholesaleCost, setWholesaleCost] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const unitCost = wholesaleCost / quantity;
  const overhead = unitCost * 1.15;
  const profit = overhead * 1.4;
  const recommendedPrice = Math.ceil(profit * 20) / 20; // round up to nearest 0.05
  const netProfitPerItem = recommendedPrice - unitCost;
  const totalProfit = netProfitPerItem * quantity;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">Smart Profit Pricer</h2>
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
          <label htmlFor="wholesale-cost" className="text-sm font-medium">
            Total Wholesale Cost ($)
          </label>
          <Input
            id="wholesale-cost"
            type="number"
            value={wholesaleCost}
            onChange={(e) => setWholesaleCost(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity in Batch
          </label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        {quantity > 0 && wholesaleCost > 0 && (
          <div className="mt-4">
            <h3 className="text-3xl font-bold">🏷️ ${recommendedPrice.toFixed(2)}</h3>
            <p className="text-sm text-muted-foreground">
              Net Profit per item: ${netProfitPerItem.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Total Profit if sold out: ${totalProfit.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Offer a 10% discount if customers buy 2 or more!
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="button" variant="outline" onClick={() => {
          setProductName("");
          setWholesaleCost(0);
          setQuantity(0);
        }}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
