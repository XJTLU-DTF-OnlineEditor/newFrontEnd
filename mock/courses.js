let topic_list = [{
        topic_id: 1,
        related_topic: 'python fundamental',
        topic_content: 'This is the beginning courses for python learner',
        topic_img: '',
    },
    {
        topic_id: 2,
        related_topic: 'python advanced',
        topic_content: 'This is the advanced courses for python learner',
        topic_img: '',
    },
    {
        topic_id: 3,
        related_topic: 'python CNN',
        topic_content: 'This is the advanced courses for Convolutional Neural Network based on python',
        topic_img: '',
    },
    {
        topic_id: 4,
        related_topic: 'JAVA fundamental',
        topic_content: 'This is the beginning courses for JAVA',
        topic_img: '',
    },
    {
        topic_id: 5,
        related_topic: 'JAVA advanced',
        topic_content: 'This is the advanced courses for JAVA',
        topic_img: '',
    },
    {
        topic_id: 6,
        related_topic: 'JAVA Web',
        topic_content: 'This is the beginning courses for JAVA web including Spring',
        topic_img: '',
    },
];

export default {
    'GET /api/V1/course/topics': (req, res) => {
        let topics = [];
        for (let i = 0; i < 5; i++) {
            topics.push(topic_list[i]);
        }
        res.send({
            error_code: 200,
            msg: 'success',
            topics: topics,
        });
    },
};