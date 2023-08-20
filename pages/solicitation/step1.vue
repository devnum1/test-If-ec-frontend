// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle :title="$t('contract_step1.page_title')" />
    <div class="container">
      <StepProgress :step-list="stepProgress" current="1" class="mb-48" />
      <BaseNotice
        v-if="listError.length > 0"
        :list-error="listError"
        class="mb-41"
        title="入力情報に不備がありました"
      />
      <BaseLabel :label-title="$t('common.insStartDate.title')" class="mb-15" />
      <div class="form-group mb-41">
        <BaseInputRadioContainer>
          <div class="row-sp pet-type-container">
            <div class="col-sp col-sp--flex">
              <BaseInputRadio
                id="solicitationStep1_minInsStartDateRadio"
                v-model="isSelectMinInsStartDateFrag"
                v-validate="{ required: [true, 'radio'] }"
                :value-input="1"
                radio-text
                :label="$t('common.minInsStartDateRadio.min')"
                :second-label="'(' + minInsStartDate + ')'"
                second-line
                name="minInsStartDateRadio"
                :checked="isSelectMinInsStartDateFrag === 1"
                class="tracking"
                @click="setMinInsStartDate"
              />
            </div>
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep1_selectInsStartDateRadio"
                v-model="isSelectMinInsStartDateFrag"
                v-validate="{ required: [true, 'radio'] }"
                :value-input="0"
                radio-text
                :label="$t('common.minInsStartDateRadio.userSelect')"
                second-line
                name="minInsStartDateRadio"
                :checked="isSelectMinInsStartDateFrag === 0"
                class="tracking"
              />
            </div>
          </div>
        </BaseInputRadioContainer>
        <div v-if="!isSelectMinInsStartDateFrag" class="form-group mb-41 mt-8">
          <BaseDatePicker
            v-model="dataForm.insStartDate"
            :value-input="dataForm.insStartDate"
            :min-date="minInsStartDate"
            :max-date="maxInsStartDate"
            name="insStartDate"
          />
        </div>
        <div
          class="txt-red font-14px mt-2 font-weight-500"
          v-html="txtRequiredInsStartDateRange"
        />
        <BaseLabel :label-help="$t('contract_step1.label_help_insStartDate')" />
      </div>
      <div class="form-group mb-24">
        <BaseLabel
          :label-title="$t('contract_step1.label_title_pet_name')"
          required
        />
        <BaseInput
          id="solicitationStep1_petName"
          v-model="dataForm.petName"
          v-validate="{
            required: true,
            max: 25,
            regex: [
              regex.KANJI_KANA_HIRA_MIX_FOR_PETNAME,
              $t('messages.params_message.regex_KANJI_KANA_HIRA_MIX'),
            ],
          }"
          class="tracking"
          :data-vv-as="$t('contract_step1.name_required_pet_name')"
          name="petName"
          :error="errors.first('petName')"
          :placeholder="$t('contract_step1.placeholder_input_pet_name')"
        />
        <p class="font-14px txt-red mt-2">
          {{ $t('note.multiple_head') }}
        </p>
      </div>
      <div class="prevent-measure">
        <div class="prevent-measure__title d-flex">
          <BaseLabelTooltip icon-warning />
          <span class="ml-1">{{ $t('note.multiple_breeding') }}</span>
        </div>
        <div
          class="prevent-measure__content"
          v-html="$t('note.multiple_breeding_caution')"
        />
      </div>
      <div class="form-group mb-41">
        <div class="custom-tooltip-right">
          <BaseLabel
            :label-title="$t('common.pet.pet_type')"
            class="mb-15"
            required
          />
          <BaseLabelTooltip
            id="solicitationStep1_petNotice"
            :label-title="$t('contract_step1.title_tooltip_pet_diagnosis')"
            :label-content="$t('contract_step1.content_tooltip_pet_diagnosis')"
            class="tracking"
          />
        </div>
        <BaseInputRadioContainer
          :data-vv-as="$t('common.pet.pet_type')"
          :error="errors.first('petType')"
        >
          <div class="row-sp pet-type-container">
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep1_typeDog"
                v-model="dataForm.petType"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('common.pet.pet_type')"
                :value-input="constContract.pet_type.DOG"
                :label="$t('common.pet.dog')"
                name="petType"
                radio-icon-dog
                :checked="dataForm.petType === constContract.pet_type.DOG"
                class="tracking"
                @click="handleRadioPetType"
              />
            </div>
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep1_typeCat"
                v-model="dataForm.petType"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('common.pet.pet_type')"
                :value-input="constContract.pet_type.CAT"
                :label="$t('common.pet.cat')"
                name="petType"
                radio-icon-cat
                :checked="dataForm.petType === constContract.pet_type.CAT"
                class="tracking"
                @click="handleRadioPetType"
              />
            </div>
          </div>
        </BaseInputRadioContainer>
      </div>
      <div
        v-if="dataForm.petType === constContract.pet_type.DOG"
        class="form-group mb-41"
      >
        <div class="custom-tooltip-right">
          <BaseLabel
            :label-title="$t('common.dog_breed.title')"
            class="mb-15"
            required
          />
          <BaseLabelTooltip
            id="solicitationStep1_breedInfo"
            :label-title="$t('contract_step1.title_tooltip_pet_diagnosis')"
            :label-content="$t('contract_step1.content_tooltip_pet_diagnosis')"
            class="tracking"
          />
        </div>
        <BaseSelect
          v-model="dataForm.petBreed"
          v-validate="{ required: [true, 'radio'] }"
          :data-vv-as="$t('common.dog_breed.title')"
          name="petBreed"
          :error="errors.first('petBreed')"
          :placeholder="$t('contract_step1.placeholder_input_pet_breed')"
          :options="getDogBreed"
          class="list-overlay-hide"
          pet-breed
          :is-search="false"
          @change="handleChangeSelectBreed"
        >
          <template slot="option" slot-scope="props">
            <span
              :id="'solicitationStep1_petBreed_' + props.option.listId"
              class="tracking"
            >
              {{ props.option.typeName }}
            </span>
          </template>
        </BaseSelect>
      </div>

      <div
        v-if="
          (dataForm.petBreed === constContract.pet_breed.MIX ||
            dataForm.petBreed === constContract.pet_breed.OTHER_BREED) &&
          dataForm.petType === constContract.pet_type.DOG
        "
        class="form-group mb-41"
      >
        <div class="custom-tooltip-right">
          <BaseLabel
            :label-title="$t('common.weight')"
            class="mb-15"
            required
          />
          <BaseLabelTooltip
            id="solicitationStep1_petWeightTooltip"
            :label-title="$t('contract_step1.title_tooltip_pet_diagnosis')"
            :label-content="$t('contract_step1.content_tooltip_pet_diagnosis')"
            class="tracking"
          />
        </div>

        <div class="pet-weight">
          <BaseInput
            id="solicitationStep1_petWeight"
            v-model="dataForm.petWeight"
            v-validate="{
              required: true,
              regex: [
                regex.NUMBER_HALFSIZE,
                $t('messages.params_message.regex_NUMBER_HALFSIZE'),
              ],
              min_value: [0.1, '0.1kg'],
              max_value: [200, '200.0kg'],
            }"
            class="tracking"
            :data-vv-as="$t('common.weight')"
            name="petWeight"
            :error="errors.first('petWeight')"
            placeholder="10.3"
            autocomplete="off"
            @keyup="handleKeyupPetWeight"
            @blur="handleBlurPetWeight"
          />
          <span class="kg">kg</span>
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
          :error="errors.first('petSexCd')"
        >
          <div class="row-sp">
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep1_genderMale"
                v-model="dataForm.petSexCd"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('common.gender.gender_title')"
                :value-input="constContract.pet_sex.MALE"
                :label="$t('common.gender.boy')"
                radio-text
                name="petSexCd"
                :checked="dataForm.petSexCd === constContract.pet_sex.MALE"
                class="tracking"
              />
            </div>
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep1_genderFemale"
                v-model="dataForm.petSexCd"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('common.gender.gender_title')"
                :value-input="constContract.pet_sex.FEMALE"
                :label="$t('common.gender.girl')"
                radio-text
                name="petSexCd"
                :checked="dataForm.petSexCd === constContract.pet_sex.FEMALE"
                class="tracking"
              />
            </div>
          </div>
        </BaseInputRadioContainer>
      </div>

      <div class="form-group mb-41 double-button">
        <BaseLabel
          :label-title="$t('common.contraception_status.title')"
          class="mb-15"
          required
        />
        <BaseInputRadioContainer
          :data-vv-as="$t('common.contraception_status.title')"
          :error="errors.first('noticeCd01')"
        >
          <div class="row-sp">
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep1_contraception"
                v-model="dataForm.noticeCd01"
                v-validate="{ required: [true, 'radio'] }"
                class="tracking"
                :data-vv-as="$t('common.contraception_status.title')"
                :value-input="constContract.pet_notice_contraception.YES"
                :label="$t('common.contraception_status.yep')"
                radio-text
                name="noticeCd01"
                :checked="
                  dataForm.noticeCd01 ===
                  constContract.pet_notice_contraception.YES
                "
              />
            </div>
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep1_noContraception"
                v-model="dataForm.noticeCd01"
                v-validate="{ required: [true, 'radio'] }"
                class="tracking"
                :data-vv-as="$t('common.contraception_status.title')"
                :value-input="constContract.pet_notice_contraception.NONE"
                :label="$t('common.contraception_status.none')"
                radio-text
                name="noticeCd01"
                :checked="
                  dataForm.noticeCd01 ===
                  constContract.pet_notice_contraception.NONE
                "
              />
            </div>
          </div>
        </BaseInputRadioContainer>
      </div>
      <div class="form-group mb-1 pb-2 double-button">
        <div class="custom-tooltip-right">
          <BaseLabel
            :label-title="$t('common.dob.title')"
            class="mb-15"
            required
          />
          <BaseLabelTooltip
            id="solicitationStep1_birthdayHelpTooltip"
            :label-title="$t('contract_step1.title_tooltip_pet_diagnosis')"
            :label-content="$t('contract_step1.content_tooltip_pet_diagnosis')"
            class="tracking"
          />
        </div>
        <BaseInputRadioContainer
          :data-vv-as="$t('common.dob.title')"
          :error="errors.first('petBirthdayDiv')"
        >
          <div class="row-sp">
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep1_birthdayConfirm"
                v-model="dataForm.petBirthdayDiv"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('common.dob.field_error_msg')"
                :value-input="constContract.pet_birthday.TRUE.id"
                name="petBirthdayDiv"
                :label="$t('common.dob.confirm')"
                radio-text
                :checked="
                  dataForm.petBirthdayDiv === constContract.pet_birthday.TRUE.id
                "
                class="tracking"
              />
            </div>
            <div class="col-sp">
              <BaseInputRadio
                id="solicitationStep1_birthdayEstimated"
                v-model="dataForm.petBirthdayDiv"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('common.dob.field_error_msg')"
                :value-input="constContract.pet_birthday.MEASURE.id"
                name="petBirthdayDiv"
                :label="$t('common.dob.estimated')"
                radio-text
                :checked="
                  dataForm.petBirthdayDiv ===
                  constContract.pet_birthday.MEASURE.id
                "
                class="tracking"
              />
            </div>
          </div>
        </BaseInputRadioContainer>
      </div>
      <div class="form-group mb-41">
        <!-- BaseDatePickerのComponentがmountedされてからDatePickerを介さずに値を変更すると
          DatePickerに値が反映されないためv-ifでレンダリングのタイミングを制御 -->
        <BaseDatePicker
          :key="reRenderValue"
          v-model="dataForm.petBirthday"
          v-validate="{ required: [true, 'date-time-picker'] }"
          :value-input="dataForm.petBirthday"
          :error="errors.first('petBirthday')"
          :data-vv-as="$t('common.dob.field_error_msg')"
          name="petBirthday"
          date-format="YYYY/MM"
          :min-date="`${new Date().getFullYear() - 10}-01-01`"
          class="tracking"
        />
        <div
          class="txt-red font-14px mt-2 font-weight-500"
          v-html="txtRequiredCheckAge"
        />
        <BaseLabel :label-help="$t('contract_step1.label_help_birthday')" />
      </div>

      <div class="form-group m-0">
        <BaseLabel
          label-class="base-label--custom"
          :label-title="$t('contract_step1.label_title_pet_diagnosis')"
          required
        />
        <div class="d-flex justify-content-end">
          <BaseLabelTooltip
            id="solicitationStep1_medicalHistoryHelpTooltip"
            :label-title="$t('contract_step1.title_tooltip_pet_diagnosis')"
            :label-content="$t('contract_step1.content_tooltip_pet_diagnosis')"
            class="tracking"
          />
        </div>
      </div>
      <div class="form-group form-disease">
        <div class="step1-diseaseNotice">
          <div class="step1-diseaseNotice__box">
            <ul>
              <li class="step1-diseaseNotice__list">
                <span class="step1-diseaseNotice__number">01</span>
                <div class="step1-diseaseNotice__desc">
                  <span class="step1-diseaseNotice__descContent">{{
                    $t('illness.notice_disease_01')
                  }}</span>
                  <span
                    class="step1-diseaseNotice__descContent step1-diseaseNotice__descContent--warning txt-red"
                  >
                    {{ $t('illness.notice_disease_01_waring') }}
                  </span>
                </div>
              </li>

              <li class="step1-diseaseNotice__list">
                <span class="step1-diseaseNotice__number">02</span>
                <div class="step1-diseaseNotice__desc">
                  <span class="step1-diseaseNotice__descContent">{{
                    $t('illness.notice_disease_02')
                  }}</span>
                  <span
                    class="step1-diseaseNotice__descContent step1-diseaseNotice__descContent--warning txt-red"
                  >
                    {{ $t('illness.notice_disease_02_waring_01') }}
                  </span>
                  <span
                    class="step1-diseaseNotice__descContent step1-diseaseNotice__descContent--warning txt-red"
                  >
                    {{ $t('illness.notice_disease_02_waring_02') }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <BaseInputRadioContainer
          :data-vv-as="$t('contract_step1.name_required_pet_diagnosis')"
          :error="errors.first('noticeCd02')"
        >
          <div class="row-sp anwser-disease">
            <div class="col-sp mt-2 anwser-disease-list">
              <BaseInputRadio
                id="solicitationStep1_hasDisease"
                v-model="dataForm.noticeCd02"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('contract_step1.name_required_pet_diagnosis')"
                :value-input="constContract.pet_notice_illness.YES"
                :label="$t('common.yes')"
                radio-text
                name="noticeCd02"
                :checked="
                  dataForm.noticeCd02 === constContract.pet_notice_illness.YES
                "
                class="tracking"
              />
            </div>
            <div class="col-sp mt-2 anwser-disease-list">
              <BaseInputRadio
                id="solicitationStep1_noDisease"
                v-model="dataForm.noticeCd02"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('contract_step1.name_required_pet_diagnosis')"
                :value-input="constContract.pet_notice_illness.NONE"
                :label="$t('common.no')"
                radio-text
                name="noticeCd02"
                :checked="
                  dataForm.noticeCd02 === constContract.pet_notice_illness.NONE
                "
                class="tracking"
              />
            </div>
          </div>
        </BaseInputRadioContainer>
      </div>

      <div class="prevent-measure">
        <div class="prevent-measure__title d-flex">
          <BaseLabelTooltip icon-warning />
          <span class="ml-1">{{ $t('note.warning_note') }}</span>
        </div>
        <div
          class="prevent-measure__content"
          v-html="$t('note.prevent_measure')"
        />
      </div>

      <div class="form-group custom-position">
        <BaseLabel
          label-class="base-label--custom"
          :label-title="$t('contract_step1.label_title_join_insurance')"
          required
          class="custom-position__required"
        />
        <BaseLabelTooltip
          id="solicitationStep1_insurranceNotice"
          :label-title="$t('contract_step1.title_tooltip_pet_diagnosis')"
          :label-content="$t('contract_step1.content_tooltip_pet_diagnosis')"
          class="custom-position__tooltip tracking"
        />
      </div>

      <div class="form-group mb-41">
        <BaseInputRadioContainer
          :data-vv-as="$t('contract_step1.name_required_join_insurance')"
          :error="errors.first('petInsJoinFlg')"
        >
          <div class="row-sp">
            <div class="col-sp-6">
              <BaseInputRadio
                id="solicitationStep1_insJoinFalse"
                v-model="dataForm.petInsJoinFlg"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('contract_step1.name_required_join_insurance')"
                :value-input="constContract.pet_other_insurance.NONE"
                class="w-100 tracking"
                :label="$t('common.not_subcribe')"
                radio-text
                name="petInsJoinFlg"
                :checked="
                  dataForm.petInsJoinFlg ===
                  constContract.pet_other_insurance.NONE
                "
              />
            </div>
            <div class="col-sp-6">
              <BaseInputRadio
                id="solicitationStep1_insJoinTrue"
                v-model="dataForm.petInsJoinFlg"
                v-validate="{ required: [true, 'radio'] }"
                :data-vv-as="$t('contract_step1.name_required_join_insurance')"
                :value-input="constContract.pet_other_insurance.YES"
                class="w-100 tracking"
                :label="$t('common.subscribe')"
                radio-text
                name="petInsJoinFlg"
                :checked="
                  dataForm.petInsJoinFlg ===
                  constContract.pet_other_insurance.YES
                "
              />
            </div>
          </div>
        </BaseInputRadioContainer>
      </div>
      <div class="page-button">
        <BaseButton
          id="solicitationStep1_nextStep"
          btn-class="test tracking"
          :label="$t('common.button.next')"
          btn-full="btn--full"
          icon-right
          :disabled="
            errors.items.length > 0 ||
            txtRequiredCheckAge !== '' ||
            txtRequiredInsStartDateRange !== ''
          "
          @click="nextStep"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import * as _ from 'lodash';
import contract from '~/constants/contract';
import * as regex from '~/constants/regex';
import BaseLabel from '~/components/formItems/BaseLabel';
import BaseInputRadioContainer from '~/components/formItems/BaseInputRadioContainer';
import BaseInputRadio from '~/components/formItems/BaseInputRadio';
import BaseLabelTooltip from '~/components/formItems/BaseLabelTooltip';
import BaseButton from '~/components/formItems/BaseButton';
import BaseInput from '~/components/formItems/BaseInput';
import BaseDatePicker from '~/components/formItems/BaseDatePicker';
import BaseSelect from '~/components/formItems/BaseSelect';
import { getInsStartDateRange } from '~/utils/contracts/getInsStartDateRange';
import { isPetUnder9Years } from '@/utils/contracts/isPetUnder9Years';

import BaseNotice from '~/components/formItems/BaseNotice';

export default {
  components: {
    BaseLabel,
    BaseInputRadio,
    BaseLabelTooltip,
    BaseButton,
    BaseInputRadioContainer,
    BaseInput,
    BaseDatePicker,
    BaseSelect,
    BaseNotice,
  },

  beforeRouteEnter(to, from, next) {
    let accessRoute = ['solicitation-step2', 'solicitation-confirm'];
    if (accessRoute.includes(from.name)) {
      return next();
    }

    return next((vm) => {
      localStorage.removeItem('contract_refresh');
      localStorage.removeItem('customer_refresh');
      vm.$store.commit('contracts/setPetInfo', null);
      vm.$store.commit('contracts/setCustomerInfo', null);
    });
  },

  beforeRouteLeave(to, from, next) {
    document.querySelector('html').style.overflow = 'unset';
    document.body.style.overflow = 'unset';
    document.querySelector('html').scrollTop = document.body.clientHeight;

    next();
  },

  async asyncData({ $helpers, store, route }) {
    $helpers.setDataFromLocalToVuex();
    // #editで遷移してきた場合に二重に取得しないようにする
    if (store.state.contracts.dogBreeds.length === 0) {
      await store.dispatch('contracts/FetchDogBreed');
    }
  },

  data() {
    return {
      constContract: contract,
      listError: [],
      regex,
      dataForm: {
        petName: '',
        petType: null,
        petBreed: null,
        petWeight: null,
        petSexCd: null,
        noticeCd01: null,
        petBirthdayDiv: null,
        petBirthday: '',
        noticeCd02: null,
        petInsJoinFlg: null,
        insStartDate: '',
      },
      stepProgress: contract.step_progress,
      txtRequiredCheckAge: '',
      txtRequiredInsStartDateRange: '',
      changePetType: true,
      isSelectMinInsStartDateFrag: 1,
      reRenderValue: 0,
    };
  },

  computed: {
    ...mapState({
      petInfo: (state) => state.contracts.petInfo,
    }),
    ...mapGetters({
      getDogBreed: 'contracts/getDogBreed',
    }),
    minInsStartDate() {
      return getInsStartDateRange().from;
    },
    maxInsStartDate() {
      return getInsStartDateRange().to;
    },
  },

  watch: {
    'dataForm.petName': function (e) {
      this.dataForm.petName = e.trim();
    },
    'dataForm.petBirthday': function (e) {
      let AfterDayNow = e
        ? moment(this.dataForm.petBirthday, 'YYYY/MM').isAfter(moment())
        : '';
      if (AfterDayNow) {
        return (this.txtRequiredCheckAge = this.$t(
          'messages.check_age_pet_past_year'
        ));
      }
      return (this.txtRequiredCheckAge = '');
    },
  },

  created() {
    localStorage.removeItem('reload');
    document.querySelector('html').style.overflowY = 'scroll';
    document.body.style.overflowY = 'scroll';
    document.querySelector('html').scrollTop = 0;

    let insAgentNoCookies = this.$cookies.get('IS');
    if (insAgentNoCookies && this.$cookies.get('IS').insAgentNo == 'null') {
      if (!JSON.parse(insAgentNoCookies.insAgentNo)) {
        this.$cookies.set(
          'IS',
          insAgentNoCookies,
          new Date('2017, 03, 12'),
          '/',
          window.location.hostname.replace('www', '')
        );
        this.$cookies.remove('IS');
      }
    }
  },
  mounted() {
    if (this.petInfo) {
      this.dataForm = { ...this.petInfo };
      // insStartDateがminInsStartDateより前で状態として保存されている場合、minInsStartDateで上書きする
      // これは最短補償開始日より古い、有効ではない日付で状態保存されているケースへの考慮。
      if (moment(this.dataForm.insStartDate).isBefore(this.minInsStartDate)) {
        this.dataForm.insStartDate = this.minInsStartDate;
        this.setPetInfoInsStartDate(this.minInsStartDate);
        this.isSelectMinInsStartDateFrag = 1;
        // 既に入力されていたinsStartDateがminInsStartDate(最短保険開始日)より後で状態として保存されている場合、
        // isSelectMinInsStartDateFragを0にする。
        // (補償開始日の「最短保険日にする」、「自分で選ぶ」のラジオ選択肢の初期状態の制御のため)
      } else if (
        !moment(this.minInsStartDate).isSame(
          moment(this.dataForm.insStartDate),
          'day'
        )
      ) {
        this.isSelectMinInsStartDateFrag = 0;
      }
    } else {
      this.setMinInsStartDate();
    }
    this.reRenderValue++;
  },

  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },

  methods: {
    ...mapActions({
      examination: 'contracts/examination',
      getProductInfo: 'contracts/productInfo',
      getInsStartDate: 'contracts/insStartDate',
    }),
    ...mapMutations({
      setPetInfo: 'contracts/setPetInfo',
      setPetInfoInsStartDate: 'contracts/setPetInfoInsStartDate',
    }),

    preventNav() {
      this.$route.hash == '#edit'
        ? this.$helpers.setDataFromVuexToLocal(
            'petInfo',
            'productCd',
            'customerInfo',
            'contract_duplicate'
          )
        : this.$helpers.setDataFromVuexToLocal('petInfo');
      localStorage.setItem('contract_refresh', JSON.stringify(this.dataForm));
    },
    changePetBirthday(value) {
      this.dataForm.petBirthday = value;
    },
    changeInsStartDate(value) {
      this.dataForm.insStartDate = value;
    },

    getListErrorMess(listError) {
      const arrError = [];
      listError.includes('petName')
        ? arrError.push(this.$t('messages.petName'))
        : '';
      listError.includes('petType')
        ? arrError.push(this.$t('messages.petType'))
        : '';
      listError.includes('petBreed')
        ? arrError.push(this.$t('messages.petBreed'))
        : '';
      listError.includes('petWeight')
        ? arrError.push(this.$t('messages.petWeight'))
        : '';
      listError.includes('petSexCd')
        ? arrError.push(this.$t('messages.petSexCd'))
        : '';
      listError.includes('noticeCd01')
        ? arrError.push(this.$t('messages.noticeCd01'))
        : '';
      listError.includes('petBirthdayDiv')
        ? arrError.push(this.$t('messages.petBirthdayDiv'))
        : '';
      listError.includes('petBirthday')
        ? arrError.push(this.$t('messages.petBirthday'))
        : '';
      listError.includes('insStartDate')
        ? arrError.push(this.$t('messages.insStartDate'))
        : '';
      listError.includes('noticeCd02')
        ? arrError.push(this.$t('messages.noticeCd02'))
        : '';
      listError.includes('petInsJoinFlg')
        ? arrError.push(this.$t('messages.petInsJoinFlg'))
        : '';
      return arrError;
    },

    async nextStep() {
      this.$validator.validate().then(async (result) => {
        if (
          !result ||
          !_.isEmpty(this.txtRequiredCheckAge) ||
          !_.isEmpty(this.txtRequiredInsStartDateRange)
        ) {
          let nameField = this.errors.items.reduce((arr, it) => {
            return [...arr, it.field];
          }, []);
          this.listError = this.getListErrorMess(_.sortedUniq(nameField));

          return true;
        }

        // 最短補償開始日を下回っていないか確認
        if (moment(this.dataForm.insStartDate).isBefore(this.minInsStartDate)) {
          window.alert(this.$t('common.insStartDate.over_ins_start_date'));
          this.selectMinInsStart();
          return;
        }
        this.setPetInfo({ ...this.dataForm });

        // ペットの年齢が9歳以上の場合
        if (
          !isPetUnder9Years(
            this.dataForm.insStartDate,
            this.dataForm.petBirthday
          )
        ) {
          return this.$router.push('/solicitation/apologize/too_old/');
        }
        if (this.$route.hash == '#edit') {
          this.$router.push('/solicitation/confirm/');
        } else {
          this.$router.push('/solicitation/step2/');
        }
      });
    },

    handlePetWeight(value) {
      return /^[0-9]*(\.[0-9]+)?$/.test(value) ? (value * 1).toFixed(1) : value;
    },

    handleBlurPetWeight(e) {
      this.dataForm.petWeight = _.isEmpty(this.handlePetWeight(e.target.value))
        ? null
        : this.handlePetWeight(e.target.value);
    },

    handleKeyupPetWeight(e) {
      e.key == 'Enter'
        ? (this.dataForm.petWeight = this.handlePetWeight(e.target.value))
        : '';
    },

    handleRadioPetType(e) {
      if (this.changePetType && _.isEmpty(this.petInfo)) {
        this.changePetType = false;

        return;
      }
      if (e.target.value !== this.dataForm.petType) {
        this.dataForm.petWeight = null;
        this.dataForm.petBreed = null;
        this.dataForm.petSexCd = null;
        this.dataForm.noticeCd01 = null;
        this.dataForm.noticeCd02 = null;
        this.dataForm.petBirthdayDiv = null;
        this.dataForm.petBirthday = null;
        this.dataForm.petInsJoinFlg = null;
        this.$validator.reset();
      }
      this.reRenderValue++;
    },
    async setMinInsStartDate() {
      //最短補償開始日を選択する
      if (this.dataForm.insStartDate !== this.minInsStartDate) {
        this.dataForm.insStartDate = this.minInsStartDate;
      }
    },
    handleChangeSelectBreed(e) {
      e.handleChangeSelectBreed == this.constContract.pet_breed.MIX ||
      e.petCode == this.constContract.pet_breed.OTHER_BREED
        ? ''
        : (this.dataForm.petWeight = null);
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
