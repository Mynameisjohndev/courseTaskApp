import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IContext } from '~/types/context';

interface IThemeContext {
  themeMode: boolean;
  setThemeMode: Dispatch<SetStateAction<boolean>>
}

const ThemeContext = createContext({} as IThemeContext);

const ThemeContextProvider = ({children}: IContext) => {
  const [themeMode, setThemeMode] = useState<boolean>(true);
  return(
    <ThemeContext.Provider value={{themeMode, setThemeMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};

export {ThemeContextProvider, useThemeContext};
