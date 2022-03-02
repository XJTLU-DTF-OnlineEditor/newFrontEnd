export default [{
  path: '/user',
  layout: false,
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
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [{
      path: '/admin/sub-page',
      name: 'sub-page',
      icon: 'smile',
      component: './Welcome',
    },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'personal',
    icon: 'UserOutlined',
    path: '/personal',
    component: './Personal',
  },
  {
    name: 'code_editor',
    path: '/course/exercise/:related_topic/:id',
    // path: '/course/exercise/python fundamental/1',
    component: './EditorPage',
    icon: 'BulbOutlined',
    // routes: [
    //   { path: '/:id', component: './Welcome' },
    // ]
  },
  {
    path: '/courseList',
    component: './CourseList',
  },
  {
    name: 'courseAdmin',
    icon: 'UserOutlined',
    path: '/courseAdmin',
    component: './CourseAdmin',
  },
  {
    path: '/courseManager',
    component: './CourseManager',
  },
  {
    path: '/courseDisplay',
    component: './CourseDisplay',
  },
  {
    name: 'courseOutline',
    icon: 'UserOutlined',
    path: '/course/exercise/:related_topic',
    component: './CourseOutline',
  },
  {
    name: "courses",
    icon: 'table',
    path: '/courses',
    component: './CoursePage',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
