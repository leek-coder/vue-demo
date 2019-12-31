<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>日志列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区域-->
        <el-card>

            <el-row :gutter="20">
                <el-form ref="queryLog" :model="query">

                    <el-col :span="5">
                        <el-form-item prop="userName">
                        <el-input clearable placeholder="请输入访问人" v-model="query.userName" prop="userName">
                        </el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="5">
                        <el-form-item prop="uri">
                        <el-input clearable placeholder="请输入访问uri" v-model="query.uri" prop="uri">
                        </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="status">
                        <el-select v-model="query.status" placeholder="请选择响应状态" prop="status">
                            <el-option
                                    v-for="item in resStatus"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        </el-form-item>

                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="getLogList">搜索</el-button>
                    </el-col>

                    <el-col :span="3">
                        <el-button type="info" @click="resetQuery">清空筛选</el-button>
                    </el-col>
                </el-form>
            </el-row>

            <!--用户列表展示-->
            <el-table :data="logList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="访问人" prop="userName"></el-table-column>
                <el-table-column label="访问uri" prop="uri" width="160"></el-table-column>
                <el-table-column label="请求描述" prop="operation" width="120px"></el-table-column>
                <el-table-column label="请求ip地址" prop="ip" width="140px">
                </el-table-column>
                <el-table-column label="响应时间(ms)" prop="responseTime" width="150px"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="logList">
                        <el-tag type="success" v-if="logList.row.status===200">响应成功</el-tag>
                        <el-tag type="danger" v-else>响应失败</el-tag>
                    </template>

                </el-table-column>
                <el-table-column label="操作" width="80px">
                    <!--使用作用域插槽来实现-->
                    <template slot-scope="logList">
                        <el-button size="mini" type="warning" icon="el-icon-star-off" circle
                                   @click="editLog(logList.row.id)"></el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!--分页插件-->
            <el-pagination v-show="total > 0 "
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.page"
                    :page-sizes="[5, 10, 15]"
                    :page-size="query.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>

        <!-- 编辑用户的对话框-->
        <log-info :editDialogVisible="editDialogVisible" :logInfo="logInfo"
                  @editDialogVisible="hideEditDialogVisible"></log-info>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    import LogInfo from "./LogInfo";

    export default {
        name: "Log",
        data() {
            return {
                query: {
                    userName: "",
                    uri: "",
                    status: "",
                    //当前页数
                    page: 0,
                    size: 5
                },
                logList: [],
                total: 0,
                dialogVisible: false,
                editDialogVisible: false,
                logInfo: {},
                resStatus: [{value: 200, label: '成功'}, {value: -1, label: '失败'}],
            }
        }, components: {
            LogInfo
        }
        , created() {
            this.getLogList();
        },
        methods: {
            handleSizeChange(size) {
                this.query.size = size;
                this.getLogList();
            },
            handleCurrentChange(page) {
                this.query.page = page;
                this.getLogList();
            },
            hideEditDialogVisible() {
                this.editDialogVisible = !this.editDialogVisible;
            },
            resetQuery(){
               this.$refs.queryLog.resetFields();
            },
            //获取日志列表
            getLogList() {
                request({
                    method: "get",
                    url: "user-service/web/log/query",
                    params: this.query
                }).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.data.message);
                    }
                    //成功
                    this.logList = res.data.logLists;
                    this.total = res.data.total;
                }).catch(err => {
                    this.$message.error("网络异常")
                })
            },
            //查看系统日志
            editLog(id) {
                //请求用户信息
                request({
                    method: 'get',
                    url: 'user-service/web/log/info/' + id
                }).then(res => {
                    if (res.code == 200) {
                        this.logInfo = res.data;
                        this.editDialogVisible = !this.editDialogVisible;
                    }
                }).catch(err => {
                    this.$message.error("查询日志信息异常")
                })
            }

        }
    }
</script>

<style scoped>

</style>
