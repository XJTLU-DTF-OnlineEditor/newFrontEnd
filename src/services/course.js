import { request } from 'umi';

export const editCourse = async(id, topic_title, exercise_title, exercise_content, update_date, teacher_id) => {
    const url = `/server/V1/course/editCourse`;
    return request(url, {
        method: 'post',
        data: {
            id,
            topic_title,
            exercise_title,
            exercise_content,
            update_date,
            teacher_id
        },
    });
};
export const getExerciseList = async(topic_title) => {
    const url = `/server/V1/course/courses/${topic_title}`;
    const data = await request(url);
    return request(url);
};

export const getCourseDetail = async(id) => {
    const url = `/server/V1/course/courseDetail/${id}`;
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