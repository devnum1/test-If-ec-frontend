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
          :compensation="`${
            _.get(contractInfo, 'productInfo.compensRate.propVal', '') * 100
          }%`"
          :price="_.get(contractInfo, 'premiumInfo.premiumTotal', '')"
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
            getFormatDate(_.get(contractInfo, 'productInfo.insDateFrom', ''))
          }}</span>
          <span>~</span>
          <span>{{
            getFormatDate(_.get(contractInfo, 'productInfo.insDateTo', ''))
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
            v-for="disease in diseaseList"
            :key="disease.id"
            class="sick-box__list font-12px"
          >
            <li class="sick-box__item">
              {{ disease.text }}
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
              {{ _.get(listPetInfo, 'petName', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.pet.pet_type') }}
            </div>
            <div class="info-table__content">
              {{
                _.get(listPetInfo, 'petType.propVal', '') ==
                constContract.pet_type.DOG
                  ? $t('common.pet.dog')
                  : $t('common.pet.cat')
              }}
            </div>
          </div>
          <div
            v-if="_.get(listPetInfo, 'petBreed.propVal', '') !== '000'"
            class="information-table__row"
          >
            <div class="info-table__label">
              {{ $t('contract_confirm.pet_contract_type') }}
            </div>
            <div class="info-table__content">
              {{ _.get(listPetInfo, 'petBreed.propDispNm', '') }}
            </div>
          </div>
          <div
            v-if="_.get(listPetInfo, 'petWeight', '') != 0"
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
              {{ _.get(listPetInfo, 'petSexCd.propDispNm', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.contraception_status.title') }}
            </div>
            <div class="info-table__content">
              {{ showNoticeCd01 }}
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
              {{ showNoticeCd02 }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('contract_confirm.ins_pet_register') }}
            </div>
            <div class="info-table__content">
              {{
                _.get(listPetInfo, 'petInsJoinFlg.propVal', '') ==
                constContract.pet_join_ins.NONE
                  ? $t('common.contraception_status.none')
                  : $t('common.contraception_status.yep')
              }}
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
              {{ _.get(dataCustomerInfo, 'lastnameKanji', '') }}
              {{ _.get(dataCustomerInfo, 'firstnameKanji', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.name.name_kana') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataCustomerInfo, 'lastnameKana', '') }}
              {{ _.get(dataCustomerInfo, 'firstnameKana', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.gender.gender_title') }}
            </div>
            <div class="info-table__content">
              {{
                _.get(dataCustomerInfo, 'sexCd', '') ===
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
              {{ _.get(dataCustomerInfo, 'birthday', '') }}
            </div>
          </div>
          <div class="information-table__row">
            <div class="info-table__label">
              {{ $t('common.postal_code') }}
            </div>
            <div class="info-table__content">
              {{ _.get(dataCustomerInfo, 'addressZip', '') }}
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
                path: '/solicitation/additional_information/nodisease/payment/new/',
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
import { mapState, mapActions } from 'vuex';
import contract from '~/constants/contract';
import moment from 'moment';

export default {
  beforeRouteEnter(to, from, next) {
    let checkReload = JSON.parse(localStorage.getItem('reload'));
    if (checkReload) {
      return next((vm) => {
        localStorage.removeItem('reload');
        localStorage.removeItem('cardPaymentInfo_refresh');
        vm.$router.push(
          '/solicitation/additional_information/nodisease/payment/new/'
        );
      });
    }

    if (
      from.name !==
        'solicitation-additional_information-nodisease-payment-new' &&
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
      contractInfo: null,
      listPetInfo: null,
    };
  },

  computed: {
    ...mapState({
      paymentInfo: (state) => state.payments.paymentInfo,
      contractId: (state) => state.contracts.contractId,
      listContractInfo: (state) => state.contracts.listContractInfo,
      repProductCd: (state) => state.contracts.repProductCd,
      customerInfo: (state) => state.contracts.customerInfo,
      petInfo: (state) => state.contracts.petInfo,
      listProductInfo: (state) => state.contracts.listProductInfo,
    }),
    showNoticeCd01() {
      let checkNoticeCd01 = _.get(
        this.contractInfo,
        'noticeInfo[0].noticeContent.selection',
        []
      ).find((it) => it.answer);

      return checkNoticeCd01 ? checkNoticeCd01.name : '';
    },
    showPetBirthday() {
      let checkBirthday =
        _.get(this.listPetInfo, 'petBirthday', '').substring(0, 4) +
        '/' +
        _.get(this.listPetInfo, 'petBirthday', '').substring(4);

      return (
        checkBirthday +
        ' (' +
        _.get(this.listPetInfo, 'petBirthdayDiv.propDispNm', '') +
        ')'
      );
    },
    showNoticeCd02() {
      let checkNoticeCd02 = _.get(
        this.contractInfo,
        'noticeInfo[1].noticeContent.selection',
        []
      ).find((it) => it.answer);

      return checkNoticeCd02
        ? checkNoticeCd02.id == contract.pet_notice_cd02.NONE
          ? this.$t('common.contraception_status.none')
          : checkNoticeCd02.id == contract.pet_notice_cd02.YES
          ? this.$t('common.contraception_status.yep')
          : this.$t('common.dont_know')
        : '';
    },
    checkPetWeight() {
      let petWeight = _.get(this.listPetInfo, 'petWeight', '').toString();
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
      'contracts/setContractId',
      this.contractId || JSON.parse(localStorage.getItem('contractId_refresh'))
    );

    this.$store
      .dispatch('contracts/contractInfo', {
        linkdMemberId: this.$helpers.getUserId(),
        contractInfo: [this.contractId],
      })
      .then(() => {
        this.contractInfo = this.listContractInfo.contractInfo[0];
        this.listPetInfo =
          this.contractInfo.insCoverageInfo[0].insTargetProperty;
        let exclusionSpRuleInfo = _.get(
          this.contractInfo,
          'exclusionSpRuleInfo'
        );
        _.forEach(exclusionSpRuleInfo, ({ exclusionSpProperty }) => {
          this.diseaseList.push(exclusionSpProperty);
        });
      })
      .catch((e) => {
        return this.$router.push('/errors/system_error/');
      });

    this.txtEmail = this.$helpers.getLastAuthUser();
    this.linkdMemberId = this.$helpers.getUserId();
    let storeCustomer = await this.$store.dispatch('contracts/customerInfo', {
      linkdMemberId: this.linkdMemberId,
    });
    storeCustomer = {
      ...storeCustomer.customerInfo.customer,
      telephone: storeCustomer.customerInfo.contact.telephone,
      addressZip: storeCustomer.customerInfo.address.addressZip,
      birthday: storeCustomer.customerInfo.customer.birthday.replace(
        /(\d{4})(\d{2})(\d{2})/,
        '$1/$2/$3'
      ),
    };
    this.dataCustomerInfo = storeCustomer;
  },

  mounted() {
    if (this.$refs.refEmail.clientHeight > 40) {
      this.txtEmail = this.txtEmail.split('@').join('<br>@');
    }
  },

  methods: {
    ...mapActions({
      updateContractPayment: 'payments/updateContractPayment',
    }),
    getFormatDate(date) {
      return moment(date).format('YYYY年MM月DD日');
    },

    preventNav() {
      this.$helpers.setDataFromVuexToLocal(
        'petInfo',
        'productCd',
        'customerInfo',
        'contractId'
      );
      localStorage.setItem('reload', true);
      localStorage.setItem(
        'cardPaymentInfo_refresh',
        JSON.stringify(this.cardInfo)
      );
      localStorage.setItem(
        'contractId_refresh',
        JSON.stringify(this.contractId)
      );
    },

    async handleFinish() {
      localStorage.removeItem('reload');

      // call api contract payment
      let paramsPayment = {
        linkdMemberId: this.$helpers.getUserId(),
        contractInfo: {
          policyNo: this.contractId.policyNo,
          subscriberNo: this.contractId.subscriberNo,
          token: this.paymentInfo.token,
        },
      };
      let contractPaymentInfo = await this.updateContractPayment(paramsPayment);

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
