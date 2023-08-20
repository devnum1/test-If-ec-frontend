<template>
  <main class="page-content bg-gray">
    <PageTitle logo />
    <div class="container">
      <div class="rules-title mb-10 mt-21">その他の病歴</div>
      <BaseLabel
        label-class="base-label--custom"
        :label-title="$t('illness.ever_diagnosed_or_treated_illnesses_others')"
        required
      />
      <BaseInputRadioContainer>
        <div class="row-sp radio-container">
          <div class="col-sp">
            <BaseInputRadio
              id="other_diagnosed"
              v-model="hasOther"
              v-validate="{ required: [true, 'radio'] }"
              :value-input="'yes'"
              radio-text
              :label="$t('illness.others_diagnosed.yes')"
              name="otherDiagnosed"
              :checked="hasOther === 'yes'"
            />
          </div>
          <div class="col-sp">
            <BaseInputRadio
              id="other_diagnosed"
              v-model="hasOther"
              v-validate="{ required: [true, 'radio'] }"
              :value-input="'none'"
              radio-text
              :label="$t('illness.others_diagnosed.none')"
              name="otherDiagnosed"
              :checked="hasOther === 'none'"
            />
          </div>
        </div>
      </BaseInputRadioContainer>
      <div v-if="isCheckedYes" class="mt-40">
        <BaseLabel
          :label-title="$t('illness.disease_date')"
          class="mb-15"
          required
        />
        <div class="mb-15">
          <BaseDatePicker
            v-model="diseaseDate"
            :min-date="`${new Date().getFullYear() - 10}-01-01`"
            :max-date="`${new Date().getFullYear()}-12-31`"
            name="diseaseDate"
            date-format="YYYY/MM/DD"
            :value-input="diseaseDate"
          />
        </div>
        <p class="font-12px text-gray">
          詳細な日にちがわからない場合は「1日」をご入力ください
        </p>
      </div>

      <div v-if="isCheckedYes" class="mt-40">
        <BaseLabel
          label-class="base-label--custom"
          :label-title="$t('illness.other_diagnosed')"
          required
        />
        <BaseInput
          id="other_diagnosis_desc"
          v-model="otherDiagnosisDesc"
          v-validate="{
            required: true,
            max: 400,
          }"
          name="otherDiagnosisDesc"
          :placeholder="$t('illness.other_diagnosed_placeholder')"
          :error="errors.first('otherDiagnosisDesc')"
          :data-vv-as="$t('illness.other_diagnosed_placeholder')"
          class="mt-12"
        />
      </div>
      <div class="mt-56 px-4 pb-72">
        <div class="mt-24">
          <BaseButton
            id="myPagePet_imageEdit"
            btn-full="btn--full"
            btn-class="mw-100 tracking"
            :label="$t('common.button.next')"
            btn-green
            :disabled="isDisabledNext"
            @click="handleClickNext"
          />
        </div>
        <div class="mt-24 text-center">
          <button class="text-button text-green" @click="$router.back()">
            戻る
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import BaseLabel from '~/components/formItems/BaseLabel';
import BaseInputRadioContainer from '~/components/formItems/BaseInputRadioContainer';
import BaseInputRadio from '~/components/formItems/BaseInputRadio';
import BaseInput from '~/components/formItems/BaseInput';
import BaseButton from '~/components/formItems/BaseButton';
import BaseDatePicker from '~/components/formItems/BaseDatePicker';
import { DISEASE_MASTER } from '../../../../constants/diseases';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    BaseLabel,
    BaseInputRadioContainer,
    BaseInputRadio,
    BaseButton,
    BaseInput,
    BaseDatePicker,
  },
  data() {
    return {
      listErrors: [],
      hasOther: '',
      diagnosisMaster: [],
      declarationDisease: [],
      otherDiagnosisDesc: '',
      diseaseDate: '',
    };
  },
  computed: {
    ...mapGetters({
      getDiseaseCodeMaster: 'diseaseHistory/getDiseaseCode',
      getDeclarationDisease: 'diseaseHistory/getDeclarationDisease',
    }),
    isDisabledNext() {
      if (this.hasOther === 'yes') {
        return (
          this.listErrors.length > 0 ||
          this.diseaseDate === '' ||
          this.otherDiagnosisDesc === ''
        );
      }
      return this.listErrors.length > 0 || this.hasOther === '';
    },
    isCheckedYes() {
      return this.hasOther === 'yes';
    },
  },
  watch: {
    errors: {
      handler: function () {
        this.listErrors = this.errors.items.reduce((arr, it) => {
          return [...arr, it.msg];
        }, []);
      },
      deep: true,
    },
  },
  async mounted() {
    this.bodySite = DISEASE_MASTER.bodySiteMap['others'];
    await this.$store.dispatch(
      'diseaseHistory/getDiseaseCodeMaster',
      this.bodySite.code
    );
    this.diagnosisMaster = this.getDiseaseCodeMaster(this.bodySite.code);
    this.declarationDisease = this.getDeclarationDisease(this.bodySite.code);
    this.hasOther = this.declarationDisease.length > 0 ? 'yes' : '';
    this.diseaseDate = this.declarationDisease[0]?.diseaseDate || '';
    this.otherDiagnosisDesc =
      this.declarationDisease[0]?.otherDiagnosisDesc || '';
  },
  methods: {
    ...mapMutations({
      setDeclarationDisease: 'diseaseHistory/setDeclarationDiseaseDetail',
    }),
    handleClickNext() {
      if (this.hasOther === 'yes') {
        const bodySiteCode = '15';
        const otherDiagnosis = this.diagnosisMaster.find(
          (d) => d.bodySiteCode === bodySiteCode
        );
        this.setDeclarationDisease({
          bodySiteCode,
          declarationDiseaseDetail: [
            {
              bodySiteCode: bodySiteCode,
              diagnosisName: otherDiagnosis.diagnosisName,
              diagnosisCode: otherDiagnosis.diagnosisCode,
              otherDiagnosisDesc: this.otherDiagnosisDesc,
              diseaseDate: this.diseaseDate,
            },
          ],
        });
      }
      this.$router.push('/solicitation/disease/declaration/vaccination');
    },
  },
};
</script>
<style lang="scss" scoped>
.radio-container {
  display: grid;
  grid-template-columns: auto auto;

  label {
    width: 100%;
  }
}

.text-button {
  background: none;
  border: none;
  color: $green;
  font-size: $font-size-base;

  &:hover,
  &:active {
    color: darken($color: $green, $amount: 10);
  }

  &:disabled {
    color: gray;
  }
}
</style>
