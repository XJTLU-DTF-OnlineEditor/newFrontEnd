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