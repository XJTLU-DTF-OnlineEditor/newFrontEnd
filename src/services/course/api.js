import { request } from 'umi';

export const getTopic = async () => {
  return request('/server/V1/course/topic/', {
    method: 'GET',
  });
};

export const search = async (value) => {
  const url = `/server/V1/course/search/${value}`;
  // const data = await request(url);
  // console.log(data);
  return request(url);
};
