/**
 * Created by leibo on 2018/12/4.
 */
export default [
  //登录
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/home',
    name: 'Home',
    redirect: 'home/userHome',
    component: () => import('@/views/userAdmin/userAdminHomePage/index'),
    children: [
      //首页
      {
        path: 'userHome',
        name: 'UserHome',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/userAdmin/UserHome/index'),
      },
      //订单
      {
        path: 'order',
        name: 'Order',
        meta: {
          title: '订单',
          icon: 'order'
        },
        redirect: 'order/advanceOrder',
        component: () => import('@/views/userAdmin/Order/index'),
        children: [
          {
            path: 'advanceOrder',
            name: 'AdvanceOrder',
            meta: {
              title: '预订单'
            },
            component: () => import('@/views/userAdmin/Order/AdvanceOrder/index'),
          },
          {
            path: 'orderQuery',
            name: 'OrderQuery',
            meta: {
              title: '订单查询'
            },
            component: () => import('@/views/userAdmin/Order/OrderQuery/index'),
          },
          {
            path: 'teamManagement',
            name: 'TeamManagement',
            meta: {
              title: '团队管理'
            },
            component: () => import('@/views/userAdmin/Order/TeamManagement/index'),
          },
          {
            path: 'invoiceQuery',
            name: 'InvoiceQuery',
            meta: {
              title: '发票查询'
            },
            component: () => import('@/views/userAdmin/Order/InvoiceQuery/index'),
          },
          {
            path: 'preLicensing',
            name: 'PreLicensing',
            meta: {
              title: '预授权查询'
            },
            component: () => import('@/views/userAdmin/Order/PreLicensing/index'),
          },
          {
            path: 'logQuery',
            name: 'LogQuery',
            meta: {
              title: '日志查询'
            },
            component: () => import('@/views/userAdmin/Order/LogQuery/index'),
          },
          {
            path: 'lossClaim',
            name: 'LossClaim',
            meta: {
              title: '失物认领'
            },
            component: () => import('@/views/userAdmin/Order/LossClaim/index'),
          },
          {
            path: 'leaseRecord',
            name: 'LeaseRecord',
            meta: {
              title: '租借记录'
            },
            component: () => import('@/views/userAdmin/Order/LeaseRecord/index'),
          },
          {
            path: 'compensationRecord',
            name: 'CompensationRecord',
            meta: {
              title: '赔偿记录'
            },
            component: () => import('@/views/userAdmin/Order/CompensationRecord/index'),
          },
        ],
      },
      //会员
      {
        path: '/vip',
        name: 'Vip',
        component: () => import('@/views/userAdmin/Vip/index'),
        meta: {
          title: '会员',
          icon: 'vip'
        },
        redirect: '/vip/vipAdminWrap',
        children: [
          {
            path: 'vipAdminWrap',
            name: 'VipAdminWrap',
            component: () => import('@/views/userAdmin/Vip/VipAdmin/index'),
            redirect: 'vipAdminWrap/vipInfoAdmin',
            meta: {
              title: '会员管理',
            },
            children: [
              {
                path: 'vipInfoAdmin',
                name: 'VipInfoAdmin',
                component: () => import('@/views/userAdmin/Vip/VipAdmin/VipInfoAdmin'),
                meta: {
                  title: '信息管理',
                }
              },
              {
                path: 'vipIntegralQuery',
                name: 'VipIntegralQuery',
                component: () => import('@/views/userAdmin/Vip/VipAdmin/VipIntegralQuery'),
                meta: {
                  title: '积分查询',
                }
              },
              {
                path: 'vipStoredValueBill',
                name: 'VipStoredValueBill',
                component: () => import('@/views/userAdmin/Vip/VipAdmin/VipStoredValueBill'),
                meta: {
                  title: '储值账单',
                }
              },
              {
                path: 'vipOperationJournal',
                name: 'VipOperationJournal',
                component: () => import('@/views/userAdmin/Vip/VipAdmin/VipOperationJournal'),
                meta: {
                  title: '操作日志',
                }
              }
            ]
          },
          //券管理
          {
            path: 'couponAdminWrap',
            name: 'CouponAdminWrap',
            component: () => import('@/views/userAdmin/Vip/CouponAdmin/index'),
            redirect: 'couponAdminWrap/couponNoThreshold',
            meta: {
              title: '券管理',
            },
            children: [
              {
                path: 'couponNoThreshold',
                name: 'CouponNoThreshold',
                component: () => import('@/views/userAdmin/Vip/CouponAdmin/CouponNoThreshold'),
                meta: {
                  title: '无门槛券',
                },
              },
              {
                path: 'couponGiftRoom',
                name: 'CouponGiftRoom',
                component: () => import('@/views/userAdmin/Vip/CouponAdmin/CouponGiftRoom'),
                meta: {
                  title: '赠房券',
                },
              },
              {
                path: 'couponQuery',
                name: 'CouponQuery',
                component: () => import('@/views/userAdmin/Vip/CouponAdmin/CouponQuery'),
                meta: {
                  title: '券查询',
                },
              },
              {
                path: 'couponGrantJournal',
                name: 'CouponGrantJournal',
                component: () => import('@/views/userAdmin/Vip/CouponAdmin/CouponGrantJournal'),
                meta: {
                  title: '发放日志',
                },
              }

            ]
          }
        ]
      },
      //系统
      {
        path: '/system',
        name: 'System',
        component: () => import('@/views/userAdmin/System/index'),
        meta: {
          title: '系统',
          icon: 'system'
        },
        redirect: '/system/systemInfrastructure',
        children: [
          //基础设施
          {
            path: 'systemInfrastructure',
            name: 'SystemInfrastructure',
            component: () => import('@/views/userAdmin/System/SystemInfrastructure/index'),
            redirect: 'systemInfrastructure/systemRoomTypeMaintain',
            meta: {
              title: '基础设施'
            },
            children: [
              {
                path: 'systemRoomTypeMaintain',
                name: 'SystemRoomTypeMaintain',
                component: () => import('@/views/userAdmin/System/SystemInfrastructure/SystemRoomTypeMaintain'),
                meta: {
                  title: '房型维护'
                },
              },
              {
                path: 'systemFictitiousRoomType',
                name: 'SystemFictitiousRoomType',
                component: () => import('@/views/userAdmin/System/SystemInfrastructure/SystemFictitiousRoomType'),
                meta: {
                  title: '虚拟房型'
                },
              },
              {
                path: 'systemTungFloor',
                name: 'SystemTungFloor',
                component: () => import('@/views/userAdmin/System/SystemInfrastructure/SystemTungFloor'),
                meta: {
                  title: '楼栋楼层'
                },
              },
              {
                path: 'systemRoomInfo',
                name: 'SystemRoomInfo',
                component: () => import('@/views/userAdmin/System/SystemInfrastructure/SystemRoomInfo'),
                meta: {
                  title: '房间信息'
                },
              },
              {
                path: 'systemRoomLock',
                name: 'SystemRoomLock',
                component: () => import('@/views/userAdmin/System/SystemInfrastructure/SystemRoomLock'),
                meta: {
                  title: '房锁维护'
                },
              },
              {
                path: 'ammeter',
                name: 'Ammeter',
                redirect:'ammeter',
                // component: () => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting'),
                components:{
                  // default: ()=>import('@/views/userAdmin/System/SystemInfrastructure'),
                  default: ()=>import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting/Ammeter'),
                  // name: ()=>import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting'),
                },
                meta: {
                  title: '能耗基础设置'
                },
/*                children:[
                  {
                    path: 'ammeter',
                    name: 'Ammeter',
                    // hidden:true,
                    // alwaysShow:true,
                    components: {
                      default:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting'),
                      energyBase:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting/Ammeter'),
                    },
                    meta: {
                      title: '电表'
                    }},
                  {
                    path: 'waterMeter',
                    name: 'WaterMeter',
                    // hidden:true,
                    // alwaysShow:true,
                    components: {
                      default:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting'),
                      energyBase:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting/WaterMeter'),
                    },
                    meta: {
                      title: '水表'
                    }},
                  {
                    path: 'gasMeter',
                    name: 'GasMeter',
                    hidden:true,
                    alwaysShow:true,
                    components: {
                      default:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting'),
                      energyBase:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting/GasMeter'),
                    },
                    meta: {
                      title: '气表'
                    }},
                  {
                    path: 'configCost',
                    name: 'ConfigCost',
                    hidden:true,
                    alwaysShow:true,
                    components: {
                      default:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting'),
                      energyBase:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting/ConfigCost'),
                    },
                    meta: {
                      title: '配置费用'
                    }},
                ],*/
              },
              {
                path: 'ammeter',
                name: 'Ammeter',
                hidden:true,
                alwaysShow:true,
                components: {
                  default:() => import('@/views/userAdmin/System/SystemInfrastructure'),
                  energyBase:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting/Ammeter'),
                },
                meta: {
                  title: '电表'
                }},
              {
                path: 'waterMeter',
                name: 'WaterMeter',
                hidden:true,
                alwaysShow:true,
                components: {
                  default:() => import('@/views/userAdmin/System/SystemInfrastructure'),
                  energyBase:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting/WaterMeter'),
                },
                meta: {
                  title: '水表'
                }},
              {
                path: 'gasMeter',
                name: 'GasMeter',
                hidden:true,
                alwaysShow:true,
                components: {
                  default:() => import('@/views/userAdmin/System/SystemInfrastructure'),
                  energyBase:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting/GasMeter'),
                },
                meta: {
                  title: '气表'
                }},
              {
                path: 'configCost',
                name: 'ConfigCost',
                hidden:true,
                alwaysShow:true,
                components: {
                  default:() => import('@/views/userAdmin/System/SystemInfrastructure'),
                  energyBase:() => import('@/views/userAdmin/System/SystemInfrastructure/SystemBasicsSetting/ConfigCost'),
                },
                meta: {
                  title: '配置费用'
                }},
            ]
          },
          //交班设置
          {
            path: 'systemHandOverDuty',
            name: 'SystemHandOverDuty',
            component: () => import('@/views/userAdmin/System/SystemHandOverDuty/index'),
            redirect: 'systemHandOverDuty/systemHandOverPattern',
            meta: {
              title: '交班设置'
            },
            children: [
              {
                path: 'systemHandOverPattern',
                name: 'SystemHandOverPattern',
                component: () => import('@/views/userAdmin/System/SystemHandOverDuty/SystemHandOverPattern'),
                meta: {
                  title: '交班模式'
                },
              },
              {
                path: 'systemHandOverShifts',
                name: 'SystemHandOverShifts',
                component: () => import('@/views/userAdmin/System/SystemHandOverDuty/SystemHandOverShifts'),
                meta: {
                  title: '班次查询'
                },
              }
            ]
          },
          //损物赔偿
          {
            path: 'systemDamageMatter',
            name: 'SystemDamageMatter',
            component: () => import('@/views/userAdmin/System/SystemDamageMatter/index'),
            redirect: 'systemDamageMatter/systemDamageType',
            meta: {
              title: '损物赔偿'
            },
            children: [
              {
                path: 'systemDamageType',
                name: 'SystemDamageType',
                component: () => import('@/views/userAdmin/System/SystemDamageMatter/SystemDamageType'),
                meta: {
                  title: '损物赔偿类型'
                }
              },
              {
                path: 'systemDamageGoods',
                name: 'SystemDamageGoods',
                component: () => import('@/views/userAdmin/System/SystemDamageMatter/SystemDamageGoods'),
                meta: {
                  title: '损物赔偿物品'
                }
              }
            ]
          },
          //酒店硬件
          {
            path: 'systemHotelHardware',
            name: 'SystemHotelHardware',
            component: () => import('@/views/userAdmin/System/SystemHotelHardware/index'),
            redirect: 'systemHotelHardware/systemHardwareList',
            meta: {
              title: '酒店硬件'
            },
            children: [
              {
                path: 'systemHardwareList',
                name: 'SystemHardwareList',
                component: () => import('@/views/userAdmin/System/SystemHotelHardware/SystemHardwareList'),
                meta: {
                  title: '硬件列表'
                },
              }
            ]
          }
        ]
      },
      //中介
      {
        path: 'intermediary',
        name: 'Intermediary',
        meta: {
          title: '中介',
          icon: 'OTA'
        },
        redirect: 'intermediary/intermediaryManagement',
        component: () => import('@/views/userAdmin/Intermediary/index'),
        children: [
          {
            path: 'intermediaryManagement',
            name: 'IntermediaryManagement',
            meta: {
              title: '中介管理'
            },
            component: () => import('@/views/userAdmin/Intermediary/IntermediaryManagement/index'),
          },
          {
            path: 'accountingEnquiry',
            name: 'AccountingEnquiry',
            meta: {
              title: '账务查询'
            },
            component: () => import('@/views/userAdmin/Intermediary/AccountingEnquiry/index'),
          },
          {
            path: 'accountSetManagement',
            name: 'AccountSetManagement',
            meta: {
              title: '账套管理'
            },
            component: () => import('@/views/userAdmin/Intermediary/AccountSetManagement/index'),
          },
          {
            path: 'collectionEnquiry',
            name: 'CollectionEnquiry',
            meta: {
              title: '收款查询'
            },
            component: () => import('@/views/userAdmin/Intermediary/CollectionEnquiry/index'),
          },
          {
            path: 'accountingTreatment',
            name: 'AccountingTreatment',
            meta: {
              title: '账务处理'
            },
            component: () => import('@/views/userAdmin/Intermediary/AccountingTreatment/index'),
          },
          {
            path: 'commissions',
            name: 'Commissions',
            meta: {
              title: '佣金管理'
            },
            component: () => import('@/views/userAdmin/Intermediary/Commissions/index'),
          },
          {
            path: 'commissionStrategy',
            name: 'CommissionStrategy',
            meta: {
              title: '佣金策略管理'
            },
            component: () => import('@/views/userAdmin/Intermediary/CommissionStrategy/index'),
          },
        ]
      },

    ]
  },

]