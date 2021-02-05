export const headMenu = [
  {
    id: 'yingyunzonglan',
    title: '营运总览',
    icon: 'icon-dtjk',
    fullPath: '/yingyunzonglan'
  },
  {
    id: 'yydt',
    title: '营运动态',
    icon: 'icon-dtjk',
    fullPath: '/yydt/cldtjk2'
  },
  {
    id: 'fzjc',
    title: '辅助决策',
    icon: 'icon-fzjc',
    fullPath: '/fzjc/xkcx/qycx'
  },
  {
    id: 'fwzl',
    title: '服务质量',
    icon: 'icon-fzjc',
    fullPath: '/fwzl/12328tscx'
  },
  {
    id: 'zfjc',
    title: '执法稽查',
    icon: 'icon-fzjc',
    fullPath: '/zfjc/zfdd'
  },
  {
    id: 'qysjjr',
    title: '企业数据接入',
    icon: 'icon-fzjc',
    fullPath: '/qysjjr/sjjrjc'
  },
  {
    id: 'yhgl',
    title: '用户管理',
    icon: 'icon-fzjc',
    fullPath: '/yhgl/yh'
  }
]

export const secondMenu = [
  {
    id: 'yingyunzonglan',
    title: '营运总览',
    icon: 'icon-cljk',
    fullPath: '/yingyunzonglan',
    children: []
  },
  {
    id: 'yydt',
    title: '营运动态',
    icon: 'icon-dtjk',
    fullPath: '/yydt',
    children: [
      {
        id: 'cldtjk2',
        title: '车辆动态监控',
        icon: 'icon-cljk',
        href: '/yydt/cldtjk2'
      },
      {
        id: 'tdqyjc',
        title: '特定区域监测',
        icon: 'icon-tdqy',
        href: '/yydt/tdqyjc'
      },
      {
        id: 'lsgjhf',
        title: '历史轨迹回放',
        icon: 'icon-lsgj',
        href: '/yydt/lsgjhf'
      },
      {
        id: 'dcdtjk',
        title: '多车动态监控',
        icon: 'icon-lsgj',
        href: '/yydt/dcdtjk'
      },
      {
        id: 'cklxfx1',
        title: '乘客流向分析',
        icon: 'icon-lsgj',
        href: '/yydt/cklxfx1'
      },
      {
        id: 'cklxfx',
        title: '异常流向分析',
        icon: 'icon-lsgj',
        href: '/yydt/cklxfx'
      },
      {
        id: 'rlfb',
        title: '热力分布',
        icon: 'icon-lsgj',
        href: '/yydt/rlfb'
      },

      // {id: "clyygl", title: "车辆运营管理", icon: "icon-clyy", href: "/yydt/clyygl"},
      {
        id: 'jcsjcx',
        title: '日常监测预警',
        icon: 'icon-rcyj',
        fullPath: '/yydt/jcsjcx',
        children: [
          {
            id: 'wzyyfx',
            title: '违规营运预警',
            icon: 'icon-wgyy',
            href: '/yydt/jcsjcx/wzyyfx'
          },
          {
            id: 'yqjyjk',
            title: '越区经营预警',
            icon: 'icon-lsgj',
            href: '/yydt/jcsjcx/yqjyjk'
          },
          {
            id: 'clcqyj',
            title: '车辆超期预警',
            icon: 'icon-clyj',
            href: '/yydt/jcsjcx/clcqyj'
          },
          {
            id: 'xzgn',
            title: '无证车辆上线预警',
            icon: 'icon-lsgj',
            href: '/yydt/jcsjcx/xzgn'
          },
          {
            id: 'rcbfjyyj',
            title: '人车不符经营预警',
            icon: 'icon-wgyy',
            href: '/yydt/jcsjcx/rcbfjyyj'
          }
          // {
          //   id: 'zdmbcx',
          //   title: '指定目标查询',
          //   icon: 'icon-zhcx',
          //   href: '/yydt/jcsjcx/zdmbcx'
          // }
        ]
      },
      { id: 'qygl', title: '区域管理', icon: 'icon-tdqy', href: '/yydt/qygl' }
    ]
  },
  {
    id: 'fzjc',
    title: '辅助决策',
    icon: 'icon-fzjc',
    fullPath: '/fzjc',
    children: [
      {
        id: 'xkcx',
        title: '许可查询',
        icon: 'icon-zhcx',
        fullPath: '/fzjc/xkcx',
        children: [
          {
            id: 'qycx',
            title: '企业查询',
            icon: 'icon-zhcx',
            href: '/fzjc/xkcx/qycx'
          },
          {
            id: 'drivercx',
            title: '驾驶员查询',
            icon: 'icon-zhcx',
            href: '/fzjc/xkcx/drivercx'
          },
          {
            id: 'carcx',
            title: '车辆查询',
            icon: 'icon-zhcx',
            href: '/fzjc/xkcx/carcx'
          }
        ]
      },
      {
        id: 'jcsjcx',
        title: '基础数据查询',
        icon: 'icon-jccx',
        fullPath: '/fzjc/jcsjcx',
        children: [
          {
            id: 'zhptcx',
            title: '综合平台查询',
            icon: 'icon-ptcx',
            href: '/fzjc/jcsjcx/zhptcx'
          },
          {
            id: 'zhclcx',
            title: '综合车辆查询',
            icon: 'icon-clcx',
            href: '/fzjc/jcsjcx/zhclcx'
          },
          {
            id: 'zhjsycx',
            title: '综合驾驶员查询',
            icon: 'icon-jsycx',
            href: '/fzjc/jcsjcx/zhjsycx'
          },
          {
            id: 'ptxx',
            title: '平台信息',
            icon: 'icon-ptcx',
            href: '/fzjc/jcsjcx/ptxx'
          },
          {
            id: 'ptjyxkxx',
            title: '平台经营许可信息',
            icon: 'icon-ptcx',
            href: '/fzjc/jcsjcx/ptjyxkxx'
          },
          {
            id: 'ptyygmxx',
            title: '平台营运规模信息',
            icon: 'icon-ptcx',
            href: '/fzjc/jcsjcx/ptyygmxx'
          },
          {
            id: 'ptzfxx',
            title: '平台支付信息',
            icon: 'icon-zfxx',
            href: '/fzjc/jcsjcx/ptzfxx'
          },
          {
            id: 'ptfwjg',
            title: '平台服务机构',
            icon: 'icon-kefu',
            href: '/fzjc/jcsjcx/ptfwjg'
          },
          {
            id: 'ptyjxx',
            title: '平台运价信息',
            icon: 'icon-jexx',
            href: '/fzjc/jcsjcx/ptyjxx'
          },
          {
            id: 'clxx',
            title: '车辆信息',
            icon: 'icon-cljk',
            href: '/fzjc/jcsjcx/clxx'
          },
          {
            id: 'clbxxx',
            title: '车辆保险信息',
            icon: 'icon-cljk',
            href: '/fzjc/jcsjcx/clbxxx'
          },
          {
            id: 'cllcxx',
            title: '车辆里程信息',
            icon: 'icon-cljk',
            href: '/fzjc/jcsjcx/cllcxx'
          },
          {
            id: 'jsyxx',
            title: '驾驶员信息',
            icon: 'icon-jsycx',
            href: '/fzjc/jcsjcx/jsyxx'
          },
          {
            id: 'jsypxxx',
            title: '驾驶员培训信息',
            icon: 'icon-jsycx',
            href: '/fzjc/jcsjcx/jsypxxx'
          },
          {
            id: 'jsyydzdxx',
            title: '驾驶员移动终端信息',
            icon: 'icon-jsycx',
            href: '/fzjc/jcsjcx/jsyydzdxx'
          },
          {
            id: 'jsytjxx',
            title: '驾驶员统计信息',
            icon: 'icon-jsycx',
            href: '/fzjc/jcsjcx/jsytjxx'
          }
        ]
      },
      {
        id: 'zhxxcx',
        title: '综合信息查询',
        icon: 'icon-zhcx',
        fullPath: '/fzjc/zhxxcx',
        children: [
          {
            id: 'tsmbcx',
            title: '特殊目标查询',
            icon: 'icon-tdqy',
            href: '/fzjc/zhxxcx/tsmbcx'
          },
          {
            id: 'zhddcx',
            title: '综合订单查询',
            icon: 'icon-zhdd',
            href: '/fzjc/zhxxcx/zhddcx'
          }
        ]
      },

      // {id: "yyywcx", title: "经营业务查询", icon: "icon-jyyw", href: "/fzjc/yyywcx"},
      // {id: "qyyytj", title: "企业经营统计", icon: "icon-qyjy", href: "/fzjc/qyyytj"},
      // {id: "clyxtj", title: "车辆运行统计", icon: "icon-cltj", href: "/fzjc/clyxtj"},
      // {
      //   id: 'ddsjtj',
      //   title: '订单数据统计',
      //   icon: 'icon-ddsj',
      //   fullPath: '/fzjc/ddsjtj',
      //   children: [
      //     {
      //       id: 'qyyb',
      //       title: '企业月报',
      //       icon: 'icon-ptcx',
      //       href: '/fzjc/ddsjtj/qyyb'
      //     },
      //     {
      //       id: 'qyrb',
      //       title: '企业日报',
      //       icon: 'icon-ptcx',
      //       href: '/fzjc/ddsjtj/qyrb'
      //     }
      //   ]
      // },
      {
        id: 'hyyxtj',
        title: '行业运行统计',
        icon: 'icon-hyyx',
        fullPath: '/fzjc/hyyxtj',
        children: [
          {
            id: 'ylfxbg',
            title: '运力分析报告',
            icon: 'icon-ycyy',
            href: '/fzjc/hyyxtj/ylfxbg'
          },
          {
            id: 'dcsyfx',
            title: '单车收益分析',
            icon: 'icon-ycyy',
            href: '/fzjc/hyyxtj/dcsyfx'
          },
          {
            id: 'ycjyfx',
            title: '异常经营统计',
            icon: 'icon-ycyy',
            href: '/fzjc/hyyxtj/ycjyfx'
          },
          {
            id: 'wyycltj',
            title: '未营运车辆统计',
            icon: 'icon-clsh',
            href: '/fzjc/hyyxtj/wyycltj'
          },
          // {id: "wyyjsytj", title: "未营运驾驶员统计", icon: "icon-jsycx", href: "/fzjc/hyyxtj/wyyjsytj"},
          {
            id: 'yycctj',
            title: '营运出车统计',
            icon: 'icon-clsh',
            href: '/fzjc/hyyxtj/yycctj'
          }
        ]
      },
      {
        id: 'qyyyywtj',
        title: '企业营运业务统计',
        icon: 'icon-hyyx',
        fullPath: '/fzjc/qyyyywtj',
        children: [
          {
            id: 'qyrjyytj',
            title: '企业日均营运分析',
            icon: 'icon-ycyy',
            href: '/fzjc/qyyyywtj/qyrjyytj'
          },
          {
            id: 'qyydyytj',
            title: '企业月度营运统计',
            icon: 'icon-ycyy',
            href: '/fzjc/qyyyywtj/qyydyytj'
          },
          {
            id: 'qyrjdcfx',
            title: '企业日均单车分析',
            icon: 'icon-clsh',
            href: '/fzjc/qyyyywtj/qyrjdcfx'
          },
          {
            id: 'qyyddctj',
            title: '企业月度单车统计',
            icon: 'icon-clsh',
            href: '/fzjc/qyyyywtj/qyyddctj'
          }
        ]
      }

      // {id: "fwzltj", title: "服务质量统计", icon: "icon-fwzl", href: "/fzjc/fwzltj"}
    ]
  },
  {
    id: 'fwzl',
    title: '服务质量',
    icon: 'icon-fzjc',
    fullPath: '/fwzl',
    children: [
      {
        id: '12328tscx',
        title: '12328投诉查询',
        icon: 'icon-clyj',
        href: '/fwzl/12328tscx'
      },
      {
        id: 'tsddcx',
        title: '投诉订单查询',
        icon: 'icon-clyj',
        href: '/fwzl/tsddcx'
      }
    ]
  },
  {
    id: 'zfjc',
    title: '执法稽查',
    icon: 'icon-fzjc',
    fullPath: '/zfjc',
    children: [
      {
        id: '12328tscx',
        title: '执法调度',
        icon: 'icon-clyj',
        href: '/zfjc/zfdd'
      },
      {
        id: 'tjdc',
        title: '执法查询',
        icon: 'icon-clyj',
        href: '/zfjc/tjdc'
      },
      {
        id: 'wffx',
        title: '违法分析',
        icon: 'icon-clyj',
        href: '/zfjc/wffx'
      }
    ]
  },
  // {
  //   id: 'yjcz',
  //   title: '应急处置',
  //   icon: 'icon-fzjc',
  //   fullPath: '/yjcz',
  //   children: [
  //     {
  //       id: 'yjjr',
  //       title: '应急接入',
  //       icon: 'icon-clyj',
  //       fullPath: '/yjcz/yjjr',
  //       children: [
  //         { id: 'zb', title: '值班', icon: 'icon-ptcx', href: '/yjcz/yjjr/zb' },
  //         { id: 'jr', title: '接入', icon: 'icon-ptcx', href: '/yjcz/yjjr/jr' }
  //       ]
  //     },
  //
  //     {
  //       id: 'sjcl',
  //       title: '事件处理',
  //       icon: 'icon-clsh',
  //       fullPath: '/yjcz/sjcl',
  //       children: [
  //         {
  //           id: 'sjclzhdd',
  //           title: '指挥调度',
  //           icon: 'icon-clsh',
  //           href: '/yjcz/sjcl/zhdd'
  //         },
  //         {
  //           id: 'czlc',
  //           title: '处置流程',
  //           icon: 'icon-clsh',
  //           href: '/yjcz/sjcl/czlc'
  //         }
  //       ]
  //     },
  //     {
  //       id: 'xxfb',
  //       title: '信息发布',
  //       icon: 'icon-clyj',
  //       fullPath: '/yjcz/xxfb',
  //       children: [
  //         {
  //           id: 'xxsc',
  //           title: '信息生成',
  //           icon: 'icon-ptcx',
  //           href: '/yjcz/xxfb/xxsc'
  //         },
  //         {
  //           id: 'sonxxfb',
  //           title: '信息发布',
  //           icon: 'icon-ptcx',
  //           href: '/yjcz/xxfb/sonxxfb'
  //         }
  //       ]
  //     },
  //
  //     {
  //       id: 'zyk',
  //       title: '资源库',
  //       icon: 'icon-clsh',
  //       fullPath: '/yjcz/zyk',
  //       children: [
  //         {
  //           id: 'yjya',
  //           title: '应急预案',
  //           icon: 'icon-clsh',
  //           href: '/yjcz/zyk/yjya'
  //         },
  //         {
  //           id: 'yjzyk',
  //           title: '应急资源库',
  //           icon: 'icon-clsh',
  //           fullPath: '/yjcz/zyk/yjzyk',
  //           children: [
  //             {
  //               id: 'flfg',
  //               title: '法律法规',
  //               icon: 'icon-clsh',
  //               href: '/yjcz/zyk/yjzyk/flfg'
  //             },
  //             {
  //               id: 'alk',
  //               title: '案例库',
  //               icon: 'icon-clsh',
  //               href: '/yjcz/zyk/yjzyk/alk'
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     { id: 'qdbs', title: '启动报送', icon: 'icon-clsh', href: '/yjcz/qdbs' },
  //     {
  //       id: 'cxytj',
  //       title: '查询与统计',
  //       icon: 'icon-clsh',
  //       href: '/yjcz/cxytj'
  //     }
  //   ]
  // },
  {
    id: 'qysjjr',
    title: '企业数据接入',
    icon: 'icon-fzjc',
    fullPath: '/qysjjr',
    children: [
      {
        id: 'sjjrjc',
        title: '数据接入监测',
        icon: 'icon-clyj',
        href: '/qysjjr/sjjrjc'
      },
      {
        id: 'sjjrgl',
        title: '数据接入管理',
        icon: 'icon-clyj',
        href: '/qysjjr/sjjrgl'
      },
      {
        id: 'qyyydj',
        title: '企业运营登记',
        icon: 'icon-clyj',
        href: '/qysjjr/qyyydj'
      }
    ]
  },
  {
    id: 'yhgl',
    title: '用户管理',
    icon: 'icon-fzjc',
    fullPath: '/yhgl',
    children: [
      { id: 'yh', title: '用户', icon: 'icon-clyj', href: '/yhgl/yh' },
      { id: 'qx', title: '权限', icon: 'icon-clyj', href: '/yhgl/qx' },
      { id: 'rz', title: '日志', icon: 'icon-clyj', href: '/yhgl/rz' }
    ]
  }
]
