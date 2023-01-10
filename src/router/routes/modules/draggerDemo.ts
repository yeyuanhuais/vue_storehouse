import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/draggerDemo',
  name: 'DraggerDemo',
  component: LAYOUT,
  redirect: '/draggerDemo/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '拖拽组件示例',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'draggerDemoPage',
      component: () => import('/@/views/sys/draggerDemo/index.vue'),
      meta: {
        title: '拖拽组件示例',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default about;
