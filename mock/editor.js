
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

}