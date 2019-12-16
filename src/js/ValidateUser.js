
// 验证邮箱的规则
const checkEmail = (rule, value, cb) => {
    // 验证邮箱的正则表达式
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

    if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
    }
    cb(new Error('请输入合法的邮箱'))
}

// 验证手机号的规则
const checkMobile = (rule, value, cb) => {
    // 验证手机号的正则表达式
    const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

    if (regMobile.test(value)) {
        return cb()
    }

    cb(new Error('请输入合法的手机号'))
}

export default {

    //验证用户名
    userName: [
        {required: true, message: "请输入账户", trigger: "blur"},
        {min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur"}
    ],
    //验证账号规则
    nickName: [
        {required: true, message: "请输入姓名", trigger: "blur"},
        {min: 2, max: 4, message: "姓名2-4位", trigger: "blur"}
    ],
    sex: [
        {required: true, message: "请选择性别", trigger: "blur"}
    ],
    //验证手机号规则
    telephone: [
        {required: true, message: "请输入手机号", trigger: "blur"},
        {validator: checkMobile, trigger: 'blur'}
    ],
    //验证邮箱规则
    email: [
        {required: true, message: "请输入邮箱", trigger: "blur"},
        {validator: checkEmail, trigger: 'blur'}
    ]
}

