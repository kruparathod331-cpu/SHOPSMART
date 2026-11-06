import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, DEFAULT_THEME_ID } from '../styles/themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem('shopsmart_theme_id') || DEFAULT_THEME_ID;
  });

  const [customAccent, setCustomAccent] = useState(() => {
    return localStorage.getItem('shopsmart_custom_accent') || null;
  });

  const [colorMode, setColorMode] = useState(() => {
    return localStorage.getItem('shopsmart_color_mode') || 'system';
  });

  // Preview theme state (for studio hover/test)
  const [previewThemeId, setPreviewThemeId] = useState(null);

  const activeTheme = THEMES.find((t) => t.id === (previewThemeId || themeId)) || THEMES[0];

  // Apply theme variables to root
  useEffect(() => {
    const root = document.documentElement;

    // Apply active theme variables
    Object.entries(activeTheme.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // If custom accent color is chosen and not previewing
    if (customAccent && !previewThemeId) {
      root.style.setProperty('--color-accent', customAccent);
      root.style.setProperty('--color-accent-glow', `${customAccent}4D`);
    }

    // Handle Dark class
    const isDark = activeTheme.isDark || (colorMode === 'dark');
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist to local storage if not previewing
    if (!previewThemeId) {
      localStorage.setItem('shopsmart_theme_id', themeId);
      if (customAccent) {
        localStorage.setItem('shopsmart_custom_accent', customAccent);
      } else {
        localStorage.removeItem('shopsmart_custom_accent');
      }
      localStorage.setItem('shopsmart_color_mode', colorMode);
    }
  }, [themeId, customAccent, colorMode, activeTheme, previewThemeId]);

  // Listen to system preference changes if mode is 'system'
  useEffect(() => {
    if (colorMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (e.matches) {
        // System prefers dark: switch to Midnight Purple if current is light
        const currentTheme = THEMES.find((t) => t.id === themeId);
        if (currentTheme && !currentTheme.isDark) {
          setThemeId('midnight_purple');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [colorMode, themeId]);

  const selectTheme = (id) => {
    setThemeId(id);
    setPreviewThemeId(null);
  };

  const setAccent = (hex) => {
    setCustomAccent(hex);
  };

  const resetDefaultTheme = () => {
    setThemeId(DEFAULT_THEME_ID);
    setCustomAccent(null);
    setColorMode('system');
    setPreviewThemeId(null);
    localStorage.removeItem('shopsmart_theme_id');
    localStorage.removeItem('shopsmart_custom_accent');
    localStorage.removeItem('shopsmart_color_mode');
  };

  return (
    <ThemeContext.Provider
      value={{
        themes: THEMES,
        activeTheme,
        themeId,
        customAccent,
        colorMode,
        selectTheme,
        setAccent,
        setColorMode,
        resetDefaultTheme,
        previewTheme: setPreviewThemeId,
        clearPreview: () => setPreviewThemeId(null),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

