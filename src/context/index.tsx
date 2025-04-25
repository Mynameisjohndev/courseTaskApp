import {IContext} from '~/types/context';
import {ThemeContextProvider} from './themeContext';
import {UserContextProvider} from './userContext';

const AppContext = ({children}: IContext) => {
  return (
    <UserContextProvider>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </UserContextProvider>
  );
};

export {AppContext};
