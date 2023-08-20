<template>
  <div class="page-content bg-gray">
    <page-title
      :title="$t('contract_renewal_edit.title')"
      btn-back="/mypage/contracts/contractrenewal"
    />
    <div class="container contract-info pt-4 pb-5">
      <p
        class="text-dark-gray mb-0"
        v-text="$t('contract_renewal_edit.subtitle')"
      />
      <div v-if="showPlanChange">
        <div
          class="d-flex mb-4 justify-content-between align-items-center mt-56"
        >
          <div
            class="rules-title mb-0"
            v-text="$t('contract_renewal_edit.rules.plan_change')"
          />
        </div>
        <div>
          <info-box :data-info="dataInfo.plan" />
          <base-input-checkbox
            v-model="form.isChangedPlan"
            :label="
              $tc('contract_renewal_edit.plan', 0, { percent: allowPercent })
            "
            input-class="text-black-light mt-3"
          />
        </div>
      </div>
      <div class="d-flex mb-4 justify-content-between align-items-center mt-56">
        <div
          class="rules-title mb-0"
          v-text="$t('contract_renewal_edit.rules.neutering_status')"
        />
      </div>
      <div>
        <info-box :data-info="dataInfo.status" />
        <base-input-checkbox
          v-model="form.isChangedStatus"
          :label="
            $tc(
              'contract_renewal_edit.neutering_status_change',
              +!Boolean(isNeuteringStatusYes)
            )
          "
          input-class="text-black-light mt-3"
        />
      </div>
      <div v-if="isHybrid">
        <div
          class="d-flex mb-4 justify-content-between align-items-center mt-56"
        >
          <div
            class="rules-title mb-0"
            v-text="$t('contract_renewal_edit.rules.weight')"
          />
        </div>
        <div>
          <info-box :data-info="dataInfo.weight" />
          <base-input-checkbox
            v-model="form.isChangedWeight"
            :label="$tc('contract_renewal_edit.weight', 0)"
            input-class="text-black-light my-3"
          />
          <base-input
            v-if="form.isChangedWeight"
            v-model="form.weight"
            :help-text="$tc('contract_renewal_edit.weight', 1)"
            input-type="number"
          />
        </div>
      </div>
      <div v-if="isShowAlert" class="notice mt-5">
        <div class="notice__content">
          <div class="notice__top d-flex align-items-center">
            <span class="notice__icon" />
            <span
              class="notice__title text-color-default"
              v-text="$t('contract_renewal_edit.note.warning_note')"
            />
          </div>
          <div class="text-normal text-left">
            <ul class="contract-card-list pl-3">
              <li
                v-for="(text, i) in $t(
                  'contract_renewal_edit.note.description'
                )"
                :key="i"
                class="contract-card-list__item"
                v-text="text"
              />
            </ul>
          </div>
          <div class="mt-30">
            <base-input-checkbox
              v-model="form.isAgree"
              :label="$t('contract_renewal_edit.note.label')"
              center
              input-class="text-black"
            />
          </div>
        </div>
      </div>
      <base-button
        :label="$t('contract_renewal_edit.button.proceed')"
        :disabled="isDisabled"
        btn-class="mw-279 tracking mt-56"
        btn-full="btn--full"
        icon-right
        @click="onNextHandler"
      />
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
@import '~/assets/scss/pages/dp-0141';
</style>
