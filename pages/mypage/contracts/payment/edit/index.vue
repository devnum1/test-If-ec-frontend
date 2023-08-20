// 01EZTX9M3AWK0ZB16B6KYR56F1
<!--決済情報変更画面-->
<template>
  <div class="page-content bg-gray">
    <PageTitle :title="$t('card.payment_edit')" />
    <div class="py-3">
      <div class="container">
        <div v-text="$t('card.description')" />
        <div class="mt-3">
          <div v-html="$t('card.policyNo', { policyNo })" />
          <div v-html="$t('card.name', { petName, gender })" />
        </div>
        <div class="mt-3">
          <div class="checked-notification">
            <div class="checked__notice" v-html="$t('card.noti_credit')" />
          </div>
        </div>
      </div>
    </div>

    <div class="form-group stretch-section darker-grey-bg mb-41 w-100">
      <div class="payment-card-container container">
        <div>
          <img class="w-100" src="~/assets/images/card_visa.png" />
        </div>
        <div>
          <img class="w-100" src="~/assets/images/card_JCB.png" />
        </div>
        <div>
          <img class="w-100" src="~/assets/images/card_Mastercard.png" />
        </div>
        <div>
          <img class="w-100" src="~/assets/images/card_DinersClub.png" />
        </div>
        <div>
          <img class="w-100" src="~/assets/images/card_AmericanExpress.png" />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="form-group mb-41 label-bottom-15">
        <BaseLabel :label-title="$t('card.number')" required />
        <BaseInput
          id="creditCardNumber"
          v-model="dataForm.cardno"
          v-validate="{
            required: true,
            length_between: [
              14,
              16,
              $t('messages.params_message.regex_NUMBER_HALFSIZE'),
            ],
            regex: [
              regex.NUMBER_HALFSIZE,
              $t('messages.params_message.regex_NUMBER_HALFSIZE'),
            ],
          }"
          :data-vv-as="$t('card.number')"
          name="cardno"
          max-length="16"
          input-type="tel"
          min="0"
          :error="errors.first('cardno')"
          :placeholder="`${$t('common.example')}1234 5678 9123 4567`"
          autocomplete="cc-number"
        />
      </div>
      <div class="form-group mb-15">
        <BaseLabel :label-title="$t('card.expire_date')" required />
      </div>
      <div class="form-group mb-41 d-flex month-year-input align-items-center">
        <BaseSelect
          v-model="dataForm.expire_MM"
          v-validate="'required'"
          name="expired_month"
          :error="bag.first('expired_month')"
          placeholder="MM"
          help-text="/"
          :options="masterData.optionsMonth"
          :is-search="false"
          autocomplete="cc-exp-month"
        >
          <template slot="option" slot-scope="props">
            <span
              :id="'myPageContract_paymentEdit_month_' + props.option"
              class="tracking"
              >{{ props.option }}</span
            >
          </template>
        </BaseSelect>
        <span class="month-separator">/</span>
        <BaseSelect
          v-model="dataForm.expire_YY"
          v-validate="'required'"
          name="expired_year"
          :error="bag.first('expired_year')"
          placeholder="YY"
          :options="masterData.optionsYear"
          :is-search="false"
          autocomplete="cc-exp-year"
        >
          <template slot="option" slot-scope="props">
            <span
              :id="'myPageContract_paymentEdit_year_' + props.option"
              class="tracking"
              >{{ props.option }}</span
            >
          </template>
        </BaseSelect>
      </div>
      <div class="form-group open-modal d-flex mb-0 label-bottom-15">
        <BaseLabel
          label-class="base-label--custom"
          :label-title="$t('card.security_code')"
          required
        />
        <button
          class="label-tooltip__btn mt-1"
          @click="modalPaymentInstruct = true"
        >
          ?
        </button>
      </div>
      <div class="form-group">
        <div class="w-50">
          <BaseInput
            v-model="dataForm.securitycode"
            v-validate="{
              required: true,
              length_between: [3, 4, 'security_code'],
              regex: [
                regex.NUMBER_HALFSIZE,
                $t('messages.params_message.regex_NUMBER_HALFSIZE'),
              ],
            }"
            :data-vv-as="$t('card.security_code')"
            name="securitycode"
            max-length="4"
            min="0"
            input-type="password"
            :error="errors.first('securitycode')"
            :placeholder="`${$t('common.example')} 123`"
            @keypress="handleKeypressCode"
          />
        </div>
      </div>
      <div class="mt-40 pb-72">
        <BaseButton
          id="myPagePaymentEdit_submit"
          btn-class="test tracking"
          :label="$t('card.button')"
          btn-full="btn--full"
          icon-right
          :disabled="isDisabled"
          @click="nextStep"
        />
      </div>

      <transition name="fade">
        <CardPaymentInstrucModal
          v-if="modalPaymentInstruct"
          v-model="modalPaymentInstruct"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import * as regex from '~/constants/regex';
import { ErrorBag } from 'vee-validate';

import { mapGetters, mapMutations } from 'vuex';

import contract from '~/constants/contract';

import BaseButton from '~/components/formItems/BaseButton';
import BaseInput from '~/components/formItems/BaseInput';
import BaseLabel from '~/components/formItems/BaseLabel';
import BaseSelect from '~/components/formItems/BaseSelect';
import CardPaymentInstrucModal from '~/components/modals/CardPaymentInstrucModal';
import PageTitle from '../../../../../components/PageTitle.vue';

export default {
  components: {
    PageTitle,
    BaseButton,
    BaseInput,
    BaseLabel,
    BaseSelect,
    CardPaymentInstrucModal,
  },
  middleware: ['auth'],
  data() {
    return {
      modalPaymentInstruct: false,
      regex,
      dataForm: {
        cardno: '',
        expire_MM: 1,
        expire_YY: new Date().getFullYear(),
        securitycode: '',
      },
      masterData: {
        optionsMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        optionsYear: [],
      },
      listErrors: [],
      shopId: '',
      accessToken: this.$helpers.getAccessToken(),
      bag: null,
      creditCard: '',
      contractInfo: null,
    };
  },

  computed: {
    ...mapGetters({
      paymentInfo: 'payments/getPaymentInfo',
      listContractInfo: 'contracts/getListContractInfo',
      policyId: 'contracts/getPolicyId',
    }),
    policyNo() {
      return _.get(this.contractInfo?.policy, 'policyCode', '&mdash;');
    },
    gender() {
      switch (this.contractInfo?.policy.contractSubjectPetList[0]?.gender) {
        case contract.pet_sex.MALE:
          return this.$t('common.kun');
        case contract.pet_sex.FEMALE:
          return this.$t('common.chan');
        default:
          return '&mdash;';
      }
    },
    petName() {
      return _.get(
        this.contractInfo?.policy,
        'contractSubjectPetList[0].petName',
        '&mdash;'
      );
    },
    isDisabled() {
      return (
        Object.values(this.dataForm).some((v) => !v) ||
        Boolean(this.listErrors.length || this.bag.items.length)
      );
    },
  },

  watch: {
    'dataForm.expire_MM': function () {
      if (
        moment(
          `${this.dataForm.expire_YY}-${this.dataForm.expire_MM
            .toString()
            .padStart(2, '0')}`
        ).isAfter(moment())
      ) {
        this.bag.remove('expired_month');
        this.bag.remove('expired_year');
      } else {
        this.bag.add({
          field: 'expired_month',
          msg: `${this.$t('card.expire_date')}${this.$t(
            'messages.params_message.time_before_now'
          )}`,
        });
        this.bag.add({
          field: 'expired_year',
          msg: `${this.$t('card.expire_date')}${this.$t(
            'messages.params_message.time_before_now'
          )}`,
        });
      }
    },
    'dataForm.expire_YY': function () {
      if (
        moment(
          `${this.dataForm.expire_YY}-${this.dataForm.expire_MM
            .toString()
            .padStart(2, '0')}`
        ).isAfter(moment())
      ) {
        this.bag.remove('expired_month');
        this.bag.remove('expired_year');
      } else {
        this.bag.add({
          field: 'expired_month',
          msg: `${this.$t('card.expire_date')}${this.$t(
            'messages.params_message.time_before_now'
          )}`,
        });
        this.bag.add({
          field: 'expired_year',
          msg: `${this.$t('card.expire_date')}${this.$t(
            'messages.params_message.time_before_now'
          )}`,
        });
      }
    },
    errors: {
      handler: function () {
        this.listErrors = this.errors.items.reduce((arr, it) => {
          return [...arr, it.msg];
        }, []);
      },
      deep: true,
    },
  },

  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },

  created() {
    this.contractInfo = this.listContractInfo?.find(
      ({ policy }) => policy.policyId === this.policyId
    );
    let refresh = JSON.parse(localStorage.getItem('refresh'));
    if (refresh) {
      if (confirm(this.$t('claim.question_remove_text'))) {
        localStorage.removeItem('form_card');
      } else {
        this.dataForm = JSON.parse(localStorage.getItem('form_card'));
        localStorage.removeItem('form_card');
      }
    }

    this.bag = new ErrorBag();
    this.$helpers.setDataFromLocalToVuex();
    this.shopId = process.env.shopId;
    let currentYear = new Date().getFullYear();
    this.dataForm.expire_YY = currentYear;
    for (let i = 0; i < 11; i++) {
      this.masterData.optionsYear.push(currentYear + i);
    }

    this.creditCard = localStorage.getItem('credit_card');
    if (this.paymentInfo) {
      this.dataForm.cardno = this.paymentInfo.cardno;
      this.dataForm.expire_YY = this.paymentInfo.expire_YY;
      this.dataForm.expire_MM = this.paymentInfo.expire_MM;
      this.dataForm.securitycode = this.paymentInfo.securitycode;
    }
  },

  methods: {
    ...mapMutations({
      setCreditCardData: 'payments/setCreditCardData',
    }),

    preventNav() {
      this.$helpers.setDataFromVuexToLocal('refresh');
      localStorage.setItem('form_card', JSON.stringify(this.dataForm));
    },

    nextStep() {
      this.$validator.validate().then((result) => {
        if (
          moment(
            `${this.dataForm.expire_YY}-${this.dataForm.expire_MM
              .toString()
              .padStart(2, '0')}`
          ).isBefore(moment())
        ) {
          this.bag.add({
            field: 'expired_month',
            msg: `${this.$t('card.expire_date')}${this.$t(
              'messages.params_message.time_before_now'
            )}`,
          });

          this.bag.add({
            field: 'expired_year',
            msg: `${this.$t('card.expire_date')}${this.$t(
              'messages.params_message.time_before_now'
            )}`,
          });

          return;
        }

        if (!result) {
          return;
        }

        const creditCardData = {
          cardno: this.dataForm.cardno,
          expire: moment(
            `${this.dataForm.expire_YY}${this.dataForm.expire_MM}`,
            'YYYYMM'
          ).format('YYYYMM'),
          securitycode: this.dataForm.securitycode,
          tokennumber: '',
        };

        this.setCreditCardData(creditCardData);

        Multipayment.init(this.shopId);
        Multipayment.getToken(creditCardData, (response) => {
          if (response.resultCode != '000') {
            // show error message
            console.log('fail');
          } else {
            localStorage.removeItem('reload');
            let tokenGMO = response.tokenObject.token;
            let dataPayment = {
              ...this.dataForm,
              token: tokenGMO,
            };
            this.$store.commit('payments/setPaymentInfo', dataPayment);
            this.$router.push('/mypage/contracts/payment/edit/confirm/');
          }
        });
      });
    },

    handleKeypressCode(e) {
      if (e.target.value.length > 3) {
        this.dataForm.securitycode = this.dataForm.securitycode.slice(0, 3);
      }
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
          .replace(/(.{4})/g, '$1 ')
          .trim() +
        ' ' +
        value.substring(value.length - 4)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';

.page-content {
  font-family: $font-family-primary;
}

::v-deep .label-bottom-15 label {
  margin-bottom: 15px;
}

.month-separator {
  width: 45px;
  text-align: center;
  font-size: 18px;
  color: rgba($black, 0.82);
}

.month-year-input {
  .base-select {
    width: calc(50% - 22.5px);
  }
}
</style>
