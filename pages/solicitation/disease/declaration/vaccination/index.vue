<template>
  <main class="page-content bg-gray">
    <PageTitle logo />
    <div class="container">
      <div class="rules-title mb-10 mt-21">
        {{ $t('vaccination.page_title') }}
      </div>
      <BaseLabel
        :label-title="$t('vaccination.description')"
        class="mb-15"
        required
      />
      <BaseInputRadioContainer :error="errors.first('vaccinationStatus')">
        <div class="row-sp radio-container">
          <div class="col-sp">
            <BaseInputRadio
              id="vaccination_status"
              v-model="formData.vaccineOrNot"
              v-validate="{ required: [true, 'radio'] }"
              :value-input="'Y'"
              :label="$t('vaccination.button.yes')"
              name="petType"
              :checked="formData.vaccineOrNot === 'Y'"
              class="tracking"
              radio-text
            />
          </div>
          <div class="col-sp">
            <BaseInputRadio
              id="vaccination_status"
              v-model="formData.vaccineOrNot"
              v-validate="{ required: [true, 'radio'] }"
              :value-input="'N'"
              :label="$t('vaccination.button.no')"
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
          :label-title="$t('vaccination.date')"
          class="mb-15"
          required
        />
        <div class="mb-15">
          <BaseDatePicker
            v-model="formData.vaccineDate"
            v-validate="{
              required: [isVaccineDateRequired, 'date-time-picker'],
            }"
            :min-date="`${new Date().getFullYear() - 10}-01-01`"
            :max-date="`${new Date().getFullYear()}-12-31`"
            name="vaccineDate"
            date-format="YYYY/MM/DD"
            :value-input="formData.vaccineDate"
          />
        </div>
        <BaseLabel
          :label-title="$t('vaccination.certificate')"
          class="mt-36"
          required
        />
        <div class="px-4 mt-16">
          <img v-if="imgUrl" :src="imgUrl" class="preview" />
          <div
            v-if="validateImage"
            class="format-error mb-24"
            v-html="validateImage"
          />
          <BaseButton
            id="myPagePet_imageEdit"
            btn-full="btn--full"
            :label="$t('vaccination.button.upload')"
            btn-green-outline
            @click="changePhoto"
          />
          <input
            ref="fileInput"
            class="change-image"
            type="file"
            name="certificate-image"
            accept="image/png,image/bmp,image/dib,image/jpg,image/jpeg,image/jpe,image/jfif,image/gif,image/tif,image/tiff,image/heic"
            @change="imagePreview"
          />
        </div>
        <p class="mt-16 base-label">
          {{ $t('vaccination.certificate_note') }}
        </p>
      </div>
      <div class="mt-56 px-4 pb-72">
        <BaseButton
          id="myPagePet_imageEdit"
          btn-full="btn--full"
          btn-class="mw-100 tracking"
          :label="$t('common.button.next')"
          btn-green
          :disabled="
            formData.vaccineOrNot === '' ||
            (formData.vaccineOrNot === 'Y' && formData.vaccineDate === '')
          "
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
      file: '',
      imgUrl: null,
      validateImage: '',
      vaccineCertificate: '', // 接種証明書DocId
      formData: {
        vaccineOrNot: '',
        vaccineDate: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      getPetInfo: 'contracts/getPetInfo',
    }),
    isVaccineDateRequired() {
      return this.formData.vaccineOrNot === 'Y';
    },
  },
  methods: {
    ...mapMutations({
      setVaccination: 'diseaseHistory/setVaccination',
    }),
    handleClickNext() {
      this.$validator.validate().then(async (result) => {
        if (result) {
          this.setVaccination({
            vaccineCode: '1',
            vaccineCertificate: this.vaccineCertificate,
            ...this.formData,
          });
          if ([1, '01', '1'].includes(this.getPetInfo.petType)) {
            this.$router.push(
              '/solicitation/disease/declaration/rabies_vaccination'
            );
          } else {
            this.$router.push('/solicitation/disease/declaration/confirm');
          }
        }
      });
    },
    changePhoto() {
      let fileInputElement = this.$refs.fileInput;
      fileInputElement.click();
    },
    async imagePreview(e) {
      this.file = e.target.files[0];
      if (this.file) {
        this.validateImage = this.validateImageFile(this.file);

        if (!this.validateImage.length) {
          const reader = new FileReader();

          reader.addEventListener(
            'load',
            () => {
              this.imgUrl = reader.result;
            },
            false
          );

          reader.readAsDataURL(this.file);

          const response = await this.$store.dispatch('contracts/uploadFile', {
            file: this.file,
          });

          if (response === 'imageExtensionErrorDetected') {
            this.validatePetImage =
              this.$t('vaccination.format_error_broken_file') + '<br>';
            return;
          }

          this.vaccineCertificate = response.fileUrl;

          return;
        }

        this.file = null;
      }
    },
    validateImageFile(file) {
      let validateImage = '';
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

      if (!validImageTypes.includes(fileType)) {
        validateImage =
          this.$t('vaccination.format_error_broken_file') + '<br>';
      }

      if (file.size / (1024 * 1024) > 10) {
        validateImage = validateImage + this.$t('vaccination.size_photo_error');
      }

      return validateImage;
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

.preview {
  width: 100%;
  margin-bottom: 16px;
}

input[type='file'] {
  display: none;
}

.format-error {
  color: $red;
  font-size: $font-size-base - 2;
  line-height: 1.3;
  text-align: center;
}
</style>
