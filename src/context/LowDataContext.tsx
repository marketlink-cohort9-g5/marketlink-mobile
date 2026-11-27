import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface LowDataContextType {
  isLowDataMode: boolean;
  toggleLowDataMode: () => Promise<void>;
  setLowDataMode: (enabled: boolean) => Promise<void>;
  isLoading: boolean;
}

const STORAGE_KEY = "marketlink_low_data_mode";

const LowDataContext = createContext<LowDataContextType | undefined>(undefined);

export const LowDataProvider = ({ children }: { children: ReactNode }) => {
  const [isLowDataMode, setIsLowDataMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPreference = async () => {
      try {
        const savedValue = await AsyncStorage.getItem(STORAGE_KEY);

        setIsLowDataMode(savedValue === "true");
      } catch (error) {
        console.error("Could not load Low Data Mode:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreference();
  }, []);

  const setLowDataMode = async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");

      setIsLowDataMode(enabled);
    } catch (error) {
      console.error("Could not save Low Data Mode:", error);
      throw error;
    }
  };

  const toggleLowDataMode = async () => {
    await setLowDataMode(!isLowDataMode);
  };

  return (
    <LowDataContext.Provider
      value={{
        isLowDataMode,
        toggleLowDataMode,
        setLowDataMode,
        isLoading,
      }}
    >
      {children}
    </LowDataContext.Provider>
  );
};

export const useLowData = (): LowDataContextType => {
  const context = useContext(LowDataContext);

  if (!context) {
    throw new Error("useLowData must be used inside a LowDataProvider.");
  }

  return context;
};
