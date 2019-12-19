<template>
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div>
                <img src="../assets/profile.jpeg"/>
                <span>微客店后台管理系统</span>
            </div>
            <el-dropdown :hide-on-click="true" @command="handleCommand">
  <span class="el-dropdown-link">
    操作<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item disabled class="login-user">leek</el-dropdown-item>
                    <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <!--        页面主题区域-->
        <el-container>
            <!--            侧边栏-->
            <el-aside width="200px">
                <!--                :width="isCollapse ? '64px':'200px'"-->
                <!--                <div class="trigger_btn" @click="trigger">|||</div>-->
                <el-menu :unique-opened="isOpened" router
                         background-color="#3a3f4c" :default-active="this.$route.path"
                         text-color="#fff"
                         active-text-color="#42b883" :collapse="isCollapse" :collapse-transition="false">
                    <el-submenu :index="item.nodeId" v-for="item in menusList" :key="item.nodeId">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item :index="child.sourceUrl" v-for="child in item.children" :key="child.nodeId">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{child.name}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <!--右侧主题区-->
            <el-main>
                <!--路由占位符-->
                <router-view></router-view>
            </el-main>
        </el-container>

    </el-container>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "Home",
        data() {
            return {
                //左侧菜单数据
                menusList: [],
                isOpened: true,
                isCollapse: false
            }
        },
        methods: {
            logout() {
                request({
                    url: "user/logout",
                    method: "get",
                }).then(res => {
                    if (res.code == 200) {
                        //退出成功  清理缓存
                        localStorage.clear();
                        this.$message.success(res.message);
                        this.$router.push("/login")
                    } else {
                        this.$message.error(res.message);
                        this.$router.push("/login")
                    }
                }).catch(err => {
                    this.$message.error("网络异常");
                })

            },
            handleCommand(command) {
                if (command === 'logout') {
                    this.logout();
                } else {
                    console.log("修改密码")
                }
            },
            getMenus() {
                request({
                    url: "user/menus",
                    method: "get",
                }).then(res => {
                    if (res.code == 200) {
                        this.menusList = res.data;
                        console.log(this.menusList)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            // trigger(){
            //     this.isCollapse = !this.isCollapse
            // }
        }, created() {
            this.getMenus();
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #3a3f4c;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 5px;
        color: #47b784;
        font-size: 15px;
    }

    .el-header img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .el-header div {
        display: flex;
        align-items: center;

    }

    .el-header div span {
        margin-left: 10px;
    }

    .el-aside {
        background-color: #3a3f4c;
    }

    .el-menu {
        border-right: none;
    }

    .el-main {
        background-color: whitesmoke;
    }

    .home-container {
        height: 100%;
    }

    .trigger_btn {
        background-color: #47b784;
        font-size: 10px;
        color: whitesmoke;
        line-height: 24px;
        cursor: pointer;
        letter-spacing: 0.2em;
        text-align: center;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: white;
    }

    .el-dropdown-link:hover {
        cursor: pointer;
        color: #47b784;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>
