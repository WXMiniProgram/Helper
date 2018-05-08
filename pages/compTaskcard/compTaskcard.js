Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    taskArray: [
      {
        latitude: 23.099794,
        longitude: 113.324520,
        posDes: "上海市人民广场",
        picUrl: '../../images/bg01.jpg',
        userId: "Cuttlefish",
        userUrl: "../../images/img01.jpg",
        srvDistance: 2,
        srvTime: "今天 12:00",
        srvTitle: "取快递",
        srvDesc: "如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递~谢谢啦",
        srvCost: 500,
        taskId: "00001"
      }, {
        latitude: 23.099794,
        longitude: 113.324520,
        posDes: "上海市人民广场",
        picUrl: '../../images/bg01.jpg',
        userId: "-欣欣欣欣-",
        userUrl: "../../images/img01.jpg",
        srvDistance: 2,
        srvTime: "今天 12:00",
        srvTitle: "西北门取快递",
        srvDesc: "如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递如题，求帮忙去快递~谢谢啦",
        srvCost: 500,
        taskId: "00001"
      }, {
        latitude: 31.2398060000,
        longitude: 121.6695800000,
        posDes: "上海市浦东新区顾唐路1699号",
        picUrl: '../../images/bg02.jpg',
        userId: "October_-",
        userUrl: "../../images/img02.jpg",
        srvDistance: 3,
        srvTime: "18/5/5 12:00",
        srvTitle: "求带材料去总部",
        srvDesc: "求带材料去总部~谢谢啦",
        srvCost: 1000,
        taskId: "00002"
      },
      {
        latitude: 23.099794,
        longitude: 113.324520,
        posDes: "上海迪士尼乐园",
        picUrl: '../../images/bg01.jpg',
        userId: "Jesuslessness",
        userUrl: "../../images/img01.jpg",
        srvDistance: 2,
        srvTime: "今天 12:00",
        srvTitle: "求拼车去地铁站",
        srvDesc: "如题，大家快快行动起来~",
        srvCost: 500,
        taskId: "00003"

      },
      {
        latitude: 31.2398060000,
        longitude: 121.6695800000,
        posDes: "上海唐镇地铁站",
        picUrl: '../../images/bg02.jpg',
        userId: "For Smurf's Sake",
        userUrl: "../../images/img02.jpg",
        srvDistance: 3,
        srvTime: "今天 12:00",
        srvTitle: "求介绍附近靠谱的房子~",
        srvDesc: "本人由于近期要来这里工作，所以需要租个房子。。。",
        srvCost: 1000,
        taskId: "00004"
      }
    ]
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { }
  }
})