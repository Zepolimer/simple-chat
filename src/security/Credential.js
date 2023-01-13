import { getAccessToken, getRefreshToken, getUserId, setAccessToken, setRefreshToken, setUserId } from './AsyncStorage';

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

  return {
    access: access,
    refresh: refresh,
    user: user,
  }
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
  regenerateToken,
} 

