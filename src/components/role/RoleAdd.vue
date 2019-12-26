<template>
    <el-dialog
            :visible.sync="dialogVisible"
            width="45%"   :before-close="resetHideDialog"  title="角色添加"
    >

        <el-form ref="addRole" class="demo-ruleForm" :model="addRole"   :rules="roleRules" label-width="75px">
            <!--添加prop是为了触发resetFields方法-->
            <el-form-item prop="name" label="角色名" >
                <el-input placeholder="请输入角色名称"
                          v-model="addRole.name"></el-input>
            </el-form-item>
            <el-form-item prop="roleKey" label="角色key" >
                <el-input placeholder="请输入角色key"
                          v-model="addRole.roleKey"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="描述">
                <el-input
                        type="textarea"
                        :rows="2"
                        v-model="addRole.description"
                        placeholder="请输入角色描述"
                        :value="addRole.description"
                >
                </el-input>
            </el-form-item>


        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="resetHideDialog">取 消</el-button>
    <el-button type="primary" @click="submitRole">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>

    import {request} from "../../network/request";

    export default {
        name: "RoleAdd",
        props:['dialogVisible'],
        methods:{
            //提交角色添加
            submitRole(){
                this.$refs.addRole.validate(valid => {
                    if(valid){
                        request({
                            method:'post',
                            url:'user-service/web/role/save',
                            data:this.addRole
                        }).then(res=>{
                            //成功
                            if(res.code==200){
                                this.$message.success(res.message);
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
                this.$refs.addRole.resetFields();
                this.$emit('hideDialog');
            }

        },
        data(){
            return{
                //这是登陆表单的数据绑定对象
                addRole: {
                    name: '',
                    roleKey:'',
                    description:''

                },
                roleRules:{
                    //验证角色名
                    name: [
                        {required: true, message: "请输入角色名称", trigger: "blur"},
                        {min: 3, max: 10, message: "3到10个字符", trigger: "blur"}
                    ],
                    roleKey: [
                        {required: true, message: "请输入角色key", trigger: "blur"},
                        {min: 3, max: 10, message: "3到10个字符", trigger: "blur"}
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
