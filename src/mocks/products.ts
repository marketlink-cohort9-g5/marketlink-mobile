import type { Product, PackSize } from "../types";

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Rice",
    brand: "Mama Gold",
    category: "Grains",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-002",
    name: "Beans",
    brand: "White Beans",
    category: "Grains",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-003",
    name: "Vegetable Oil",
    brand: "Golden Penny",
    category: "Cooking Oil",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-004",
    name: "Garri",
    brand: "White Garri",
    category: "Grains",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-005",
    name: "Semovita",
    brand: "Golden Penny",
    category: "Food Staples",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-006",
    name: "Sugar",
    brand: "Dangote",
    category: "Food Staples",
    updatedAt: new Date().toISOString(),
  },
];

export const mockPackSizes: PackSize[] = [
  {
    id: "pack-001",
    productId: "prod-001",
    unit: "bag",
    quantity: 50,
    label: "50kg Bag",
  },
  {
    id: "pack-002",
    productId: "prod-001",
    unit: "bag",
    quantity: 25,
    label: "25kg Bag",
  },
  {
    id: "pack-003",
    productId: "prod-002",
    unit: "bag",
    quantity: 50,
    label: "50kg Bag",
  },
  {
    id: "pack-004",
    productId: "prod-003",
    unit: "litre",
    quantity: 25,
    label: "25 Litres",
  },
  {
    id: "pack-005",
    productId: "prod-004",
    unit: "bag",
    quantity: 50,
    label: "50kg Bag",
  },
  {
    id: "pack-006",
    productId: "prod-005",
    unit: "bag",
    quantity: 10,
    label: "10kg Bag",
  },
  {
    id: "pack-007",
    productId: "prod-006",
    unit: "bag",
    quantity: 50,
    label: "50kg Bag",
  },
];
