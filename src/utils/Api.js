/**
 * GET
 * apiGet takes one param :
 * @param {*} path
 */
const apiGet = async (path) => {  
  await fetch(`http://127.0.0.1:3000/api/${path}`, {
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
 * apiPost takes two params :
 * @param {*} path 
 * @param {*} content 
 */
const apiPost = async (path, content) => {  
  await fetch(`http://127.0.0.1:3000/api/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content),
  })
  .then(response => response.json())
  .then(data => console.log(data));
};


/**
 * PUT
 * apiPut takes two params :
 * @param {*} path 
 * @param {*} content 
 */
const apiPut = async (path, content) => {  
  await fetch(`http://127.0.0.1:3000/api/${path}`, {
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
 * apiDelete takes one param :
 * @param {*} path 
 */
const apiDelete = async (path) => {  
  await fetch(`http://127.0.0.1:3000/api/${path}`, {
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
 * apiGet takes two params :
 * @param {*} path
 * @param {*} token 
 */
const apiGetToken = async (path, token) => {  
  let result = null;

  await fetch(`http://127.0.0.1:3000/api/${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    result = data
  });

  return result;
};


/**
 * POST
 * apiPostToken takes three params :
 * @param {*} path 
 * @param {*} content 
 * @param {*} token 
 */
const apiPostToken = async (path, content, token) => {  
  await fetch(`http://127.0.0.1:3000/api/${path}`, {
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
 * apiPutToken takes three params :
 * @param {*} path 
 * @param {*} content 
 * @param {*} token 
 */
const apiPutToken = async (path, content, token) => {  
  await fetch(`http://127.0.0.1:3000/api/${path}`, {
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
 * apiDeleteToken takes two params :
 * @param {*} path 
 * @param {*} token 
 */
const apiDeleteToken = async (path, token) => {  
  await fetch(`http://127.0.0.1:3000/api/${path}`, {
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
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiGetToken,
  apiPostToken,
  apiPutToken,
  apiDeleteToken,
}