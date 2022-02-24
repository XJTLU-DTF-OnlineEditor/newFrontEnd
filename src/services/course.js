import { request } from 'umi';

export const getTopicByTeacher = async(teacher_id) => {
    const url = `/server/V1/course/topicsByTeacher?teacher_id=${teacher_id}`;
    return request(url);
};

export const editTopic = async(topic_id, topic_info) => {
    const url = `/server/V1/course/edit/`;
    return request(url, {
        method: 'post',
        data: {
            request_entity: 'Topic',
            content: {
                topic_id,
                topic_info,
            },
        },
    });
};

export const editCourse = async(id, related_topic, exercise_title, exercise_content, teacher_id) => {
    const url = `/server/V1/course/edit/`;
    return request(url, {
        method: 'post',
        data: {
            request_entity: 'Course',
            content: {
                id,
                related_topic,
                exercise_title,
                exercise_content,
                teacher_id
            },
        },
    });
};

export const newTopic = async(topic_title, topic_content, topic_img, teacher_id) => {
    const url = `/server/V1/course/create/`;
    return request(url, {
        method: 'post',
        data: {
            request_entity: 'Topic',
            content: {
                topic_title,
                topic_content,
                topic_img,
                teacher_id
            },
        }
    });
};

export const newCourse = async(related_topic, exercise_title, exercise_content, teacher_id) => {
    const url = `/server/V1/course/create/`;
    return request(url, {
        method: 'post',
        data: {
            request_entity: 'Course',
            content: {
                related_topic,
                exercise_title,
                exercise_content,
                teacher_id
            },
        }
    });
};

export const getExerciseList = async(related_topic) => {
    const url = `/server/V1/course/courses/${related_topic}/`;
    return request(url);
};

export const getCourseDetail = async(related_topic, id) => {
    const url = `/server/V1/course/courseDetail/${related_topic}/${id}/`;
    return request(url);
};

export const deleteCourse = async(related_topic, ids) => {
    const url = `/server/V1/course/delete/`;
    return request(url, {
        method: 'post',
        data: {
            request_entity: 'Course',
            related_topic,
            content: ids
        }
    });
};
export const deleteTopic = async(id) => {
    const url = `/server/V1/course/delete/`;
    return request(url, {
        method: 'post',
        data: {
            request_entity: 'Topic',
            content: id
        }
    });
};