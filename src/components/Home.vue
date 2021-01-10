<template>
  <el-container class="home-contatiner">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            :key="item.id"
            v-for="item in menulist"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.autherName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + itemTow.path"
              :key="itemTow.id"
              v-for="itemTow in item.children"
              @click="saveNavState('/' +itemTow.path)"
            >
              <!-- 二级菜单模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ itemTow.autherName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        '1': "el-icon-user",
        '2': "el-icon-s-check",
        '3': "el-icon-shopping-bag-1",
        '4': "el-icon-tickets",
        '5': "el-icon-data-line",
      },
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      this.$http.post("/account/logout/", {}).then((data) => {
        if (data.data.tip === 0) {
          window.sessionStorage.clear();
          this.$router.push("/login");
        }
      });
    },
    // 获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("/account/menus");
      if (res.tip !== 0) return this.$message.error(res.msg);
      this.menulist = res.data;
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse = ! this.isCollapse
    },
    // 保存连接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
};
</script>

<style lang="less" scoped>
.home-contatiner {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.inonfont{
  margin-left: 10px;
}

.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>