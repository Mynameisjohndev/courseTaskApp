import 'styled-components/native';
import { AppTheme } from '~/types/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
