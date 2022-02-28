export default {
    
    'POST /server/V1/course/edit/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            'id': 1,
            "related_topic": "course.related_topic",
            "update_date": "2020-01-16",
            "views": "0",
        })
    },

    'GET /server/V1/course/topicsByTeacher/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": "success",
            "data": [
                {
                    "model": "courseApp.topic",
                    "pk": 1,
                    "fields": {
                        "topic_title": "python fundamental",
                        "teacher_id": "1",
                        "topic_description": "This is the starting python courses for beginners.",
                        "topic_content": "this is a beginner-friendly course designed to convey basic python syntax and operators. By the end of this course, you will get the chance to learn basic python syntax as well as basic python data structures.",
                        "views": 0,
                        "create_time": "2022-02-25T05:09:53.988Z",
                        "topic_img": "topic_imgs/Boxing.png",
                        "img_width": 500,
                        "img_height": 500
                    }
                },
                {
                    "model": "courseApp.topic",
                    "pk": 2,
                    "fields": {
                        "topic_title": "python advanced",
                        "teacher_id": "1",
                        "topic_description": "advanced course designed for experienced programmers",
                        "topic_content": "different data structures are taught in this course, including dict, list, tuple and so on. By the end of this course, you will have a deep understanding of python algorithms such as recursion and classes.",
                        "views": 0,
                        "create_time": "2022-02-25T05:14:19.153Z",
                        "topic_img": "topic_imgs/musicBox.png",
                        "img_width": 760,
                        "img_height": 760
                    }
                },
                {
                    "model": "courseApp.topic",
                    "pk": 3,
                    "fields": {
                        "topic_title": "python web",
                        "teacher_id": "1",
                        "topic_description": "This is a introduction to Django - a powerful tool for building webs",
                        "topic_content": "In this course, a guide will be provided to lead to the world of website, including backend and frontend. And Django will be covered through our vividly-described example.",
                        "views": 0,
                        "create_time": "2022-02-25T05:17:09.957Z",
                        "topic_img": "",
                        "img_width": null,
                        "img_height": null
                    }
                },
                {
                    "model": "courseApp.topic",
                    "pk": 4,
                    "fields": {
                        "topic_title": "Neural Networks",
                        "teacher_id": "1",
                        "topic_description": "A introduction to the building block of AI：Neural Network",
                        "topic_content": "In this course, you will get the chance to learn the mathematical principles behind powerful AI algorithms: The Neural Network. And Pytorch will be described to construct these algorithms.",
                        "views": 0,
                        "create_time": "2022-02-25T05:20:04.171Z",
                        "topic_img": "topic_imgs/TeddyBear.png",
                        "img_width": 623,
                        "img_height": 599
                    }
                },
                {
                    "model": "courseApp.topic",
                    "pk": 5,
                    "fields": {
                        "topic_title": "test5",
                        "teacher_id": "1",
                        "topic_description": "This is a test topic",
                        "topic_content": "test one two three, one two three",
                        "views": 0,
                        "create_time": "2022-02-25T06:34:51.574Z",
                        "topic_img": "topic_imgs/WaxLamp.png",
                        "img_width": 717,
                        "img_height": 704
                    }
                }
            ]
        })
    },
    'GET /server/V1/course/courseDetail/python/1/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": "success",
            "id": 1,
            "content": "<p>To use print in pyhton, just type:</p><p>print(\"String\" + \"Testing\")</p><p><img src=\"/media/images/2022/02/21/skydiving.jpg\" alt=\"\"></p>",
            "teacher_id": "1",
            "related_topic": 1,
            "title": "python3-01-print",
            "update_date": "2022-02-27T16:45:15.004Z",
            "views": 107,
            "subtopic_id": 1
        })
    },
    'POST /server/V1/course/create/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            'id ': 1,
            'update_date': "2021-08-05",
            'views': 0,
        })
    },

    'POST /server/V1/course/delete/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            'id ': 1,
        })
    },

    'GET /server/V1/course/search': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            "course_list": [
                {
                    "model": "courseApp.mycourse",
                    "pk": 1,
                    "fields": {
                        "content": "<p>To use print in pyhton, just type:</p>\r\n\r\n<div style=\"background:#eeeeee; border:1px solid #cccccc; padding:5px 10px\">print(&quot;String&quot; + &quot;Testing&quot;)</div>\r\n\r\n<div style=\"background:#eeeeee; border:1px solid #cccccc; padding:5px 10px\"><img alt=\"\" src=\"/media/images/2022/02/21/skydiving.jpg\" style=\"height:100px; width:100px\" /></div>",
                        "teacher_id": "1",
                        "related_topic": 1,
                        "title": "python3-01-print",
                        "update_date": "2022-02-25T06:35:00Z",
                        "views": 28,
                        "subtopic_id": 1
                    }
                },
                {
                    "model": "courseApp.mycourse",
                    "pk": 2,
                    "fields": {
                        "content": "<p>To use list in python, type:</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<div style=\"background:#eeeeee; border:1px solid #cccccc; padding:5px 10px\">list = [1,2,3]</div>\r\n\r\n<p>&nbsp;</p>",
                        "teacher_id": "1",
                        "related_topic": 1,
                        "title": "python3-02-list",
                        "update_date": "2022-02-25T06:38:00Z",
                        "views": 0,
                        "subtopic_id": 2
                    }
                }
            ]
        })
    },

    'GET /server/V1/course/courses/python/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": "success",
            "topic_title": "python fundamental",
            "topic_img": "topic_imgs/Boxing.png",
            "topic_content": "this is a beginner-friendly course designed to convey basic python syntax and operators. By the end of this course, you will get the chance to learn basic python syntax as well as basic python data structures.",
            "course_list": [
                {
                    "model": "courseApp.mycourse",
                    "pk": 1,
                    "fields": {
                        "content": "<p>To use print in pyhton, just type:</p>\r\n\r\n<div style=\"background:#eeeeee; border:1px solid #cccccc; padding:5px 10px\">print(&quot;String&quot; + &quot;Testing&quot;)</div>\r\n\r\n<div style=\"background:#eeeeee; border:1px solid #cccccc; padding:5px 10px\"><img alt=\"\" src=\"/media/images/2022/02/21/skydiving.jpg\" style=\"height:100px; width:100px\" /></div>",
                        "teacher_id": "1",
                        "related_topic": 1,
                        "title": "python3-01-print",
                        "update_date": "2022-02-25T06:35:00Z",
                        "views": 28,
                        "subtopic_id": 1
                    }
                },
                {
                    "model": "courseApp.mycourse",
                    "pk": 2,
                    "fields": {
                        "content": "<p>To use list in python, type:</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<div style=\"background:#eeeeee; border:1px solid #cccccc; padding:5px 10px\">list = [1,2,3]</div>\r\n\r\n<p>&nbsp;</p>",
                        "teacher_id": "1",
                        "related_topic": 1,
                        "title": "python3-02-list",
                        "update_date": "2022-02-25T06:38:00Z",
                        "views": 0,
                        "subtopic_id": 2
                    }
                }
            ]
        })
    },
    'GET /server/V1/course/courseDetail/1/': (req, res) => {

        res.send({
            "error_code": 200,
            "msg": "success",
            "id": 1,
            "content": "<p>To use print in pyhton, just type:</p><p>print(\"String\" + \"Testing\")</p><p><img src=\"/media/images/2022/02/21/skydiving.jpg\" alt=\"\"></p>",
            "teacher_id": "1",
            "related_topic": 1,
            "title": "python3-01-print",
            "update_date": "2022-02-27T16:45:15.004Z",
            "views": 107,
            "subtopic_id": 1
        })
    },
    'GET /server/V1/course/courseDetail/2/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": "success",
            "id": 2,
            "content": "<p>To use print in pyhton, just type:</p><p>print(\"String\" + \"Testing\")</p><p><img src=\"/media/images/2022/02/21/skydiving.jpg\" alt=\"\"></p>",
            "teacher_id": "1",
            "related_topic": 1,
            "title": "python3-01-print",
            "update_date": "2022-02-27T16:45:15.004Z",
            "views": 144,
            "subtopic_id": 1
        })
    }

}