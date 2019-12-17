<template>
    <el-dialog
            :visible.sync="editDialogVisible"
            width="45%" :before-close="resetHideDialog" title="日志详情"
    >

        <el-form ref="editUser" class="demo-ruleForm" :model="logInfo" label-width="75px">


            <el-form-item prop="userName" label="操作人">
                <el-input disabled
                          v-model="logInfo.userName" :value="logInfo.userName"></el-input>
            </el-form-item>

            <el-form-item prop="uri" label="访问uri">
                <el-input disabled
                          v-model="logInfo.uri" :value="logInfo.uri"></el-input>
            </el-form-item>

            <el-form-item prop="operation" label="请求描述">
                <el-input disabled
                          v-model="logInfo.operation" :value="logInfo.operation"></el-input>
            </el-form-item>



            <el-form-item prop="input" label="请求入参">
                <el-input disabled
                          v-model="logInfo.input" :value="logInfo.input"></el-input>
            </el-form-item>

            <el-form-item prop="ip" label="请求ip">
                <el-input disabled
                          v-model="logInfo.ip" :value="logInfo.ip"></el-input>
            </el-form-item>
            <el-form-item prop="output" label="响应出参">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        :value="logInfo.output"
                   >
                </el-input>
            </el-form-item>

            <el-form-item prop="responseTime" label="响应时间">
                <el-input disabled
                          v-model="logInfo.responseTime" :value="logInfo.responseTime"></el-input>
            </el-form-item>

            <el-form-item prop="createTime" label="访问时间">
                <el-input disabled
                          v-model="logInfo.createTime" :value="logInfo.createTime"></el-input>
            </el-form-item>
            <el-form-item prop="status" label="响应结果">
                <template>
                    <el-tag type="success" v-if="logInfo.status===200">响应成功</el-tag>
                    <el-tag type="danger" v-else>响应失败</el-tag>
                </template>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="resetHideDialog">取 消</el-button>
    <el-button type="primary" @click="resetHideDialog">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "LogInfo",
        props: {
            editDialogVisible: {
                type: Boolean
            },
            logInfo: {
                type: Object
            }
        },
        methods: {
            resetHideDialog() {
                this.$emit('editDialogVisible');
            }

        },
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>
