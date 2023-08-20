// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle logo />
    <div class="container error-page">
      <div class="error-page__top text-center">
        <img src="~assets/images/husky-dog.svg" alt="error-page-icon" />
        <div class="error-page__title">
          {{ $t('error_page.errors.404.title') }}
        </div>
      </div>
      <div class="error-page__content">
        <p class="error-page__text">
          {{ $t('error_page.errors.404.content') }}
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
  beforeRouteEnter(to, from, next) {
    localStorage.removeItem('reload');
    next();
  },
  beforeRouteLeave(to, from, next) {
    let redirectToComplete = [
      'solicitation-contracts-payment-new-confirm',
      'solicitation-additional_information-confirm',
      'solicitation-confirm',
    ];

    if (redirectToComplete.includes(to.name)) {
      return next('/solicitation/contracts/complete/');
    }

    if (to.name === 'solicitation-step1') {
      return next('/solicitation/apologize/');
    }
    next();
  },
  methods: {
    goToTopPage() {
      localStorage.removeItem('reload');
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
