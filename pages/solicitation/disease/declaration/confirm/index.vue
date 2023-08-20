<template>
  <main class="page-content bg-gray">
    <PageTitle logo />
    <div class="container">
      <div class="rules-title mb-10 mt-21">申込情報の確認</div>
      <BaseLabel
        label-class="base-label--custom"
        :label-title="$t('illness.confirm')"
      />
      <div>
        <div class="rules-title mb-10 mt-21">告知情報</div>
        <div class="info-box mb-34">
          <ul class="info-box__list">
            <li
              class="info-box__item d-flex align-items-center justify-content-between"
            >
              <div
                class="info-box__title"
                v-text="$t('common.gender.gender_title')"
              />
              <div class="info-box__text text-right text-darker">
                <span
                  v-text="
                    petInfo.petSexCd === 'M'
                      ? $t('common.gender.boy')
                      : $t('common.gender.girl')
                  "
                />
              </div>
            </li>
            <li
              class="info-box__item d-flex align-items-center justify-content-between"
            >
              <div
                class="info-box__title"
                v-text="$t('illness.contraception_status.title')"
              />
              <div class="info-box__text text-right text-darker">
                <span
                  v-text="
                    petInfo.noticeCd01 === 'Y'
                      ? $t('illness.contraception_status.yes')
                      : $t('illness.contraception_status.no')
                  "
                />
              </div>
            </li>
            <li
              class="info-box__item d-flex align-items-center justify-content-between"
            >
              <div
                class="info-box__title"
                v-text="$t('illness.ins_pet_register.title')"
              />
              <div class="info-box__text text-right text-darker">
                <span
                  v-text="
                    petInfo.petInsJoinFlg === '1'
                      ? $t('illness.ins_pet_register.no')
                      : $t('illness.ins_pet_register.yes')
                  "
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="mb-34">
        <div class="rules-title mb-10">告知情報(病歴)</div>
        <ul>
          <li
            v-for="disease in allDeclarationDisease"
            :key="disease.diagnosisCode"
            class="mb-2"
          >
            ・{{ disease.diagnosisName }}
          </li>
        </ul>
      </div>

      <div>
        <div v-for="(disease, index) in allDeclarationDisease" :key="index">
          <div class="rules-title mb-10">
            {{ disease.diagnosisName }}について
          </div>
          <div class="info-box mb-34">
            <ul class="info-box__list">
              <li
                class="info-box__item d-flex align-items-center justify-content-between"
              >
                <div
                  class="info-box__title"
                  v-text="$t('illness.disease_date')"
                />
                <div class="info-box__text text-right text-darker">
                  <span v-text="disease.diseaseDate" />
                </div>
              </li>
              <li
                class="info-box__item d-flex align-items-center justify-content-between"
              >
                <div
                  class="info-box__title"
                  v-text="$t('illness.disease_status')"
                />
                <div class="info-box__text text-right text-darker">
                  <span>{{
                    diseaseMaster.diseaseStatus.find(
                      (item) => item.statusCode === disease.diseaseStatus
                    )?.statusName
                  }}</span>
                </div>
              </li>
              <li
                v-if="disease.diseaseStatus === '4'"
                class="info-box__item d-flex align-items-center justify-content-between"
              >
                <div
                  class="info-box__title"
                  v-text="$t('illness.healingDate')"
                />
                <div class="info-box__text text-right text-darker">
                  <span v-text="disease.healingDate" />
                </div>
              </li>
              <li
                class="info-box__item d-flex align-items-center justify-content-between"
              >
                <div class="info-box__title" v-text="$t('illness.treatment')" />
                <div class="info-box__text text-right text-darker">
                  <span>{{
                    diseaseMaster.treatmentMethod.find(
                      (item) => item.methodCode === disease.treatmentMethod
                    )?.methodName
                  }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div v-if="disease.treatmentMethod === '1'" class="mb-34">
            <BaseLabel
              label-class="base-label--custom"
              :label-title="$t('illness.upload_examination_result.label')"
            />
          </div>
          <div class="mb-34">
            <BaseLabel
              label-class="base-label--custom"
              :label-title="
                disease.diagnosisName + $t('illness.disease_history.title')
              "
            />
            <p>
              {{
                diseaseMaster.diseaseHistory.find(
                  (item) => item.code === disease.hasHistory
                )?.name
              }}
            </p>
            <hr class="mt-24" />
          </div>
        </div>
        <div v-if="vaccination.vaccineCode">
          <div class="rules-title mb-10">
            {{ $t('illness.vaccination.label') }}
          </div>
          <div class="info-box mb-34">
            <ul class="info-box__list">
              <li
                class="info-box__item d-flex align-items-center justify-content-between"
              >
                <div
                  class="info-box__title"
                  v-text="$t('illness.declaration_confirm.vaccination.status')"
                />
                <div class="info-box__text text-right text-darker">
                  <span>{{
                    vaccination.vaccineOrNot === 'Y'
                      ? $t('illness.declaration_confirm.vaccination.status_yes')
                      : $t('illness.declaration_confirm.vaccination.status_no')
                  }}</span>
                </div>
              </li>
              <li
                v-if="vaccination.vaccineOrNot === 'Y'"
                class="info-box__item d-flex align-items-center justify-content-between"
              >
                <div
                  class="info-box__title"
                  v-text="$t('illness.declaration_confirm.vaccination.date')"
                />
                <div class="info-box__text text-right text-darker">
                  <span>{{ vaccination.vaccineDate }}</span>
                </div>
              </li>
            </ul>
            <div>
              <BaseLabel
                class="mt-36"
                :label-title="
                  $t(
                    'illness.declaration_confirm.vaccination.certificate_upload'
                  )
                "
              />
              <img
                :src="vaccineCertificateImage"
                alt=""
                class="preview mt-16"
              />
            </div>
          </div>
        </div>
        <div v-if="rabiesVaccination.vaccineCode">
          <div class="rules-title mb-10">
            {{ $t('illness.rabies_vaccination.label') }}
          </div>
          <div class="info-box mb-34">
            <ul class="info-box__list">
              <li
                class="info-box__item d-flex align-items-center justify-content-between"
              >
                <div
                  class="info-box__title"
                  v-text="$t('illness.declaration_confirm.vaccination.status')"
                />
                <div class="info-box__text text-right text-darker">
                  <span>{{
                    rabiesVaccination.vaccineOrNot === 'Y'
                      ? $t('illness.declaration_confirm.vaccination.status_yes')
                      : $t('illness.declaration_confirm.vaccination.status_no')
                  }}</span>
                </div>
              </li>
              <li
                v-if="rabiesVaccination.vaccineOrNot === 'Y'"
                class="info-box__item d-flex align-items-center justify-content-between"
              >
                <div
                  class="info-box__title"
                  v-text="$t('illness.declaration_confirm.vaccination.date')"
                />
                <div class="info-box__text text-right text-darker">
                  <span>{{ rabiesVaccination.vaccineDate }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="prevent-measure">
        <div class="prevent-measure__title d-flex">
          <BaseLabelTooltip icon-warning />
          <span class="ml-1">{{ $t('illness.final_confirmation') }}</span>
        </div>
        <div
          class="prevent-measure__content"
          v-html="$t('illness.final_confirmation_description')"
        />
      </div>
      <BaseInputCheckbox
        id="final_confirmation_check"
        v-model="isChecked"
        :checked="isChecked"
        center
        outline
        :label="$t('illness.final_confirmation_check')"
      />
      <div class="mt-12 px-4 pb-72">
        <div class="mt-56">
          <BaseButton
            btn-full="btn--full"
            btn-class="mw-100 tracking"
            :label="$t('illness.declaration_submit')"
            btn-green
            :disabled="!isChecked"
            @click="handleClickSubmit"
          />
        </div>
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
import BaseLabelTooltip from '~/components/formItems/BaseLabelTooltip';
import BaseInputCheckbox from '~/components/formItems/BaseInputCheckbox';

import { mapGetters, mapState } from 'vuex';
import { DISEASE_MASTER } from '../../../../../constants/diseases';

export default {
  components: {
    BaseLabel,
    BaseButton,
    BaseLabelTooltip,
    BaseInputCheckbox,
  },
  data() {
    return {
      allDeclarationDisease: [],
      vaccination: {},
      vaccineCertificateImage: '', //接種証明書画像URL
      rabiesVaccination: {},
      diseaseMaster: DISEASE_MASTER,
      isChecked: false,
      petInfo: this.$store.state.contracts.petInfo,
    };
  },
  computed: {
    ...mapState({
      policyId: (state) => state.contracts.policyId,
    }),
    ...mapGetters({
      getAllDeclarationDisease: 'diseaseHistory/getAllDeclarationDisease',
      getVaccination: 'diseaseHistory/getVaccination',
      getRabiesVaccination: 'diseaseHistory/getRabiesVaccination',
      getPetInfo: 'contracts/getPetInfo',
    }),
  },
  async mounted() {
    this.allDeclarationDisease = this.getAllDeclarationDisease();
    this.vaccination = this.getVaccination();
    this.rabiesVaccination = this.getRabiesVaccination();
    await this.getVaccinationCertificateImage(
      this.vaccination.vaccineCertificate
    );
  },
  methods: {
    async handleClickSubmit() {
      await this.$store.dispatch('diseaseHistory/saveDiseaseHistory', {
        policyId: this.policyId,
        petType: this.petInfo.petType,
      });
    },
    async getVaccinationCertificateImage(imageKey) {
      const vaccinationCertificateImage = await this.$store.dispatch(
        'contracts/s3download',
        {
          imageKey,
        }
      );
      console.log(vaccinationCertificateImage);
      this.vaccineCertificateImage = vaccinationCertificateImage.docShareUrl;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~/assets/scss/components/info-box';
@import '~/assets/scss/pages/new-contract';

.preview {
  width: 100%;
  margin-bottom: 16px;
}
</style>
