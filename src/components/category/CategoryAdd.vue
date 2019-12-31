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

            <el-form-item prop="changeId" label="父级">
                <!--options:用来指定数据源
                props：用来指定配置对象
                -->
                <el-cascader clearable
                             v-model="changeId"
                             :options="categoryList"
                             :props="categoryProps"
                             @change="handleChange"></el-cascader>
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
            },
            categoryList: {
                Object
            }
        },
        data() {
            return {
                info: {
                    name: "",
                    //分类等级0：一级
                    level: 0,
                    imgUrl: "",
                    description: "",
                    //如果是1级分类就默认父级为0
                    parentId: 0
                },
                changeId: [],
                categoryRules: {
                    //验证分类名
                    name: [
                        {required: true, message: "请输入分类名称", trigger: "blur"},
                        {min: 2, max: 10, message: "2到10个字符", trigger: "blur"}
                    ],
                    level: [
                        {required: true, message: "请选择级别", trigger: "blur"},
                    ]
                },
                uploadSuccess: false,
                //指定及联选择器的配置对象
                categoryProps: {
                    value: 'nodeId',
                    label: 'name',
                    children: 'children',
                    checkStrictly: true
                }

            }
        },
        methods: {
            resetDialog() {
                this.uploadSuccess = false;
                this.info.imgUrl = ""
                this.changeId= ""
                this.$refs.info.resetFields();
                this.$emit('categoryDialogVisible');
            },
            //及联点击
            handleChange(value) {

                if (value.length != 0) {
                    const parentId = value[value.length - 1];
                    this.info.parentId = parentId;
                    this.info.level = value.length;
                } else {
                    this.info.level = 0
                    this.info.parentId = 0;
                }
            },
            //提交分类
            addCategory() {

                this.$refs.info.validate(valid => {
                    if (valid) {
                        request({
                            method: "post",
                            url: "product-service/category/save",
                            data: this.info
                        }).then(res => {
                            if (res.code == 200) {
                                this.$message.success(res.message);
                                this.resetDialog();
                            } else {
                                this.$message.error(res.message)
                            }
                        }).catch(err => {
                            this.$message.error("网络异常");
                        })

                    }
                });

            },
            //图片上传之前调用的方法，可以用来做判断
            before(file) {
                const isImage = file.type.includes("image");
                if (!isImage) {
                    this.$message.error("上传文件类型必须是图片!");
                }
                const isLt2M = file.size / 1024 / 1024 < 0.2;
                if (!isLt2M) {
                    this.$message.error('上传图片或视频大小不能超过 200k!');
                }
                return isImage && isLt2M;
            },
            //图片上传
            upload(file) {
                const formData = new FormData();
                formData.append("file", file.file);
                request({
                    method: "post",
                    url: "product-service/upload/pic",
                    data: formData
                }).then(res => {
                    if (res.code == 200) {
                        this.uploadSuccess = true;
                        this.info.imgUrl = res.data.path;
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
                this.info.imgUrl = "";
            }
        }
    }
</script>


<style scoped>
    .el-cascader {
        width: 100%;
    }
</style>
