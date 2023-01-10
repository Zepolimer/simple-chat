import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 
 * @param {*} key 
 * @param {*} value 
 */
const setStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e);
  }
}

/**
 * 
 * @param {*} key 
 * @returns 
 */
const getStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }
}


export {
  setStorage,
  getStorage,
}