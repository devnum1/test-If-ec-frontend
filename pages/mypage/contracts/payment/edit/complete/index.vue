<template>
  <div class="page-content bg-gray payment-confirm">
    <page-title :title="$t('card.payment_complete.title')" />
    <div class="container">
      <div class="mt-56">
        <div class="contract-complete-notification">
          <div>
            <div class="checked__icon">
              <i class="icon-fonts icon-fonts--check" />
            </div>
            <div
              class="complete-text"
              v-html="
                $t('card.payment_complete.contract', { petName, petTitle })
              "
            />
            <div
              class="complete-text"
              v-text="$t('card.payment_complete.description')"
            />
            <div
              class="complete-text"
              v-text="$t('card.payment_complete.completed')"
            />
          </div>
          <div
            class="my-4 txt-red"
            v-text="$t('card.payment_complete.important')"
          />
          <div class="text-left" v-text="$t('card.payment_complete.notice')" />
        </div>
      </div>
      <base-button
        :label="$t('common.button.to_my_page')"
        btn-class="test tracking mt-56"
        btn-full="btn--full"
        icon-right
        @click="$router.push('/mypage/contracts')"
      />
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
.page-content {
  font-family: $font-family-primary;
}
</style>
