// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div v-if="!isLoading" class="page-content bg-gray">
    <Header btn-back="/mypage/contracts" title-page="PECO" />
    <div class="container mt-21">
      <BaseLabel :label-title="titlePhotograph" required />
      <BaseLabel
        label-class="note-label"
        :label-title="notiPetImage"
        :label-help="labelHelp"
      />
      <div class="mt-21 text-center">
        <div v-if="!url_list_img">
          <label class="input-image">
            <input
              class=""
              type="file"
              name="pet-image"
              accept="image/png,image/bmp,image/dib,image/jpg,image/jpeg,image/jpe,image/jfif,image/gif,image/tif,image/tiff,image/heic"
              @change="imagePreview"
            />
            <div>
              <i class="icon-fonts icon-fonts--plus-bold" />
            </div>
            <div class="mt-2">{{ $t('common.button.add_photo') }}</div>
          </label>
        </div>
        <div v-if="url_list_img" id="preview">
          <img v-if="url_list_img" :src="url_list_img" />
        </div>
        <div class="page-button pb-5 text-center button-green-out-line">
          <BaseButton
            id="myPagePet_imageEdit"
            btn-class="mw-100 tracking"
            :label="$t('common.button.change_image')"
            btn-green-outline
            @click="changePhoto"
          />
          <input
            ref="file"
            class="change-image"
            type="file"
            name="pet-image"
            accept="image/png,image/bmp,image/dib,image/jpg,image/jpeg,image/jpe,image/jfif,image/gif,image/tif,image/tiff,image/heic"
            @change="imagePreview"
          />
          <div
            v-if="validatePetImage"
            class="format-error format-error--center error-wrapper"
          >
            <div class="error-description mt-12">
              <img src="~/assets/images/icon-exclamation.svg" />
              <span v-html="validatePetImage"></span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!url_list_img">
        <div
          class="d-flex mb-24 mt-32 justify-content-between align-items-center"
        >
          <div class="rules-title mb-0">
            {{ $t('contract_pet.example_success') }}
          </div>
        </div>

        <div class="example-sussec-image">
          <div class="d-flex justify-content-center mb-4">
            <div class="example-item">
              <img src="~/assets/images/input-demo07.png" />
            </div>
            <div class="example-item">
              <img src="~/assets/images/input-demo08.png" />
            </div>
          </div>
          <div class="example-item">
            <p class="example-item__content">
              ・{{ $t('contract_pet.noti_success_1') }}
            </p>
            <p class="example-item__content">
              ・{{ $t('contract_pet.noti_success_2') }}
            </p>
            <p class="example-item__content">
              ・{{ $t('contract_pet.noti_success_3') }}
            </p>
            <p class="example-item__content">
              ・{{ $t('contract_pet.noti_success_4') }}
            </p>
            <p class="example-item__content">
              ・{{ $t('contract_pet.noti_success_5') }}
            </p>
          </div>
        </div>

        <div
          class="d-flex mb-24 mt-32 justify-content-between align-items-center"
        >
          <div class="rules-title mb-0">
            {{ $t('contract_pet.example_fail') }}
          </div>
        </div>

        <div class="example-fail-image mb-40">
          <div class="example-image">
            <div class="example-item">
              <img src="~/assets/images/input-demo09.png" />
              <i class="icon-fonts icon-fonts--close" />
            </div>
            <div
              class="example-item__content mt-2"
              v-html="$t('contract_pet.noti_error_image_1')"
            />
          </div>
          <div class="example-image">
            <div class="example-item">
              <img src="~/assets/images/input-demo10.png" />
              <i class="icon-fonts icon-fonts--close" />
            </div>
            <div
              class="example-item__content mt-2"
              v-html="$t('contract_pet.noti_error_image_2')"
            />
          </div>
          <div class="example-image">
            <div class="example-item">
              <img src="~/assets/images/input-demo11.png" />
              <i class="icon-fonts icon-fonts--close" />
            </div>
            <div
              class="example-item__content mt-2"
              v-html="$t('contract_pet.noti_error_image_3')"
            />
          </div>
          <div class="example-image">
            <div class="example-item">
              <img src="~/assets/images/input-demo12.png" />
              <i class="icon-fonts icon-fonts--close" />
            </div>
            <div
              class="example-item__content mt-2"
              v-html="$t('contract_pet.noti_error_image_4')"
            />
          </div>
          <div class="example-image">
            <div class="example-item">
              <img src="~/assets/images/input-demo13.png" />
              <i class="icon-fonts icon-fonts--close" />
            </div>
            <div
              class="example-item__content mt-2"
              v-html="$t('contract_pet.noti_error_image_5')"
            />
          </div>
        </div>
      </div>
      <div class="info-box mb-57">
        <ul class="info-box__list">
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              {{ $t('common.owner.name') }}
            </div>
            <div class="info-box__text text-right text-darker">
              <span>{{ _.get(petInfo, 'petName', '') }}</span>
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              {{ $t('common.pet.pet_type') }}
            </div>
            <div class="info-box__text text-right text-darker">
              <span>
                {{
                  _.get(petInfo, 'petType') === constContract.pet_type.DOG
                    ? $t('common.pet.dog')
                    : $t('common.pet.cat')
                }}
              </span>
            </div>
          </li>
          <li
            v-if="_.get(petInfo, 'petType') === constContract.pet_type.DOG"
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              {{ $t('contract_pet.pet_contract_type') }}
            </div>
            <div class="info-box__text text-right text-darker">
              <span>{{ _.get(listContractInfo, 'petBreedDesc', '') }}</span>
            </div>
          </li>
          <li
            v-if="
              (_.get(petInfo, 'petBreed') === constContract.pet_breed_id.MIX ||
                _.get(petInfo, 'petBreed') ===
                  constContract.pet_breed_id.OTHER_BREED) &&
              _.get(petInfo, 'petType') === constContract.pet_type.DOG
            "
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              {{ $t('common.weight') }}
            </div>
            <div class="info-box__text text-right text-darker">
              <span>{{ checkPetWeight }} kg</span>
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              {{ $t('common.gender.gender_title') }}
            </div>
            <div class="info-box__text text-right text-darker">
              <span>{{
                _.get(petInfo, 'gender') === constContract.pet_sex.MALE
                  ? $t('common.gender.boy')
                  : $t('common.gender.girl')
              }}</span>
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="contraception-tooltip d-flex">
              <div class="info-box__title text-">
                {{ $t('common.contraception_status.title') }}
              </div>
              <BaseLabelTooltip
                placement="topright"
                :label-content="$t('contract_pet.pet_tooltip')"
              />
            </div>
            <div class="info-box__text text-right text-darker">
              <span
                >{{
                  _.get(petInfo, 'contraception') ===
                  constContract.notice_cd.notice_cd01.selectFlg_Y
                    ? $t('common.contraception_status.yep')
                    : $t('common.contraception_status.none')
                }}
              </span>
            </div>
          </li>
          <li
            class="info-box__item d-flex align-items-center justify-content-between"
          >
            <div class="info-box__title text-">
              {{ $t('common.dob.title') }}
            </div>
            <div class="info-box__text text-right text-darker">
              <span>{{ _.get(petInfo, 'birthdayData', '') }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="page-button mb-28 pb-72 text-center">
        <BaseButton
          id="myPagePet_editSubmit"
          btn-class="test tracking"
          :label="$t('common.button.save')"
          btn-full="btn--full"
          :disabled="btnHandleFileUpload"
          @click="handleFileUpload"
        />
      </div>

      <!-- <div class="page-button pb-5 text-center button-green-out-line">
        <BaseButton
          btn-class="mw-100"
          :label="$t('common.button.cancel')"
          btn-green-outline
          @click="$router.push('/mypage/contracts/')"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import contract from '~/constants/contract';
import { mapState } from 'vuex';
import { get } from 'lodash';

import BaseButton from '~/components/formItems/BaseButton';
import BaseLabelTooltip from '~/components/formItems/BaseLabelTooltip';
import BaseLabel from '~/components/formItems/BaseLabel';

export default {
  components: { BaseButton, BaseLabelTooltip, BaseLabel },
  middleware: ['auth'],
  data() {
    return {
      file: '',
      isLoading: true,
      petInfo: {},
      url_list_img: null,
      validatePetImage: '',
      constContract: contract,
      contractInfo: {},
      labelHelp: '',
      notiPetImage: this.$t('contract_pet.title_insurance'),
      btnHandleFileUpload: true,
      petFileName: '',
      policyVersion: null,
    };
  },
  computed: {
    ...mapState({
      policyId: (state) => state.contracts.policyId,
      listContractInfo: (state) => state.contracts.listContractInfo,
    }),
    titlePhotograph() {
      if (this.url_list_img) {
        return this.$t('contract_pet.title_photograph_uploaded');
      }

      return this.$t('contract_pet.title_photograph');
    },
    checkPetWeight() {
      let petWeight = _.get(this.petInfo, 'weight', '').toString();
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
    if (
      this.policyId === undefined ||
      this.policyId === null ||
      this.policyId === ''
    ) {
      this.$store.commit(
        'contracts/setPolicyId',
        localStorage.getItem('policyId_refresh')
      );
      localStorage.removeItem('policyId_refresh');
    }

    await this.$store.dispatch('contracts/contractInfoV2', {
      policyId: this.policyId,
    });

    this.isLoading = false;
    this.policyVersion = this.listContractInfo.policy.version;

    let docFileName = get(
      this.listContractInfo.policy.contractSubjectPetList[0],
      'petPhotoDoc'
    );

    if (docFileName) {
      this.petFileName = docFileName;

      let petImage = await this.$store.dispatch('contracts/s3download', {
        imageKey: this.petFileName,
      });

      if (petImage.docShareUrl) {
        this.url_list_img = petImage.docShareUrl;
      }
    }

    this.petInfo = this.listContractInfo.policy.contractSubjectPetList[0];
    this.petInfo.birthdayData = this.petBirthday(
      this.petInfo.birthDate,
      this.petInfo.birthDateDiv
    );

    if (this.url_list_img) {
      this.labelHelp = this.$t('contract_pet.label_help_insurance');
    }
  },
  methods: {
    imagePreview(e) {
      this.file = e.target.files[0];
      if (this.file) {
        this.validatePetImage = this.validateImageFile(this.file);

        if (!this.validatePetImage.length) {
          const reader = new FileReader();

          reader.addEventListener(
            'load',
            () => {
              this.url_list_img = reader.result;
            },
            false
          );

          reader.readAsDataURL(this.file);
          this.labelHelp = this.$t('contract_pet.label_help_insurance');
          this.btnHandleFileUpload = false;

          return;
        }

        this.file = null;
      }
      // 登録前のデータ（プレビューデータ）をクリアする
      this.url_list_img = null;
    },

    validateImageFile(file) {
      let validatePetImage = '';
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
        validatePetImage = this.$t('contract_pet.upload_file_error');
      }

      return validatePetImage;
    },

    async handleFileUpload() {
      this.notiPetImage = this.$t('contract_pet.loading_image');
      setTimeout(() => {
        this.$store.commit('setLoading', false);
      }, 1500000);

      const response = await this.$store.dispatch('contracts/uploadPhotoPet', {
        file: this.file,
        policyId: this.policyId,
        policyVersion: this.policyVersion,
      });

      this.policyVersion = response.latestPolicyVersion;

      if (response === 'imageExtensionErrorDetected') {
        this.notiPetImage = this.$t('contract_pet.title_insurance');
        this.btnHandleFileUpload = true;
        return (this.validatePetImage =
          this.$t('contract_pet.upload_file_error') + '<br>');
      }

      this.notiPetImage = this.$t('contract_pet.title_insurance');
      this.btnHandleFileUpload = true;
      await this.$store.dispatch('contracts/contractInfoV2', {
        policyId: this.policyId,
      });

      let docFileName = get(
        this.listContractInfo.policy.contractSubjectPetList[0],
        'petPhotoDoc'
      );

      if (docFileName) {
        this.petFileName = docFileName;

        let petImage = await this.$store.dispatch('contracts/s3download', {
          imageKey: this.petFileName,
        });

        if (petImage.docShareUrl) {
          this.url_list_img = petImage.docShareUrl;
        }
      }
    },

    preventNav() {
      localStorage.setItem('policyId_refresh', this.policyId);
    },

    changePhoto() {
      this.labelHelp = '';
      let fileInputElement = this.$refs.file;
      console.log(fileInputElement);
      fileInputElement.click();
    },

    petBirthday(petBirthday, petBirthdayDiv) {
      const div = petBirthdayDiv == 1 ? '確定' : '推定';
      return (
        petBirthday.substring(0, 4) +
        this.$t('contract_pet.year') +
        petBirthday.substring(5, 7) +
        this.$t('contract_pet.month') +
        ' (' +
        div +
        ')'
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/dp-0099';
</style>
