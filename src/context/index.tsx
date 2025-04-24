import { IContext } from '~/types/context';
import { ThemeContextProvider } from './themeContext';

const AppContext = ( {children}: IContext) => {
  return(
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
  );
};

export {AppContext};
