export default {
    // /server/V1/course/exercises?${teacher_id}
    'GET /server/V1/course/exercises': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            "data": [{
                    "id": 1,
                    "title": "python no.2 py2简介",
                    "topic_title": "python",
                    "update_date": "2021-08-05",
                    "views": "55",
                },
                {
                    "id": 2,
                    "title": "Python no.3 py2 环境搭建",
                    "topic_title": "python",
                    "update_date": "2020-01-16",
                    "views": "0",
                }
            ],
        })
    },
    'GET /server/V1/course/exercise/1': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            'id': 1,
            'topic_title': 'python',
            'exercise_title': "A classic case of Python recursion",
            'exercise_content': "    The programming technique by which a program calls itself is called recursion.Recursion as an algorithm is widely used in programming languages.A procedure or function in the introduction to the definition or call their own, directly or indirectly, with a kind of method, it is usually the problem of a large complex layers into a similar to the original problem of smaller problems to solve, the recursion strategy only a small number of procedures can be required to describe the problem solving process of repeatedly calculation, greatly reduces the amount of program code. Recursion is the ability to define an infinite collection of objects in finite statements.In general, recursion requires boundary conditions, recursive forward sections, and recursive return sections.When the boundary condition is not satisfied, recursion advances.The recursion returns when the boundary condition is satisfied.\n",
            'update_date': "2021-08-05",
            'views': "0",
        })
    },
    'POST /server/V1/course/editCourse/1': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            'id ': 1,
        })
    },
    'POST /server/V1/course/deleteCourse': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": 'success',
            'id ': 1,
        })
    }

}