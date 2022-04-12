export default [{
  path: '/user',
  // name:'user',
  // icon: 'smile',
  // layout: false,
  routes: [{
    path: '/user',
    routes: [{
      name: 'login',
      path: '/user/login',
      component: './user/Login',
    },],
  },
  {
    component: './404',
  },
  ],
},
{
  path: '/welcome',
  name: 'welcome',
  icon: 'smile',
  component: './Welcome',
},
{
  path: '/helper',
  name: 'helper',
  icon: 'compass',
  component: './Helper',
},
// {
//   path: '/admin',
//   name: 'admin',
//   icon: 'crown',
//   access: 'canAdmin',
//   component: './Admin',
//   routes: [{
//     path: '/admin/sub-page',
//     name: 'sub-page',
//     icon: 'smile',
//     component: './Welcome',
//   },
//   {
//     component: './404',
//   },
//   ],
// },
// {
//   name: 'list.table-list',
//   icon: 'table',
//   path: '/list',
//   component: './TableList',
// },
{
  name: 'personal',
  access: 'noAdmin',
  icon: 'UserOutlined',
  path: '/personal',
  component: './Personal',
},
{
  // name: 'code_editor',
  path: '/course/exercise/:related_topic/:id',
  component: './EditorPage',
  // icon: 'BulbOutlined',
},
{
  name: 'courseAdmin',  // 教师课程管理系统
  icon: 'crown',
  access: 'canAdmin',
  path: '/courseAdmin/',
  routes: [{
    path: '/CourseAdmin/',
    component: './CourseAdmin',
  }, {
    path: '/CourseAdmin/courseManager',
    component: './CourseManager',
  },
  {
    path: '/CourseAdmin/courseDisplay',
    component: './CourseDisplay',
  },
  {
    path: '/CourseAdmin/courseList',
    component: './CourseList',
  },
  {
    component: './404',
  },
  ],
},
{
  path: '/course/exercise/:related_topic',
  component: './CourseOutline',
},
{
  name: "courses",
  icon: 'table',
  path: '/courses/',
  routes: [
    {
      path: '/courses/',
      component: './CoursePage'
    },
    {
      path: '/courses/allCourses',
      component: './CoursePage/CourseDetail'
    }
  ]
},
{
  path: '/',
  redirect: '/welcome',
},
{
  component: './404',
},
];
