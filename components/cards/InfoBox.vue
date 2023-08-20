// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="info-box">
    <ul class="info-box__list">
      <li v-for="(item, index) in dataInfo" :key="index" class="info-box__item">
        <div class="info-box__title text-">
          {{ item.title }}
        </div>
        <div class="info-box__text text-right text-darker">
          <span>{{ item.text }}</span
          ><span v-if="item.unit" class="unit">{{ item.unit }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    dataInfo: {
      type: [Array, Object],
      default: () => [{}],
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/components/info-box';
</style>
