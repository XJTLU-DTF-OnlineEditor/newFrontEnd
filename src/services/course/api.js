import { request } from 'umi';

export const getTopic = async () => {
  return request('/server/V1/course/topic/6', {
    method: 'GET',
  });
};

export const getAllTopic = async () => {
  return request('/server/V1/course/topic/all', {
    method: 'GET',
  });
};

export const search = async (value) => {
  const url = `/server/V1/course/search/${value}`;
  // const data = await request(url);
  // console.log(data);
  return request(url);
};

export const getNewTopic = async () => {


  return request('/server/V1/course/newtopic/', {
    method: 'GET',
  });
};
