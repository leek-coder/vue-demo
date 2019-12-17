<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区域-->
        <el-card>

            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input clearable placeholder="请输入内容" v-model="query.username" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary"  @click="dialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>

            <!--用户列表展示-->
            <el-table :data="userList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="账号" prop="userName"></el-table-column>
                <el-table-column label="姓名" prop="nickName"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="userList">
                        <el-tag v-if="userList.row.sex===1">男</el-tag>
                        <el-tag type="danger" v-else>女</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="手机号" prop="telephone" width="110px"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="userList">
                        <el-tag type="success" v-if="userList.row.status===0">未删除</el-tag>
                        <el-tag type="danger" v-else>删除</el-tag>
                    </template>

                </el-table-column>
                <el-table-column label="邮箱" prop="email" width="170px"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="100px"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <!--使用作用域插槽来实现-->
                    <template slot-scope="userList">
                        <el-button :disabled="userList.row.status===1" size="mini" type="primary" icon="el-icon-edit" circle
                                   @click="editUser(userList.row.id)"></el-button>
                        <el-tooltip effect="dark" content="分配角色" placement="top">
                            <el-button :disabled="userList.row.status===1" size="mini" type="warning" icon="el-icon-star-off" circle></el-button>
                        </el-tooltip>
                        <el-button  :disabled="userList.row.status===1" size="mini" type="danger" icon="el-icon-delete" circle @click="deleteUser(userList.row)"></el-button>
                        <el-tooltip effect="dark" content="恢复用户" placement="top">
                        <el-button  :disabled="userList.row.status===0" size="mini" type="success" icon="el-icon-success" circle @click="recoveryUser(userList.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>

            </el-table>

            <!--分页插件-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.page"
                    :page-sizes="[5, 10, 15,20]"
                    :page-size="query.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加用户的对话框-->
        <UserAdd :dialogVisible="dialogVisible" @hideDialog="hideDialog"></UserAdd>
        <!-- 编辑用户的对话框-->
        <user-edit :editDialogVisible="editDialogVisible" :userInfo="userInfo" @editDialogVisible="hideEditDialogVisible"></user-edit>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    import UserAdd from "./UserAdd";
    import UserEdit from "./UserEdit";

    export default {
        name: "User",
        data() {
            return {
                query: {
                    username: "",
                    //当前页数
                    page: 0,
                    size: 5
                },
                userList: [],
                total: 0,
                dialogVisible: false,
                editDialogVisible:false,
                userInfo: {}
            }
        }, created() {
            this.getUserList();
        },
        //自定义组件
        components: {
            UserAdd,
            UserEdit,
        },
        methods: {
            handleSizeChange(size) {
                this.query.size = size;
                this.getUserList();
            },
            handleCurrentChange(page) {
                this.query.page = page;
                this.getUserList();
            },
            //弹框展示
            hideDialog() {
                this.dialogVisible = !this.dialogVisible;
                this.getUserList();
            },
            hideEditDialogVisible() {
                this.editDialogVisible = !this.editDialogVisible;
                this.getUserList();
            },
            //获取用户列表
            getUserList() {
                request({
                    method: "get",
                    url: "web/user/query",
                    params: this.query
                }).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.data.message);
                    }
                    //成功
                    this.userList = res.data.users;
                    this.total = res.data.total;
                }).catch(err => {
                    this.$message.error("网络异常")
                })
            },
            //编辑用户
            editUser(id) {
                //请求用户信息
                request({
                    method: 'get',
                    url: 'web/user/info/' + id
                }).then(res => {
                    if (res.code == 200) {
                        this.userInfo = res.data;
                        this.editDialogVisible = !this.editDialogVisible;
                    }
                }).catch(err => {
                    this.$message.error("查询用户信息异常")
                })
            },
            //用户删除
            deleteUser(user){
                this.$confirm('该操作将永久删除['+user.userName+']用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    request({
                        method:'get',
                        url:'web/user/delete/' + user.id
                    }).then(res=>{
                       if(res.code==200){

                           this.$message.success(res.message);
                           this.getUserList();
                       }else{
                           this.$message.error(res.message);
                       }
                    })
                })
            },
            //恢复用户状态
            recoveryUser(user){
                this.$confirm('该操作将恢复['+user.userName+']用户', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    request({
                        method:'get',
                        url:'web/user/recovery/' + user.id
                    }).then(res=>{
                        if(res.code==200){

                            this.$message.success(res.message);
                            this.getUserList();
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
