
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
                output: 'run code result\n',
                id: req.body.id,
                need_input: true
            }
        })
    },
    'POST /api/V1/editor/run': (req, res) => {
        res.send({
            error_code: 410,
            msg: 'sucess',
            data: {
                request_status: "success",
                errors: 'xxx',
                time_limit: 5,
                run_status: "OK",
                output: 'run code result\n',
                id: req.body.id,
                need_input: false
            }
        })
    },
    'GET /api/V1/exerciseList/python/basic': (req, res) => {
        res.send({
            "error_code": 200,
            "msg": "success",
            "topic_title": "Python3 教程",
            "sub_menu": "basic",
            "exercise_list": [
                {
                    "id": 1,
                    "title": "Python no.2 py3简介"
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
            'exercise_title': "mycourses.title",
            'exercise_content': "mycourses.content",
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