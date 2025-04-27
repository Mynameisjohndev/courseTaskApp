import { AppTheme } from '~/types/theme';

const border_radius = {
  b1: 4,
  b2: 10,
  b3: 25,
};
const input_height = {
  normal: 60,
  description: 140,
};
const button_height = 60;
const modal_height = '60%';
const notification_height = 70;
const text_size = {
  t1: 50,
  t2: 30,
  t3: 20,
  t4: 14,
  b1: 24,
  st1: 20,
  d1: 12,
};
const fonts = {
  light: 'Inter-Light',
  regular: 'Inter-Regular',
  bold: 'Inter-Bold',
};
const configs = {
  border_radius,
  input_height,
  button_height,
  modal_height,
  notification_height,
  text_size,
  fonts,
};

const _4CAF50 = '#4CAF50';
const _A67701 = '#A67701';
const _DD9E00 = '#DD9E00';
const _FFB701 = '#FFB701';
const _2B2B35 = '#2B2B35';
const _4E4E5D = '#4E4E5D';
const _8C8C8E = '#8C8C8E';
const _A8A8A8 = '#A8A8A8';
const _D5D5D5 = '#D5D5D5';
const _EFEFEF = '#EFEFEF';
const _FFFFFF = '#FFFFFF';
const _F44336 = '#F44336';
const _2196F3 = '#2196F3';

export const lightTheme: AppTheme = {
  colors: {
    background: _FFFFFF,
    title: _2B2B35,
    subtitle: _8C8C8E,
    button_background_color: _FFB701,
    button_title_color: _FFFFFF,
    input_focus_border_color: _FFB701,
    input_background_color: _EFEFEF,
    input_placeholder_color: _D5D5D5,
    input_color: _8C8C8E,
    search_container_background_color: _EFEFEF,
    search_icon: _FFB701,
    card_background_color: _EFEFEF,
    card_description_color: _8C8C8E,
    not_complet_task_icon: _8C8C8E,
    complet_task_icon : _4CAF50,
    delete_icon: _F44336,
    edit_icon: _2196F3,
    selected_theme: _A67701,
    theme_switch_background_color: _FFB701,
    moon_enabled_icon: _FFFFFF,
    moon_disabled_icon: _DD9E00,
    sun_enabled_icon: _FFFFFF,
    sun_disalbed_icon: _DD9E00,
  },
  ...configs,
};

export const darkTheme: AppTheme = {
  colors: {
    background: _2B2B35,
    title: _FFFFFF,
    subtitle: _FFFFFF,
    button_background_color: _FFB701,
    button_title_color: _2B2B35,
    input_focus_border_color: _FFB701,
    input_background_color: _4E4E5D,
    input_placeholder_color: _A8A8A8,
    input_color: _FFFFFF,
    search_container_background_color: _4E4E5D,
    search_icon: _FFFFFF,
    card_background_color: _4E4E5D,
    card_description_color: _FFFFFF,
    not_complet_task_icon: _FFFFFF,
    complet_task_icon : _4CAF50,
    delete_icon: _FFFFFF,
    edit_icon: _FFFFFF,
    selected_theme: _A67701,
    theme_switch_background_color: _FFB701,
    moon_enabled_icon: _FFFFFF,
    moon_disabled_icon: _DD9E00,
    sun_enabled_icon: _FFFFFF,
    sun_disalbed_icon: _DD9E00,
  },
  ...configs,
};
