import { request } from 'umi';

export const getHelper = async () => {
    return request('/helperdoc/helper.md');
  };