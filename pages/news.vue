<template>
  <main class="main">
    <div class="breadcrum d-flex">
      <nuxt-link to="/" class="txt-black-6 breadcrum__top mr-1">
        <span>TOP</span>
      </nuxt-link>
      <div class="breadcrum__icon-right mr-1" />
      <span class="mr-1">お知らせ</span>
    </div>
    <div class="notice">
      <div class="title">お知らせ</div>

      <div class="notice__list">
        <div v-for="news in newsList" :key="news.id" class="notice__item">
          <div class="notice__date">
            {{ news.postDate }}
          </div>
          <div class="notice__title">
            <a
              class="notice__title-content"
              :href="news.cmsPdf ? news.cmsPdf.url : news.externalPdfLink"
              target="_blank"
              >{{ news.title }}</a
            >
            <span v-if="news.newFrag" class="notice__label">＜NEW＞</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品情報 -->
  </main>
</template>

<script>
import HomeHeader from '~/components/HomeHeader';
import VueSlickCarousel from 'vue-slick-carousel';
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  layout: 'homepage',
  data() {
    return {
      newsList: [],
    };
  },
  computed: {},

  async created() {
    try {
      const contents = await this.getNews(100);
      if (contents) {
        contents.forEach((d) => {
          d.postDate = moment(d.postDate).format('YYYY.MM.DD');
        });
        this.newsList = contents;
      }
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    ...mapActions({
      getNews: 'contracts/getNews',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/landing/home';
// memo:共通化したい
.breadcrum {
  font-size: 12px;
  line-height: 17px;
  color: $base-black;
  padding: 10px 0 10px 120px;
  background-color: $gray-3;
  @include breakpoint-down(smallphone) {
    padding: 10px 0 10px 30px;
  }

  @include breakpoint-down(tinyphone) {
    padding: 10px 0 10px 15px;
  }

  &__top {
    text-decoration: underline;

    &:hover {
      color: $green;
    }
  }

  &__icon-right {
    background-image: url('~assets/images/icon-right.svg');
    width: 14px;
    height: 14px;
    background-repeat: no-repeat;
    margin-top: 2px;
  }
}
</style>
