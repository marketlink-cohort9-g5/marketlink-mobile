import { createContext, useContext, type ReactNode } from "react";

import { colors } from "../theme/colors";

interface ThemeContextType {
  mode: "light";
  colors: typeof colors;
}

const themeValue: ThemeContextType = {
  mode: "light",
  colors,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider.");
  }

  return context;
};
