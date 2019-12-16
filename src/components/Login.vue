<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像-->
            <div class="avatar_box">
                <img src="../assets/profile.jpeg"/>
            </div>
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
                    userName: 'leek',
                    password: 'leek-coder'
                },
                rules: {
                    //验证用户名
                    userName: [
                        {require: true, message: "请输入用户名", trigger: "blur"},
                        {min: 3, max: 6, message: "长度在3到10个字符", trigger: "blur"}
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
                            url: "user/login",
                            method: "post",
                            data: this.loginForm
                        }).then(res => {
                            if (res.code != 200) {
                               return  this.$message.error(res.message);
                            }
                            this.$message.success("登陆成功")
                            //将token保存到本地
                            localStorage.setItem("token", res.data.token)
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
        background-image: url("../assets/bg.jpg");
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: whitesmoke;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        width: 130px;
        height: 130px;
        border: 1px solid #eeeeee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -40%);
        background-color: #eeeeee;

    }

    .avatar_box img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eeeeee;
    }

    .btn {
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>
