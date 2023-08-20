// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle :title="$t('note.enter_owner_info')" />
    <div class="container pb-72">
      <StepProgress
        :step-list="constContract.step_progress"
        class="mb-41"
        current="4"
      />
      <BaseNotice
        v-if="listErrors.length > 0"
        :list-error="listErrors"
        class="mb-41"
        :title="$t('error.input_has_error')"
      />

      <div class="mb-57">
        <BaseLabel :label-title="$t('terms.confirm_email')" class="mb-24" />
        <p ref="refEmail" class="text-email" v-html="txtEmail" />
      </div>
      <div class="rules-title mt-40 mb-24">
        {{ $t('terms.confirm_info_contract') }}
      </div>

      <div class="form-group mb-41">
        <BaseLabel
          :label-title="$t('common.name.name')"
          class="mb-15"
          required
        />
        <div class="row-sp">
          <div class="col-sp-6">
            <BaseInput
              id="solicitationStep4_lastName1"
              v-model="dataForm.lastName1"
              v-validate="{
                required: true,
                max: 25,
                regex: [
                  regex.KANJI_KANA_HIRA_MIX,
                  $t('messages.params_message.regex_KANJI_KANA_HIRA_FULLSIZE'),
                ],
              }"
              :data-vv-as="$t('contract_step3.name_required_last_name')"
              name="lastName1"
              :error="errors.first('lastName1')"
              placeholder="山田"
              autocomplete="family-name"
              class="tracking"
            />
          </div>
          <div class="col-sp-6">
            <BaseInput
              id="solicitationStep4_firstName1"
              v-model="dataForm.firstName1"
              v-validate="{
                required: true,
                max: 25,
                regex: [
                  regex.KANJI_KANA_HIRA_MIX,
                  $t('messages.params_message.regex_KANJI_KANA_HIRA_FULLSIZE'),
                ],
              }"
              :data-vv-as="$t('contract_step3.name_required_first_name')"
              name="firstName1"
              :error="errors.first('firstName1')"
              placeholder="花子"
              autocomplete="given-name"
              class="tracking"
            />
          </div>
        </div>
      </div>
      <div class="form-group mb-41">
        <BaseLabel
          :label-title="$t('common.name.name_kana')"
          class="mb-15"
          required
        />
        <div class="row-sp">
          <div class="col-sp-6">
            <BaseInput
              id="solicitationStep4_lastName2"
              v-model="dataForm.lastName2"
              v-validate="{
                required: true,
                max: 25,
                regex: [
                  regex.KANA_FULLSIZE,
                  $t('messages.params_message.regex_KANA_FULLSIZE'),
                ],
              }"
              :data-vv-as="$t('contract_step3.name_required_last_name_kana')"
              name="lastName2"
              :error="errors.first('lastName2')"
              placeholder="ヤマダ"
              autocomplete="family-name"
              class="tracking"
            />
          </div>
          <div class="col-sp-6">
            <BaseInput
              id="solicitationStep4_firstName2"
              v-model="dataForm.firstName2"
              v-validate="{
                required: true,
                max: 25,
                regex: [
                  regex.KANA_FULLSIZE,
                  $t('messages.params_message.regex_KANA_FULLSIZE'),
                ],
              }"
              :data-vv-as="$t('contract_step3.name_required_first_name_kana')"
              name="firstName2"
              :error="errors.first('firstName2')"
              placeholder="ハナコ"
              autocomplete="given-name"
              class="tracking"
            />
          </div>
        </div>
      </div>
      <div class="form-group mb-41 double-button">
        <BaseLabel
          :label-title="$t('common.gender.gender_title')"
          class="mb-15"
          required
        />
        <BaseInputRadioContainer
          :data-vv-as="$t('common.gender.gender_title')"
          :error="errors.first('gender')"
        >
          <div class="row-sp">
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep4_gender_male"
                v-model="dataForm.gender"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('common.gender.gender_title')"
                :value-input="constContract.gender.MALE.id"
                :checked="dataForm.gender === constContract.gender.MALE.id"
                :label="$t('common.gender.male')"
                radio-text
                name="gender"
                class="tracking"
              />
            </div>
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep4_gender_female"
                v-model="dataForm.gender"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('common.gender.gender_title')"
                :value-input="constContract.gender.FEMALE.id"
                :checked="dataForm.gender === constContract.gender.FEMALE.id"
                :label="$t('common.gender.female')"
                radio-text
                name="gender"
                class="tracking"
              />
            </div>
          </div>
        </BaseInputRadioContainer>
      </div>
      <div class="form-group mb-41">
        <div class="d-flex justify-content-between">
          <BaseLabel :label-title="$t('common.dob.birthday')" required />
          <BaseLabelTooltip
            id="solicitationStep4_birthdayDateNotice"
            :label-content="$t('note.not_available_u18')"
            icon-warning
            class="tracking"
          />
        </div>
        <div>
          <BaseDatePicker
            :key="reRenderValue"
            v-model="dataForm.birthDate"
            v-validate="'required|date_format:YYYY/MM/DD'"
            :value-input="dataForm.birthDate"
            :error="errors.first('birthDate')"
            :data-vv-as="$t('contract_step3.name_required_birthday')"
            name="birthDate"
            :min-date="`${new Date().getFullYear() - 150}-01-01`"
            :max-date="maxBirthDate"
            default-date="2000/01/01"
          />
        </div>
        <div
          class="txt-red font-14px mt-2 font-weight-500"
          v-html="txtRequiredCheckAge"
        />
      </div>
      <div class="form-group mb-41">
        <BaseLabel
          :label-title="$t('common.postal_code')"
          class="mb-15"
          required
        />
        <BaseInput
          id="solicitationStep4_postCode"
          v-model="dataForm.postCode"
          v-validate="{
            required: true,
            regex_postCode: [7],
          }"
          :data-vv-as="$t('common.postal_code')"
          name="postCode"
          max-length="7"
          :error="errors.first('postCode')"
          placeholder="1510051"
          class="base-input--not-full tracking"
          autocomplete="postal-code"
        />
      </div>
      <!-- 都道府県 -->
      <div class="form-group mb-41">
        <BaseLabel
          :label-title="$t('common.dob.prefectureCode')"
          class="mb-15"
          required
        />
        <BaseInput
          id="solicitationStep4_prefectureCode"
          v-model="dataForm.prefectureCode"
          v-validate="{
            required: true,
            // 全角文字
            regex: [
              regex.KANJI_KANA_HIRA_MIX,
              $t('messages.params_message.regex_KANJI_KANA_HIRA_MIX'),
            ],
          }"
          :data-vv-as="$t('common.dob.prefectureCode')"
          name="prefectureCode"
          :error="errors.first('prefectureCode')"
          max-length="25"
          min="0"
          :placeholder="`東京都`"
          class="tracking"
        />
      </div>
      <!-- 市区町村 -->
      <div class="form-group mb-41">
        <BaseLabel
          :label-title="$t('common.dob.address1')"
          class="mb-15"
          required
        />
        <BaseInput
          id="solicitationStep4_address1"
          v-model="dataForm.address1"
          v-validate="{
            required: true,
            // 全角文字(漢字、ひらがな、カタカナ、英数字)
            regex: [
              regex.KANJI_KANA_HIRA_MIX,
              $t('messages.params_message.regex_KANJI_KANA_HIRA_MIX'),
            ],
          }"
          :data-vv-as="$t('common.dob.address1')"
          name="address1"
          :error="errors.first('address1')"
          max-length="25"
          min="0"
          :placeholder="`品川区東五反田`"
          class="tracking"
        />
      </div>
      <!-- 番地 -->
      <div class="form-group mb-41">
        <BaseLabel
          :label-title="$t('common.dob.address2')"
          class="mb-15"
          required
        />
        <BaseInput
          id="solicitationStep4_address2"
          v-model="dataForm.address2"
          v-validate="{
            required: true,
            // 半角数値記号
            regex: [
              regex.NUMBER_SYMBOLS_HALFSIZE,
              $t('messages.params_message.regex_NUMBER_SYMBOLS_HALFSIZE'),
            ],
          }"
          :data-vv-as="$t('common.dob.address2')"
          name="address2"
          :error="errors.first('address2')"
          max-length="25"
          min="0"
          :placeholder="`5-22-33`"
          class="tracking"
        />
      </div>
      <!-- 部屋番号 -->
      <div class="form-group mb-41">
        <BaseLabel :label-title="$t('common.dob.address3')" class="mb-15" />
        <BaseInput
          id="solicitationStep4_address3"
          v-model="dataForm.address3"
          v-validate="{
            required: false,
            // 半角数値記号英文字
            regex: [
              regex.HALF_SIZE,
              $t('messages.params_message.regex_HALFSIZE'),
            ],
          }"
          :data-vv-as="$t('common.dob.address3')"
          name="address3"
          :error="errors.first('address3')"
          max-length="25"
          min="0"
          :placeholder="`201`"
          class="tracking"
        />
      </div>
      <div class="form-group mb-41">
        <BaseLabel :label-title="$t('common.phone')" class="mb-15" required />
        <BaseInput
          id="solicitationStep4_telephone"
          v-model="dataForm.telephone"
          v-validate="{
            required: true,
            regex_telephone: [10, 11],
          }"
          :data-vv-as="$t('common.phone')"
          name="telephone"
          :error="errors.first('telephone')"
          max-length="11"
          min="0"
          input-type="tel"
          :placeholder="`${$t('common.example')}09011112222`"
          autocomplete="tel"
          class="tracking"
        />
        <BaseLabel :label-help="$t('step4.label_help_telephone')" />
      </div>

      <div class="page-button page-button--step3 mt-56 mb-28">
        <BaseButton
          id="solicitationStep4_nextStep"
          btn-class="test tracking"
          :label="$t('common.button.next')"
          btn-full="btn--full"
          icon-right
          :disabled="errors.items.length > 0 || txtRequiredCheckAge !== ''"
          @click="nextStep"
        />
      </div>
    </div>
  </div>
</template>

<script>
import contract from '~/constants/contract';
import * as regex from '~/constants/regex';
import { mapState, mapMutations, mapGetters } from 'vuex';
import moment from 'moment';
import BaseInputRadioContainer from '~/components/formItems/BaseInputRadioContainer';
import BaseLabel from '~/components/formItems/BaseLabel';
import BaseInput from '~/components/formItems/BaseInput';
import BaseInputRadio from '~/components/formItems/BaseInputRadio';
import BaseLabelTooltip from '~/components/formItems/BaseLabelTooltip';
import BaseDatePicker from '~/components/formItems/BaseDatePicker';
import BaseButton from '~/components/formItems/BaseButton';
import BaseNotice from '~/components/formItems/BaseNotice';

export default {
  components: {
    BaseInputRadioContainer,
    BaseLabel,
    BaseInput,
    BaseInputRadio,
    BaseLabelTooltip,
    BaseDatePicker,
    BaseButton,
    BaseNotice,
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'login') {
      return next(false);
    }
    document.querySelector('html').style.overflow = 'unset';
    document.body.style.overflow = 'unset';
    document.querySelector('html').scrollTop = document.body.clientHeight;
    next();
  },
  middleware: ['auth'],
  async asyncData(context) {
    if (context.from.name == 'login') {
      localStorage.setItem('send_from_mail', true);
    }
    const dataCustomerInfo = await context.store.dispatch(
      'contracts/customerInfo'
    );
    const isCustomerInfoRegistered = dataCustomerInfo.version > 1;
    // バージョンが2以上である = 既存ユーザーなので、ユーザー情報入力の必要はないので確認画面に遷移させる
    if (isCustomerInfoRegistered) {
      context.store.commit('contracts/setContractDuplicate', true);
      context.redirect('/solicitation/step4/confirm/');
    }
  },
  data() {
    return {
      customerInfoVersion: 1,
      constContract: contract,
      regex,
      dataForm: {
        lastName1: '',
        firstName1: '',
        lastName2: '',
        firstName2: '',
        gender: '',
        birthDate: '',
        postCode: '',
        prefectureCode: '',
        address1: '',
        address2: '',
        address3: '',
        telephone: '',
      },
      listErrors: [],
      txtEmail: '',
      txtRequiredCheckAge: '',
      reRenderValue: 0,
    };
  },
  computed: {
    ...mapState({
      customerInfo: (state) => state.contracts.customerInfo,
      petInfo: (state) => state.contracts.petInfo,
      repProductCd: (state) => state.contracts.repProductCd,
    }),
    maxBirthDate() {
      return moment().format('YYYY-MM-DD');
    },
    ...mapGetters({
      getAuthUserAttributes: 'auth/getAuthUserAttributes',
    }),
  },
  watch: {
    'dataForm.lastName1': function (e) {
      this.dataForm.lastName1 = e.trim();
    },
    'dataForm.firstName1': function (e) {
      this.dataForm.firstName1 = e.trim();
    },
    'dataForm.lastName2': function (e) {
      this.dataForm.lastName2 = e.trim();
    },
    'dataForm.firstName2': function (e) {
      this.dataForm.firstName2 = e.trim();
    },
    'dataForm.birthDate': function (e) {
      const birthDate = moment(this.dataForm.birthDate, 'YYYY/MM/DD');
      let afterMinYears = moment(moment().subtract(18, 'years')).isBefore(
        birthDate
      );
      let BeforeMaxYears = moment(moment().subtract(150, 'years')).isAfter(
        birthDate
      );
      if (afterMinYears || BeforeMaxYears) {
        this.txtRequiredCheckAge = this.$t('messages.check_age_customer');
      } else {
        this.txtRequiredCheckAge = '';
      }
    },
  },
  async created() {
    this.txtEmail = this.getAuthUserAttributes.email;
    this.$helpers.setDataFromLocalToVuex();
    document.querySelector('html').style.overflowY = 'scroll';
    document.body.style.overflowY = 'scroll';
    document.querySelector('html').scrollTop = 0;
  },
  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },
  async mounted() {
    if (this.customerInfo) {
      this.dataForm = {
        ...this.customerInfo,
        postCode: this.customerInfo.postCode.split('-').join(''),
      };
    }
    this.reRenderValue++;
    if (this.$refs.refEmail.clientHeight > 40) {
      let txtEmailNew = this.txtEmail.split('@').join('<br>@');
      this.txtEmail = txtEmailNew;
    }
  },
  methods: {
    ...mapMutations({
      setCustomerInfo: 'contracts/setCustomerInfo',
      setPetInfo: 'contracts/setPetInfo',
      setRepProductCd: 'contracts/setRepProductCd',
    }),
    preventNav() {
      this.$helpers.setDataFromVuexToLocal(
        'petInfo',
        'productCd',
        'customerInfo'
      );
      localStorage.setItem('customer_refresh', JSON.stringify(this.dataForm));
    },

    nextStep() {
      this.$validator.validate().then(async (result) => {
        if (!result || !_.isEmpty(this.txtRequiredCheckAge)) {
          let nameFiled = this.errors.items.reduce((arr, it) => {
            return [...arr, it.msg];
          }, []);
          this.listErrors = _.sortedUniq(nameFiled);
          return true;
        }
        const dataCustomer = {
          email: this.getAuthUserAttributes.email,
          ...this.dataForm,
          version: this.customerInfoVersion,
          postCode: this.dataForm.postCode.replace(
            /^([^-]{3})([^-]{4,})/,
            '$1-$2'
          ),
        };
        this.setCustomerInfo(dataCustomer);
        if (this.$route.hash == '#edit') {
          this.$router.push('/solicitation/confirm/');
        } else {
          this.$router.push('/solicitation/step4/confirm/');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
.double-button {
  .col-sp {
    width: 50%;
    ::v-deep {
      label {
        width: 100%;
      }
    }
  }
}
</style>
