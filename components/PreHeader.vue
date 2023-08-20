// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="pre-header">
    <div class="header">
      <div class="header__icon-menu" @click="display = true" />
      <div class="header-logo">
        <img src="~/assets/images/landing/pre-mark/rogo.svg" />
      </div>
    </div>
    <div v-if="display" class="menu">
      <div class="menu__overlay" @click="display = false" />
      <div class="menu__container">
        <div class="menu__close-button">
          <div class="icon-fonts--close float-right" @click="display = false" />
        </div>
        <div class="menu__body mt-40" @click="display = false">
          <a
            v-smooth-scroll="{ duration: 500, offset: 0 }"
            href="#infomation"
            class="menu__body-row d-flex"
          >
            <div class="menu__info-label font-16px">キャンペーン情報</div>
            <div class="menu__icon-right" />
          </a>
          <a
            v-smooth-scroll="{ duration: 500, offset: 0 }"
            href="#product"
            class="menu__body-row d-flex"
          >
            <div class="menu__info-label font-16px">商品詳細</div>
            <div class="menu__icon-right" />
          </a>
          <a
            v-smooth-scroll="{ duration: 500, offset: 0 }"
            href="#payment-images"
            class="menu__body-row d-flex"
          >
            <div class="menu__info-label font-16px">お支払いイメージ</div>
            <div class="menu__icon-right" />
          </a>
          <a
            v-smooth-scroll="{ duration: 500, offset: 0 }"
            href="#faq"
            class="menu__body-row d-flex"
          >
            <div class="menu__info-label font-16px">よくあるご質問</div>
            <div class="menu__icon-right" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titlePage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      display: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/layout/header';
</style>
