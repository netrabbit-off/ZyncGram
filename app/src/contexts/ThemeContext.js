import { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

// Создаем контекст
export const ThemeContext = createContext();

// Провайдер (обертка для всего приложения)
export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const lightTheme = {
        background: '#f5f5f5',
        cardBg: '#ffffff',
        text: '#333333',
        subtext: '#666666',
        accent: '#2c3e50',
        headerBg: '#2c3e50',
        border: '#e0e0e0',
    };

    const darkTheme = {
        background: '#121212',
        cardBg: '#1e1e1e',
        text: '#ffffff',
        subtext: '#999999',
        accent: '#3498db',
        headerBg: '#0a0a0a',
        border: '#333333',
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
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
