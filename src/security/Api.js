
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
};


/**
 * GET
 * secureGetRequest takes two params :
 * @param {*} path
 * @param {*} token 
 */
const secureGetRequest = async (path, token) => {  
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
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
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });
};

/**
 * POST
 * secureFastPostRequest takes two params :
 * @param {*} path 
 * @param {*} token 
 */
const secureFastPostRequest = async (path, token) => {  
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });
};


/**
 * PUT
 * securePutRequest takes three params :
 * @param {*} path 
 * @param {*} content 
 * @param {*} token 
 */
const securePutRequest = async (path, content, token) => {  
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });
};


/**
 * DELETE
 * secureDeleteRequest takes two params :
 * @param {*} path 
 * @param {*} token 
 */
const secureDeleteRequest = async (path, token) => {  
  let result = null;

  await fetch('http://127.0.0.1:3000/api/' + path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((response) => response.json())
  .then((data) => {
    result = data
  });
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