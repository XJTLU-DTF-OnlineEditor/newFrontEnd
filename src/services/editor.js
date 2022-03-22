import { request } from 'umi';

export const run_interactive = async (id, lang, source) => {
  const url = '/server/V1/editor/run/interactive/';
  return request(url, {
    method: 'post',
    data: {
      id,
      lang,
      source,
    },
  });
};

export const run_split = async (id, lang, source, input) => {
  const url = '/server/V1/editor/run/split/';
  return request(url, {
    method: 'post',
    data: {
      id,
      lang,
      source,
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