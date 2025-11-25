"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function SmartProfitPricer() {
  const [productName, setProductName] = useState<string>("");
  const [wholesaleCost, setWholesaleCost] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const unitCost = quantity > 0 ? wholesaleCost / quantity : 0;
  const overhead = unitCost * 0.15;
  const breakEvenPrice = unitCost + overhead;
  const regularSellingPriceRaw = breakEvenPrice * (1 + profitMargin / 100);
  const regularSellingPrice = Math.ceil(regularSellingPriceRaw * 20) / 20;
  const salePriceRaw = regularSellingPrice * (1 - discount / 100);
  const salePrice = Math.ceil(salePriceRaw * 20) / 20;
  const netProfitPerItem = regularSellingPrice - breakEvenPrice;
  const totalProfit = netProfitPerItem * quantity;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">Pro Business Pricer</h2>
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
        <div className="flex flex-col gap-2">
          <label htmlFor="profit-margin" className="text-sm font-medium">
            Desired Profit Margin (%)
          </label>
          <Input
            id="profit-margin"
            type="number"
            value={profitMargin}
            onChange={(e) => setProfitMargin(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="discount" className="text-sm font-medium">
            Planned Discount for Sale (%)
          </label>
          <Input
            id="discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        {quantity > 0 && wholesaleCost > 0 && profitMargin > 0 && (
          <div className="mt-4">
            <h3 className="text-3xl font-bold">🏷️ Pricing Strategy for {productName || "Product"}</h3>
            <p className="text-4xl font-extrabold mt-2">Regular Selling Price: ${regularSellingPrice.toFixed(2)}</p>
            <div className="mt-4">
              <h4 className="text-xl font-semibold">🔥 Sale Option:</h4>
              <p>Sale Price: ${salePrice.toFixed(2)} (Discount: {discount}%)</p>
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold">📊 Financial Breakdown:</h4>
              <p>Break-Even Price (Zero Profit): ${breakEvenPrice.toFixed(2)}</p>
              <p>Net Profit per item: ${netProfitPerItem.toFixed(2)}</p>
              <p>Total Profit from Batch: ${totalProfit.toFixed(2)}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Tip: Use the discount when you have excess inventory or want to boost sales volume.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="button" variant="outline" onClick={() => {
          setProductName("");
          setWholesaleCost(0);
          setQuantity(0);
          setProfitMargin(0);
          setDiscount(0);
        }}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
