<template>
  <div class="page-content bg-gray">
    <page-title
      :title="$tc('contract_renewal_cancel.title', 1)"
      btn-back="/mypage/contracts/contractrenewal"
    />
    <div class="container contract-info">
      <div class="complete-check text-center">
        <div class="complete-check__icon complete-check__icon--warning" />
        <div
          class="complete-check__text-warning"
          v-text="$tc('contract_renewal_cancel.notification', 1)"
        />
      </div>
      <div class="text-dark-gray mt-56">
        <ul class="contract-card-list">
          <li
            v-for="(text, i) in $t('contract_renewal_cancel.description')"
            :key="i"
            class="contract-card-list__item mb-4"
            v-text="text"
          />
        </ul>
      </div>
      <base-button
        :label="$t('contract_renewal_cancel.button.cancel')"
        btn-class="mw-279 tracking mt-56"
        btn-full="btn--full"
        @click="onCancelHandler"
      />
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/dp-0139';
</style>
