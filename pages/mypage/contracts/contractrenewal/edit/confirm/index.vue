<template>
  <div class="page-content bg-gray">
    <page-title
      :title="$t('contract_renewal_edit.confirm_title')"
      btn-back="/mypage/contracts/contractrenewal/edit"
    />
    <div class="container contract-info">
      <p
        class="text-dark-gray mb-0"
        v-text="$t('contract_renewal_edit.confirm_subtitle')"
      />
      <div class="d-flex mb-4 justify-content-between align-items-center mt-56">
        <div
          class="rules-title mb-0"
          v-text="$t('contract_renewal_edit.confirm_changes')"
        />
      </div>
      <div class="mt-4">
        <ul class="contract-card-list">
          <li
            v-for="(text, i) in dataInfo"
            :key="i"
            class="contract-card-list__item"
            v-text="text"
          />
        </ul>
      </div>
      <base-button
        :label="$t('contract_renewal_edit.button.apply')"
        :disabled="isEmpty"
        btn-class="mw-279 tracking mt-56"
        btn-full="btn--full"
        icon-right
        @click="onSaveHandler"
      />
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/dp-0142';
</style>
