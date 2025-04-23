import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AuthRoutesTypes = {
  welcome: undefined;
  login: undefined;
}

export type AppRoutesTypes = {
  home: undefined;
}

export interface Routes extends AuthRoutesTypes, AppRoutesTypes{}

declare global {
  namespace ReactNavigation{
    interface RootParList extends Routes{}
  }
}

export type AppScreenProps<T extends keyof AppRoutesTypes> = NativeStackScreenProps<AppRoutesTypes, T>;
export type AuthScreenProps<T extends keyof AuthRoutesTypes> = NativeStackScreenProps<AuthRoutesTypes, T>;
