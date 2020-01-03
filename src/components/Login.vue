<template>
    <div class="login_container">
        <div class="login_box">
            <el-form ref="myForm" class="login_form" :model="loginForm" :rules="rules">
                <!--添加prop是为了触发resetFields方法-->
                <el-form-item prop="userName">
                    <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid"
                              v-model="loginForm.userName"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" type="password"
                              v-model="loginForm.password"></el-input>
                </el-form-item>
                <!--按钮-->
                <el-form-item class="btn">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {request} from '../network/request'

    export default {
        data() {
            return {
                //这是登陆表单的数据绑定对象
                loginForm: {
                    userName: 'admin',
                    password: '111111'
                },
                rules: {
                    //验证用户名
                    userName: [
                        {require: true, message: "请输入用户名", trigger: "blur"},
                        {min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur"}
                    ],
                    //验证密码规则
                    password: [
                        {require: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, max: 10, message: "密码6-10位", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            //点击重置按钮
            reset() {
                this.$refs.myForm.resetFields();
            },
            login: function () {
                //表单登陆预验证
                this.$refs.myForm.validate(valid => {
                    if (valid) {
                        request({
                            url: "user-service/user/login",
                            method: "post",
                            data: this.loginForm
                        }).then(res => {
                            if (res.code != 200) {
                               return  this.$message.error(res.message);
                            }
                            this.$message.success("登陆成功")
                            //将token保存到本地
                            localStorage.setItem("token", res.data.token)
                            localStorage.setItem("user",this.loginForm.userName)
                            /**
                             * 将登陆成功后的token，保存到客户端sessionStorage中
                             * 1，项目中到其他登陆之外的API接口，必须在登陆后才能访问
                             * token只应该在网站当前访问期间生效
                             * 通过编程式导航跳转到后台主页，路由地址是/home
                             */
                            //跳转
                            this.$router.push("/home")
                        }).catch(err => {
                            this.$message.error("网络异常")
                        })
                    }
                })
            }
        }

    }
</script>
<!--scoped表示，样式只在当前组件中生效，如果去掉，就会全局生效-->
<style scoped>
    .login_container {
        height: 100%;
        background-color: #3a3f4c;
    }

    .login_box {
        width: 410px;
        height: 250px;
        background-color: whitesmoke;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }





    .btn {
        display: flex;
        justify-content: space-around;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>
