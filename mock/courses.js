let topic_list = [
  {
    topic_id: 1,
    topic_title: 'python fundamental',
    topic_content: 'This is the beginning courses for python learner',
    topic_img: '',
  },
  {
    topic_id: 2,
    topic_title: 'python advanced',
    topic_content: 'This is the advanced courses for python learner',
    topic_img: '',
  },
  {
    topic_id: 3,
    topic_title: 'python CNN',
    topic_content: 'This is the advanced courses for Convolutional Neural Network based on python',
    topic_img: '',
  },
  {
    topic_id: 4,
    topic_title: 'JAVA fundamental',
    topic_content: 'This is the beginning courses for JAVA',
    topic_img: '',
  },
  {
    topic_id: 5,
    topic_title: 'JAVA advanced',
    topic_content: 'This is the advanced courses for JAVA',
    topic_img: '',
  },
  {
    topic_id: 6,
    topic_title: 'JAVA Web',
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
