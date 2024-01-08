import { LAYOUT } from '@/router/constant';
import { AppRouteModule } from '@/router/types';

const feat: AppRouteModule[] = [
  {
    path: '/system/dict-data/:dictId(\\d+)',
    name: 'SysDictData',
    component: LAYOUT,
    meta: {
      title: '字典数据',
    },
    children: [
      {
        path: 'index',
        name: 'SysDictDataIndex',
        component: () => import('@/views/system/dict/data/index.vue'),
        meta: {
          title: '字典数据',
          hideMenu: true,
          hideTab: true,
          currentActiveMenu: '/system/dict',
        },
      },
    ],
  },
  // {
  //   path: '/demo2/dict-data/:id',
  //   name: 'Demo2DictData',
  //   component: LAYOUT,
  //   meta: {
  //     title: '代码数据',
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Demo2DictDataIndex',
  //       component: () => import('@/views/demo2/dict/data/index.vue'),
  //       meta: {
  //         title: '代码数据',
  //         hideMenu: true,
  //         hideTab: true,
  //         currentActiveMenu: '/demo2/dict2',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/gen/edit/:tableId',
    name: 'GenEdit',
    component: LAYOUT,
    meta: {
      title: '代码编辑',
    },
    children: [
      {
        path: '',
        name: 'GenEditIndex',
        component: () => import('@/views/tool/gen/EditGenerate.vue'),
        meta: {
          title: '代码编辑',
          hideMenu: true,
          // hideTab: true,
          currentActiveMenu: '/tool/gen',
        },
      },
    ],
  },
  {
    path: '/system/role-auth/user',
    name: 'RoleAuthUser',
    component: LAYOUT,
    meta: {
      title: '分配用户',
    },
    children: [
      {
        path: ':roleId',
        name: 'RoleAuthUserIndex',
        component: () => import('@/views/system/role/auth/index.vue'),
        meta: {
          title: '分配用户',
          currentActiveMenu: '/system/role',
        },
      },
    ],
  },
  {
    path: '/oss-config',
    name: 'OssConfig',
    component: LAYOUT,
    meta: {
      title: 'OSS配置管理',
    },
    children: [
      {
        path: 'index',
        name: 'OssConfigIndex',
        component: () => import('@/views/system/oss/OssConfig.vue'),
        meta: {
          title: 'OSS配置管理',
          currentActiveMenu: '/system/oss',
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: LAYOUT,
    meta: {
      title: '个人中心',
    },
    children: [
      {
        path: '',
        name: 'UserProfileIndex',
        component: () => import('@/views/system/user/profile/index.vue'),
        meta: {
          title: '个人中心',
          showTab: false,
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/user/setting',
    name: 'UserSetting',
    component: LAYOUT,
    meta: {
      title: '个人设置',
    },
    children: [
      {
        path: '',
        name: 'UserSettingIndex',
        component: () => import('@/views/system/user/setting/index.vue'),
        meta: {
          title: '个人设置',
          showTab: false,
          hideMenu: true,
        },
      },
    ],
  },
];

export default feat;
