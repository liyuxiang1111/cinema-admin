/** 
 *  中国地图配置文件
 *  作者：码农xiaoLu
*/

export default class Options {
  constructor() {
    return {
      tooltip: {},
      geo: {
        map: "map",
        roam: true,
        label: {
          show: false,
          normal: {
            show: false,
            textStyle: {
              color: "#ffffff",
              fontSize: 12,
            },
          },
          emphasis: {
            show: true,
            textStyle: {
              color: "#ffffff",
              fontSize: 12,
            },
          },
        },
        itemStyle: {
          normal: {
            borderColor: "#ccc",
            areaColor: "#464C5B",
          },
          emphasis: {
            areaColor: "#9DD4F4",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }
    };
  }
}
