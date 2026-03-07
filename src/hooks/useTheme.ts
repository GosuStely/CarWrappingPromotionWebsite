import { useEffect, useState, useCallback } from 'react';

export type Theme = 'dark' | 'light';

/** Reads the current theme from localStorage or the user's OS preference */
function resolveInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('mws-theme') as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // localStorage unavailable (e.g. private browsing with strict settings)
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Apply `dark` / `light` class to <html> so Tailwind's `dark:` variants work */
function applyThemeClass(theme: Theme): void {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
    html.classList.remove('light');
  } else {
    html.classList.add('light');
    html.classList.remove('dark');
  }
  try {
    localStorage.setItem('mws-theme', theme);
  } catch {
    // ignore
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(resolveInitialTheme);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  // Listen for OS-level preference changes (only when user hasn't set a stored preference)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('mws-theme');
      if (!stored) setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  );

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
