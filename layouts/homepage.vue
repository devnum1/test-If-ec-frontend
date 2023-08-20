<template>
  <div class="pet-container">
    <div class="pet-container-inner">
      <div class="homepage-container">
        <HomeHeader />
        <Nuxt />
        <HomeFooter />
        <button
          id="toTopBtn"
          type="button"
          class="btn btn--default mw-279 home-button"
          :class="!visible ? 'fade-btn' : ''"
          @click="scrollTop()"
        >
          <i class="icon-fonts icon-fonts--back" />
          <span class="btn__text"> TOPへ </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import HomeHeader from '~/components/HomeHeader';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';

export default {
  layout: 'homepage',
  data() {
    return {
      visible: false,
    };
  },

  head() {
    return {
      title:
        'リトルファミリー少額短期保険株式会社｜あなたの小さな家族を守るために',
      meta: [
        {
          hid: 'description',
          property: 'description',
          content:
            'あなたの小さな家族を守るために。リトルファミリー少額短期保険株式会社のサイトです。｜一生涯加入しやすく、使いやすい保険「わんデイズ／にゃんデイズ」をご提供。お申込みや、ご請求もスマホで楽々お手続き。',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            'リトルファミリー少額短期保険株式会社｜あなたの小さな家族を守るために',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'あなたの小さな家族を守るために。リトルファミリー少額短期保険株式会社のサイトです。｜一生涯加入しやすく、使いやすい保険「わんデイズ／にゃんデイズ」をご提供。お申込みや、ご請求もスマホで楽々お手続き。',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://www.littlefamily-ssi.com/',
        },
      ],
    };
  },

  mounted() {
    window.addEventListener('scroll', this.scrollListener);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  },

  methods: {
    scrollTop() {
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId);
        }
        window.scroll(0, window.pageYOffset - 50);
      }, 20);
    },
    scrollListener(e) {
      this.visible = window.scrollY > 150;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/components/base-buttons';
@import '~/assets/scss/landing/home';

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.pet-container {
  background-color: $gray-4;

  &-inner {
    max-width: 768px;
    margin: 0 auto;
    min-height: 100vh;
  }
}
</style>
