// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle :title="$t('insurance.selection')" />
    <div class="container">
      <StepProgress :step-list="constContract.step_progress" current="2" />
      <div class="text-top text-top--step2">
        <p class="mb-0">
          {{ $t('common.select_a_plan') }}
        </p>
      </div>
      <div class="compensation-box">
        <div
          class="compensation-box__content recommended cursor-pointer"
          @click="handleNextStep(constContract.plan_code.SEVENTY)"
        >
          <div class="recommend-title-bubble">
            <div class="compensation-box__recommended">
              {{ $t('common.recommended') }}
            </div>
          </div>
          <div class="compensation-box__tag">
            {{ $t('insurance.prepare_well') }}
          </div>
          <div class="compensation-box__plan">
            {{ constContract.plan_rate.SEVENTY.name
            }}{{ $t('insurance.hoshou_plan_product') }}
          </div>
          <div v-if="petInfo" class="compensation-box__description">
            {{ $t('insurance.insurance_FromTo')
            }}{{ validateDate ? getFormatDate(validateDate) : '' }} ~
            {{ expiryDate ? getFormatDate(expiryDate) : '' }}
          </div>
          <div class="compensation-box__price">
            {{ $t('common.total') }}：
            <span>{{
              (calculation70 ? calculation70.calcResult : '') | formatPrice
            }}</span>
            {{ $t('common.yen_per_month') }}
          </div>
          <div
            class="compensation-box__button"
            :class="press === constContract.plan_code.SEVENTY ? 'press-70' : ''"
          >
            <BaseButton
              id="solicitationStep2_70"
              class="tracking"
              :label="$t('common.make_this_plan')"
              btn-full="btn--full"
              icon-right
            />
          </div>
        </div>
      </div>
      <div class="compensation-box mb-2">
        <div
          class="compensation-box__content cursor-pointer"
          @click="handleNextStep(constContract.plan_code.FIFTY)"
        >
          <div class="compensation-box__tag">
            {{ $t('insurance.prepare_easy') }}
          </div>
          <div class="compensation-box__plan">
            {{ constContract.plan_rate.FIFTY.name
            }}{{ $t('insurance.hoshou_plan_product') }}
          </div>
          <div v-if="petInfo" class="compensation-box__description">
            {{ $t('insurance.insurance_FromTo')
            }}{{ validateDate ? getFormatDate(validateDate) : '' }} ~
            {{ expiryDate ? getFormatDate(expiryDate) : '' }}
          </div>
          <div class="compensation-box__price">
            {{ $t('common.total') }}：
            <span>{{
              (calculation50 ? calculation50.calcResult : '') | formatPrice
            }}</span>
            {{ $t('common.yen_per_month') }}
          </div>
          <div
            class="compensation-box__button"
            :class="press === constContract.plan_code.FIFTY ? 'press-50' : ''"
          >
            <BaseButton
              id="solicitationStep2_50"
              class="tracking"
              :label="$t('common.make_this_plan')"
              btn-full="btn--full"
              icon-right
            />
          </div>
        </div>
      </div>
      <div class="pb-72">
        <img src="~/assets/images/product-info.png" alt="" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import contract from '~/constants/contract';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import BaseButton from '~/components/formItems/BaseButton';

export default {
  components: { BaseButton },
  async asyncData({ $helpers, store }) {
    $helpers.setDataFromLocalToVuex();
  },

  data() {
    return {
      constContract: contract,
      calculation50: null,
      calculation70: null,
      press: '',
      expiryDate: '', ///product/NWEB002のレスポンスから取得
      validateDate: '', ///product/NWEB002のレスポンスから取得
    };
  },

  computed: {
    ...mapState({
      petInfo: (state) => state.contracts.petInfo,
    }),
    ...mapGetters({
      getInsEndDate: 'contracts/getInsEndDate',
    }),
  },

  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },

  async mounted() {
    // const ageInfo = getPetAge(this.petInfo.insStartDate,this.petInfo.petBirthday.replace(/\//g, ''));
    const result = await this.$store.dispatch('contracts/premiumCalculation');
    this.validateDate = result.validateDate;
    this.expiryDate = result.expiryDate;
    this.calculation70 = result.planList[0];
    this.calculation50 = result.planList[1];
  },

  methods: {
    ...mapActions({
      createProposal: 'contracts/CreateProposal',
      getCustomerInfo: 'contracts/customerInfo',
    }),
    ...mapMutations({
      setRepProductCd: 'contracts/setRepProductCd',
      setPetInfo: 'contracts/setPetInfo',
    }),

    getFormatDate(date) {
      return moment(date).format('YYYY/MM/DD');
    },

    preventNav() {
      this.$route.hash === '#edit'
        ? this.$helpers.setDataFromVuexToLocal(
            'petInfo',
            'productCd',
            'customerInfo',
            'contract_duplicate'
          )
        : this.$helpers.setDataFromVuexToLocal('petInfo');
    },

    async handleNextStep(planName) {
      const targetPlan =
        planName === this.constContract.plan_code.SEVENTY
          ? this.calculation70
          : this.calculation50;
      const payload = {
        totalPremAf: targetPlan.calcResult,
        expiryDate: this.expiryDate,
        validateDate: this.validateDate,
        repProductCd: planName,
      };
      this.setRepProductCd(planName);
      this.press = planName;
      await this.$store.dispatch('auth/load');
      localStorage.removeItem('send_from_mail');

      if (this.$store.getters['auth/isAuthenticated']) {
        const customerInfo = await this.getCustomerInfo();

        // ログイン済みだが飼い主情報未登録なら、飼い主情報登録画面へ遷移
        if (customerInfo.firstName1 === undefined) {
          this.$router.push('/solicitation/step4/');
          return;
        }

        // 確認画面の変更リンクから遷移してきた場合は、確認画面へ戻る
        if (this.$route.hash === '#edit') {
          this.$router.push('/solicitation/confirm/');
          return;
        }

        // ログイン済みで飼い主情報登録済みなら各事項同意画面へ遷移
        this.$router.push('/solicitation/step4/confirm/');
      } else {
        const res = await this.createProposal(payload);
        this.$router.push(
          `/solicitation/step3?affinityCode=${res.affinityCode}`
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
::v-deep {
  .press-70,
  .press-50 {
    button {
      box-shadow: 0 3px 8px rgb($black, 0.15);
      filter: brightness(1.05);
      position: relative;
      top: 2px;
    }
  }
}
</style>
