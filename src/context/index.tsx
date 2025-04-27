import {IContext} from '~/types/context';
import {ThemeContextProvider} from './themeContext';
import {UserContextProvider} from './userContext';

const AppContext = ({children}: IContext) => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </ThemeContextProvider>
  );
};

export {AppContext};
