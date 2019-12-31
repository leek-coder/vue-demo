<template>
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div class="left">
                <img src="../assets/logo.png"/>
            </div>

            <div style="width:140px;display: flex;justify-content: space-between">

                <el-tag type="info">用户:{{currentUser}}</el-tag>


                <el-dropdown :hide-on-click="true" @command="handleCommand">
  <span class="el-dropdown-link">
    操作<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>
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
                isCollapse: false,
                currentUser: ""
            }
        },
        methods: {
            logout() {
                request({
                    url: "user-service/user/logout",
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
                }
            },
            getMenus() {
                request({
                    url: "user-service/user/menus",
                    method: "get",
                }).then(res => {
                    if (res.code == 200) {
                        this.menusList = res.data;
                    }
                }).catch(err => {
                     this.$message.error("网络异常");
                })
            }
        }, created() {
            const user = localStorage.getItem("user")
            this.currentUser = user;
            this.getMenus();

        }
    }
</script>

<style scoped>
    .el-header {
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: -5px;
        color: #47b784;
        font-size: 15px;
    }

    .el-header div.left {
        display: flex;
        justify-content: center;
        width: 200px;
        height: 65px;
        background: #3a3f4c;
        margin-left: -20px;
        align-content: center;


    }

    .left img {
        margin-top: 5px;
        width: 142px;
        height: 54px;
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
        height: 28px;
        line-height: 28px;
        color: cornflowerblue;
    }

    .el-dropdown-link:hover {
        cursor: pointer;
        color: #47b784;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .el-avatar {
        width: 32px;
        height: 32px;
    }

</style>
