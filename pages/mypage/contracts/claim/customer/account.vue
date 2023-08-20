<template>
  <main class="page-content bg-gray claim">
    <!-- タイトル -->
    <ClaimPageTitle title="保険金請求" />

    <!-- パンくずリスト -->
    <div class="mt-4">
      <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
    </div>

    <!-- 口座情報の入力 -->
    <div class="mt-10">
      <ClaimPageHeadText title="口座情報の入力" />
      <!-- 口座名義人 -->
      <div class="mt-9">
        <ClaimFormLabel title="口座名義人（カナ）" required />
        <div class="mt-2">
          <ClaimTextInput
            v-model="dataForm.accountHolderName"
            v-validate="{
              required: true,
              max: 25,
              regex: [
                regex.KANA_FULLSIZE,
                $t('messages.params_message.regex_KANA_FULLSIZE'),
              ],
            }"
            placeholder="ヤマダタロウ"
            :error="errors.first('accountHolderName')"
            data-vv-as="口座名義人（カナ）"
            name="accountHolderName"
          />
        </div>
      </div>

      <!-- ご契約者様との続柄 -->
      <div class="mt-9">
        <ClaimFormLabel title="ご契約者様との続柄" required />
        <div class="flex-between gap-2 mt-3">
          <ClaimTextRadioButton
            label="ご本人"
            :is-check="dataForm.relationshipWithContractor === 1"
            @click="() => onClickRelationshipWithContractor(1)"
          />
          <ClaimTextRadioButton
            label="配偶者"
            :is-check="dataForm.relationshipWithContractor === 2"
            @click="() => onClickRelationshipWithContractor(2)"
          />
        </div>
        <div class="flex-between gap-2 mt-2">
          <ClaimTextRadioButton
            label="同居のご家族"
            :is-check="dataForm.relationshipWithContractor === 3"
            @click="() => onClickRelationshipWithContractor(3)"
          />
          <ClaimTextRadioButton
            label="別居の未婚の子"
            :is-check="dataForm.relationshipWithContractor === 4"
            @click="() => onClickRelationshipWithContractor(4)"
          />
        </div>
        <div class="mt-2">
          <p class="text-gray-light text-body-xs">
            ご契約者さまと生計を共にするご家族に限ります。
          </p>
          <p class="text-body-xs text-attention mt-1">
            ※上記の選択肢に該当しない方の口座はご登録できません。
          </p>
        </div>
      </div>

      <!-- 金融機関 -->
      <div class="mt-9">
        <ClaimFormLabel title="金融機関" required />
        <div class="flex-between gap-2 mt-3">
          <ClaimTextRadioButton
            label="ゆうちょ銀行以外"
            :is-check="dataForm.fiType === 1"
            @click="() => onClickFiType(1)"
          />
          <ClaimTextRadioButton
            label="ゆうちょ銀行"
            :is-check="dataForm.fiType === 2"
            @click="() => onClickFiType(2)"
          />
        </div>
      </div>

      <!-- 金融機関名 -->
      <div class="mt-9">
        <ClaimFormLabel title="金融機関名" required />
        <!-- ゆうちょ -->
        <div v-if="dataForm.fiType === 2" class="mt-2">
          <ClaimTextInput
            v-model="dataForm.financialInstitutionName"
            v-validate="'required'"
            placeholder="ゆうちょ銀行"
            :error="errors.first('financialInstitutionName')"
            data-vv-as="金融機関名"
            name="financialInstitutionName"
            :disabled="dataForm.fiType === 2"
          />
          <p class="text-gray-light text-body-xs mt-2">
            ※下記リンクから支店名・口座種類・口座番号をご確認ください。
          </p>
          <a
            href="https://www.jp-bank.japanpost.jp/kojin/sokin/furikomi/kouza/kj_sk_fm_kz_1.html"
            target="_blank"
            class="text-primary text-body-xs mt-1"
          >
            記号番号から振込用の店名・口座種類・口座番号を調べるーゆうちょ銀行
          </a>
        </div>

        <!-- ゆうちょ銀行以外 -->
        <div v-if="dataForm.fiType === 1" class="mt-2">
          <ClaimTextInput
            v-model="dataForm.financialInstitutionName"
            v-validate="'required'"
            :error="errors.first('financialInstitutionName')"
            data-vv-as="金融機関名"
            name="financialInstitutionName"
            suggestion-id="financialInstitutionName"
            :suggestions="bankList"
          />
        </div>
      </div>

      <!-- 支店名 -->
      <div class="mt-9">
        <ClaimFormLabel title="支店名" required />
        <!-- ゆうちょ -->
        <div v-if="dataForm.fiType === 2" class="mt-2">
          <ClaimTextInput
            v-model="dataForm.branchName"
            v-validate="{
              required: true,
              regex: [
                regex.KANJI_NUMBER_THREE_CHAR,
                $t('messages.params_message.regex_KANJI_NUMBER_THREE_CHAR'),
              ],
            }"
            placeholder="〇一八"
            :error="errors.first('branchName')"
            data-vv-as="支店名"
            name="branchName"
          />
          <p class="text-gray-light text-body-xs mt-2">
            ※漢数字3桁をご入力ください
          </p>
        </div>

        <!-- ゆうちょ銀行以外 -->
        <div v-if="dataForm.fiType === 1" class="mt-2">
          <ClaimTextInput
            v-model="dataForm.branchName"
            v-validate="'required'"
            :error="errors.first('branchName')"
            data-vv-as="支店名"
            name="branchName"
            suggestion-id="branchName"
            :suggestions="bankBranchList"
          />
        </div>
      </div>
    </div>

    <!-- 口座種類 -->
    <div class="mt-9">
      <ClaimFormLabel title="口座種類" required />
      <div class="flex-between gap-2 mt-3">
        <ClaimTextRadioButton
          label="普通"
          :is-check="dataForm.accountType === 1"
          @click="() => onClickAccountType(1)"
        />
        <ClaimTextRadioButton
          label="当座"
          :is-check="dataForm.accountType === 2"
          @click="() => onClickAccountType(2)"
        />
        <ClaimTextRadioButton
          label="貯蓄"
          :is-check="dataForm.accountType === 3"
          @click="() => onClickAccountType(3)"
        />
      </div>
    </div>

    <!-- 口座番号 -->
    <div class="mt-9">
      <ClaimFormLabel title="口座番号" required />
      <div class="mt-2">
        <ClaimTextInput
          v-model="dataForm.accountNumber"
          v-validate="{
            required: true,
            account_number: true,
          }"
          placeholder=""
          :error="errors.first('accountNumber')"
          data-vv-as="口座番号"
          name="accountNumber"
        />
        <p class="text-gray-light text-body-xs mt-2">
          7桁でご入力ください。<br />
          ※6桁以下の場合は、頭に「0」をつけて7桁でご入力ください。
        </p>
      </div>
    </div>

    <!-- 下部のボタン -->
    <div class="mt-6">
      <div class="flex justify-center mt-14">
        <div style="width: 279px">
          <BaseButton
            width="279px"
            label="変更する"
            btn-full="btn--full"
            icon-right
            :disabled="errors.items.length > 0"
            @click="nextStep"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BaseButton from '@/components/formItems/BaseButton';
import ClaimBreadcrumbs from '@/components/claim/parts/ClaimBreadcrumbs';
import ClaimPageTitle from '@/components/claim/parts/ClaimPageTitle';
import ClaimTextInput from '@/components/claim/parts/ClaimTextInput';
import ClaimFormLabel from '@/components/claim/parts/ClaimFormLabel';
import ClaimPageHeadText from '@/components/claim/parts/ClaimPageHeadText';
import ClaimTextRadioButton from '@/components/claim/parts/ClaimTextRadioButton';
import * as regex from '@/constants/regex';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    BaseButton,
    ClaimBreadcrumbs,
    ClaimPageTitle,
    ClaimTextInput,
    ClaimFormLabel,
    ClaimPageHeadText,
    ClaimTextRadioButton,
  },
  layout: 'claim',
  middleware: ['auth'],
  async asyncData({ store }) {
    await store.dispatch('claim/fetchBankInfo');
  },
  data() {
    return {
      regex,
      customer: {},
      customerVersion: 0,
      selectedBankFinancialCode: '',
      bankList: [],
      bankBranchList: [],
      dataForm: {
        accountHolderName: '', // 口座名義人
        relationshipWithContractor: 1, // ご契約者様との続柄 (1-ご本人, 2-配偶者, 3-同居のご親族, 4-別居の未婚の子)
        fiType: 1, // 金融機関 (1-ゆうちょ銀行以外, 2-ゆうちょ銀行)
        financialInstitutionName: '', // 金融機関名
        branchName: '', // 支店名
        accountType: 1, // 口座種類 (1-普通, 2-当座, 3-総合)
        accountNumber: '', // 口座番号
      },
    };
  },
  computed: {
    ...mapState({
      bankInfo: (state) => state.claim.bankInfo,
      bankBranchInfo: (state) => state.claim.bankBranchInfo,
      customerInfo: (state) => state.contracts.customerInfo,
    }),
  },
  watch: {
    'dataForm.financialInstitutionName': {
      handler(value) {
        if (this.dataForm.fiType === 1) {
          const bank = this.bankInfo.find(
            (bank) => bank.codeNameKanji === value
          );
          if (bank) {
            this.selectedBankFinancialCode = bank.financialCode;
          } else {
            this.selectedBankFinancialCode = '';
            this.bankBranchList = [];
          }
        }
      },
      immediate: false,
    },
    selectedBankFinancialCode: {
      handler(value) {
        if (value === '') {
          return;
        }
        this.fetchBankBranchInfo({ financialCode: value });
      },
      immediate: false,
    },
    bankInfo: {
      handler(value) {
        this.bankList = value.map((bank) => bank.codeNameKanji);
      },
      immediate: true,
    },
    bankBranchInfo: {
      handler(value) {
        if (value.length === 0) {
          return;
        }
        this.bankBranchList = value.map(
          (bankBranch) =>
            bankBranch.codeNameKanji +
            '（' +
            bankBranch.financialCode.split('-')[1] +
            '）'
        );
      },
      immediate: false,
    },
  },
  async created() {
    const customer = await this.$store.dispatch('contracts/customerInfo');
    this.customer = customer;
    this.customerVersion = customer.version;

    // 登録済みの口座情報をデフォルト値として dataForm にセット
    this.dataForm.accountHolderName = customer.accoName;
    this.dataForm.relationshipWithContractor = parseInt(
      customer.accountRelaToPH
    );
    this.dataForm.fiType = customer.bankCode === 'ゆうちょ銀行' ? 2 : 1;
    this.dataForm.financialInstitutionName = customer.bankCode;
    this.dataForm.branchName = customer.branchCode;
    this.dataForm.accountType = customer.accountType;
    this.dataForm.accountNumber = customer.bankAccount;
  },
  methods: {
    ...mapActions({
      fetchBankBranchInfo: 'claim/fetchBankBranchInfo',
      updateBankAccount: 'claim/updateBankAccount',
    }),
    nextStep() {
      this.$validator.validate().then(async (result) => {
        if (!result) {
          return true;
        }
        await this.updateBankAccount({
          ...this.dataForm,
          version: this.customerVersion,
        });
        await this.$router.push('/mypage/contracts/claim/customer/');
      });
    },
    onClickRelationshipWithContractor(value) {
      this.dataForm.relationshipWithContractor = value;
    },
    onClickFiType(value) {
      this.dataForm.fiType = value;
      this.dataForm.branchName = '';
      if (value === 2) {
        this.dataForm.financialInstitutionName = 'ゆうちょ銀行';
      } else {
        this.dataForm.financialInstitutionName = '';
      }
    },
    onClickAccountType(value) {
      this.dataForm.accountType = value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
</style>
