<template>

    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>资源列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--卡片视图区域-->
        <el-card>
            <!--资源列表展示-->
            <el-table :data="resourcesList" border stripe fit>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="资源名称" prop="name" width="120px"></el-table-column>
                <el-table-column label="类型" prop="type" width="100px">
                    <template slot-scope="resourcesList">
                        <el-tag type="success" v-if="resourcesList.row.type!=3">菜单</el-tag>
                        <el-tag type="danger" v-else>按钮</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否父节点" prop="parentId" width="120px">
                    <template slot-scope="resourcesList">
                        <el-tag type="success" v-if="resourcesList.row.parentId===0">父节点</el-tag>
                        <el-tag type="danger" v-else>子节点</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="icon图标" prop="icon" width="160px"></el-table-column>
                <el-table-column label="资源路径" prop="sourceUrl" width="120px"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="170px"></el-table-column>
                <el-table-column label="操作" width="160px">
                    <!--使用作用域插槽来实现-->
                    <template slot-scope="resourcesList">

                        <el-tooltip effect="dark" content="添加资源" placement="top">
                            <el-button size="mini" type="warning" icon="el-icon-star-off" circle></el-button>
                        </el-tooltip>
                        <el-button size="mini" type="primary" icon="el-icon-edit" circle
                                   @click="editResource(resourcesList.row.id)"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" circle
                                   @click="deleteResource(resourcesList.row)"></el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!--分页插件-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.page"
                    :page-sizes="[1,2, 5,15,20]"
                    :page-size="query.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>


        </el-card>

    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "Auth",
        data() {
            return {
                query: {
                    page: 1,
                    size: 1
                },
                resourcesList: [],
                total: 0
            }
        },
        methods: {
            handleSizeChange(size) {
                this.query.size = size;
                this.getResourcesList();

            },
            handleCurrentChange(page) {
                this.query.page = page;
                this.getResourcesList();
            },
            editResource(id) {

            },
            deleteResource(row) {

            },
            getResourcesList() {
                request({
                    method: 'get',
                    url: 'web/resource/query',
                    params: this.query
                }).then(res => {
                    if (res.code == 200) {
                        this.resourcesList = res.data.resourceList;
                        this.total = res.data.total;
                    }
                }).catch(err => {
                    console.log(err)
                })
            }

        },
        created() {
            this.getResourcesList();
        }
    }
</script>

<style scoped>

</style>
