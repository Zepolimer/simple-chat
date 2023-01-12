import { setAccessToken, setRefreshToken } from './AsyncStorage';


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
  regenerateToken,
} 

