export default [{
        path: '/user',
        layout: false,
        routes: [{
                path: '/user',
                routes: [{
                    name: 'login',
                    path: '/user/login',
                    component: './user/Login',
                }, ],
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
        path: '/course/exercise/:topic_title/:id',
        // path: '/course/exercise/python fundamental/1',
        component: './EditorPage',
        icon: 'BulbOutlined',
        // routes: [
        //   { path: '/:id', component: './Welcome' },
        // ]
    },
    {
        name: 'courseList',
        icon: 'UserOutlined',
        path: '/courseList',
        component: './CourseList',
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
        path: '/',
        redirect: '/welcome',
    },
    {
        component: './404',
    },
];