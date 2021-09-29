let tagList = [
  {id:1, name: 'java', status: 1},
  {id:2, name: 'python', status: 1},
  {id:4, name: 'ml', status: 2},
  {id:5, name: 'jw', status: 3}
]

export default {
  'GET /api/user/tags': tagList,

  'POST /api/user/addTag': (req, res) => {
    // add tag
    console.log(req)
    res.send({
      'error_code': 200,
      message: 'Add success'
    })
  },

  'PUT /api/user/delTag': (req, res) => {
    res.send(req.body)
}

}
