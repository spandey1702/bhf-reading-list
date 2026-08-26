import { purchaseOrders } from "@/data/purchase-orders";
import type { PurchaseOrder, POStatus } from "@/lib/types";

// In-memory store for the demo. Resets on server restart; no DB needed for this scope.
const store: PurchaseOrder[] = purchaseOrders;

export function getPurchaseOrders(): PurchaseOrder[] {
  return store;
}

export function getPurchaseOrder(id: string): PurchaseOrder | undefined {
  return store.find((po) => po.id === id);
}

export function toggleStatus(id: string): POStatus | undefined {
  const po = store.find((p) => p.id === id);
  if (!po) return undefined;
  po.status = po.status === "Approved" ? "Pending Approval" : "Approved";
  return po.status;
}

export function poTotals(po: PurchaseOrder) {
  return po.lineItems.reduce(
    (acc, li) => {
      acc.extCost += li.extCost;
      acc.cartons += li.cartons;
      acc.extQty += li.extQty;
      return acc;
    },
    { extCost: 0, cartons: 0, extQty: 0 }
  );
}
