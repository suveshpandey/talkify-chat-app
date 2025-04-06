import { create } from 'zustand';

type ThemeState = {
    isDark: boolean;
    toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
    isDark: localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
    toggleTheme : () => set((state) => {
        const newTheme = !state.isDark;
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newTheme);
        return {isDark: newTheme};
    }),
}));

export default useThemeStore;