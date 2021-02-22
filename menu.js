export const menu = [
  {
    'path': '/',
    'component': 'Layout',
    'redirect': '/frontDesk',
    'children': [
      {
        'path': 'frontDesk',
        'component': () => import('@/views/frontDesk/index'),
        'name': 'Dashboard',
        'meta': { 'title': '前台', 'icon': 'index', 'affix': true, 'noCache': true }
      }
    ]
  },
  {
    'name': '消费收银',
    'path': '/system',
    'hidden': false,
    'redirect': 'noredirect',
    'component': 'Layout',
    'alwaysShow': true,
    'meta': {
      'title': '消费收银',
      'icon': 'system',
      'noCache': true
    },
    'children': [
      {
        'name': 'User',
        'path': 'user',
        'hidden': false,
        'component': 'system/user/index',
        'meta': {
          'title': '收银台',
          'icon': 'peoples',
          'noCache': true
        }
      },
      {
        'name': 'Role',
        'path': 'role',
        'hidden': false,
        'component': 'system/role/index',
        'meta': {
          'title': '消费纪录',
          'icon': 'role',
          'noCache': true
        }
      },
      {
        'name': 'Menu',
        'path': 'menu',
        'hidden': false,
        'component': 'system/menu/index',
        'meta': {
          'title': '统计销售',
          'icon': 'menu',
          'noCache': true
        }
      }
    ]
  },
  {
    'name': '会员管理',
    'path': '/monitor',
    'hidden': false,
    'redirect': 'noredirect',
    'component': 'Layout',
    'alwaysShow': true,
    'meta': {
      'title': '会员管理',
      'icon': 'monitor',
      'noCache': true
    },
    'children': [
      {
        'name': 'OnlineUser',
        'path': 'online',
        'hidden': false,
        'component': 'monitor/online/index',
        'meta': {
          'title': '会员列表',
          'icon': 'Steve-Jobs',
          'noCache': true
        }
      },
      {
        'name': 'Log',
        'path': 'logs',
        'hidden': false,
        'component': 'monitor/log/index',
        'meta': {
          'title': '会员类型',
          'icon': 'log',
          'noCache': true
        }
      },
      {
        'name': 'ErrorLog',
        'path': 'errorLog',
        'hidden': false,
        'component': 'monitor/log/errorLog',
        'meta': {
          'title': '星级管理',
          'icon': 'error',
          'noCache': true
        }
      },
      {
        'name': 'ServerMonitor',
        'path': 'server',
        'hidden': false,
        'component': 'monitor/server/index',
        'meta': {
          'title': '统计分析',
          'icon': 'codeConsole',
          'noCache': true
        }
      },
      {
        'name': 'Sql',
        'path': 'druid',
        'hidden': false,
        'component': 'monitor/sql/index',
        'meta': {
          'title': '地图分布',
          'icon': 'sqlMonitor',
          'noCache': true
        }
      }
    ]
  },
  {
    'path': '/',
    'component': 'Layout',
    'redirect': '/dashboard',
    'children': [
      {
        'path': 'dashboard1',
        'component': () => import('@/views/home'),
        'name': 'Dashboard',
        'meta': { 'title': '潜在客户', 'icon': 'index', 'affix': true, 'noCache': true }
      }
    ]
  },
  {
    'name': '项目管理',
    'path': '/mnt',
    'hidden': false,
    'redirect': 'noredirect',
    'component': 'Layout',
    'alwaysShow': true,
    'meta': {
      'title': '项目管理',
      'icon': 'mnt',
      'noCache': true
    },
    'children': [
      {
        'name': 'ServerDeploy',
        'path': 'mnt/serverDeploy',
        'hidden': false,
        'component': 'mnt/server/index',
        'meta': {
          'title': '团课项目',
          'icon': 'server',
          'noCache': true
        }
      }
    ]
  },
  {
    'name': '私教约课',
    'path': '/mnt',
    'hidden': false,
    'redirect': 'noredirect',
    'component': 'Layout',
    'alwaysShow': true,
    'meta': {
      'title': '私教约课',
      'icon': 'mnt',
      'noCache': true
    },
    'children': [
      {
        'name': 'ServerDeploy',
        'path': 'mnt/serverDeploy',
        'hidden': false,
        'component': 'mnt/server/index',
        'meta': {
          'title': '教练列表',
          'icon': 'server',
          'noCache': true
        }
      },
      {
        'name': 'App',
        'path': 'mnt/app',
        'hidden': false,
        'component': 'mnt/app/index',
        'meta': {
          'title': '私教项目',
          'icon': 'app',
          'noCache': true
        }
      },
      {
        'name': 'Deploy',
        'path': 'mnt/deploy',
        'hidden': false,
        'component': 'mnt/deploy/index',
        'meta': {
          'title': '部署管理',
          'icon': 'deploy',
          'noCache': true
        }
      },
      {
        'name': 'DeployHistory',
        'path': 'mnt/deployHistory',
        'hidden': false,
        'component': 'mnt/deployHistory/index',
        'meta': {
          'title': '教练排名',
          'icon': 'backup',
          'noCache': true
        }
      }
    ]
  },
  {
    'name': '商品管理',
    'path': '/sys-tools',
    'hidden': false,
    'redirect': 'noredirect',
    'component': 'Layout',
    'alwaysShow': true,
    'meta': {
      'title': '商品管理',
      'icon': 'sys-tools',
      'noCache': true
    },
    'children': [
      {
        'name': 'Timing',
        'path': 'timing',
        'hidden': false,
        'component': 'system/timing/index',
        'meta': {
          'title': '商品列表',
          'icon': 'timing',
          'noCache': true
        }
      },
      {
        'name': 'GeneratorIndex',
        'path': 'generator',
        'hidden': false,
        'component': 'generator/index',
        'meta': {
          'title': '供应商管理',
          'icon': 'dev',
          'noCache': false
        }
      },
      {
        'name': 'Pictures',
        'path': 'pictures',
        'hidden': false,
        'component': 'tools/picture/index',
        'meta': {
          'title': '库存管理',
          'icon': 'image',
          'noCache': true
        }
      }
    ]
  },
  {
    'name': '增值服务',
    'path': '/components',
    'hidden': false,
    'redirect': 'noredirect',
    'component': 'Layout',
    'alwaysShow': true,
    'meta': {
      'title': '增值服务',
      'icon': 'zujian',
      'noCache': true
    },
    'children': [
      {
        'name': 'Echarts',
        'path': 'echarts',
        'hidden': false,
        'component': 'components/Echarts',
        'meta': {
          'title': '短信发送',
          'icon': 'chart',
          'noCache': false
        }
      },
      {
        'name': 'Icons',
        'path': 'icon',
        'hidden': false,
        'component': 'components/icons/index',
        'meta': {
          'title': '发送记录',
          'icon': 'icon',
          'noCache': true
        }
      },
      {
        'name': 'Editor',
        'path': 'tinymce',
        'hidden': false,
        'component': 'components/Editor',
        'meta': {
          'title': '短信模板',
          'icon': 'fwb',
          'noCache': true
        }
      }
    ]
  },
  {
    'name': '提现中心',
    'path': '/nested',
    'hidden': false,
    'redirect': 'noredirect',
    'component': 'Layout',
    'alwaysShow': true,
    'meta': {
      'title': '提现中心',
      'icon': 'menu',
      'noCache': true
    },
    'children': [
      {
        'name': '收入记录',
        'path': 'menu2',
        'hidden': false,
        'component': 'nested/menu2/index',
        'meta': {
          'title': '收入记录',
          'icon': 'menu',
          'noCache': true
        }
      },
      {
        'name': '提现中心',
        'path': 'menu2',
        'hidden': false,
        'component': 'nested/menu2/index',
        'meta': {
          'title': '提现中心',
          'icon': 'menu',
          'noCache': true
        }
      }
    ]
  },
  {
    'name': '员工管理',
    'path': '/nested',
    'hidden': false,
    'redirect': 'noredirect',
    'component': 'Layout',
    'alwaysShow': true,
    'meta': {
      'title': '员工管理',
      'icon': 'menu',
      'noCache': true
    },
    'children': [
      {
        'name': '员工打卡',
        'path': 'menu2',
        'hidden': false,
        'component': 'nested/menu2/index',
        'meta': {
          'title': '员工打卡',
          'icon': 'menu',
          'noCache': true
        }
      },
      {
        'name': '员工档案',
        'path': 'menu2',
        'hidden': false,
        'component': 'nested/menu2/index',
        'meta': {
          'title': '员工档案',
          'icon': 'menu',
          'noCache': true
        }
      }
    ]
  },
  {
    'name': '系统管理',
    'path': '/nested',
    'hidden': false,
    'redirect': 'noredirect',
    'component': 'Layout',
    'alwaysShow': true,
    'meta': {
      'title': '系统管理',
      'icon': 'menu',
      'noCache': true
    },
    'children': [
      {
        'name': '用户设置',
        'path': 'menu2',
        'hidden': false,
        'component': 'nested/menu2/index',
        'meta': {
          'title': '用户设置',
          'icon': 'menu',
          'noCache': true
        }
      },
      {
        'name': '操作日志',
        'path': 'menu2',
        'hidden': false,
        'component': 'nested/menu2/index',
        'meta': {
          'title': '操作日志',
          'icon': 'menu',
          'noCache': true
        }
      }
    ]
  },
  {
    'path': '/',
    'component': 'Layout',
    'children': [
      {
        'path': 'mall',
        'component': () => import('@/views/mall/mall'),
        'name': 'Dashboard',
        'meta': { 'title': '心窝商城', 'icon': 'index', 'affix': true, 'noCache': true }
      }
    ]
  }
]
