// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle logo />
    <!-- DP-0020 -->
    <div class="container">
      <div class="form-group mt-56 mb-34">
        <div class="contract-complete-notification">
          <div class="checked__icon">
            <i class="icon-fonts icon-fonts--check" />
          </div>
          <div class="complete-text">
            <span>{{ $t('success.your_pet_insurrance.congratulation') }}</span>
            <br />
            <span>
              {{ petName + petTitle + $t('success.your_pet_insurrance.start') }}
            </span>
          </div>
        </div>
      </div>
      <div class="form-group text-normal text-left mx-3">
        {{
          $t('note.result_of_review') +
          petName +
          petTitle +
          $t('note.insurance_established')
        }}
        <br />
        {{ $t('note.send_contract_info_to_mail') }}
      </div>
      <div class="page-button mt-52 pb-0">
        <BaseButton
          id="solicitationContractsComplete_nextStep"
          btn-class="mw-279 tracking"
          :label="$t('common.button.to_my_page')"
          btn-full="btn--full"
          icon-right
          @click="$router.push('/mypage/contracts/')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BaseButton from '~/components/formItems/BaseButton';

export default {
  components: { BaseButton },
  beforeRouteEnter(to, from, next) {
    let accessToComplete = [
      'solicitation-contracts-payment-new-confirm',
      'solicitation-additional_information-nodisease-payment-new-confirm',
      'solicitation-additional_information-payment-new-confirm',
    ];
    if (!accessToComplete.includes(from.name)) {
      return next((vm) => vm.$router.push('/'));
    }

    next();
  },

  data() {
    return {
      petTitle: '',
      petName: '',
    };
  },

  computed: {
    ...mapState({
      policyId: (state) => state.contracts.policyId,
      listContractInfo: (state) => state.contracts.listContractInfo,
    }),
  },

  mounted() {
    const petInfo = this.listContractInfo.policy.contractSubjectPetList.find(
      ({ policyId }) => policyId == this.policyId
    );
    this.petName = petInfo.petName;
    this.petTitle = petInfo.gender == 'M' ? 'くん' : 'ちゃん';
  },

  beforeRouteLeave(to, from, next) {
    let backToComplete = [
      'solicitation-contracts-payment-new-confirm',
      'solicitation-additional_information-nodisease-payment-new-confirm',
      'solicitation-additional_information-payment-new-confirm',
    ];
    if (backToComplete.includes(to.name)) {
      return next('/errors/not_found/');
    }

    next();
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
</style>
