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
                <el-table-column type="expand">
                    <template slot-scope="rolesList">
                        <el-row v-for="(item,key) in rolesList.row.children" :key="item.id"
                                :class="['tbBottom',key===0?'tbTop':'','vn']">
                            <el-col :span="5">
                                <el-tag>{{item.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="19">
                                <!--渲染二级和三级权限-->
                                <el-row :class="[key2===0?'':'tbTop','vn']" v-for="(item1,key2) in item.children"
                                        :key="item1.id">
                                    <el-col :span="6">
                                        <el-tag type="success">{{item1.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="13">
                                        <el-tag type="warning" v-for="item2 in item1.children" closable
                                                @close="removeChildren(item2.authName)">
                                            {{item2.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>

                        </el-row>
                    </template>
                </el-table-column>
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
        <!--角色授权-->
        <grant-resource :grantDialogVisible="grantDialogVisible" :defKeys="defKeys" :roleId="roleId"
                        @grantDialogVisible="hideGrantDialogVisible" :grantList="grantList"></grant-resource>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    import RoleAdd from "./RoleAdd";
    import RoleEdit from "./RoleEdit";
    import GrantResource from "./GrantResource";

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
                grantDialogVisible: false,
                roleInfo: {},
                grantList: [],
                defKeys:[],
                roleId:0
            }
        },
        components: {
            RoleAdd,
            RoleEdit,
            GrantResource
        },
        methods: {
            grant(role) {
                request({
                    url: 'user-service/web/resource/tree',
                    method: 'get'
                }).then(res => {
                    if (res.code = 200) {
                        this.grantList = res.data;
                        this.roleId = role.id;
                        this.getTreesNode(role,this.defKeys);
                        this.grantDialogVisible = !this.grantDialogVisible;

                    }
                }).catch(err => {
                    this.$message.error("获取权限树失败")
                })


            },
            //通过递归的方式，获取角色所有的三级节点，并保存id到defKeys中
            getTreesNode(node, arr) {
               node.children.forEach(node1=>{
                   arr.push(node1.id);
                   node1.children.forEach(node2=>{
                       arr.push(node2.id);
                   })
               })
            },
            removeChildren(name) {
                this.$confirm('该操作将删除[' + name + ']权限,本操作只做演示,操作记录不落库', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                })
            },
            //编辑角色信息
            editRole(id) {
                //请求用户信息
                request({
                    method: 'get',
                    url: 'user-service/web/role/info/' + id
                }).then(res => {
                    if (res.code == 200) {
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
                        url: 'user-service/web/role/delete/' + role.id
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
            hideGrantDialogVisible() {
                this.grantDialogVisible = !this.grantDialogVisible;
                this.defKeys = [];
                this.getRoleList();
            },
            getRoleList() {
                request({
                    url: "user-service/web/role/query",
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
    .el-tag {
        margin: 7px;
    }

    .tbTop {
        border-top: 1px solid ghostwhite;
    }

    .tbBottom {
        border-bottom: 1px solid ghostwhite;
    }

    .vn {
        display: flex;
        align-items: center;
    }
</style>
