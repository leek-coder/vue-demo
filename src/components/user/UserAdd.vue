<template>
    <el-dialog
            :visible.sync="dialogVisible"
            width="45%"   :before-close="resetHideDialog"  title="用户添加"
    >

        <el-form ref="addUser" class="demo-ruleForm" :model="addUser"   :rules="userRules" label-width="75px">
            <!--添加prop是为了触发resetFields方法-->
            <el-form-item prop="userName" label="账号" >
                <el-input placeholder="请输入账号"
                          v-model="addUser.userName"></el-input>
            </el-form-item>
            <el-form-item prop="nickName" label="姓名" >
                <el-input placeholder="请输入姓名"
                          v-model="addUser.nickName"></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别" >
                <el-select v-model="addUser.sex" placeholder="请选择">
                    <el-option
                            v-for="item in genders"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="telephone" label="手机号" >
                <el-input placeholder="请输入手机号"
                          v-model="addUser.telephone"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱" >
                <el-input placeholder="请输入邮箱"
                          v-model="addUser.email"></el-input>
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
        name: "UserAdd",
        props:['dialogVisible'],
        methods:{
            //提交用户添加
            submitUser(){
                this.$refs.addUser.validate(valid => {
                     if(valid){
                         request({
                             method:'post',
                             url:'user-service/web/user/save',
                             data:this.addUser
                         }).then(res=>{
                             //成功
                            if(res.code==200){
                                this.$message.success(res.message);
                                this.$refs.addUser.resetFields();
                                this.$emit('hideDialog');
                            }else{
                                this.$message.error(res.message);
                            }
                         }).catch(err=>{
                           this.$message.error("网络异常");
                         })
                     }
                })

            },
            resetHideDialog(){
                this.$refs.addUser.resetFields();
                this.$emit('hideDialog');
            }

        },
        data(){
            return{
                //这是登陆表单的数据绑定对象
                addUser: {
                    userName: '',
                    nickName:'',
                    sex:'',
                    telephone:'',
                    email:''
                },
                genders:[{value:0,label:'女'},{value:1,label: '男'}],
                userRules:validUser
            }
        }
    }
</script>

<style scoped>

</style>
