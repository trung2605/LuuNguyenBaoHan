import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const useCustomTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useCustomTheme must be used within a ThemeContextProvider');
    }
    return context;
};

export const ThemeContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const saved = localStorage.getItem('baohan-theme');
            return saved ? JSON.parse(saved) : false;
        } catch {
            return false;
        }
    });

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    useEffect(() => {
        localStorage.setItem('baohan-theme', JSON.stringify(isDarkMode));
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const value = { isDarkMode, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
