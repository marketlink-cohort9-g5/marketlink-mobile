import NetInfo, { type NetInfoState } from "@react-native-community/netinfo";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface NetworkContextType {
  isConnected: boolean;
  isInternetReachable: boolean;
  isOnline: boolean;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? false);
      setIsInternetReachable(state.isInternetReachable ?? false);
    });

    return unsubscribe;
  }, []);

  const isOnline = isConnected && isInternetReachable;

  return (
    <NetworkContext.Provider
      value={{
        isConnected,
        isInternetReachable,
        isOnline,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error("useNetwork must be used inside a NetworkProvider.");
  }

  return context;
};
