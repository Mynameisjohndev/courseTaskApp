import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '~/themes';
import { IContext } from '~/types/context';
import { AppTheme } from '~/types/theme';
import { getStorage, setStorage } from '~/utils/AsyncStorage';

interface IThemeContext {
  themeMode: boolean;
  setThemeMode: Dispatch<SetStateAction<boolean>>;
  theme: AppTheme | null;
  updatedTheme: () => void;
  loadedTheme: boolean;
}

const ThemeContext = createContext({} as IThemeContext);

const ThemeContextProvider = ({children}: IContext) => {
  const [themeMode, setThemeMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<AppTheme | null>(null);
  const [loadedTheme, setLoadedTheme] = useState<boolean>(false);

  const updatedTheme = async () =>{
    const value = !themeMode ? 'dark' : 'light';
    setStorage('@theme', value);
    setThemeMode(v => !v);
    setTheme(!themeMode ? darkTheme : lightTheme);
  };

  const loadTheme = async () => {
    const usedTheme = await getStorage('@theme');
    setTheme(usedTheme === 'dark' ? darkTheme : lightTheme);
    setThemeMode(usedTheme === 'dark');
    setLoadedTheme(true);
  };


  useEffect(()=>{
    loadTheme();
  },[]);

  return(
    <ThemeContext.Provider value={{themeMode, setThemeMode, theme, updatedTheme,loadedTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};

export {ThemeContextProvider, useThemeContext};
