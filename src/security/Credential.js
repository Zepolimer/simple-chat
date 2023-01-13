import { 
  getAccessToken, 
  getRefreshToken, 
  getUserId, 
  setAccessToken, 
  setRefreshToken, 
  setUserId, 
  removeStorage 
} from './AsyncStorage';


/**
 * SET AsyncStorage values
 * @param {*} access 
 * @param {*} refresh 
 * @param {*} user 
 */
const setCredentials = async (access, refresh, user) => {
  await setAccessToken(access);
  await setRefreshToken(refresh);
  await setUserId(user);
}

/**
 * GET AsyncStorage values
 * @returns array { accessToken, refreshToken, userId}
 */
const getCredentials = async () => {
  const access = await getAccessToken()
  const refresh = await getRefreshToken()
  const user = await getUserId()

  console.log(access);
  console.log(user);

  return {
    access: access,
    refresh: refresh,
    user: user,
  }
}

/**
 * DELETE AsyncStorage values
 */
const resetCredentials = async () => {
  await setAccessToken('');
  await setRefreshToken('');
  await setUserId(0);
  // await removeStorage('access_token')
  // await removeStorage('refresh_token')
  // await removeStorage('user_id')
}

/**
 * POST
 * regenerateToken takes one param :
 * @param {*} token
 */
const regenerateToken = async (token) => {  
  await fetch('http://127.0.0.1:3000/api/refreshtoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(response => response.json())
  .then((data) => {
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
  });
};


export {
  setCredentials,
  getCredentials,
  resetCredentials,
  regenerateToken,
} 

