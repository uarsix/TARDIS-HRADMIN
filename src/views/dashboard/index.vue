<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }, methods: {
    handleChange (e) {
      console.log(e.target)
      const cos = new COS({
        SecretId: `AKID86qLbdQxhDUVHn34qMdePvBE2bvzoQox`,
        SecretKey: `wc3FBsKWS9bnkTxCBuOiofGciZAWdU5V`
      })
      cos.putObject({
        Bucket: '15257124299-1310209746', /* 必须 存储桶名称*/
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
        Key: 'xiumu', /* 必须 */
        StorageClass: 'STANDARD',
        Body: e.target.files[0], // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, function (err, data) {
        console.log(err || data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
