const { get } = require('axios');

module.exports = function (customHeaders) {
  // Use customHeaders in the Axios request
  return get(`http://localhost:8082/api/users/2`, {
    headers: customHeaders,
  });
};
