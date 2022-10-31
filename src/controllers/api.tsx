import axios, {AxiosError} from 'axios';

interface Payload {
  path: string;
  method: string;
  body?: object;
  query?: object;
}

const callAPI = async (payload: Payload) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('authorization-token') ?? "",
  }

  const response = await axios({
    headers: headers,
    baseURL: process.env.REACT_APP_BASE_URL,
    url: payload.path,
    method: payload.method,
    params: payload.query,
    data: payload.body,
  });

  if (response) localStorage.setItem('authorization-token', response.headers['authorization'] ?? '')
  return response;
};

export { callAPI };
