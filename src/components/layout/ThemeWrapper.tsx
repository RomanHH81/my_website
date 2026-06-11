'use client';

import { Theme } from '@radix-ui/themes';
import { useState, useEffect, createContext, useContext } from 'react';
import '@radix-ui/themes/styles.css';

type ThemeContextType = {
  appearance: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return a dummy to prevent crash if used outside, or handle as needed
    return { appearance: 'dark', toggleTheme: () => {} };
  }
  return context;
}

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved && saved !== appearance) {
      setAppearance(saved);
    }
  }, [appearance]);

  const toggleTheme = () => {
    const next = appearance === 'dark' ? 'light' : 'dark';
    setAppearance(next);
    localStorage.setItem('theme', next);
  };

  return (
    <ThemeContext.Provider value={{ appearance, toggleTheme }}>
      <Theme appearance={appearance} accentColor="blue" grayColor="slate" panelBackground="translucent">
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}
