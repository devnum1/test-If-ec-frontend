<template>
  <main class="page-content bg-gray">
    <PageTitle logo />
    <div class="container">
      <div class="rules-title mb-10 mt-21">
        {{ $t('illness.rabies_vaccination.pageTitle') }}
      </div>
      <BaseLabel
        :label-title="$t('illness.rabies_vaccination.description')"
        class="mb-15"
        required
      />
      <BaseInputRadioContainer
        :error="errors.first('rabies_vaccinationStatus')"
      >
        <div class="row-sp radio-container">
          <div class="col-sp">
            <BaseInputRadio
              id="rabies_vaccination_status"
              v-model="formData.vaccineOrNot"
              v-validate="{ required: [true, 'radio'] }"
              :value-input="'Y'"
              :label="$t('illness.rabies_vaccination.button.yes')"
              name="petType"
              :checked="formData.vaccineOrNot === 'Y'"
              class="tracking"
              radio-text
            />
          </div>
          <div class="col-sp">
            <BaseInputRadio
              id="rabies_vaccination_status"
              v-model="formData.vaccineOrNot"
              v-validate="{ required: [true, 'radio'] }"
              :value-input="'N'"
              :label="$t('illness.rabies_vaccination.button.no')"
              name="petType"
              :checked="formData.vaccineOrNot === 'N'"
              class="tracking"
              radio-text
            />
          </div>
        </div>
      </BaseInputRadioContainer>
      <div v-if="formData.vaccineOrNot === 'Y'" class="mt-36">
        <BaseLabel
          :label-title="$t('illness.rabies_vaccination.date')"
          class="mb-15"
          required
        />
        <div class="mb-15">
          <BaseDatePicker
            v-model="formData.vaccineDate"
            :min-date="`${new Date().getFullYear() - 10}-01-01`"
            :max-date="`${new Date().getFullYear()}-12-31`"
            name="vaccineDate"
            date-format="YYYY/MM/DD"
            :value-input="formData.vaccineDate"
          />
        </div>
      </div>
      <div class="mt-56 px-4 pb-72">
        <BaseButton
          id="myPagePet_imageEdit"
          btn-full="btn--full"
          btn-class="mw-100 tracking"
          :label="$t('common.button.next')"
          btn-green
          :disabled="formData.vaccineOrNot === ''"
          @click="handleClickNext"
        />
        <div class="mt-24 text-center">
          <div class="text-green" @click="$router.back()">戻る</div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import BaseLabel from '~/components/formItems/BaseLabel';
import BaseButton from '~/components/formItems/BaseButton';
import BaseInputRadioContainer from '~/components/formItems/BaseInputRadioContainer';
import BaseInputRadio from '~/components/formItems/BaseInputRadio';
import BaseDatePicker from '~/components/formItems/BaseDatePicker';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    BaseLabel,
    BaseButton,
    BaseInputRadioContainer,
    BaseInputRadio,
    BaseDatePicker,
  },
  data() {
    return {
      formData: {
        vaccineOrNot: '',
        vaccineDate: '',
      },
    };
  },
  methods: {
    ...mapMutations({
      setVaccination: 'diseaseHistory/setRabiesVaccination',
    }),
    handleClickNext() {
      this.setVaccination({
        vaccineCode: '2',
        ...this.formData,
      });
      this.$router.push('/solicitation/disease/declaration/confirm');
    },
    changePhoto() {},
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
</style>
