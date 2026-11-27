import { useCallback } from "react";
import { useDatabase } from "../db/database";
import { searchProducts } from "../db/repositories/catalogueRepo";

export const useCachedCatalogue = () => {
  const db = useDatabase();

  const getCachedProducts = useCallback(
    async (query = "") => {
      try {
        return await searchProducts(db, query);
      } catch (error) {
        console.error("Unable to load cached catalogue:", error);
        return [];
      }
    },
    [db],
  );

  return { getCachedProducts };
};
