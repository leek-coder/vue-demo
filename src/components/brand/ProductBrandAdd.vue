<template>
    <el-dialog
            :visible.sync="dialogVisible"
            width="45%" :before-close="resetDialog" title="商品品类添加"
    >

        <el-form ref="productBrand" :model="productBrand" :rules="productBrandRules" label-width="90px">
            <!--添加prop是为了触发resetFields方法-->
            <el-form-item prop="name" label="品牌名称">
                <el-input placeholder="品牌名称"
                          v-model="productBrand.name"></el-input>
            </el-form-item>
            <el-form-item prop="firstLetter" label="首字母">
                <el-input placeholder="品牌首字母"
                          v-model="productBrand.firstLetter"></el-input>
            </el-form-item>

            <el-form-item prop="logo" label="品牌logo">
                <el-upload :limit="1" :before-upload="before"
                           class="upload-demo" :http-request="uploadLogo"
                           action=""
                           :on-remove="removeLogo"
                           :show-file-list="upload1Success"
                           list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item prop="bigPic" label="专区大图">
                <el-upload :limit="1" :before-upload="before"
                           class="upload-demo" :http-request="uploadBigPic"
                           action=""
                           :on-remove="removeBigPic"
                           :show-file-list="upload2Success"
                           list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item prop="sort" label="排序">
                <el-input placeholder="排序"
                          v-model="productBrand.sort"></el-input>
            </el-form-item>

            <el-form-item label="是否显示">
                <el-radio-group v-model="productBrand.status">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="description" label="描述">
                <el-input
                        type="textarea"
                        :rows="2"
                        v-model="productBrand.description"
                        placeholder="请输入分类描述"
                        :value="productBrand.description"
                >
                </el-input>
            </el-form-item>


        </el-form>


        <span slot="footer" class="dialog-footer">
    <el-button @click="resetDialog">取 消</el-button>
    <el-button type="primary" @click="addProductBrand">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "ProductBrandAdd",
        props: {
            dialogVisible: {
                type: Boolean
            }
        },
        methods: {
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
            uploadLogo(file) {
                const formData = new FormData();
                console.log(file)
                formData.append("file", file.file);
                request({
                    method: "post",
                    url: "product-service/upload/pic",
                    data: formData
                }).then(res => {
                    if (res.code == 200) {
                        this.upload1Success = true;
                        this.productBrand.logo = res.data.path;
                        this.$message.success('图片上传成功');
                    } else {
                        this.$message.error("图片上传失败");
                    }
                }).catch(err => {
                    this.$message.error("网络异常");
                })

            },
            uploadBigPic(file) {
                const formData = new FormData();
                formData.append("file", file.file);
                request({
                    method: "post",
                    url: "product-service/upload/pic",
                    data: formData
                }).then(res => {
                    if (res.code == 200) {
                        this.upload2Success = true;
                        this.productBrand.bigPic = res.data.path;
                        this.$message.success('图片上传成功');
                    } else {
                        this.$message.error("图片上传失败");
                    }
                }).catch(err => {
                    this.$message.error("网络异常");
                })

            },
            removeLogo() {
                this.productBrand.logo = "";
            },
            removeBigPic() {
                this.productBrand.bigPic = "";
            },
            resetDialog() {
                this.upload1Success = false;
                this.upload2Success = false;
                this.productBrand.logo = ""
                this.productBrand.bigPic = ""
                this.$refs.productBrand.resetFields();
                this.$emit('productBrandDialogVisible');
            },
            addProductBrand() {
                this.$refs.productBrand.validate(valid => {
                    if (valid) {
                        request({
                            url: "/product-service/product/brand/save",
                            method: "post",
                            data: this.productBrand
                        }).then(res => {
                            if (res.code == 200) {
                                this.$message.success(res.message);
                                this.resetDialog();
                            } else {
                                this.$message.error(res.message);
                            }
                        }).catch(error => {
                            this.$message.error("网络异常");
                        })
                    }
                })
            }
        },
        data() {
            return {
                productBrand: {
                    description: "",
                    name: "",
                    firstLetter: "",
                    logo: "",
                    bigPic: "",
                    sort: "",
                    status: ""
                },
                productBrandRules: {
                    name: [
                        {required: true, message: "请输入商品品牌名称", trigger: "blur"},
                        {min: 2, max: 10, message: "2到10个字符", trigger: "blur"}
                    ],
                    logo: [
                        {required: true, message: "请上传logo图片", trigger: "blur"},
                    ]
                },
                upload1Success: false,
                upload2Success: false
            }
        }
    }
</script>

<style scoped>

</style>
