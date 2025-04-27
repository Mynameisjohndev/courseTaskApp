import Sun from '~/assets/svgs/icons/sun.svg';
import Moon from '~/assets/svgs/icons/moon.svg';
import { useThemeContext } from '~/context/themeContext';
import { useTheme } from 'styled-components/native';
import { SwitchContainer, SwitchOption } from './styles';

const SwitchAppTheme = () => {

  const {themeMode, setThemeMode} = useThemeContext();
  const {colors} = useTheme();
  const {sun_disalbed_icon, sun_enabled_icon, moon_disabled_icon, moon_enabled_icon} = colors;

  return(
    <SwitchContainer>
      <SwitchOption {...{
        themeMode,
        type: 'ligth',
        onPress: () => setThemeMode(v => !v),
      }}>
        <Sun fill={themeMode ? sun_disalbed_icon : sun_enabled_icon}/>
      </SwitchOption>
      <SwitchOption {...{
        themeMode,
        type: 'dark',
        onPress: () => setThemeMode(v => !v),
      }}>
        <Moon fill={themeMode ? moon_enabled_icon : moon_disabled_icon } />
      </SwitchOption>
    </SwitchContainer>
  );
};

export {SwitchAppTheme};
