<template>
    <el-dialog
            :visible.sync="dialogVisible"
            width="45%" :before-close="resetDialog" title="分类添加"
    >

        <el-form ref="info" class="demo-ruleForm" :model="info" :rules="categoryRules" label-width="75px">
            <!--添加prop是为了触发resetFields方法-->
            <el-form-item prop="name" label="分类名">
                <el-input placeholder="请输入分类名"
                          v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item prop="level" label="级别">
                <el-select v-model="info.level" placeholder="请选择">
                    <el-option
                            v-for="item in levels"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!--上传图片组件
             show-file-list：是否显示上传图片列表 boolean
             on-preview	点击文件列表中已上传的文件时的钩子
             on-remove	文件列表移除文件时的钩子
             on-success	文件上传成功时的钩子  function
             on-error	文件上传失败时的钩子  function
             http-request	覆盖默认的上传行为，可以自定义上传的实现 function
            -->
            <el-form-item prop="img" label="图片">
                <el-upload :limit="1" :before-upload="before"
                           class="upload-demo" :http-request="upload"
                           action=""
                           :on-remove="remove"
                           :show-file-list="uploadSuccess"
                           list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item prop="category" label="分类">
                <el-select v-model="info.category" placeholder="请选择">
                    <el-option
                            v-for="item in levels"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="description" label="描述">
                <el-input
                        type="textarea"
                        :rows="2"
                        v-model="info.description"
                        placeholder="请输入分类描述"
                        :value="info.description"
                >
                </el-input>
            </el-form-item>

        </el-form>


        <span slot="footer" class="dialog-footer">
    <el-button @click="resetDialog">取 消</el-button>
    <el-button type="primary" @click="addCategory">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "CategoryAdd",
        props: {
            dialogVisible: {
                type: Boolean
            }
        },
        data() {
            return {
                info: {
                    name: "",
                    level: "",
                    path: "",
                    description: "",
                    category: ""
                },
                levels: [{value: 0, label: '一级'}, {value: 1, label: '二级'}, {value: 2, label: '三级'}],
                categoryRules: {
                    //验证分类名
                    name: [
                        {required: true, message: "请输入分类名称", trigger: "blur"},
                        {min: 2, max: 10, message: "2到10个字符", trigger: "blur"}
                    ],
                    level: [
                        {required: true, message: "请选择级别", trigger: "blur"},
                    ],
                    category: [
                        {required: true, message: "请选择所属分类", trigger: "blur"},
                    ]
                },
                uploadSuccess: false

            }
        },
        methods: {
            resetDialog() {
                this.uploadSuccess = false;
                this.info.path = ""
                this.$emit('categoryDialogVisible');
            },
            //提交分类
            addCategory() {
                this.$refs.info.validate(valid => {
                    if (valid) {

                        this.$emit('categoryDialogVisible');
                    }
                });

            },
            //图片上传之前调用的方法，可以用来做判断
            before(file) {
                const isImage = file.type.includes("image");
                if (!isImage) {
                    this.$message.error("上传文件类型必须是图片!");
                }
                const isLt2M = file.size / 1024 / 1024 < 0.6;
                if (!isLt2M) {
                    this.$message.error('上传图片或视频大小不能超过 50k!');
                }
                return isImage && isLt2M;
            },
            //图片上传
            upload(file) {
                const formData = new FormData();
                formData.append("file", file.file);
                request({
                    method: "post",
                    url: "product-service/product/upload",
                    data: formData
                }).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.uploadSuccess = true;
                        this.info.path = res.data.path;
                        this.$message.success('图片上传成功');
                    } else {
                        this.$message.error("图片上传失败");
                    }
                }).catch(err => {
                    this.$message.error("网络异常");
                })

            },
            //移除图片
            remove() {
                this.info.path = "";
            }
        }
    }
</script>

<style scoped>

</style>
