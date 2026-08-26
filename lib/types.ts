export type LineItem = {
  sku: string;
  upc: string;
  vendorPart: string;
  description: string;
  retail: number;
  cost: number;
  extCost: number;
  cartons: number;
  csPk: number;
  extQty: number;
  cube: number;
  kilograms: number;
};

export type POStatus = "Pending Approval" | "Approved";

export type PurchaseOrder = {
  id: string;
  poNumber: string;
  refMasterPo: string;
  buyer: string;
  vendor: string;
  shipTerms: string;
  shipDate: string;
  shipTo: string;
  billTo: string;
  status: POStatus;
  lineItems: LineItem[];
};
