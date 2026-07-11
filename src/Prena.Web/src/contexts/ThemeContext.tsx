import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  mode: 'light' | 'dark';
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  borderRadius: 'sharp' | 'standard' | 'round';
  sidebarStyle: 'dark' | 'light' | 'gradient';
  density: 'compact' | 'standard' | 'comfortable';
}

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (key: keyof ThemeConfig, value: any) => void;
  resetTheme: () => void;
  availableFonts: { key: string; name: string; cssName: string }[];
  colorPalettes: { name: string; primary: string; accent: string }[];
}

const defaultTheme: ThemeConfig = {
  primaryColor: '#1A237E',
  accentColor: '#00E5FF',
  mode: 'light',
  fontFamily: 'Yekan',
  fontSize: 'medium',
  borderRadius: 'standard',
  sidebarStyle: 'gradient',
  density: 'standard',
};

const availableFonts = [
  { key: 'Yekan', name: '????', cssName: 'Yekan' },
  { key: 'iransans', name: '?????????', cssName: 'IRANSans' },
  { key: 'vazirmatn', name: '???????', cssName: 'Vazirmatn' },
  { key: 'dana', name: '????', cssName: 'Dana' },
  { key: 'shabnam', name: '????', cssName: 'Shabnam' },
  { key: 'sahel', name: '????', cssName: 'Sahel' },
];

const colorPalettes = [
  { name: '??? ????', primary: '#1A237E', accent: '#00E5FF' },
  { name: '??? ????????', primary: '#0066CC', accent: '#00B4D8' },
  { name: '???? ??????', primary: '#6C3CE1', accent: '#FF6B6B' },
  { name: '??? ?????', primary: '#059669', accent: '#34D399' },
  { name: '??????', primary: '#EA580C', accent: '#FDBA74' },
  { name: '????', primary: '#DC2626', accent: '#FCA5A5' },
  { name: '?????', primary: '#DB2777', accent: '#F9A8D4' },
  { name: '???? ????', primary: '#374151', accent: '#9CA3AF' },
  { name: '?????', primary: '#B8860B', accent: '#FCD34D' },
  { name: '?????????', primary: '#0D9488', accent: '#5EEAD4' },
  { name: '??? ??????', primary: '#0284C7', accent: '#7DD3FC' },
  { name: '????', primary: '#111827', accent: '#6B7280' },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('prena-theme');
    return saved ? { ...defaultTheme, ...JSON.parse(saved) } : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('prena-theme', JSON.stringify(theme));

    const root = document.documentElement;
    root.style.setProperty('--prena-primary', theme.primaryColor);
    root.style.setProperty('--prena-accent', theme.accentColor);
    root.style.setProperty('--font-family', `'${theme.fontFamily}', 'Tahoma', sans-serif`);
    
    const fontSizes = { small: '14px', medium: '16px', large: '18px' };
    root.style.setProperty('--font-size', fontSizes[theme.fontSize]);
    
    const radii = { sharp: '4px', standard: '10px', round: '20px' };
    root.style.setProperty('--border-radius', radii[theme.borderRadius]);
    
    const densities = { compact: '0.5rem', standard: '1rem', comfortable: '1.5rem' };
    root.style.setProperty('--density', densities[theme.density]);

    if (theme.mode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  const updateTheme = (key: keyof ThemeConfig, value: any) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    localStorage.removeItem('prena-theme');
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme, availableFonts, colorPalettes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
