<template>
  <main class="page-content bg-gray claim">
    <!-- タイトル -->
    <ClaimPageTitle title="保険金請求" />

    <!-- パンくずリスト -->
    <div class="mt-4">
      <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
    </div>

    <!-- 登録済み告知情報の確認 -->
    <div class="mt-10">
      <ClaimPageHeadText title="登録済み告知情報の確認" />
      <div class="mt-6">
        <p class="text-gray text-body-sm">
          ご請求にあたり、ご加入時に登録されている情報が正しいかご確認をお願いいたします。下記の内容に間違いがなければ、「次へ」ボタンを押してください。
        </p>
      </div>
    </div>

    <!-- 告知情報（病歴） -->
    <div class="mt-7.5">
      <ClaimPageHeadText title="告知情報(病歴)" />
      <!-- 告知情報が無いとき -->
      <div v-if="!contractInfo?.contractDiagnosisDecl" class="mt-6">
        <p class="text-gray text-body-sm">・告知事項はありません</p>
      </div>
      <div v-if="contractInfo?.contractDiagnosisDecl" class="mt-6">
        <p
          v-for="(contractDiagnosis, index) in filteredDeclarationDisease"
          :key="{ index }"
          class="text-gray text-body-sm mt-2"
        >
          ・{{ contractDiagnosis.diagnosisName }}
        </p>
      </div>
    </div>

    <!-- <病名> について -->
    <div v-if="contractInfo?.contractDiagnosisDecl">
      <div
        v-for="(contractDiagnosis, index) in contractInfo?.contractDiagnosisDecl
          .contractDiagnosisTwoDeclList"
        :key="{ index }"
        class="mt-7.5"
      >
        <ClaimPageHeadText
          :title="getDiseaseName(contractDiagnosis.diagnosisCode) + 'について'"
        />
        <div class="mt-6">
          <ClaimTable
            title="発症日"
            :content="getFormatDate(contractDiagnosis.diseaseDate) || ''"
          />
          <ClaimTable
            title="ケガ・病気の状況"
            :content="getDiseaseStatus(contractDiagnosis.diseaseStatus)"
          />
          <ClaimTable
            v-if="contractDiagnosis.healingDate"
            title="完治日"
            :content="getFormatDate(contractDiagnosis.healingDate) || ''"
          />
          <ClaimTable
            title="診療時の治療内容"
            :content="
              getDiseaseTreatmentMethod(contractDiagnosis.treatmentMethod)
            "
          />
          <div
            v-if="contractDiagnosis.examinationResultDocId"
            class="claim-table-wrapper"
          >
            <div>
              <span class="text-gray text-body-sm">検索結果のアップロード</span>
            </div>
            <span class="text-gray text-body text-black-light mt-2">
              <img
                width="100%"
                :src="examinationResultDocUrlList[index]"
                alt=""
            /></span>
          </div>

          <ClaimTable
            title="過去にも同じ症状を発症したことがありますか？"
            :content="getDiseaseHasHistory(contractDiagnosis.hasHistory)"
          />
        </div>
      </div>
    </div>

    <!-- ワクチン -->
    <div v-if="contractInfo?.contractDiagnosisDecl">
      <div v-for="(vaccine, index) in vaccineList" :key="index" class="mt-7.5">
        <ClaimPageHeadText
          :title="
            vaccine.vaccineCode === '1' ? '混合ワクチン' : '狂犬病ワクチン'
          "
        />
        <div class="mt-6">
          <ClaimTable
            title="ワクチン接種の有無"
            :content="vaccine.isVaccinated ? 'あり' : 'なし'"
          />
          <ClaimTable
            v-if="vaccine.isVaccinated"
            title="直近の接種日"
            :content="getFormatDate(vaccine.vaccinationDate) || ''"
          />
        </div>
      </div>
    </div>

    <!-- 注意事項 -->
    <div class="mt-7.5">
      <ClaimTile
        title="注意事項"
        content="告知情報とは告知義務の対象となる事項です。告知情報を隠蔽したり、虚偽の申告をした場合は告知義務違反に該当します。保険金をお支払いしない、または契約解除となる恐れがございますのでご注意ください。"
      />
    </div>
    <div class="mt-3">
      <ClaimCheckBox
        title="確認しました"
        :checked="isChecked"
        :on-click="onClickCheckBox"
      />
    </div>

    <!-- 下部のボタン -->
    <div class="mt-6">
      <div class="flex justify-center mt-14">
        <div style="width: 279px">
          <BaseButton
            width="279px"
            :label="$t('common.button.next')"
            btn-full="btn--full"
            icon-right
            :disabled="!isChecked"
            @click="handleNextStep"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BaseButton from '~/components/formItems/BaseButton';
import ClaimBreadcrumbs from '~/components/claim/parts/ClaimBreadcrumbs';
import ClaimPageTitle from '~/components/claim/parts/ClaimPageTitle';
import ClaimTile from '~/components/claim/parts/ClaimTile';
import ClaimCheckBox from '~/components/claim/parts/ClaimCheckBox';
import ClaimTable from '~/components/claim/parts/ClaimTable';
import ClaimPageHeadText from '@/components/claim/parts/ClaimPageHeadText';
import { mapGetters } from 'vuex';
import moment from 'moment/moment';

export default {
  components: {
    BaseButton,
    ClaimBreadcrumbs,
    ClaimPageTitle,
    ClaimPageHeadText,
    ClaimTable,
    ClaimTile,
    ClaimCheckBox,
  },
  layout: 'claim',
  middleware: ['auth'],
  data() {
    return {
      isChecked: false,
      allDeclarationDisease: [
        {
          diagnosisCode: '',
          diagnosisName: '',
        },
      ],
      vaccineList: [
        {
          vaccineCode: '1', // 混合ワクチン
          isVaccinated: false, // ワクチン接種の有無
          vaccinationDate: '', // 直近の接種日
        },
        {
          vaccineCode: '2', // 狂犬病ワクチン
          isVaccinated: false, // ワクチン接種の有無
          vaccinationDate: '', // 直近の接種日
        },
      ],
      examinationResultDocUrlList: [], // 個々の病気に対応した検査結果画像 URL
      contractInfo: {},
      customer: null,
    };
  },
  computed: {
    ...mapGetters({
      contractsList: 'contracts/getListContractInfo',
      policyId: 'contracts/getPolicyId',
    }),
    filteredDeclarationDisease() {
      const diagnosisCodes =
        this.contractInfo?.contractDiagnosisDecl.contractDiagnosisTwoDeclList.map(
          (contractDiagnosis) => contractDiagnosis.diagnosisCode
        );
      return this.allDeclarationDisease.filter((disease) =>
        diagnosisCodes.includes(disease.diagnosisCode)
      );
    },
  },
  async created() {
    // 病気コードと病名一覧を取得
    this.allDeclarationDisease = await this.$store.dispatch(
      'diseaseHistory/fetchAllDeclarationDisease'
    );

    // 該当の契約情報取得
    this.contractInfo = this.contractsList.find(
      (contract) => contract.policy.policyId === this.policyId
    );

    // 表示に使うワクチン情報を設定
    this.setVaccineList();

    // 飼い主情報を取得
    this.customer = await this.$store.dispatch('contracts/customerInfo');

    // 個々の病気に対応した検査結果画像 URL を取得
    const promises =
      this.contractInfo?.contractDiagnosisDecl.contractDiagnosisTwoDeclList.map(
        (contractDiagnosis) =>
          this.getDocUrl(contractDiagnosis.id).catch((error) => {
            console.log(
              `Failed to get doc URL for id: ${contractDiagnosis.id}, error: ${error}`
            );
            return '';
          })
      );
    this.examinationResultDocUrlList = await Promise.all(promises);
  },
  methods: {
    onClickCheckBox() {
      this.isChecked = !this.isChecked;
    },
    handleNextStep() {
      if (this.customer.bankCode) {
        this.$router.push('/mypage/contracts/claim/customer/');
      } else {
        // 口座情報が入力されていないとき登録ページヘ遷移
        this.$router.push('/mypage/contracts/claim/customer/account');
      }
    },
    getDiseaseName(code) {
      const disease = this.allDeclarationDisease.filter(
        (disease) => disease.diagnosisCode === code
      );
      return disease[0].diagnosisName;
    },
    getDiseaseStatus(status) {
      switch (status) {
        case '1':
          return '疑いあり・検査を予定';
        case '2':
          return '治療中（薬・サプリ・療法食を継続）';
        case '3':
          return '経過観察中';
        case '4':
          return '完治';
        default:
          return '';
      }
    },
    getDiseaseTreatmentMethod(treatmentMethod) {
      switch (treatmentMethod) {
        case '1':
          return '検査';
        case '2':
          return '注射・点滴';
        case '3':
          return '処方（薬・サプリ・療法食）';
        case '4':
          return '入院・手術';
        case '5':
          return 'その他';
        default:
          return '';
      }
    },
    getDiseaseHasHistory(hasHistory) {
      switch (hasHistory) {
        case '1':
          return 'はい（1回）';
        case '2':
          return 'はい（2回以上）';
        case '0':
          return 'いいえ';
        default:
          return '';
      }
    },
    setVaccineList() {
      const defaultVaccineList = this.vaccineList;

      const threeDeclList =
        this.contractInfo.contractDiagnosisDecl.contractDiagnosisThreeDeclList;
      if (!threeDeclList || threeDeclList.length === 0) {
        return;
      }

      this.vaccineList = defaultVaccineList.map((def) => {
        const vaccine = threeDeclList.find(
          (item) => item.vaccineCode === def.vaccineCode
        );
        return vaccine
          ? {
              vaccineCode: vaccine.vaccineCode,
              isVaccinated: vaccine.vaccineOrNot === 'Y',
              vaccinationDate: vaccine.vaccinationDate || '',
            }
          : def;
      });
    },
    getFormatDate(date) {
      return moment(date).format('YYYY/MM/DD');
    },
    async getDocUrl(docId) {
      const image = await this.$store.dispatch('contracts/s3download', {
        imageKey: docId,
      });

      return image.docShareUrl || '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
.claim-table-wrapper {
  padding: 13px 8px 10px 8px;
  border: 0px;
  border-bottom: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.15);
}
</style>
