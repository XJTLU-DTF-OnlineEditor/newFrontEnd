import { request } from 'umi';
export const editCourse = async(id, topic_title, exercise_title, exercise_content, update_date) => {
    const url = `/server/V1/course/editCourse/${id}`;
    return request(url, {
        method: 'post',
        data: {
            id,
            topic_title,
            exercise_title,
            exercise_content,
            update_date
        },
    });
};
export const getExerciseList = async(topic_title) => {
    const url = `/server/V1/course/exercises/${topic_title}`;
    const data = await request(url);
    console.log(data);
    return request(url);
};

export const getExercises = async(id) => {
    const url = `/server/V1/course/exercise/${id}`;
    console.log(url);
    return request(url);
};

export const deleteCourse = async(ids) => {
    const url = `/server/V1/course/deleteCourse`;
    return request(url, {
        method: 'post',
        data: {
            ids
        }
    });
};