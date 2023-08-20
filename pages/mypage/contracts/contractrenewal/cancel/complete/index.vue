<template>
  <div class="page-content bg-gray">
    <page-title
      :title="$tc('contract_renewal_cancel.title', 0)"
      btn-back="/mypage/contracts/contractrenewal/cancel"
    />
    <div class="container contract-info">
      <div class="mt-56">
        <div class="contract-complete-notification">
          <div class="checked__icon">
            <i class="icon-fonts icon-fonts--check" />
          </div>
          <div
            class="complete-text"
            v-text="$tc('contract_renewal_cancel.notification', 0)"
          />
        </div>
      </div>
      <div class="text-dark-gray mt-56">
        <p v-for="(text, i) in texts" :key="i" v-html="text" />
      </div>
      <base-button
        :label="$t('contract_renewal_cancel.button.to_my_page')"
        btn-class="mw-279 tracking mt-56"
        btn-full="btn--full"
        @click="$router.push('/mypage/contracts')"
      />
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
@import '~/assets/scss/pages/dp-0140';
</style>
