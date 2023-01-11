import { SITE_URL } from '@env';
import jwt_decode from "jwt-decode";

import { setAccessToken, setRefreshToken } from './AsyncStorage';


const isTokenExpired = async (token) => {
  var decoded = await jwt_decode(token)

  if (decoded.exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }
}


/**
 * POST
 * regenerateToken takes one param :
 * @param {*} token
 */
const regenerateToken = async (token) => {  
  await fetch(SITE_URL + 'refreshtoken', {
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
  isTokenExpired,
  regenerateToken,
} 

