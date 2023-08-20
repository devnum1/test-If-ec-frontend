<template>
  <div class="claim-container">
    <div class="claim-container-inner-wrapper">
      <page-title logo />
      <div class="claim-container-inner">
        <Nuxt />
      </div>
    </div>
    <HomeFooter />
  </div>
</template>
<script>
import PageTitle from '@/components/PageTitle';
export default {
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
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.claim-container {
  background-color: $gray-4;

  &-inner-wrapper {
    max-width: 375px;
    margin: 0 auto;
    min-height: 100vh;
    background-color: #fafafa;
  }

  &-inner {
    padding: 16px;
  }
}
</style>
