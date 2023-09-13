<template>
  <el-container>
    <el-aside width="200px">
      <div class="nav-bar">
        <el-menu :default-active="currentMenuIndex" class="el-menu-vertical">
          <el-menu-item index="/user_manage" @click="handleMenuItemClick('/user_manage')" v-show="flag">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/movie_manage" @click="handleMenuItemClick('/movie_manage')" v-show="flag">
            <i class="el-icon-s-kpi"></i>
            <span slot="title">电影管理</span>
          </el-menu-item>
          <el-menu-item index="/cinema_manage" @click="handleMenuItemClick('/cinema_manage')" v-show="flag">
            <i class="el-icon-video-camera-solid"></i>
            <span slot="title">影院管理</span>
          </el-menu-item>
          <el-menu-item index="/hall_manage" @click="handleMenuItemClick('/hall_manage')">
            <i class="el-icon-bangzhu"></i>
            <span slot="title">影厅管理</span>
          </el-menu-item>
          <el-menu-item index="/movie_schedule" @click="handleMenuItemClick('/movie_schedule')">
            <i class="el-icon-s-fold"></i>
            <span slot="title">电影排片</span>
          </el-menu-item>
          <el-menu-item index="/comment_manage" @click="handleMenuItemClick('/comment_manage')" v-show="flag">
            <i class="el-icon-s-comment"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/snack_manage" @click="handleMenuItemClick('/snack_manage')">
            <i class="el-icon-s-goods"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="/banner_manage" @click="handleMenuItemClick('/banner_manage')" v-show="flag">
            <i class="el-icon-money"></i>
            <span slot="title">广告管理</span>
          </el-menu-item>
          <el-menu-item index="/order_manage" @click="handleMenuItemClick('/order_manage')">
            <i class="el-icon-s-ticket"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/admin_manage" @click="handleMenuItemClick('/admin_manage')" v-show="flag">
            <i class="el-icon-s-check"></i>
            <span slot="title">管理员管理</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="head-bar" v-if="adminInfo.name">
          <div class="left">
            <!-- <i class="icon-film-logo" style="font-size: 48px;margin-right: 5px;"></i> -->
            <span slot="title" style="font-size: 16px;font-weight: bolder">电影商城管理系统</span>
          </div>
          <div class="right">
            <img :src="adminInfo.avatar" class="user-avatar" width="40px" height="40px" style="border-radius: 20px" />
            <el-dropdown style="margin-left:12px">
              <span class="el-dropdown-link">
                {{ adminInfo.name }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view class="content" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import { Message, Dropdown, DropdownMenu, DropdownItem, RadioGroup, RadioButton } from 'element-ui'
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
export default {
  name: 'Home',
  data() {
    return {
      //服务器地址
      adminInfo: {},
      currentMenuIndex: '/user_manage',
      cinemaId: '',
      flag: false
    }
  },
  created() {
    this.loadAdminInfo()
  },
  mounted() {
    // 如果id是数字
    if (!isFinite(this.cinemaId)) {
      this.flag = true
    }
  },
  methods: {
    async loadAdminInfo() {
      if (this.$cookies.get('name')) {
        //let json = await getAdminInfo(this.$cookies.get("admin_id"));
        //if (json.state === 200) {
        this.adminInfo.name = this.$cookies.get('name')
        this.adminInfo.avatar = this.$cookies.get('avatar')
        this.cinemaId = this.$cookies.get('cinemaId')
        //}
      } else {
        this.$router.push({ path: '/login' })
        Message.error('请先登录！')
      }
    },
    logout() {
      this.$cookies.remove('admin_id')
      this.$router.push('/login')
      Message.success('退出成功！')
    },
    handleMenuItemClick(path) {
      this.$router.push('/home' + path)
      this.currentMenuIndex = path
    }
  }
}
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  height: 60px;
}
.head-bar {
  display: flex;
  justify-content: space-between;
  height: 60px;
}
.el-aside {
  width: 200px;
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
  min-height: 400px;
}
.nav-bar {
  width: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
