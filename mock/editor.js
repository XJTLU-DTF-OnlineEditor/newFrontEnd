
export default {
    'POST /api/V1/editor/run': (req, res) => {
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
    'POST /api/V1/editor/runn': (req, res) => {
        res.send({
            error_code: 200,
            msg: 'sucess',
            data: {
                request_status: "success",
                errors: 'xxx',
                time_limit: 5,
                run_status: "OK",
                output: '3628800',
                id: req.body.id,
                need_input: false
            }
        })
    },
    'GET /api/V1/exerciseList/python/basic': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": "success",
            "topic_title": "python",
            "sub_menu": "basic",
            "exercise_list": [
                {
                    "id": 1,
                    "title": "Python递归的经典案例"
                }, {
                    "id": 2,
                    "title": "Python no.3 py3 环境搭建",
                }
            ]
        })
    },
    'GET /api/V1/exercises/python/basic/1': (req, res) => {

        res.send({
            "error_code": 200,
            "msg": 'success',
            'id': 1,
            'exercise_title': "A classic case of Python recursion",
            'exercise_content': "    The programming technique by which a program calls itself is called recursion.Recursion as an algorithm is widely used in programming languages.A procedure or function in the introduction to the definition or call their own, directly or indirectly, with a kind of method, it is usually the problem of a large complex layers into a similar to the original problem of smaller problems to solve, the recursion strategy only a small number of procedures can be required to describe the problem solving process of repeatedly calculation, greatly reduces the amount of program code. Recursion is the ability to define an infinite collection of objects in finite statements.In general, recursion requires boundary conditions, recursive forward sections, and recursive return sections.When the boundary condition is not satisfied, recursion advances.The recursion returns when the boundary condition is satisfied.\n",
            'update_date': "2021-08-05",
            'views': "0",
        })
    },
    'GET /api/V1/exercises/python/basic/2': (req, res) => {

        res.send({
            "error_code": 200,
            "msg": 'success',
            'id': 2,
            'exercise_title': "mycourses.title",
            'exercise_content': "mycourses.content",
            'update_date': "2021-08-05",
            'views': "55",
        })
    }

}