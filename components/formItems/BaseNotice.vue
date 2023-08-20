// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="base-notice">
    <div class="base-notice__top d-flex">
      <span class="base-notice__icon" />
      <span class="base-notice__title">{{ title }}</span>
    </div>
    <ul class="base-notice__content">
      <li
        v-for="(error, index) in listError"
        :key="index"
        class="base-notice__item"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseNotice',
  props: {
    title: {
      type: String,
      default: '',
    },
    listError: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/scss/components/base-notice';
</style>
