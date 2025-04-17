export interface AppTheme {
  colors: {
    background: string;
    title: string;
    subtitle: string;
    button_background_color: string;
    button_title_color: string;
    input_focus_border_color: string;
    input_background_color: string;
    input_placeholder_color: string;
    input_color: string;
    search_container_background_color: string;
    search_icon: string;
    card_background_color: string;
    card_description_color: string;
    not_complet_task_icon: string;
    complet_task_icon: string;
    delete_icon: string;
    edit_icon: string;
    selected_theme: string;
    theme_switch_background_color: string;
    moon_enabled_icon: string;
    moon_disabled_icon: string;
    sun_enabled_icon: string;
    sun_disalbed_icon: string;
  };
  border_radius: {
    b1: number;
    b2: number;
    b3: number;
  };
  input_height: {
    normal: number;
    description: number;
  };
  button_height: number;
  modal_height: string;
  notification_height: number;
  text_size:{
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    b1: number;
    st1: number;
    d1: number;
  }
  fonts:{
    bold: string;
    regular: string;
    light: string;
  }
}
