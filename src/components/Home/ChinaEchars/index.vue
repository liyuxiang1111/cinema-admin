<template>
  <div class="ChinaEcharts">
    <div class="wrap">
      <div id="map" :style="'width:' + Width + ';height:' + Height">
        <div :style="'width:' + Width + ';height:' + Height" ref="myEchart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import china from './china.json'
import Options from './optionConfig' //地图配置
export default {
  name: 'ChinaEcharts',
  props: {
    Width: {
      type: String,
      default() {
        return '730px'
      }
    },
    Height: {
      type: String,
      default() {
        return '600px'
      }
    },
    areaData: {
      type: Array,
      default() {
        return []
      }
    },
    option: {
      type: Object,
      default() {
        return new Options()
      }
    },
    colorList: {
      type: Array,
      default() {
        return ['#F4E001', '#F0805A', '#26C0C0']
      }
    },
    cityConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    areaItems: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  beforeDestroy() {
    this.myChart.off('click')
  },
  data() {
    return {
      wrap: null, //包裹框
      drawBar: null, // 柱状图
      barWrap: null,
      shaDe: null, // 遮挡层
      myChart: null,
      // 地区坐标
      selfAreaItems: {},
      selfAreaData: [],
      selfOption: new Options()
    }
  },

  mounted() {
    this.initEcharts()
  },
  methods: {
    loadMap(mapName, data) {
      if (data) {
        console.log(mapName, data, 'mapName, datamapName, data')
        this.echarts.registerMap(mapName, data)
      }
    },
    initEcharts() {
      this.echarts.registerMap('map', china)
      this.selfAreaData = JSON.parse(JSON.stringify(this.areaData))
      this.selfOption = JSON.parse(JSON.stringify(this.option))
      this.selfColor = JSON.parse(JSON.stringify(this.colorList))
      this.selfOption = JSON.parse(JSON.stringify(this.option))
      this.myChart = this.echarts.init(this.$refs.myEchart)
      if (this.cityConfig.dataJson) {
        this.loadMap(this.cityConfig.name, this.cityConfig.dataJson)
      }
      this.selfAreaItems = JSON.parse(JSON.stringify(this.areaItems))
      window.onresize = this.myChart.resize
      this.myChart.setOption(this.selfOption)
      // 拖拽跟缩放重置
      let throttledRenderEachCity = this.throttle(this.renderItems, 0)
      this.myChart.on('geoRoam', throttledRenderEachCity)
      this.renderItems()
      this.itemonClick()
    },
    // 缩放和拖拽
    throttle(fn, delay, debounce) {
      let currCall
      let lastCall = 0
      let lastExec = 0
      let timer = null
      let diff
      let scope
      let args
      delay = delay || 0
      function exec() {
        lastExec = new Date().getTime()
        timer = null
        fn.apply(scope, args || [])
      }

      let cb = function() {
        currCall = new Date().getTime()
        scope = this
        args = arguments
        diff = currCall - (debounce ? lastCall : lastExec) - delay

        clearTimeout(timer)

        if (debounce) {
          timer = setTimeout(exec, delay)
        } else {
          if (diff >= 0) {
            exec()
          } else {
            timer = setTimeout(exec, -diff)
          }
        }

        lastCall = currCall
      }

      return cb
    },
    // 填充 地图点位
    renderItems() {
      let option = Object.assign(this.selfOption, {
        xAxis: [],
        yAxis: [],
        grid: [],
        series: [],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'none'
          }
        }
      })
      this.selfAreaData.forEach((item, idx) => {
        let nodeCoord = this.selfAreaItems[item.areaName]
        let coord = this.myChart.convertToPixel('geo', nodeCoord)
        let titleItems = item.DateItems.map(i => i.title)
        let itemData = item.DateItems.map(i => Number(i.value))
        // console.log(item, this.selfAreaItems, coord);
        if (coord) {
          option.xAxis.push({
            id: idx + item.areaName,
            gridId: idx + item.areaName,
            type: 'category',
            name: item.areaName,
            nameLocation: 'middle',
            nameGap: 3,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#ffffff'
              }
            },
            data: titleItems,
            z: 100
          })
          option.yAxis.push({
            id: idx + item.areaName,
            gridId: idx + item.areaName,
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'red'
              }
            },
            min: 0,
            max: 'dataMax'
          })
          option.grid.push({
            id: idx + item.areaName,
            width: 15,
            height: 30,
            left: coord[0] - 15,
            top: coord[1] - 15,
            z: 10
          })
          option.series.push({
            id: idx + item.areaName,
            type: 'bar',
            xAxisId: idx + item.areaName,
            yAxisId: idx + item.areaName,
            barGap: 0,
            barCategoryGap: 0,
            data: itemData,
            barWidth: 7,
            z: 100,
            itemStyle: {
              normal: {
                color: params => {
                  let color
                  this.areaData.forEach(item => {
                    if (item.areaName == params.seriesId.slice(1)) {
                      item.DateItems.forEach(i => {
                        if (i.title == params.name) {
                          color = i.BgColor
                        }
                      })
                    }
                  })
                  // let color = this.selfColor[params.dataIndex];
                  return color
                }
              },
              opacity: 0,
              emphasis: {
                label: {
                  show: false
                }
              }
            }
          })
        }
      })
      this.myChart.setOption(option)
    },
    // 点击显示柱状图
    itemonClick() {
      this.myChart.on('click', e => {
        if (e.componentSubType == 'bar') {
          this.barWrap = document.createElement('div')
          this.drawBar = document.createElement('div')
          this.wrap = document.getElementsByClassName('wrap')[0]
          // 先清除所有柱状图
          // $(".tongJiTu").remove();
          // 创建遮挡层
          this.creatWrap()
          // 创建柱状图容器
          this.barWrap.id = 'bar-wrap'
          this.barWrap.className = 'bar-wrap'
          this.drawBar.className = 'zhuzhuang'
          let divX = this.getMousePos()['x']
          let divY = this.getMousePos()['y']
          this.barWrap.setAttribute('style', `width: 350px; height: 180px;border: 1px solid #ccc;position:absolute;top: ${divY}px;left:${divX}px`)
          this.drawBar.setAttribute('style', `width: 100%; height: 100%`)
          // 创建柱状图
          this.wrap.appendChild(this.barWrap)
          this.barWrap.appendChild(this.drawBar)
          this.zhuZhuangTu(e)
          // // 点击遮挡层消失
          this.clearWrap()
        }
        return
      })
    },
    // 获取横纵坐标
    getMousePos(e) {
      e = event || window.event
      let x = e.clientX
      let y = e.clientY
      return { x, y }
    },
    // 生成柱状图
    zhuZhuangTu(e) {
      let index = e.seriesIndex
      let bar = this.echarts.init(this.drawBar)
      let xTitle = this.selfAreaData[index].DateItems.map(i => i.title)
      let yValue = this.selfAreaData[index].DateItems.map(i => i.value)
      let option = {
        backgroundColor: 'rgba(255,255,255,.3)',
        legend: {
          data: xTitle
        },
        xAxis: [
          {
            type: 'category',
            data: xTitle
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: false
            },
            type: 'value'
          }
        ],
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorList = ['#F75D5D', '#59ED4F', '#4C91E7']
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#000'
                  }
                }
              }
            },
            data: yValue
          }
        ]
      }
      bar.setOption(option)
    },
    // 生成遮挡层
    creatWrap() {
      this.shaDe = document.createElement('div')
      this.shaDe.className = 'shaDe'
      this.wrap.appendChild(this.shaDe)
    },
    // 去掉遮挡层
    clearWrap() {
      this.shaDe.addEventListener(
        'click',
        () => {
          this.shaDe.remove()
          this.barWrap.remove()
          this.drawBar.remove()
          return false
        },
        false
      )
    }
  }
}
</script>

<style>
.shaDe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
<style scoped>
.wrap {
  background: #292b2e;
}
</style>
