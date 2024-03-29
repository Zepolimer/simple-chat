import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * ACCESS TOKEN SETTER
 * @param {*} value 
 */
const setAccessToken = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('access_token', jsonValue)
  } catch (e) {
    console.log(e);
  }
}

/**
 * ACCESS TOKEN GETTER
 * @returns access_token
 */
const getAccessToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('access_token')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }
}

/**
 * REFRESH TOKEN SETTER
 * @param {*} value 
 */
const setRefreshToken = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('refresh_token', jsonValue)
  } catch (e) {
    console.log(e);
  }
}

/**
 * REFRESH TOKEN GETTER
 * @returns refresh_token
 */
const getRefreshToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('refresh_token')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }
}

/**
 * USER ID SETTER
 * @param {*} value 
 */
const setUserId = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('user_id', jsonValue)
  } catch (e) {
    console.log(e);
  }
}

/**
 * USER ID GETTER
 * @returns user_id
 */
const getUserId = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user_id')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }
}

/**
 * GLOBAL STORAGE SETTER
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
 * GLOBAL STORAGE GETTER
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

/**
 * GLOBAL STORAGE REMOVE
 * @param {*} key 
 */
const removeStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log(e);
  }
}


export {
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  setUserId,
  getUserId,
  setStorage,
  getStorage,
  removeStorage,
}