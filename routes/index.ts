export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: 'CRUD 示例',
    path: '/table',
    component: './Table',
  },
  {
    name: '嵌套表单',
    path: '/nesting',
    component: './NestingForm',
  },
  {
    name: '反馈列表',
    path: '/suggestion',
    component: './Suggestion',
  },
];
