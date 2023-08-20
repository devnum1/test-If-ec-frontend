// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray payment-confirm">
    <PageTitle :title="$t('note.confirm_card_info')" />
    <div class="container">
      <div class="form-group mb-41" />
      <div class="form-group mb-24">
        <div class="txt-black-0-82 mb-56">
          <p class="mb-24">
            {{ $t('terms.contract_not_complete') }}
          </p>
          <p>{{ $t('terms.content_contract_complete') }}</p>
        </div>
        <div class="headline-change">
          <div class="headline-change__title">
            {{ $t('common.selected_plan') }}
          </div>
        </div>
      </div>
      <div class="form-group mb-56">
        <SelectedInsuranceCard
          :compensation="`${getCompensateRate}%`"
          :price="_.get(productInfo, 'premTerm', '')"
        />
      </div>

      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('note.about.insFromTo') }}
        </div>
      </div>
      <div class="explain mb-15 txt-black-0-82 mb-57">
        <div>
          <span>{{
            getFormatDateJP(_.get(productInfo, 'validateDate', ''))
          }}</span>
          <span>~</span>
          <span>{{
            getFormatDateJP(_.get(productInfo, 'expiryDate', ''))
          }}</span>
        </div>
      </div>

      <div class="d-flex mb-4 justify-content-between align-items-center">
        <div class="rules-title mb-0">
          {{ $t('contract_id.title_condition_guarantee') }}
        </div>
      </div>
      <div
        class="explain mb-15 txt-black-0-82"
        v-html="$t('contract_id.noti_insurance')"
      />

      <div class="sick-box mb-57">
        <div class="sick-box__content">
          <ul
            v-for="(disease, index) in diseaseList"
            :key="index"
            class="sick-box__list font-12px"
          >
            <li class="sick-box__item">
              {{ disease }}
            </li>
          </ul>
          <p v-if="diseaseList.length === 0" class="sick-box__item">
            {{ $t('illness.no_disease') }}
          </p>
        </div>
      </div>

      <div class="form-group mb-24">
        <div class="headline-change">
          <div class="headline-change__title">
            {{ $t('note.about.my_child') }}
          </div>
        </div>
      </div>
      <div class="form-group mb-57">
        <div class="information-table info-table table--double">
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.owner.name') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataPetInfo, 'petName', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.pet.pet_type') }}
            </div>
            <div class="info-table__content">
              {{
                _.get(dataPetInfo, 'petType', '') == constContract.pet_type.DOG
                  ? $t('common.pet.dog')
                  : $t('common.pet.cat')
              }}
            </div>
          </div>
          <div
            v-if="
              _.get(dataPetInfo, 'petType', '') == constContract.pet_type.DOG
            "
            class="information-table__row"
          >
            <div class="info-table__label">
              {{ $t('contract_confirm.pet_contract_type') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataPetInfo, 'petBreedDesc', '') }}
            </div>
          </div>
          <div
            v-if="_.get(dataPetInfo, 'weight', '') !== 0"
            class="information-table__row"
          >
            <div class="info-table__label">
              {{ $t('common.weight') }}
            </div>
            <div class="info-table__content">{{ checkPetWeight }}kg</div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.gender.gender_title') }}
            </div>
            <div class="info-table__content">
              {{
                _.get(dataPetInfo, 'gender', '') == constContract.pet_sex.MALE
                  ? $t('common.gender.boy')
                  : $t('common.gender.girl')
              }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.contraception_status.title') }}
            </div>
            <div class="info-table__content">
              {{
                _.get(dataPetInfo, 'contraception', '') === 'Y'
                  ? 'あり'
                  : 'なし'
              }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.title') }}
            </div>
            <div class="info-table__content">
              {{ showPetBirthday }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('contract_confirm.notice_disease') }}
            </div>
            <div class="info-table__content">
              {{ showIllnessNotice }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('contract_confirm.ins_pet_register') }}
            </div>
            <div class="info-table__content">
              {{ showOtherInsurance }}
            </div>
          </div>
        </div>
      </div>
      <div class="form-group mb-24">
        <div class="headline-change">
          <div class="headline-change__title">
            {{ $t('note.about.owner') }}
          </div>
        </div>
      </div>
      <div class="form-group mb-41">
        <div class="information-table table--double">
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.owner.name') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataCustomerInfo, 'lastName1', '') }}
              {{ _.get(dataCustomerInfo, 'firstName1', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.name.name_kana') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataCustomerInfo, 'lastName2', '') }}
              {{ _.get(dataCustomerInfo, 'firstName2', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.gender.gender_title') }}
            </div>
            <div class="info-table__content">
              {{
                _.get(dataCustomerInfo, 'gender', '') ===
                constContract.gender.MALE.id
                  ? constContract.gender.MALE.name
                  : constContract.gender.FEMALE.name
              }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.birthday') }}
            </div>
            <div class="info-table__content">
              {{ getFormatDateEN(_.get(dataCustomerInfo, 'birthDate', '')) }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.postal_code') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataCustomerInfo, 'postCode', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.prefectureCode') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataCustomerInfo, 'prefectureCode', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.address1') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataCustomerInfo, 'address1', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.address2') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataCustomerInfo, 'address2', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.dob.address3') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataCustomerInfo, 'address3', '') }}
            </div>
          </div>
          <div class="information-table__row information-table__mail">
            <span class="info-table__label">
              {{ $t('common.mail') }}
            </span>
            <span
              ref="refEmail"
              class="info-table__content"
              v-html="txtEmail"
            />
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.phone') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataCustomerInfo, 'telephone', '') }}
            </div>
          </div>
        </div>
      </div>

      <div class="form-group mb-24">
        <div class="headline-change">
          <div class="headline-change__title">
            {{ $t('note.about.payment') }}
          </div>
          <div class="headline-change__change-link">
            <nuxt-link
              id="solicitationContractsPaymentConfirm_changePlan"
              class="tracking"
              :to="{
                path: '/solicitation/additional_information/payment/new/',
              }"
            >
              {{ $t('common.change') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="card-confirm-notice" v-html="$t('note.credit_card_notice')" />
      <div class="form-group mb-57 mt-32">
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
        v-html="$t('messages.check_payment_gmo')"
      />

      <p class="txt-black-0-6 font-14px text-center">
        {{ $t('note.immediately_content') }}
      </p>

      <div class="page-button payment-confirm__button">
        <BaseButton
          id="solicitationContractsPaymentConfirm_submit"
          btn-class="test tracking"
          :label="$t('common.button.contract_complete')"
          btn-full="btn--full"
          :disabled="disabledBtn"
          icon-right
          @click="handleFinish"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import contract from '~/constants/contract';
import moment from 'moment';
import BaseButton from '~/components/formItems/BaseButton';
import SelectedInsuranceCard from '~/components/cards/SelectedInsuranceCard';

export default {
  components: { BaseButton, SelectedInsuranceCard },
  beforeRouteEnter(to, from, next) {
    let checkReload = JSON.parse(localStorage.getItem('reload'));
    if (checkReload) {
      return next((vm) => {
        localStorage.removeItem('reload');
        localStorage.removeItem('cardPaymentInfo_refresh');
        vm.$router.push('/solicitation/additional_information/payment/new/');
      });
    }

    if (
      from.name !== 'solicitation-additional_information-payment-new' &&
      !checkReload
    ) {
      return next((vm) => {
        vm.$router.push('/mypage/contracts/');
      });
    }

    next();
  },
  middleware: ['auth'],
  data() {
    return {
      constContract: contract,
      cardInfo: null,
      errorGmo: false,
      disabledBtn: false,
      txtEmail: '',
      linkdMemberId: '',
      dataCustomerInfo: null,
      diseaseList: [],
      productInfo: null,
      dataPetInfo: null,
      applicationInfo: null,
    };
  },

  computed: {
    ...mapState({
      paymentInfo: (state) => state.payments.paymentInfo,
      policyId: (state) => state.contracts.policyId,
      listContractInfo: (state) => state.contracts.listContractInfo,
      repProductCd: (state) => state.contracts.repProductCd,
      customerInfo: (state) => state.contracts.customerInfo,
      petInfo: (state) => state.contracts.petInfo,
      listProductInfo: (state) => state.contracts.listProductInfo,
    }),
    ...mapGetters({
      // policyId: 'contracts/getPolicyId',
      getAuthUserAttributes: 'auth/getAuthUserAttributes',
    }),
    getCompensateRate() {
      const plan = _.get(this.productInfo, 'planCode');
      if (!plan) {
        return 0;
      }

      return plan === contract.plan_code.SEVENTY ? 70 : 50;
    },
    showPetBirthday() {
      const birthday = _.get(this.dataPetInfo, 'birthDate', '');
      const checkBirthday =
        birthday.substring(0, 4) + '/' + birthday.substring(5, 7);
      const birthdayDiv =
        _.get(this.dataPetInfo, 'birthDateDiv', '') == 1 ? '確定' : '推定';

      return checkBirthday + ' (' + birthdayDiv + ')';
    },
    showIllnessNotice() {
      // contractCustDeclListの中のdeclNoが1のものが病歴告知データ
      const illnessData = _.get(
        this.applicationInfo,
        'contractCustDeclList',
        []
      ).find((data) => data.declNo === '1');
      const illnessAnswer = _.get(illnessData, 'declAnswer', '');
      if (!illnessAnswer) {
        return '';
      }
      return illnessAnswer == contract.pet_notice_illness.YES
        ? this.$t('common.yep')
        : this.$t('common.none');
    },
    showOtherInsurance() {
      // contractCustDeclListの中のdeclNoが2のものが他社加入の有無
      const otherInsurance = _.get(
        this.applicationInfo,
        'contractCustDeclList',
        []
      ).find((data) => data.declNo === '2');
      const otherInsuranceAnswer = _.get(otherInsurance, 'declAnswer', '');
      if (!otherInsuranceAnswer) {
        return '';
      }
      return otherInsuranceAnswer == contract.pet_other_insurance.YES
        ? this.$t('common.yep')
        : this.$t('common.none');
    },
    checkPetWeight() {
      const petWeight = _.get(this.dataPetInfo, 'weight', '').toString();
      if (petWeight.indexOf('.') == -1) {
        return (petWeight * 1).toFixed(1);
      } else {
        return petWeight;
      }
    },
  },

  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },

  async created() {
    this.$helpers.setDataFromLocalToVuex();
    this.cardInfo =
      this.paymentInfo ||
      JSON.parse(localStorage.getItem('cardPaymentInfo_refresh'));
    this.$store.commit(
      'contracts/setPolicyId',
      this.policyId || localStorage.getItem('policyId_refresh')
    );

    this.$store
      .dispatch('contracts/contractInfoV2', {
        policyId: this.policyId,
      })
      .then(() => {
        const contractInfo = this.listContractInfo.policy;
        const policyId = contractInfo.policyId;
        this.applicationInfo = this.listContractInfo.tcsApplication;
        this.dataPetInfo = contractInfo.contractSubjectPetList.find(
          (pet) => pet.policyId === policyId
        );
        this.dataPetInfo.petBreedDesc = this.listContractInfo.petBreedDesc;
        this.productInfo = contractInfo.contractProductList.find(
          (product) => product.policyId === policyId
        );
        const exclusionList = _.get(
          contractInfo,
          'contractPolicyExclusionList',
          []
        );
        _.forEach(exclusionList, ({ exclusionCode }) => {
          this.diseaseList.push(exclusionCode);
        });
      })
      .catch((e) => {
        console.log(e);
        return this.$router.push('/errors/system_error/');
      });

    this.txtEmail = this.getAuthUserAttributes.email;
    this.dataCustomerInfo = await this.$store.dispatch(
      'contracts/customerInfo'
    );
  },

  mounted() {
    if (this.$refs.refEmail.clientHeight > 40) {
      this.txtEmail = this.txtEmail.split('@').join('<br>@');
    }
  },

  methods: {
    ...mapActions({
      updateContractPayment: 'payments/updateContractPaymentV2',
    }),
    getFormatDateJP(date) {
      return moment(date).format('YYYY年MM月DD日');
    },
    getFormatDateEN(date) {
      return moment(date).format('YYYY/MM/DD');
    },
    preventNav() {
      this.$helpers.setDataFromVuexToLocal(
        'petInfo',
        'productCd',
        'customerInfo',
        'policyId'
      );
      localStorage.setItem('reload', true);
      localStorage.setItem(
        'cardPaymentInfo_refresh',
        JSON.stringify(this.cardInfo)
      );
      localStorage.setItem('policyId_refresh', this.policyId);
    },
    async handleFinish() {
      localStorage.removeItem('reload');

      // call api contract payment
      const paramsPayment = {
        policyId: this.policyId,
        cardToken: this.cardInfo.token,
      };
      const contractPaymentInfo = await this.updateContractPayment(
        paramsPayment
      );

      // result： 1（succeed） 0（failed） -1（exception）
      if (contractPaymentInfo.result === 1) {
        this.$router.push('/solicitation/contracts/complete/');
      } else {
        this.errorGmo = true;
        this.disabledBtn = true;
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
