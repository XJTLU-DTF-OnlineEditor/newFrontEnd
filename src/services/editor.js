import { request } from 'umi';

export const run_interactive = async (id, lang, filelist, course_id, user_id) => {
  const url = '/server/V1/editor/run/interactive/';
  return request(url, {
    method: 'post',
    data: {
      id,
      lang,
      filelist,
      course_id,
      user_id
    },
  });
};

export const run_split = async (id, lang, filelist, input) => {
  const url = '/server/V1/editor/run/split/';
  return request(url, {
    method: 'post',
    data: {
      id,
      lang,
      filelist,
      input,
    },
  });
};

export const terminate = async (id) => {
  const url = '/server/V1/editor/terminate/';
  return request(url, {
    method: 'post',
    data: {
      id,
    },
  });
};

export const deletePic = async (path) => {
  const url = '/server/V1/editor/pic/';
  return request(url, {
    method: 'post',
    data: {
      path,
    },
  });
};