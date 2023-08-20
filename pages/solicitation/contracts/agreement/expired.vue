// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle :logo="true" />

    <div class="container">
      <div class="complete-check text-center">
        <div class="complete-check__top">
          <div class="complete-check__icon complete-check__icon--warning" />
          <div class="complete-check__text-warning mb-4">
            {{ $t('error.sorry') }}
          </div>
          <div class="complete-check__text-warning">
            {{ $t('error.page_expired') }}
          </div>
        </div>
        <div class="complete-check__content">
          <div class="complete-check__text">
            <p class="text-left text-normal mb-2">
              {{ $t('note.apologize_but') }}
              {{ $t('note.beginning') }}{{ $t('note.re_register') }}
            </p>
          </div>
        </div>
      </div>
      <div class="page-button">
        <BaseButton
          id="solicitationContractsAgreement_registerAgain"
          btn-class="mw-279 tracking"
          :label="$t('common.button.register_again')"
          btn-full="btn--full"
          icon-right
          @click="$router.push('/solicitation/step1/')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/formItems/BaseButton';

export default {
  components: {
    BaseButton,
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
@import '~/assets/scss/pages/dp-0012';

.complete-check {
  &__content {
    margin-top: 34px;
    margin-bottom: 52px;
  }

  &__text {
    text-align: left;
  }
}

.page-content {
  font-family: $font-family-primary;
}

.pet-id-container {
  padding: 24px 25px 41px 25px;
  margin-bottom: 0;
}

.page-button {
  margin-top: 40px;
  padding-bottom: 25px;
}

.input-checkbox {
  &__title {
    color: rgba($black, 0.6);
  }
}

.form-group {
  padding-bottom: 18px;
}

.mw-142 {
  min-width: 142px;
}

.confirm-text {
  font-size: 14px;
}
</style>
