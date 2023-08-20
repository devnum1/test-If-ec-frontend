// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle :title="$t('note.enter_owner_info')" />
    <div class="container">
      <StepProgress
        :step-list="constContract.step_progress"
        class="mb-41"
        current="4"
      />
      <div class="rules-title">
        {{ $t('terms.matter_manual.consent_each_matter') }}
      </div>
      <p
        class="text-required mb-24"
        v-html="$t('terms.be_sure_to_read_confirm')"
      />
      <div class="d-flex flex-column align-items-center mb-57">
        <BaseButton
          id="solicitationStep4Confirm_importantMatters"
          btn-icon-pdf
          :label="$t('magic_link.explanation_confirm')"
          class="mb-24 btn-pdf tracking"
          @click="handlePdf"
        />
        <BaseInputCheckbox
          id="solicitationStep4Confirm_agree"
          v-model="isChecked"
          :checked="isChecked"
          :disabled="!showPdf"
          center-step4
          :label="$t('terms.agree_to_important_des')"
          class="tracking"
        />
      </div>
      <div class="page-button page-button--step3 mt-0 pb-0">
        <BaseButton
          id="solicitationStep4Confirm_nextStep"
          btn-class="mb-28 tracking"
          :label="$t('common.button.next')"
          btn-full="btn--full"
          icon-right
          :disabled="!isChecked || !showPdf"
          @click="handleNextStep"
        />
      </div>

      <!-- <ButtonBack
        id="solicitationStep4Confirm_back"
        class="tracking"
        :label="$t('common.button.return_previous')"
        :disabled="btnBack"
        @click="handleCancel"
      /> -->
    </div>
  </div>
</template>

<script>
import StepProgress from '@/components/stepProgress/stepProgress';
import BaseInputCheckbox from '@/components/formItems/BaseInputCheckbox';
import BaseButton from '@/components/formItems/BaseButton';
import PageTitle from '@/components/PageTitle';

import contract from '~/constants/contract';

import { mapState } from 'vuex';

export default {
  components: { BaseButton, StepProgress, BaseInputCheckbox, PageTitle },
  middleware: ['auth'],
  data() {
    return {
      constContract: contract,
      isChecked: false,
      showPdf: false,
      // btnBack: false,
    };
  },

  computed: {
    ...mapState({
      customerInfo: (state) => state.contracts.customerInfo,
    }),
  },

  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },

  created() {
    this.$helpers.setDataFromLocalToVuex();
    let sendFromMail = JSON.parse(localStorage.getItem('send_from_mail'));
    // if (sendFromMail && !this.customerInfo) {
    //   this.btnBack = true;
    // }
  },

  methods: {
    preventNav() {
      this.$helpers.setDataFromVuexToLocal(
        'petInfo',
        'productCd',
        'customerInfo',
        'contract_duplicate'
      );
    },

    handleNextStep() {
      this.$router.push('/solicitation/confirm/');
    },

    // handleCancel() {
    //   if (_.isEmpty(this.customerInfo)) {
    //     JSON.parse(localStorage.getItem('send_from_mail')) ? '' : this.$router.push('/solicitation/step2/');
    //   } else {
    //     this.$router.push('/solicitation/step4/');
    //   }
    // },

    handlePdf() {
      this.showPdf = true;
      window.open(
        'https://ayame-bff.littlefamily-ssi-bw-stg.com/pdf/important_matters.pdf',
        '_blank'
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
::v-deep.btn-pdf {
  padding: 9px 15px 9px 36px !important;
}
</style>
