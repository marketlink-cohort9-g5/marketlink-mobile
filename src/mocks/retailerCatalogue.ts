// MarketLink retailer catalogue mock data
import { productImages } from "./productImages";
export const popularProducts = [
  {
    id: "spaghetti-1",
    storeProductId: "store-spaghetti-1",
    name: "Golden Penny Spaghetti",
    packLabel: "1 Carton",
    price: 2500,
    wholesaler: "Mama Bisi Store",
    image: productImages.spaghetti,
  },

  {
    id: "beans-1",
    storeProductId: "store-beans-1",
    name: "Beans",
    packLabel: "1 Bag",
    price: 45500,
    wholesaler: "Mama Bisi Store",
    image: productImages.beans,
  },
  {
    id: "Semovita-1",
    storeProductId: "store-semovita-1",
    name: "Semovita",
    packLabel: "1 Bag",
    price: 10000,
    wholesaler: "Mama Bisi Store",
    image: productImages.semovita,
  },

  {
    id: "vegetable oil-1",
    storeProductId: "store-vegetable oil-1",
    name: "Vegetable oil",
    packLabel: "1 Carton",
    price: 18000,
    wholesaler: "Mama Bisi Store",
    image: productImages.oil,
  },
];

// Search results: same product offered by different wholesalers.
export const searchResults = [
  {
    id: "offer-1",
    productName: "Indomie Chicken 70g",
    wholesaler: "Alhaji Bako Store",
    pack: "Carton of 40 packs",
    price: 40500,
    distance: 1.2,
    stock: "In Stock",
    updated: "15 mins ago",
    image: require("../../assets/images/marketlink/indomie.png"),
  },

  {
    id: "offer-2",
    productName: "Indomie Chicken 70g",
    wholesaler: "Iya Bola Store",
    pack: "Carton of 40 packs",
    price: 45500,
    distance: 2.1,
    stock: "In Stock",
    updated: "15 mins ago",
    image: require("../../assets/images/marketlink/indomie.png"),
  },

  {
    id: "offer-3",
    productName: "Indomie Chicken 70g",
    wholesaler: "Obi Sons Limited",
    pack: "Carton of 40 packs",
    price: 48300,
    distance: 3.4,
    stock: "Low Stock",
    updated: "15 mins ago",
    image: require("../../assets/images/marketlink/indomie.png"),
  },
];
