import AsyncStorage from '@react-native-async-storage/async-storage';

const setStorage = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const getStorage = async (key: string) => {
  const response = await AsyncStorage.getItem(key);
  if(response){
    const parse = JSON.parse(response);
    return parse;
  }else{
    return null;
  }
};

export {setStorage, getStorage};
