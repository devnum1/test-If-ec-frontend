<template>
  <main class="page-content bg-gray">
    <PageTitle logo />
    <div class="container">
      <div class="rules-title mb-10 mt-32">{{ bodySite.name }}の病歴</div>
      <div
        v-for="(disease, diseaseIndex) in declarationDisease"
        :key="diseaseIndex"
        class="mb-34"
      >
        <div class="bg-white text-green py-3 px-3 font-16px mb-15">
          {{
            disease.diagnosisName === '分からない'
              ? '分からない病気'
              : disease.diagnosisName
          }}について教えてください
        </div>
        <BaseLabel
          :label-title="$t('illness.disease_date')"
          class="mb-15"
          required
        />
        <div class="mb-15">
          <BaseDatePicker
            v-model="formData[diseaseIndex].diseaseDate"
            :min-date="`${new Date().getFullYear() - 10}-01-01`"
            :max-date="`${new Date().getFullYear()}-12-31`"
            name="diseaseDate"
            date-format="YYYY/MM/DD"
            :value-input="formData[diseaseIndex].diseaseDate"
          />
        </div>
        <p class="font-12px text-gray">
          詳細な日にちがわからない場合は「1日」をご入力ください
        </p>

        <div>
          <div class="rules-title mb-10 mt-32">
            {{ $t('illness.disease_status') }}
          </div>
          <BaseLabel
            :label-title="$t('illness.check')"
            class="mb-15"
            required
          />
          <ul>
            <li
              v-for="status in diseaseStatus"
              :key="status.statusCode"
              class="mt-8"
            >
              <BaseInputCheckbox
                :id="'AddInfo_diseases_' + status.statusCode"
                v-model="formData[diseaseIndex].diseaseStatus"
                :label="status.statusName"
                name="treatment_list"
                :input-value="status.statusCode"
                outline
                single-select
                :checked="
                  formData[diseaseIndex].diseaseStatus === status.statusCode
                "
              />
            </li>
          </ul>
          <div
            v-if="formData[diseaseIndex].diseaseStatus === '4'"
            class="mt-36"
          >
            <BaseLabel
              :label-title="$t('illness.healingDate')"
              class="mb-15"
              required
            />
            <div class="mb-15">
              <BaseDatePicker
                v-model="formData[diseaseIndex].healingDate"
                :min-date="`${new Date().getFullYear() - 10}-01-01`"
                :max-date="`${new Date().getFullYear()}-12-31`"
                name="healingDate"
                date-format="YYYY/MM/DD"
                :value-input="formData[diseaseIndex].healingDate"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="rules-title mb-10 mt-32">
            {{ $t('illness.treatment') }}
          </div>
          <BaseLabel
            :label-title="$t('illness.check')"
            class="mb-15"
            required
          />
          <ul>
            <li
              v-for="treatment in treatmentMethod"
              :key="treatment.methodCode"
              class="mt-8"
            >
              <BaseInputCheckbox
                :id="'AddInfo_diseases_' + treatment.methodCode"
                v-model="formData[diseaseIndex].treatmentMethod"
                :label="treatment.methodName"
                name="disease_list"
                :input-value="treatment.methodCode"
                outline
                single-select
                :checked="
                  formData[diseaseIndex].treatmentMethod ===
                  treatment.methodCode
                "
              />
            </li>
          </ul>
          <div
            v-if="formData[diseaseIndex].treatmentMethod === '1'"
            class="mt-36"
          >
            <BaseLabel
              :label-title="$t('illness.upload_examination_result.label')"
              required
            />
            <div class="px-4">
              <div
                v-if="validateExaminationResultImage"
                class="format-error mb-24"
                v-html="validateExaminationResultImage"
              />
              <BaseButton
                id="myPagePet_imageEdit"
                btn-full="btn--full"
                :label="$t('illness.upload_examination_result.button')"
                btn-green-outline
                @click="changePhoto"
              />
              <input
                ref="fileInput"
                class="change-image"
                type="file"
                name="examination-result-image"
                accept="image/png,image/bmp,image/dib,image/jpg,image/jpeg,image/jpe,image/jfif,image/gif,image/tif,image/tiff,image/heic"
                @change="imagePreview"
              />
            </div>
            <div class="mt-4">
              <img v-if="urlListImg" :src="urlListImg" class="w-100" />
            </div>
            <div class="font-14px mt-2 text-center">
              {{ $t('illness.upload_examination_result.file_name') }}XXX
            </div>
            <div class="font-14px mt-2">
              {{ $t('illness.upload_examination_result.note') }}
            </div>
          </div>
          <div
            v-if="formData[diseaseIndex].treatmentMethod === '5'"
            class="mt-36"
          >
            <BaseLabel :label-title="$t('illness.other_treatment')" required />
            <BaseInput
              id="otherTreatmentMethod"
              v-model="formData[diseaseIndex].otherTreatmentMethod"
              v-validate="{
                required: true,
                max: 400,
              }"
              name="otherTreatmentMethod"
              :placeholder="$t('illness.other_treatment_placeholder')"
              :error="errors.first('otherTreatmentMethod')"
              :data-vv-as="$t('illness.other_treatment_placeholder')"
              class="mt-12"
            />
          </div>
        </div>
        <div class="mt-26">
          <BaseLabel
            :label-title="
              '過去に' +
              disease.diagnosisName +
              $t('illness.disease_history.title')
            "
            class="mt-36"
            required
          />
          <BaseInputRadioContainer>
            <div class="row-sp flex mt-12">
              <div class="col-sp">
                <BaseInputRadio
                  id="disease_history"
                  v-model="formData[diseaseIndex].hasHistory"
                  v-validate="{ required: [true, 'radio'] }"
                  :value-input="'1'"
                  radio-text
                  :label="$t('illness.disease_history.one')"
                  name="diseaseHistoryRadio"
                  :checked="formData[diseaseIndex].hasHistory === '1'"
                />
              </div>
              <div class="col-sp">
                <BaseInputRadio
                  id="disease_history"
                  v-model="formData[diseaseIndex].hasHistory"
                  v-validate="{ required: [true, 'radio'] }"
                  :value-input="'2'"
                  radio-text
                  :label="$t('illness.disease_history.two')"
                  name="diseaseHistoryRadio"
                  :checked="formData[diseaseIndex].hasHistory === '2'"
                />
              </div>
              <div class="col-sp">
                <BaseInputRadio
                  id="disease_history"
                  v-model="formData[diseaseIndex].hasHistory"
                  v-validate="{ required: [true, 'radio'] }"
                  :value-input="'0'"
                  radio-text
                  :label="$t('illness.disease_history.no')"
                  name="diseaseHistoryRadio"
                  :checked="formData[diseaseIndex].hasHistory === '0'"
                />
              </div>
            </div>
          </BaseInputRadioContainer>
        </div>
        <hr
          v-if="diseaseIndex !== declarationDisease.length - 1"
          class="mt-40"
        />
      </div>
      <div class="mt-24 px-4 pb-72">
        <BaseButton
          id="myPagePet_imageEdit"
          btn-full="btn--full"
          btn-class="mw-100 tracking"
          :label="$t('common.button.next')"
          btn-green
          :disabled="isDisabledNext"
          @click="next"
        />
        <div class="mt-24 text-center">
          <div class="text-green" @click="back">戻る</div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { DISEASE_MASTER } from '../../../../../constants/diseases';
import BaseLabel from '~/components/formItems/BaseLabel';
import BaseButton from '~/components/formItems/BaseButton';
import BaseDatePicker from '~/components/formItems/BaseDatePicker';
import BaseInputCheckbox from '~/components/formItems/BaseInputCheckbox';
import BaseInputRadioContainer from '~/components/formItems/BaseInputRadioContainer';
import BaseInputRadio from '~/components/formItems/BaseInputRadio';
import BaseInput from '~/components/formItems/BaseInput';

export default {
  components: {
    BaseLabel,
    BaseDatePicker,
    BaseInputCheckbox,
    BaseButton,
    BaseInput,
    BaseInputRadioContainer,
    BaseInputRadio,
  },
  data() {
    return {
      listErrors: [],
      declarationDisease: [],
      formData: [],
      diseaseStatus: DISEASE_MASTER.diseaseStatus,
      treatmentMethod: DISEASE_MASTER.treatmentMethod,
      diseaseList: [],
      bodySite: {},
      file: '',
      urlListImg: null,
      validateExaminationResultImage: '',
      examinationResultFileName: '',
    };
  },
  computed: {
    ...mapGetters({
      getDeclarationDisease: 'diseaseHistory/getDeclarationDisease',
    }),
    isDisabledNext() {
      return this.formData.some((item) => {
        if (item.treatmentMethod === '5') {
          return (
            this.listErrors.length > 0 ||
            item.diseaseDate === '' ||
            item.diseaseStatus === '' ||
            item.hasHistory === '' ||
            item.otherTreatmentMethod === ''
          );
        }

        if (
          this.listErrors.length > 0 ||
          item.diseaseDate === '' ||
          item.diseaseStatus === '' ||
          item.hasHistory === '' ||
          item.treatmentMethod === ''
        ) {
          return true;
        }
      });
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
  mounted() {
    const bodySiteName = this.$route.params?.bodySite;
    this.bodySite = DISEASE_MASTER.bodySiteMap[bodySiteName];

    const declarationDisease = this.getDeclarationDisease(this.bodySite.code);
    this.declarationDisease = declarationDisease;
    this.formData = declarationDisease.map((item) => ({
      diseaseDate: '', // 発症日
      diseaseStatus: '', // ケガ・病気の状態
      healingDate: '', // 完治日
      hasHistory: '', // 症状の履歴
      treatmentMethod: '', // 治療内容
      otherTreatmentMethod: '', // その他の治療内容
      ...item,
    }));
  },
  methods: {
    ...mapMutations({
      setDeclarationDisease: 'diseaseHistory/setDeclarationDiseaseDetail',
    }),
    async next() {
      this.$validator.validate().then(async (result) => {
        if (!result && this.formData[0].hasHistory === '') {
          return;
        }
        this.setDeclarationDisease({
          bodySiteCode: this.bodySite.code,
          declarationDiseaseDetail: this.formData,
        });
        this.$router.push(
          `/solicitation/disease/declaration/${this.bodySite.next}`
        );
      });
    },
    back() {
      // 戻る前に、情報を空にする
      this.setDeclarationDisease({
        bodySiteCode: this.bodySite.code,
        declarationDiseaseDetail: [],
      });
      this.$router.back();
    },
    changePhoto() {
      let fileInputElement = this.$refs.fileInput[0];
      fileInputElement.click();
    },
    imagePreview(e) {
      this.file = e.target.files[0];
      if (this.file) {
        this.validateExaminationResultImage = this.validateImageFile(this.file);

        if (!this.validateExaminationResultImage.length) {
          const reader = new FileReader();

          reader.addEventListener(
            'load',
            () => {
              this.urlListImg = reader.result;
            },
            false
          );

          reader.readAsDataURL(this.file);

          return;
        }

        this.file = null;
      }
    },
    validateImageFile(file) {
      let validateExaminationResultImage = '';
      const fileType = file['type'].toLowerCase();
      const validImageTypes = [
        'image/png',
        'image/bmp',
        'image/dib',
        'image/jpg',
        'image/jpeg',
        'image/jpe',
        'image/jfif',
        'image/gif',
        'image/tif',
        'image/tiff',
        'image/heic',
      ];

      if (
        !validImageTypes.includes(fileType) ||
        file.size / (1024 * 1024) > 10
      ) {
        validateExaminationResultImage =
          this.$t('contract_pet.upload_file_error') + '<br>';
      }

      return validateExaminationResultImage;
    },
  },
};
</script>
<style lang="scss" scoped>
input[type='file'] {
  display: none;
}
</style>
