import { request } from 'umi';

export const run = async (inputType, source, input, lang, id, terminate) => {
  const url = '/server/V1/editor/run/';
  console.log(
    inputType + ' ' + source + ' ' + input + ' ' + ' ' + lang + ' ' + ' ' + id + ' ' + terminate,
  );
  return request(url, {
    method: 'post',
    data: {
      id,
      terminate,
      lang,
      inputType, //split interactive
      source,
      input,
      memory_limit: 243232,
      time_limit: 5,
    },
  });
};

export const send = async (inputType, source, input, lang, id, terminate) => {
  const url = 'http://localhost:8000/api/V1/editor/runn';
  return request(url, {
    method: 'post',
    data: {
      id,
      lang,
      terminate,
      inputType,
      source,
      input,
      memory_limit: 243232,
      time_limit: 5,
    },
  });
};

export const getExerciseList = async (topic_title) => {
  const url = `/server/V1/course/exercises/${topic_title}`;
  const data = await request(url);
  console.log(data);
  return request(url);
};

export const getExercises = async (topic_title, id) => {
  const url = `/server/V1/course/exercise/${topic_title}/${id}`;
  return request(url);
};
