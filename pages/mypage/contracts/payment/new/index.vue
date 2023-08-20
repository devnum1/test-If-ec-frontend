// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle :title="$t('card.page_title_payment')" />
    <div class="container">
      <div class="form-group m-21">
        <div class="checked-notification">
          <div class="checked__text" v-html="$t('card.noti_account_1')" />
          <div class="checked__notice" v-html="$t('card.noti_credit')" />
        </div>
      </div>
    </div>

    <div class="form-group stretch-section darker-grey-bg w-100">
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
          id="creditCardNumber payment_cardNo"
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
          class="tracking"
        />
      </div>
      <div class="form-group mb-15">
        <BaseLabel :label-title="$t('card.expire_date')" required />
      </div>
      <div class="form-group mb-41 d-flex month-year-input align-items-center">
        <BaseSelect
          id="payment_cardExpireMonth"
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
              :id="'solicitationContract_paymentNew_month_' + props.option"
              class="tracking"
              >{{ props.option }}</span
            >
          </template>
        </BaseSelect>
        <span class="month-separator">/</span>
        <BaseSelect
          id="payment_cardExpireYear"
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
              :id="'solicitationContract_paymentNew_year_' + props.option"
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
            id="payment_cardSecurityCode"
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
            class="tracking"
            @keypress="handleKeypressCode"
          />
        </div>
      </div>
      <div class="page-button">
        <BaseButton
          id="solicitationContractsPayment_nextStep"
          btn-class="test tracking"
          :label="$t('common.button.to_confirm_screen')"
          btn-full="btn--full"
          icon-right
          :disabled="listErrors.length > 0 || bag.items.length > 0"
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

import BaseButton from '~/components/formItems/BaseButton';
import BaseInput from '~/components/formItems/BaseInput';
import BaseLabel from '~/components/formItems/BaseLabel';
import BaseSelect from '~/components/formItems/BaseSelect';
import CardPaymentInstrucModal from '~/components/modals/CardPaymentInstrucModal';

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseLabel,
    BaseSelect,
    CardPaymentInstrucModal,
  },
  beforeRouteEnter(to, from, next) {
    localStorage.removeItem('reload');
    localStorage.removeItem('cardPaymentInfo_refresh');

    let refresh = JSON.parse(localStorage.getItem('refresh'));
    let fromRouteCanAccess = [
      'mypage-contracts',
      'mypage-contracts-payment-new-confirm',
    ];
    if (!fromRouteCanAccess.includes(from.name) && !refresh) {
      return next((vm) => {
        vm.$router.push('/mypage/contracts/');
      });
    }

    next();
  },

  beforeRouteLeave(to, from, next) {
    let routeLeave = ['mypage-contracts'];
    if (routeLeave.includes(to.name)) {
      return next(false);
    }

    next();
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
    };
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
    for (let i = 0; i < 10; i++) {
      this.masterData.optionsYear.push(currentYear + i);
    }
  },

  methods: {
    preventNav() {
      this.$helpers.setDataFromVuexToLocal(
        'petInfo',
        'productCd',
        'customerInfo',
        'contractId',
        'refresh'
      );
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

        Multipayment.init(this.shopId);
        Multipayment.getToken(
          {
            cardno: this.dataForm.cardno, //data card
            expire: moment(
              `${this.dataForm.expire_YY}${this.dataForm.expire_MM}`,
              'YYYYMM'
            ).format('YYYYMM'),
            securitycode: this.dataForm.securitycode,
            tokennumber: '',
          },
          (response) => {
            if (response.resultCode != '000') {
              // show error message
              console.log('fail');
            } else {
              let tokenGMO = response.tokenObject.token;
              let dataPayment = {
                ...this.dataForm,
                token: tokenGMO,
              };
              this.$store.commit('payments/setPaymentInfo', dataPayment);
              this.$router.push('/mypage/contracts/payment/new/confirm/');
            }
          }
        );
      });
    },

    handleKeypressCode(e) {
      if (e.target.value.length > 3) {
        this.dataForm.securitycode = this.dataForm.securitycode.slice(0, 3);
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
