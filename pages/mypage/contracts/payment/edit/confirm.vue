// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray payment-confirm">
    <PageTitle :title="$t('card.payment_edit_confirm')" />
    <div class="container">
      <div class="form-group mb-56 mt-32">
        <div class="information-table table--double">
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('card.number') }}
            </div>
            <div class="info-table__content">
              {{ cardInfo.cardno | cardLast4Digit }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('card.expire_date') }}
            </div>
            <div class="info-table__content">
              {{ cardInfo.expire_MM | expiredMonth }}/{{
                cardInfo.expire_YY | expiredYear
              }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('card.security_code') }}
            </div>
            <div class="info-table__content">
              {{ cardInfo.securitycode | securityCode }}
            </div>
          </div>
        </div>
      </div>

      <p
        v-if="errorGmo"
        class="txt-red font-14px text-center font-weight-500"
        v-html="$t('messages.check_payment_gmo_edit')"
      />
      <div
        v-else
        class="card-confirm-notice"
        v-html="$t('note.credit_card_notice')"
      />
      <p class="txt-black-0-6 font-14px">
        {{ $t('note.confirm_payment_edit') }}
      </p>

      <div class="mt-56">
        <BaseButton
          id="myPagePaymentEdit_confirm"
          btn-class="test tracking"
          :label="$t('common.button.change')"
          btn-full="btn--full"
          :disabled="disabledBtn"
          icon-right
          @click="handleFinish"
        />
      </div>
      <div v-if="errorGmo" class="mt-30 text-center">
        <nuxt-link to="/mypage/contracts/payment/edit">
          {{ $t('messages.checkRegistrationInformation') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import contract from '~/constants/contract';

import BaseButton from '~/components/formItems/BaseButton';
import PageTitle from '../../../../../components/PageTitle.vue';

export default {
  components: { PageTitle, BaseButton },
  beforeRouteEnter(to, from, next) {
    let checkReload = JSON.parse(localStorage.getItem('reload'));
    if (checkReload) {
      return next((vm) => {
        localStorage.removeItem('reload');
        localStorage.removeItem('cardPaymentInfo_refresh');
        vm.$router.push('/mypage/contracts/payment/edit/');
      });
    }

    if (from.name !== 'mypage-contracts-payment-edit' && !checkReload) {
      return next((vm) => {
        vm.$router.push('/mypage/contracts/');
      });
    }

    next();
  },

  data() {
    return {
      constContract: contract,
      cardInfo: null,
      disabledBtn: false,
      linkdMemberId: '',
      diseaseList: [],
      errorGmo: false,
      MESSAGE_ID_MMZN3016E: 'MMZN3016E',
    };
  },

  computed: {
    ...mapState({
      paymentInfo: (state) => state.payments.paymentInfo,
      policyId: (state) => state.contracts.policyId,
      listContractInfo: (state) => state.contracts.listContractInfo,
      creditCardData: (state) => state.payments.creditCardData,
    }),
  },

  async created() {
    this.$helpers.setDataFromLocalToVuex();
    this.cardInfo =
      this.paymentInfo ||
      JSON.parse(localStorage.getItem('cardPaymentInfo_refresh'));
    this.$store.commit(
      'contracts/setPolicyId',
      this.policyId || JSON.parse(localStorage.getItem('policyId_refresh'))
    );
  },

  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },

  methods: {
    ...mapActions({
      updateContractPayment: 'payments/updateContractCard',
    }),

    preventNav() {
      localStorage.setItem('reload', true);
      localStorage.setItem(
        'cardPaymentInfo_refresh',
        JSON.stringify(this.cardInfo)
      );
      localStorage.setItem('policyId_refresh', JSON.stringify(this.policyId));
    },

    cardLast4Digits(value) {
      value = value.replace(/\s+/g, '');

      if (value.length < 12) {
        value = value.padStart(12, '*');
      }

      return (
        value
          .substring(0, value.length - 4)
          .replace(/[0-9]/gi, '*')
          .replace(/(.{4})/g, '$1')
          .trim() + value.substring(value.length - 4)
      );
    },

    async handleFinish() {
      // call api contract payment
      // https://littlefamily-ssi.slack.com/archives/C055L4F5ANN/p1688548986677699?thread_ts=1688478428.941449&cid=C055L4F5ANN
      try {
        const paramsPayment = {
          policyId: String(this.policyId),
          cardToken: this.cardInfo.token,
        };
        const contractPaymentInfo = await this.updateContractPayment(
          paramsPayment
        );

        // result： 1（succeed） 0（failed） -1（exception）
        if (contractPaymentInfo.result === 1) {
          localStorage.removeItem('credit_card');
          this.$router.push('/mypage/contracts/payment/edit/complete');
        } else {
          this.errorGmo = true;
          this.disabledBtn = true;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
.page-content {
  font-family: $font-family-primary;
}
</style>
