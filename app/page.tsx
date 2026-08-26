import Link from "next/link";
import { getPurchaseOrders, poTotals } from "@/lib/store";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function Home() {
  const orders = getPurchaseOrders();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Purchase Orders
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {orders.length} open orders across {new Set(orders.map((o) => o.vendor)).size} vendors
        </p>
      </header>

      <div className="overflow-hidden rounded-lg border border-neutral-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">PO #</th>
              <th className="px-4 py-3 font-medium">Vendor</th>
              <th className="px-4 py-3 font-medium">Ship Date</th>
              <th className="px-4 py-3 font-medium text-right">Line Items</th>
              <th className="px-4 py-3 font-medium text-right">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {orders.map((po) => {
              const totals = poTotals(po);
              return (
                <tr key={po.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/po/${po.id}`}
                      className="font-medium text-neutral-900 underline-offset-2 hover:underline"
                    >
                      {po.poNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{po.vendor}</td>
                  <td className="px-4 py-3 text-neutral-700">{po.shipDate}</td>
                  <td className="px-4 py-3 text-right text-neutral-700">
                    {po.lineItems.length}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-neutral-900">
                    {currency.format(totals.extCost)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        po.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {po.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
