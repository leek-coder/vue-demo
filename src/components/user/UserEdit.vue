<template>
    <el-dialog
            :visible.sync="editDialogVisible"
            width="45%" :before-close="resetHideDialog" title="用户编辑"
    >

        <el-form ref="editUser" class="demo-ruleForm" :model="userInfo" :rules="userRules" label-width="75px">

            <el-input type="hidden"
                      v-model="userInfo.id" :value="userInfo.id"></el-input>
            <!--添加prop是为了触发resetFields方法-->
            <el-form-item prop="userName" label="账号">
                <el-input placeholder="请输入账号" disabled
                          v-model="userInfo.userName" :value="userInfo.userName"></el-input>
            </el-form-item>
            <el-form-item prop="nickName" label="姓名">
                <el-input placeholder="请输入姓名"
                          v-model="userInfo.nickName" :value="userInfo.nickName"></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别">
                <el-select v-model="userInfo.sex" placeholder="请选择">
                    <el-option
                            v-for="item in genders"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="telephone" label="手机号">
                <el-input placeholder="请输入手机号"
                          v-model="userInfo.telephone" :value="userInfo.telephone"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input placeholder="请输入邮箱"
                          v-model="userInfo.email" :value="userInfo.email"></el-input>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="resetHideDialog">取 消</el-button>
    <el-button type="primary" @click="submitUser">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import {request} from "../../network/request";
    import validUser from "../../js/ValidateUser";

    export default {
        name: "UserEdit",
        props: {
            editDialogVisible: {
                type: Boolean
            },
            userInfo: {
                type: Object
            }
        },
        methods: {
            //提交用户更新
            submitUser() {
                this.$refs.editUser.validate(valid => {
                    if (valid) {
                        request({
                            method: 'post',
                            url: 'user-service/web/user/update',
                            data: this.userInfo
                        }).then(res => {
                            //成功
                            if (res.code == 200) {
                                this.$message.success(res.message);
                                this.$emit('editDialogVisible');
                            } else {
                                this.$message.error(res.message);
                            }
                        }).catch(err => {
                            this.$message.error("网络异常");
                        })
                    }
                })

            },
            resetHideDialog() {
                this.$refs.editUser.resetFields();
                this.$emit('editDialogVisible');
            }

        },
        data() {
            return {
                genders: [{value: 0, label: '女'}, {value: 1, label: '男'}],
                userRules: validUser
            }
        }
    }
</script>

<style scoped>

</style>
