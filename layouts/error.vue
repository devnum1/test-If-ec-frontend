// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle logo />
    <div class="container error-page">
      <div class="error-page__top text-center">
        <img src="~assets/images/husky-dog.svg" alt="error-page-icon" />
        <div class="error-page__title">
          {{ errorTitle }}
        </div>
      </div>
      <div class="error-page__content">
        <p class="error-page__text">
          {{ errorText }}
        </p>
        <p class="error-page__text">
          {{ $t('error_page.instruction') }}
        </p>
      </div>
      <div class="error-page__button text-center">
        <BaseButton
          btn-class="mw-279"
          :label="$t('error_page.return_to_top_page')"
          icon-right
          @click="goToTopPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/formItems/BaseButton';
export default {
  components: { BaseButton },
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorTitle() {
      const errors = this.$t('error_page.errors');

      return (errors[this.error.statusCode] || errors['unknown']).title;
    },
    errorText() {
      const errors = this.$t('error_page.errors');

      return (errors[this.error.statusCode] || errors['unknown']).content;
    },
  },
  methods: {
    goToTopPage() {
      let linkRedirect = localStorage.getItem('access_insurance');
      if (linkRedirect == 'mypage') {
        this.$router.push('/mypage/contracts/');
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/error_page';
</style>
