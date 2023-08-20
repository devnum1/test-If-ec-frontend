// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div id="claim">
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
#claim h1 {
  font-size: 24px !important;
}
</style>
