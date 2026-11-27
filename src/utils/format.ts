// Format numbers as Nigerian Naira
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Calculate how long ago a price was updated
export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const difference = now.getTime() - date.getTime();

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `Updated ${minutes} mins ago`;
  if (hours < 24) return `Updated ${hours} hrs ago`;
  if (days === 1) return "Updated 1 day ago";

  return `Updated ${days} days ago`;
};

// Calculate price per kilogram or litre
export const calculatePricePerUnit = (
  price: number,
  quantity: number,
): number => {
  if (quantity <= 0) return 0;

  return price / quantity;
};

// Check whether a price is older than 7 days
export const isPriceOutdated = (dateString: string): boolean => {
  const updatedDate = new Date(dateString);
  const now = new Date();

  const difference = now.getTime() - updatedDate.getTime();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  return difference > sevenDays;
};
