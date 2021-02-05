export const systemMenu = [
  { id: 'yydt', title: '营运动态监测', icon: 'icon-dtjk' },
  { id: 'fzjc', title: '辅助决策', icon: 'icon-fzjc' },
  { id: 'fwzl', title: '服务质量', icon: 'icon-fzjc' },
  { id: 'yjcz', title: '应急处置', icon: 'icon-fzjc' },
  { id: 'yhgl', title: '用户管理', icon: 'icon-fzjc' }
]
export const secondaryMenu = {
  yydt: [
    // {id: "cldtjk", title: "车辆动态监控", icon: "icon-cljk", href: "/yydt/cldtjk"},
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
    { id: 'qygl', title: '区域管理', icon: 'icon-tdqy', href: '/yydt/qygl' },
    // {id: "clyygl", title: "车辆运营管理", icon: "icon-clyy", href: "/yydt/clyygl"},
    {
      id: 'jcsjcx',
      title: '日常监测预警',
      icon: 'icon-rcyj',
      fullPath: '/yydt/jcsjcx',
      children: [
        {
          id: 'wzyyfx',
          title: '违规营运分析',
          icon: 'icon-wgyy',
          href: '/yydt/jcsjcx/wzyyfx'
        },
        {
          id: 'clcqyj',
          title: '车辆超期预警',
          icon: 'icon-clyj',
          href: '/yydt/jcsjcx/clcqyj'
        }
      ]
    }
  ],
  fzjc: [
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
          id: 'zhptcx',
          title: '综合平台查询',
          icon: 'icon-ptcx',
          href: '/fzjc/zhxxcx/zhptcx'
        },
        {
          id: 'zhclcx',
          title: '综合车辆查询',
          icon: 'icon-clcx',
          href: '/fzjc/zhxxcx/zhclcx'
        },
        {
          id: 'zhjsycx',
          title: '综合驾驶员查询',
          icon: 'icon-jsycx',
          href: '/fzjc/zhxxcx/zhjsycx'
        }
      ]
    },
    {
      id: 'zhddcx',
      title: '综合订单查询',
      icon: 'icon-zhdd',
      href: '/fzjc/zhddcx'
    },
    // {id: "yyywcx", title: "经营业务查询", icon: "icon-jyyw", href: "/fzjc/yyywcx"},
    // {id: "qyyytj", title: "企业经营统计", icon: "icon-qyjy", href: "/fzjc/qyyytj"},
    // {id: "clyxtj", title: "车辆运行统计", icon: "icon-cltj", href: "/fzjc/clyxtj"},
    {
      id: 'ddsjtj',
      title: '订单数据统计',
      icon: 'icon-ddsj',
      fullPath: '/fzjc/ddsjtj',
      children: [
        {
          id: 'qyyb',
          title: '企业月报',
          icon: 'icon-ptcx',
          href: '/fzjc/ddsjtj/qyyb'
        },
        {
          id: 'qyrb',
          title: '企业日报',
          icon: 'icon-ptcx',
          href: '/fzjc/ddsjtj/qyrb'
        }
      ]
    },
    {
      id: 'hyyxtj',
      title: '行业运行统计',
      icon: 'icon-hyyx',
      fullPath: '/fzjc/hyyxtj',
      children: [
        {
          id: 'ycjyfx',
          title: '异常经营分析',
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
    }
    // {id: "fwzltj", title: "服务质量统计", icon: "icon-fwzl", href: "/fzjc/fwzltj"}
  ],
  fwzl: [
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
  ],
  // yjcz: [
  //   {
  //     id: 'yjjr',
  //     title: '应急接入',
  //     icon: 'icon-clyj',
  //     fullPath: '/yjcz/yjjr',
  //     children: [
  //       { id: 'zb', title: '值班', icon: 'icon-ptcx', href: '/yjcz/yjjr/zb' },
  //       { id: 'jr', title: '接入', icon: 'icon-ptcx', href: '/yjcz/yjjr/jr' }
  //     ]
  //   },
  //   { id: 'qdbs', title: '启动报送', icon: 'icon-clsh', href: '/yjcz/qdbs' },
  //   {
  //     id: 'sjcl',
  //     title: '事件处理',
  //     icon: 'icon-clsh',
  //     fullPath: '/yjcz/sjcl',
  //     children: [
  //       {
  //         id: 'zhdd',
  //         title: '指挥调度',
  //         icon: 'icon-clsh',
  //         href: '/yjcz/sjcl/zhdd'
  //       },
  //       {
  //         id: 'czlc',
  //         title: '处置流程',
  //         icon: 'icon-clsh',
  //         href: '/yjcz/sjcl/czlc'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'xxfb',
  //     title: '信息发布',
  //     icon: 'icon-clyj',
  //     fullPath: '/yjcz/xxfb',
  //     children: [
  //       {
  //         id: 'xxsc',
  //         title: '信息生成',
  //         icon: 'icon-ptcx',
  //         href: '/yjcz/xxfb/xxsc'
  //       },
  //       {
  //         id: 'sonxxfb',
  //         title: '信息发布',
  //         icon: 'icon-ptcx',
  //         href: '/yjcz/xxfb/sonxxfb'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'cxytj',
  //     title: '查询与统计',
  //     icon: 'icon-clsh',
  //     href: '/yjcz/cxytj'
  //   },
  //   {
  //     id: 'zyk',
  //     title: '资源库',
  //     icon: 'icon-clsh',
  //     fullPath: '/yjcz/zyk',
  //     children: [
  //       {
  //         id: 'yjya',
  //         title: '应急预案',
  //         icon: 'icon-clsh',
  //         href: '/yjcz/zyk/yjya'
  //       },
  //       {
  //         id: 'yjzyk',
  //         title: '应急资源库',
  //         icon: 'icon-clsh',
  //         fullPath: '/yjcz/zyk/yjzyk',
  //         children: [
  //           {
  //             id: 'flfg',
  //             title: '法律法规',
  //             icon: 'icon-clsh',
  //             href: '/yjcz/zyk/yjzyk/flfg'
  //           },
  //           {
  //             id: 'alk',
  //             title: '案例库',
  //             icon: 'icon-clsh',
  //             href: '/yjcz/zyk/yjzyk/alk'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ],
  yhgl: [
    { id: 'yh', title: '用户', icon: 'icon-clyj', href: '/yhgl/yh' },
    { id: 'qx', title: '权限', icon: 'icon-clyj', href: '/yhgl/qx' },
    { id: 'rz', title: '日志', icon: 'icon-clyj', href: '/yhgl/rz' }
  ]
}
