import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SavageCfoExecutivePro() {
  // State
  const [inventory, setInventory] = useState<
    {
      productName: string;
      cost: number;
      adSpend: number;
      price: number;
      competitorPrice: number;
      qty: number;
    }[]
  >([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [currentView, setCurrentView] = useState<
    "home" | "dashboard" | "detail"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<
    | {
        productName: string;
        cost: number;
        adSpend: number;
        price: number;
        competitorPrice: number;
        qty: number;
      }
    | undefined
  >(undefined);

  // Form fields for adding product
  const [productName, setProductName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [competitorPrice, setCompetitorPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);

  // Helpers
  const computeReport = () => {
    const totalCapitalAtRisk = inventory.reduce(
      (sum, p) => sum + (p.cost + p.adSpend) * p.qty,
      0
    );
    const projectedNetProfit = inventory.reduce(
      (sum, p) => sum + (p.price - p.cost - p.adSpend) * p.qty,
      0
    );
    const totalRevenue = inventory.reduce((sum, p) => sum + p.price * p.qty, 0);
    const blendedMargin =
      totalRevenue > 0 ? (projectedNetProfit / totalRevenue) * 100 : 0;
    const inventoryVolume = inventory.reduce((sum, p) => sum + p.qty, 0);
    return {
      totalCapitalAtRisk,
      projectedNetProfit,
      blendedMargin,
      inventoryVolume,
    };
  };

  const verdict = (p: {
    price: number;
    competitorPrice: number;
  }) => {
    if (p.price < p.competitorPrice) {
      return `✅ MARKET ADVANTAGE: You are undercutting rivals by $${(
        p.competitorPrice - p.price
      ).toFixed(2)}.`;
    }
    if (p.price > p.competitorPrice) {
      return `💎 PREMIUM POSITION: You are charging $${(
        p.price - p.competitorPrice
      ).toFixed(2)} more than rivals.`;
    }
    return "⚖️ EVEN PLAY: You match the market price.";
  };

  const statusBadge = (p: {
    price: number;
    competitorPrice: number;
  }) => {
    return p.price > p.competitorPrice ? "💎 PREMIUM" : "⚡ COMPETITIVE";
  };

  const addStrategy = () => {
    const newProduct = {
      productName,
      cost,
      adSpend,
      price,
      competitorPrice,
      qty,
    };
    setInventory((prev) => [...prev, newProduct]);
    // reset form
    setProductName("");
    setCost(0);
    setAdSpend(0);
    setPrice(0);
    setCompetitorPrice(0);
    setQty(0);
  };

  const deleteProduct = (index: number) => {
    setInventory((prev) => prev.filter((_, i) => i !== index));
    setCurrentView("dashboard");
  };

  // Render
  const renderHome = () => (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">💼 The Business Auditor</h1>
      <p className="mb-6">
        Professional financial audit tool. I calculate hidden costs, true margins,
        and break-even points. Enter Company Name.
      </p>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="w-full p-3 text-base border border-gray-300 appearance-none m-0 mb-4"
      />
      <Button
        onClick={() => setCurrentView("dashboard")}
        className="w-full bg-black text-white font-bold shadow-[4px_4px_0_black] py-3"
      >
        Open Dashboard
      </Button>
    </div>
  );

  const renderDashboard = () => {
    const report = computeReport();
    return (
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          📊 {companyName} Financials
        </h2>
        {/* Executive Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <h3 className="font-semibold">Total Capital At Risk</h3>
            <p className="text-2xl font-bold">
              ${report.totalCapitalAtRisk.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Cash tied up in stock
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold">Projected Net Profit</h3>
            <p className="text-2xl font-bold">
              ${report.projectedNetProfit.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Total potential earnings
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold">Blended Margin</h3>
            <p className="text-2xl font-bold">
              {report.blendedMargin.toFixed(1)}%
            </p>
            <p className="text-sm text-muted-foreground">
              Average company efficiency
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold">Inventory Volume</h3>
            <p className="text-2xl font-bold">
              {report.inventoryVolume} Units
            </p>
            <p className="text-sm text-muted-foreground">
              Total items in warehouse
            </p>
          </Card>
        </div>
        {/* Add Product */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Add Product</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p>Product Name</p>
              <Input
                id="product-name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 text-base border border-gray-300 appearance-none m-0"
              />
            </div>
            <div>
              <Label htmlFor="unit-cost">Unit Cost (Make/Buy)</Label>
              <Input
                id="unit-cost"
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full p-3 text-base border border-gray-300 appearance-none m-0"
              />
            </div>
            <div>
              <Label htmlFor="ad-spend">Ad Spend per Item</Label>
              <Input
                id="ad-spend"
                type="number"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full p-3 text-base border border-gray-300 appearance-none m-0"
              />
            </div>
            <div>
              <Label htmlFor="selling-price">Your Selling Price</Label>
              <Input
                id="selling-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-3 text-base border border-gray-300 appearance-none m-0"
              />
            </div>
            <div>
              <Label htmlFor="competitor-price">Competitor Price</Label>
              <Input
                id="competitor-price"
                type="number"
                value={competitorPrice}
                onChange={(e) => setCompetitorPrice(Number(e.target.value))}
                className="w-full p-3 text-base border border-gray-300 appearance-none m-0"
              />
            </div>
            <div>
              <Label htmlFor="stock-qty">Stock Quantity</Label>
              <Input
                id="stock-qty"
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full p-3 text-base border border-gray-300 appearance-none m-0"
              />
            </div>
          </div>
          <Button
            onClick={addStrategy}
            className="w-full bg-green-500 text-white font-bold py-3 mt-4"
          >
            ➕ Add to Inventory
          </Button>
        </div>
        {/* Inventory List */}
        <div>
          <h3 className="font-semibold mb-2">Inventory List</h3>
          <ScrollArea className="h-64 rounded-md border p-2">
            {inventory.map((p, idx) => (
              <Card key={idx} className="p-4 mb-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{p.productName}</span>
                  <Badge className="text-sm">{statusBadge(p)}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  In Stock: {p.qty} | Net Profit: $
                  {(p.price - p.cost - p.adSpend).toFixed(2)}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedProduct(p);
                    setCurrentView("detail");
                  }}
                  className="mt-2"
                >
                  View Details
                </Button>
              </Card>
            ))}
          </ScrollArea>
        </div>
      </div>
    );
  };

  const renderDetail = () => {
    if (!selectedProduct) return null;
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Button
          onClick={() => setCurrentView("dashboard")}
          className="w-full bg-gray-700 text-white font-bold py-3 mb-4"
        >
          ⬅️ Back to Dashboard
        </Button>
        <h2 className="text-2xl font-semibold mb-4">
          📈 Audit: {selectedProduct.productName}
        </h2>
        <Card className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Competitive Position</h3>
          <p>{verdict(selectedProduct)}</p>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card className="p-4">
            <h3 className="font-semibold">True Net Profit</h3>
            <p className="text-2xl font-bold">
              ${(
                selectedProduct.price -
                selectedProduct.cost -
                selectedProduct.adSpend
              ).toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Cash in pocket after all costs
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold">Contribution Margin</h3>
            <p className="text-2xl font-bold">
              ${(
                selectedProduct.price - selectedProduct.cost
              ).toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Profit before marketing costs are paid
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold">Markup Percentage</h3>
            <p className="text-2xl font-bold">
              {(
                ((selectedProduct.price - selectedProduct.cost) /
                  selectedProduct.cost) *
                100
              ).toFixed(1)}
              %
            </p>
            <p className="text-sm text-muted-foreground">
              How much you marked up the raw cost
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold">Break-Even Volume</h3>
            <p className="text-2xl font-bold">
              {(
                (selectedProduct.cost + selectedProduct.adSpend) /
                (selectedProduct.price -
                  selectedProduct.cost -
                  selectedProduct.adSpend)
              ).toFixed(1)}
              units
            </p>
            <p className="text-sm text-muted-foreground">
              Sales needed to verify the strategy
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold">Ad Efficiency (ROAS)</h3>
            <p className="text-2xl font-bold">
              {(selectedProduct.price / selectedProduct.adSpend).toFixed(2)}x
            </p>
            <p className="text-sm text-muted-foreground">
              Revenue generated per $1 of ads
            </p>
          </Card>
        </div>
        <Button
          variant="destructive"
          onClick={() => deleteProduct(inventory.indexOf(selectedProduct))}
          className="w-full bg-red-500 text-white font-bold py-3"
        >
          🗑️ Delete Product
        </Button>
      </div>
    );
  };

  return (
    <div className="max-w-[600px] mx-auto p-5 flex flex-col gap-4">
      {currentView === "home" && renderHome()}
      {currentView === "dashboard" && renderDashboard()}
      {currentView === "detail" && renderDetail()}
    </div>
  );
}
