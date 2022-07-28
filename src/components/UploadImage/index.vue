<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      accept="image/png,image/jpg,image/jpeg,image/gif"
      :limit="limit"
      :on-change="handleChange"
      :class="{ hidden: filesList.length === limit }"
      :file-list="filesList"
      :http-request="handleRequest"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file, fileList)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img
        style="max-width: 80%; max-height: 80%"
        :src="dialogImageUrl"
        alt=""
      />
    </el-dialog>
    <el-progress :percentage="percent"></el-progress>
  </div>
</template>

<script>

import COS from 'cos-js-sdk-v5'
export default {
  name: 'UploadImage',
  props: {
    limit: {
      type: Number,
      default: 1 // 默认值1
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      filesList: [], // 图片上传数组
      percent: 0
    }
  },
  methods: {
    // 删除图片
    handleRemove (file) {
      this.filesList = this.filesList.filter(item => item.uid !== file.uid)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {

    },
    handleChange (file, fileList) {
      this.filesList = fileList
    },
    handleRequest (up) {
      const cos = new COS({
        SecretId: `AKID86qLbdQxhDUVHn34qMdePvBE2bvzoQox`,
        SecretKey: `wc3FBsKWS9bnkTxCBuOiofGciZAWdU5V`
      })
      cos.putObject({
        Bucket: '15257124299-1310209746', /* 必须 存储桶名称*/
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
        Key: Date.now() + '-' + up.file.name, /* 必须 */
        StorageClass: 'STANDARD',
        Body: up.file, // 上传文件对象
        onProgress: (progressData) => {
          console.log(progressData)
          this.percent = Math.ceil(progressData.loaded / progressData.total * 100)
        }
      }, function (err, data) {
        console.log(err || data)
      })
    }
    // 上传图片

  }
}
</script>

<style scoped lang='scss'>
// 原理：hidden类名是动态绑定
.hidden ::v-deep .el-upload--picture-card {
  display: none;
}
</style>
