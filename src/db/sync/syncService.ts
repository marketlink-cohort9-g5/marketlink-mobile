import NetInfo from "@react-native-community/netinfo";
import type { SQLiteDatabase } from "expo-sqlite";

import type { Product, PackSize, Wholesaler, StoreProduct } from "../../types";

import {
  upsertProducts,
  upsertPackSizes,
  upsertWholesalers,
  upsertStoreProducts,
  pruneStale,
} from "../repositories/catalogueRepo";

export interface CatalogueSyncData {
  products: Product[];
  packSizes: PackSize[];
  wholesalers: Wholesaler[];
  storeProducts: StoreProduct[];
}

export interface SyncResult {
  success: boolean;
  message: string;
  syncedAt?: string;
}

export const isDeviceOnline = async (): Promise<boolean> => {
  const networkState = await NetInfo.fetch();

  return (
    networkState.isConnected === true &&
    networkState.isInternetReachable !== false
  );
};

export const syncCatalogue = async (
  db: SQLiteDatabase,
  fetchCatalogue: () => Promise<CatalogueSyncData>,
): Promise<SyncResult> => {
  try {
    const online = await isDeviceOnline();

    if (!online) {
      return {
        success: false,
        message: "You're offline. Showing saved catalogue data.",
      };
    }

    // Fetch the latest catalogue from the server.
    const data = await fetchCatalogue();

    // Save the latest catalogue data locally.
    await upsertProducts(db, data.products);
    await upsertPackSizes(db, data.packSizes);
    await upsertWholesalers(db, data.wholesalers);
    await upsertStoreProducts(db, data.storeProducts);

    // Remove price records that are more than 14 days old.
    await pruneStale(db);

    const syncedAt = new Date().toISOString();

    return {
      success: true,
      message: "Catalogue updated successfully.",
      syncedAt,
    };
  } catch (error) {
    console.error("Catalogue sync failed:", error);

    return {
      success: false,
      message: "Unable to update catalogue. Showing saved data.",
    };
  }
};
