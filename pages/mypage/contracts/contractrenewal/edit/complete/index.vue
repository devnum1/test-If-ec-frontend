<template>
  <div class="page-content bg-gray">
    <page-title
      :title="
        $tc('contract_renewal_edit.complete_title', +isCompleteTypeExamination)
      "
      btn-back="/mypage/contracts/contractrenewal/edit/confirm"
    />
    <div class="container contract-info">
      <div class="mt-56">
        <div class="contract-complete-notification">
          <div class="checked__icon">
            <i class="icon-fonts icon-fonts--check" />
          </div>
          <div
            class="complete-text"
            v-text="$t('contract_renewal_edit.complete_notification')"
          />
        </div>
      </div>
      <div
        v-if="isCompleteTypeExamination"
        class="text-dark-gray mt-56"
        v-text="$t('contract_renewal_edit.complete_description')"
      />
      <base-button
        :label="$t('contract_renewal_edit.button.to_my_page')"
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
@import '~/assets/scss/pages/dp-0143';
</style>
