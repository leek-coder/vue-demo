<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区域-->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-button type="primary" size="mini" @click="dialogVisible=true">添加角色</el-button>
                </el-col>
            </el-row>

            <!--用户列表展示-->
            <el-table :data="rolesList" border stripe>
                <!-- 展开列 -->

                <el-table-column type="expand"></el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="name"></el-table-column>
                <el-table-column label="角色描述" prop="description"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <!--使用作用域插槽来实现-->
                    <template slot-scope="rolesList">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                                   @click="editRole(rolesList.row.id)">编辑
                        </el-button>
                        <el-button size="mini" @click="deleteRole(rolesList.row)" type="danger" icon="el-icon-delete">
                            删除
                        </el-button>
                        <el-button size="mini" type="warning" @click="grant(rolesList.row)" icon="el-icon-setting">
                            分配权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!--添加角色-->
        <role-add :dialogVisible="dialogVisible" @hideDialog="hideDialog"></role-add>
        <!--编辑角色-->
        <role-edit :editDialogVisible="editDialogVisible" :roleInfo="roleInfo"
                   @editDialogVisible="hideEditDialogVisible"></role-edit>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    import RoleAdd from "./RoleAdd";
    import RoleEdit from "./RoleEdit";

    export default {
        name: "Role",
        data() {
            return {
                rolesList: [],
                query: {
                    name: ""
                },
                dialogVisible: false,
                editDialogVisible: false,
                roleInfo: {}
            }
        },
        components: {
            RoleAdd,
            RoleEdit
        },
        methods: {
            grant() {
            },
            //编辑角色信息
            editRole(id) {
                //请求用户信息
                request({
                    method: 'get',
                    url: 'web/role/info/' + id
                }).then(res => {
                    if (res.code == 200) {
                        console.log("success")
                        this.roleInfo = res.data;
                        this.editDialogVisible = !this.editDialogVisible;
                    }
                }).catch(err => {
                    this.$message.error("查询角色信息异常")
                })
            },
            //删除角色
            deleteRole(role) {
                this.$confirm('该操作将永久删除[' + role.name + ']角色', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    request({
                        method: 'get',
                        url: 'web/role/delete/' + role.id
                    }).then(res => {
                        if (res.code == 200) {

                            this.$message.success(res.message);
                            this.getRoleList();
                        } else {
                            this.$message.error(res.message);
                        }
                    })
                })
            },
            //弹框展示
            hideDialog() {
                this.dialogVisible = !this.dialogVisible;
                this.getRoleList();
            },
            hideEditDialogVisible() {
                this.editDialogVisible = !this.editDialogVisible;
                this.getRoleList();
            },
            getRoleList() {
                request({
                    url: "web/role/query",
                    method: 'get',
                    params: this.query
                }).then(res => {
                    if (res.code == 200) {
                        this.rolesList = res.data;
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(err => {
                    this.$message.error("网络异常");
                })
            }
        },
        created() {
            this.getRoleList()
        }
    }
</script>

<style scoped>

</style>
