let tagList = [
  { id: 1, name: 'java', status: 1 },
  { id: 2, name: 'python', status: 1 },
  { id: 4, name: 'ml', status: 2 },
  { id: 5, name: 'jw', status: 3 },
];

let tags = [
  { id: 1, name: 'java', status: 1 },
  { id: 2, name: 'python', status: 1 },
  { id: 3, name: 'cpp', status: 1 },
  { id: 4, name: 'ml', status: 2 },
  { id: 5, name: 'jw', status: 3 },
  { id: 6, name: 'distributed system', status: 1 },
  { id: 7, name: 'matlab', status: 1 },
  { id: 8, name: 'react', status: 1 },
];

export default {
  'GET /api/V1/user/tags': tagList,

  'POST /api/V1/user/addTag': (req, res) => {
    // add tag
    const tagValue = req.body.value.value;
    console.log(tagValue);
    // Add the newly added tag into the tagList
    for (const tagsKey in tags) {
      let add = true;
      if (tags[tagsKey].id === tagValue) {
        console.log(tags[tagsKey]);
        // If the tag already exists, do not add it
        for (const tagListKey in tagList) {
          if (tagList[tagListKey].id === tagValue) {
            // console.log("Fund tags in original list, don not add")
            add = false;
          }
        }
        if (add) {
          // console.log("Add success: " + tags[tagsKey])
          tagList.unshift(tags[tagsKey]);
        }
      }
    }
    res.send({
      error_code: 200,
      message: 'Add success',
    });
  },

  'POST /api/V1/user/delTag': async (req, res) => {
    const data = req.body;
    const value = req.body.value;
    console.log(data);
    console.log(value);
    for (const tagsKey in tagList) {
      if (tagList[tagsKey].id === value) {
        // console.log(tagsKey)
        tagList.splice(tagsKey, 1);
      }
    }
    res.send({
      error_code: 200,
      message: 'Delete success',
      tagList: tagList,
    });
  },

  'POST /api/V1/user/updateTag': async (req, res) => {
    const data = req.body;
    const value = req.body.value;
    console.log(data);
    console.log(value);
    let newTag = [];
    for (const tagsKey in tags) {
      for (const valueKey in value) {
        // console.log(value[valueKey])
        if (tags[tagsKey].id.toString() === value[valueKey]) {
          newTag.push(tags[tagsKey]);
        }
      }
    }
    tagList = newTag;
    console.log(tagList);
    res.send({
      error_code: 200,
      message: 'updateSuccess',
      tagList: tagList,
    });
  },
};
