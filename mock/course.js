export default {
    // /server/V1/course/coursesByTeacher
    'GET /server/V1/course/coursesByTeacher/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',

            "data": [{
                    "id": 1,
                    "title": "python no.2 py2简介",
                    "related_topic": "python",
                    "update_date": "2021-08-05",
                    "views": "55",
                },
                {
                    "id": 2,
                    "title": "Python no.3 py2 环境搭建",
                    "related_topic": "python",
                    "update_date": "2020-01-16",
                    "views": "0",
                }
            ],
        })
    },

    'POST /server/V1/course/edit/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            'id': 1,
            "update_date": "2020-01-16",
            "views": "0",
        })
    },

    'GET /server/V1/course/topicsByTeacher/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            "data": [{
                "topic_title": "python",
                "topic_id": 5678,
                "topic_content": "课题描述111",
                "topic_img": [{
                    "uid": "rc-upload-1645449381358-3",
                    "lastModified": 1642472682125,
                    "lastModifiedDate": "2022-01-18T02:24:42.125Z",
                    "name": "bus_640x640.jpg",
                    "size": 202055,
                    "type": "image/jpeg",
                    "percent": 100,
                    "originFileObj": {
                        "uid": "rc-upload-1645449381358-3"
                    },
                    "status": "done",
                    "response": "..."
                }]
            }],
        })
    },
    'GET /server/V1/course/courseDetail/python/1/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            'id': 1,
            'related_topic': 'python',
            'exercise_title': "A classic case of Python recursion",
            'exercise_content': "The programming technique by which a program calls itself is called recursion.Recursion as an algorithm is widely used in programming languages.A procedure or function in the introduction to the definition or call their own, directly or indirectly, with a kind of method, it is usually the problem of a large complex layers into a similar to the original problem of smaller problems to solve, the recursion strategy only a small number of procedures can be required to describe the problem solving process of repeatedly calculation, greatly reduces the amount of program code. Recursion is the ability to define an infinite collection of objects in finite statements.In general, recursion requires boundary conditions, recursive forward sections, and recursive return sections.When the boundary condition is not satisfied, recursion advances.The recursion returns when the boundary condition is satisfied.\n",
            'update_date': "2021-08-05",
            'views': "0",
        })
    },
    'POST /server/V1/course/create/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            'id': 1,
            'update_date': "2021-08-05",
            'views': "0",
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
            "course_list": [{
                "id": 1,
                "title": "Python递归的经典案例2",
                'update_date': "2021-08-05",
                'views': "0",
            }, {
                "id": 2,
                "title": "Python no.3 py3 环境搭建",
                'update_date': "2021-08-05",
                'views': "0",
            }]
        })
    },

}