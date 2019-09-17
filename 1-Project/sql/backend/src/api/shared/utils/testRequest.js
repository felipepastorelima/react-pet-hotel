const httpMocks = require('node-mocks-http');
const api = require('../..');

function createRequest(body, token = '1') {
  return httpMocks.createRequest({
    method: 'POST',
    url: '/',
    headers: {
      authorization: 'Bearer ' + token,
    },
    body,
  });
}

function createResponse() {
  return httpMocks.createResponse();
}

async function genericTestRequest(body, currentUserUId) {
  return new Promise((resolve, reject) => {
    const response = createResponse();

    api(createRequest(body, currentUserUId), response);

    response.on('end', async () => {
      try {
        const data = JSON.parse(response._getData());
        resolve(data);
      } catch (error) {
        console.error(error);
        console.error(response._getData());
        resolve(response._getData());
      }
    });
  });
}

async function testRequest(body, authenticationUid = '1') {
  const response = await genericTestRequest(
    body,
    authenticationUid,
  );

  if (response.errors) {
    return Promise.reject(response.errors[0]);
  } else {
    return Promise.resolve(response.data);
  }
}

async function testRequestError(
  body,
  authenticationUid = '1',
) {
  const response = await genericTestRequest(
    body,
    authenticationUid,
  );
  if (response.errors) {
    return Promise.resolve(response.errors[0]);
  } else {
    return Promise.reject(response.data);
  }
}

exports.testRequest = testRequest;
exports.testRequestError = testRequestError;
exports.createRequest = createRequest;
exports.createResponse = createResponse;
