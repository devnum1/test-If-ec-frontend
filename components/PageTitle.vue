// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-title">
    <div class="page-title__wrapper container">
      <div v-if="btnBack" class="page-title__back">
        <NuxtLink class="page-title__link" :to="btnBack">
          <i class="icon-fonts icon-fonts--back" />
        </NuxtLink>
      </div>
      <div v-if="logo" class="text-center header-logo">
        <img src="~/assets/images/logo/1line_white.svg" />
      </div>
      <div v-else class="page-title__text">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    btnBack: {
      type: String,
      default: null,
    },
    logo: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/scss/components/page-title';
</style>
