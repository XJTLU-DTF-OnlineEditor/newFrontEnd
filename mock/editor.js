export default {
    'POST /server/V1/editor/run/': (req, res) => {
        res.send({
            error_code: 200,
            msg: 'sucess',
            data: {
                request_status: "success",
                errors: '',
                time_limit: 5,
                run_status: "OK",
                output: '请输入一个正整数：\n',
                id: req.body.id,
                need_input: true
            }
        })
    },
    'GET /server/V1/course/courses/python/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": "success",
            "topic_title": "python",
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
            }],
            "topic_content": "This is the fundamental courses designed for beginners.",
            "course_list": [{
                "id": 1,
                "title": "Python递归的经典案例",
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
    'GET /server/V1/course/courseDetail/1/': (req, res) => {

        res.send({
            "error_code": 200,
            "msg": 'success',
            'id': 1,
            'related_topic': 'python',
            'exercise_title': "A classic case of Python recursion",
            'exercise_content': "    The programming technique by which a program calls itself is called recursion.Recursion as an algorithm is widely used in programming languages.A procedure or function in the introduction to the definition or call their own, directly or indirectly, with a kind of method, it is usually the problem of a large complex layers into a similar to the original problem of smaller problems to solve, the recursion strategy only a small number of procedures can be required to describe the problem solving process of repeatedly calculation, greatly reduces the amount of program code. Recursion is the ability to define an infinite collection of objects in finite statements.In general, recursion requires boundary conditions, recursive forward sections, and recursive return sections.When the boundary condition is not satisfied, recursion advances.The recursion returns when the boundary condition is satisfied.\n",
            'update_date': "2021-08-05",
            'views': "0",
        })
    },
    'GET /server/V1/course/courseDetail/2/': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            'id': 2,
            'related_topic': 'python',
            'exercise_title': "mycourses.title",
            'exercise_content': "mycourses.content",
            'update_date': "2021-08-05",
            'views': "55",
        })
    }

}