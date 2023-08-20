<script src="../../../../constants/diseases.js"></script>
<template>
  <main class="page-content bg-gray">
    <PageTitle logo />
    <div class="container">
      <div class="rules-title mb-10 mt-21">{{ bodySite.name }}の病歴</div>
      <BaseLabel
        label-class="base-label--custom"
        :label-title="
          bodySite.code === '15' // その他
            ? $t('illness.ever_diagnosed_or_treated_illnesses_others')
            : $t('illness.ever_diagnosed_or_treated_illnesses')
        "
        required
      />
      <ul>
        <li
          v-for="d in diagnosisMaster.filter(
            (item) => item.diagnosisName !== '分からない'
          )"
          :key="d.listId"
          class="mt-8"
        >
          <BaseInputCheckbox
            :id="'AddInfo_diseases_' + d.listId"
            v-model="declarationList"
            :label="d.diagnosisName"
            name="disease_list"
            :input-value="d.diagnosisCode"
            outline
            check-disease
            :checked="declarationList.indexOf(d.diagnosisCode) >= 0"
          />
        </li>
      </ul>
      <div class="mt-12 px-4">
        <div class="text-center">
          <button
            class="text-button text-green font-14px"
            :disabled="declarationList.length > 0"
            @click="handleDontKnow"
          >
            病名は分からない
          </button>
        </div>
      </div>
      <div v-if="isCheckedOther" class="mt-40">
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
          :error="errors.first('otherDiagnosisDesc')"
          :placeholder="$t('illness.other_diagnosed_placeholder')"
          :data-vv-as="$t('illness.other_diagnosed_placeholder')"
          class="mt-12"
        />
      </div>
      <div v-if="isCheckedDisease && shouldBeRequiredBodySite" class="mt-40">
        <BaseLabel
          label-class="base-label--custom"
          :label-title="$t('illness.disease_site')"
          required
        />
        <BaseInput
          id="other_disease_site"
          v-model="diseaseSite"
          v-validate="{
            required: true,
            max: 400,
          }"
          name="diseaseSite"
          :error="errors.first('diseaseSite')"
          :placeholder="$t('illness.disease_site_placeholder')"
          :data-vv-as="$t('illness.disease_site_placeholder')"
          class="mt-12"
        />
      </div>
      <div class="mt-56 px-4 pb-72">
        <div>
          <BaseButton
            id="myPagePet_imageEdit"
            btn-full="btn--full"
            btn-class="mw-100 tracking"
            :label="$t('illness.none')"
            btn-green-outline
            :disabled="declarationList.length > 0"
            @click="handleClickNone"
          />
        </div>
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
import { DISEASE_MASTER } from '../../../../constants/diseases';
import { mapGetters, mapMutations } from 'vuex';
import BaseInputCheckbox from '~/components/formItems/BaseInputCheckbox';
import BaseLabel from '~/components/formItems/BaseLabel';
import BaseButton from '~/components/formItems/BaseButton';
import BaseInput from '~/components/formItems/BaseInput';

export default {
  components: {
    BaseInputCheckbox,
    BaseLabel,
    BaseButton,
    BaseInput,
  },
  data() {
    return {
      listErrors: [],
      diagnosisMaster: [], // 病気のマスター
      declarationList: [], // チェックした病気のidリスト
      declarationDisease: [], // Global Stateに保持する病気のリスト
      otherDiagnosisDesc: '', // その他の病気に関する説明
      diseaseSite: '', // その他の部位
      bodySite: {},
    };
  },
  computed: {
    ...mapGetters({
      getDiseaseCodeMaster: 'diseaseHistory/getDiseaseCode',
      getDeclarationDisease: 'diseaseHistory/getDeclarationDisease',
    }),
    isCheckedDisease() {
      return this.declarationList.length > 0;
    },
    isCheckedOther() {
      return this.declarationList.includes(
        this.diagnosisMaster.find((d) => d.diagnosisName === 'その他')
          ?.diagnosisCode
      );
    },
    shouldBeRequiredBodySite() {
      // 骨・関節・筋肉, 皮膚・耳, 腫瘍の場合は「その他の部位」も聞く
      return ['9', '12', '13'].includes(this.bodySite.code);
    },
    isDisabledNext() {
      if (this.isCheckedOther) {
        return (
          this.listErrors.length > 0 ||
          this.otherDiagnosisDesc === '' ||
          (this.shouldBeRequiredBodySite && this.diseaseSite === '')
        );
      }
      return (
        this.listErrors.length > 0 ||
        !this.isCheckedDisease ||
        (this.shouldBeRequiredBodySite && this.diseaseSite === '')
      );
    },
  },
  async mounted() {
    const bodySiteName = this.$route.params?.bodySite;
    this.bodySite = DISEASE_MASTER.bodySiteMap[bodySiteName];
    await this.$store.dispatch(
      'diseaseHistory/getDiseaseCodeMaster',
      this.bodySite.code
    );
    this.diagnosisMaster = this.getDiseaseCodeMaster(this.bodySite.code);

    const declarationDisease = this.getDeclarationDisease(this.bodySite.code);

    this.declarationList = declarationDisease.map((item) => item.diagnosisCode);
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
  methods: {
    ...mapMutations({
      setDeclarationDisease: 'diseaseHistory/setDeclarationDiseaseDetail',
    }),
    async handleClickNext() {
      this.$validator.validate().then(async (result) => {
        if (result) {
          const declarationDiseaseDetail = this.declarationList.map((code) => {
            const diagnosisName = this.diagnosisMaster.find(
              (d) => d.diagnosisCode === code
            )?.diagnosisName;

            return {
              diagnosisName,
              bodySiteCode: this.bodySite.code,
              diagnosisCode: code,
              otherDiagnosisDesc:
                diagnosisName === 'その他' ? this.otherDiagnosisDesc : '',
              diseaseSite: this.diseaseSite,
            };
          });
          this.setDeclarationDisease({
            bodySiteCode: this.bodySite.code,
            declarationDiseaseDetail: declarationDiseaseDetail,
          });
          this.$router.push(
            `/solicitation/disease/declaration/detail/${this.$route.params?.bodySite}`
          );
        } else {
          console.log('error');
        }
      });
    },
    handleClickNone() {
      this.$router.push(
        `/solicitation/disease/declaration/${this.bodySite.next}`
      );
    },
    handleDontKnow() {
      const dontKnow = this.diagnosisMaster.find(
        (d) => d.diagnosisName === '分からない'
      );

      this.setDeclarationDisease({
        bodySiteCode: this.bodySite.code,
        declarationDiseaseDetail: [
          {
            bodySiteCode: this.bodySite.code,
            diagnosisName: dontKnow.diagnosisName,
            diagnosisCode: dontKnow.diagnosisCode,
            otherDiagnosisDesc: '',
            diseaseSite: '',
          },
        ],
      });
      this.$router.push(
        `/solicitation/disease/declaration/detail/${this.$route.params?.bodySite}`
      );
    },
  },
};
</script>
<style lang="scss" scoped>
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
