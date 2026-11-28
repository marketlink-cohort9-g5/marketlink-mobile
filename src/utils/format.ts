/**
 * Formats a numeric price in Nigerian Naira with thousands separators.
 */
export function formatCurrency(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return `₦${safeAmount.toLocaleString("en-NG")}`;
}
