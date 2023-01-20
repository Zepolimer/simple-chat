// Change 127.0.0.1 to 192.168.1.127

import { getAccessToken } from "./AsyncStorage";

/**
 * GET
 * getRequest takes one param :
 * @param {*} path
 */
const getRequest = async (path) => {  
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
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
 * postRequest takes two params :
 * @param {*} path 
 * @param {*} content 
 */
const postRequest = async (path, content) => {  
  let result = null;
  
  await fetch('http://127.0.0.1:3000/api/' + path, {
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
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'PUT',
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
 * DELETE
 * deleteRequest takes one param :
 * @param {*} path 
 */
const deleteRequest = async (path) => {  
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });

  return result;
};


/**
 * GET
 * secureGetRequest takes one params :
 * @param {*} path
 */
const secureGetRequest = async (path) => {  
  const access = await getAccessToken()
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`,
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
 * securePostRequest takes two params :
 * @param {*} path 
 * @param {*} content 
 */
const securePostRequest = async (path, content) => { 
  const access = await getAccessToken() 
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`,
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
 * POST
 * secureFastPostRequest takes one params :
 * @param {*} path 
 */
const secureFastPostRequest = async (path) => {
  const access = await getAccessToken()
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`,
    },
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });

  return result;
};


/**
 * PUT
 * securePutRequest takes two params :
 * @param {*} path 
 * @param {*} content 
 */
const securePutRequest = async (path, content) => { 
  const access = await getAccessToken() 
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`,
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
 * DELETE
 * secureDeleteRequest takes one params :
 * @param {*} path 
 */
const secureDeleteRequest = async (path) => {  
  const access = await getAccessToken()
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`,
    }
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });

  return result;
};


export {
  getRequest,
  secureGetRequest,
  postRequest,
  securePostRequest,
  secureFastPostRequest,
  putRequest,
  securePutRequest,
  deleteRequest,
  secureDeleteRequest
}