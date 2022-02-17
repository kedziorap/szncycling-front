const API_URL = 'http://localhost:5000/api/v1';

const request = async (endpoint, method = 'GET', data = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method === 'POST' || method === 'PUT') {
    config.body = JSON.stringify(data);
  }

  const url = `${API_URL}/${endpoint}`;

  return fetch(url, config)
    .then((response) => response)
    .then((res) =>
      res.json().then((data) => {
        return { data, status: res.status };
      })
    )
    .catch((err) => {
      return { status: 404, message: err.message };
    });
};

export const get = (endpoint) => request(endpoint, 'GET');
