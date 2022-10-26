import axios from 'axios';

const callAPI = () => {
  return Promise.all([])
    .then(() => {
      return axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
      });
    })
    .then((res) => {
      if (res && res.data) {
        return res.data;
      } else {
      }
    })
    .catch((error) => {});
};

export { callAPI };
