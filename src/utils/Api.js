import { SITE_URL } from '@env';


/**
 * GET
 * getRequest takes one param :
 * @param {*} path
 */
const getRequest = async (path) => {  
  await fetch(SITE_URL + path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data));
};


/**
 * POST
 * postRequest takes two params :
 * @param {*} path 
 * @param {*} content 
 */
const postRequest = async (path, content) => {  
  let result = null;
  
  await fetch(SITE_URL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content),
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });

  return result;
};


/**
 * PUT
 * putRequest takes two params :
 * @param {*} path 
 * @param {*} content 
 */
const putRequest = async (path, content) => {  
  await fetch(SITE_URL + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content),
  })
  .then(response => response.json())
  .then(data => console.log(data));
};


/**
 * DELETE
 * deleteRequest takes one param :
 * @param {*} path 
 */
const deleteRequest = async (path) => {  
  await fetch(SITE_URL + path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data));
};


/**
 * GET
 * secureGetRequest takes two params :
 * @param {*} path
 * @param {*} token 
 */
const secureGetRequest = async (path, token) => {  
  let result = null;

  await fetch(SITE_URL + path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });

  return result;
};


/**
 * POST
 * securePostRequest takes three params :
 * @param {*} path 
 * @param {*} content 
 * @param {*} token 
 */
const securePostRequest = async (path, content, token) => {  
  await fetch(SITE_URL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  })
  .then(response => response.json())
  .then(data => console.log(data));
};


/**
 * PUT
 * securePutRequest takes three params :
 * @param {*} path 
 * @param {*} content 
 * @param {*} token 
 */
const securePutRequest = async (path, content, token) => {  
  await fetch(SITE_URL + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  })
  .then(response => response.json())
  .then(data => console.log(data));
};


/**
 * DELETE
 * secureDeleteRequest takes two params :
 * @param {*} path 
 * @param {*} token 
 */
const secureDeleteRequest = async (path, token) => {  
  await fetch(SITE_URL + path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(response => response.json())
  .then(data => console.log(data));
};


export {
  getRequest,
  secureGetRequest,
  postRequest,
  securePostRequest,
  putRequest,
  securePutRequest,
  deleteRequest,
  secureDeleteRequest
}