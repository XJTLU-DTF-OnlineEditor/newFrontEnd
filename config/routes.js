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
    name: 'courseOutline',
    icon: 'UserOutlined',
    path: '/course/exercise/:related_topic',
    component: './CourseOutline',
},
{
    path: '/course/exercise/:related_topic/:id',
    component: './EditorPage',
},

{
    name: 'courseAdmin',
    icon: 'UserOutlined',
    path: '/courseAdmin',
    // component: './CourseAdmin',
    routes: [{
        path: '/courseAdmin',
        component: './CourseAdmin',
    },
    {
        path: '/courseAdmin/courseList',
        component: './CourseList',
    },
    {
        path: '/courseAdmin/courseManager',
        component: './CourseManager',
    },
    {
        path: '/courseAdmin/courseDisplay',
        component: './CourseDisplay',
    },
    {
        component: './404',
    },
    ],
},
{
    path: '/',
    redirect: '/welcome',
},
{
    component: './404',
},
];