<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Row,
  Col,
  Table,
  TableColumn,
  Input,
  Button,
  Form,
  FormItem,
  Pagination,
  Select,
  DatePicker,
  Option,
  Dialog,
  Upload,
  Cascader,
  Popover
} from 'element-ui'
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Cascader)
Vue.use(Main)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Popover)
export default {
  name: 'App'
}
</script>

<style lang="less">
@import url(./assets/less/value.less);
* {
  margin: 0;
  padding: 0;
  html {
    width: 100%;
    height: 100%;
    font-size: 62.5% !important;
    color: #474747;
  }
  body {
    font-family: 'Microsoft YaHei', 'Hiragino Sans GB', 'Arail';
    -webkit-box-sizing: border-box;
    margin: 0;
    background: #eee;
  }
  a {
    text-decoration: none;
    color: #ffa353;
  }
  li {
    list-style: none;
  }
  em,
  i {
    font-style: normal;
  }
  img {
    border: 0;
    vertical-align: middle;
  }
  button,
  input {
    font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, '\5B8B\4F53', sans-serif;
    border: 0;
    outline: none;
  }
  // 自定义类
  .button {
    cursor: pointer;
  }
  .white {
    background-color: #ffffff;
  }
  .boxshadow {
    box-shadow: 0px 0px 3px 3px rgba(193, 187, 187, 0.6);
  }
  // 浮动与清除浮动
  .clearfix:before,
  .clearfix:after {
    content: '';
    display: table;
  }
  .clearfix:after {
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .w {
    width: 1170px;
    margin: 0 auto;
  }
  [v-cloak] {
    display: none !important;
  }
}
</style>
