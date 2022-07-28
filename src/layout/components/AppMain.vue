<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .scrollbar-wrapper {
  background: url("~@/./assets/common/leftnavBg.png") no-repeat 0 100%;
}
::v-deep .el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
  a {
    li {
      .svg-icon {
        color: #fff;
        font-size: 18px;
        vertical-align: middle;
        .icon {
          color: #fff;
        }
      }
      span {
        color: #fff;
      }
      &:hover {
        .svg-icon {
          color: #43a7fe;
        }
        span {
          color: #43a7fe;
        }
      }
    }
  }
}
</style>
