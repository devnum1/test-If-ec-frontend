<template>
  <main class="page-content bg-gray claim">
    <!-- タイトル -->
    <ClaimPageTitle title="保険金請求" />

    <!-- パンくずリスト -->
    <div class="mt-4">
      <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
    </div>

    <!-- 飼い主情報の確認 -->
    <div class="mt-10">
      <ClaimPageHeadText title="飼い主情報の確認" />
      <div class="mt-6">
        <p class="text-gray text-body-sm">
          ご請求にあたり、登録されている情報が正しいかご確認をお願いいたします。下記の内容に間違いがなければ、「次へ」ボタンを押してください。
        </p>
      </div>
    </div>

    <!-- ご契約者さまの情報 -->
    <div class="mt-7.5">
      <ClaimPageHeadText title="ご契約者さまの情報" />
      <div class="mt-6">
        <ClaimTable
          title="お名前"
          :content="
            customer ? customer.lastName1 + ' ' + customer.firstName1 : ''
          "
        />
        <ClaimTable title="メールアドレス" :content="customer?.email" />
        <ClaimTable title="電話番号" :content="customer?.telephone" />
      </div>
    </div>

    <!-- 他社ペット保険情報 -->
    <div class="mt-7.5">
      <div class="flex-between items-center">
        <ClaimPageHeadText title="他社ペット保険情報" />
        <p
          class="text-primary text-body-sm cursor-pointer"
          @click="goToNextPage('/mypage/contracts/claim/customer/company')"
        >
          登録・変更
        </p>
      </div>
      <div class="mt-6">
        <ClaimTable
          title="うちの子のお名前"
          :content="
            contractInfo?.contractDiagnosisDecl?.hasOtherJoin === 'Y'
              ? contractInfo?.policy.contractSubjectPetList[0].petName
              : 'なし'
          "
        />
        <ClaimTable
          title="加入状況"
          :content="
            contractInfo?.contractDiagnosisDecl?.hasOtherJoin === 'Y'
              ? '加入している'
              : '加入していない'
          "
        />
        <ClaimTable
          title="保険会社名"
          :content="
            contractInfo?.contractDiagnosisDecl?.otherCompanyName || 'なし'
          "
        />
        <ClaimTable
          title="契約者名義"
          :content="
            contractInfo?.contractDiagnosisDecl?.otherHolderName || 'なし'
          "
        />
        <ClaimTable
          title="証券番号"
          :content="
            contractInfo?.contractDiagnosisDecl?.otherPolicyNumber || 'なし'
          "
        />
      </div>
    </div>

    <!-- 口座情報 -->
    <div class="mt-7.5">
      <div class="flex-between items-center">
        <ClaimPageHeadText title="口座情報" />
        <p
          class="text-primary text-body-sm cursor-pointer"
          @click="goToNextPage('/mypage/contracts/claim/customer/account')"
        >
          変更
        </p>
      </div>

      <!-- TODO ゆうちょ銀行のときの処理を考える -->
      <div class="mt-6">
        <ClaimTable title="金融機関" content="ゆうちょ銀行以外" />
        <ClaimTable title="金融機関名" :content="customer?.bankCode" />
        <ClaimTable title="支店名" :content="customer?.branchCode" />
        <ClaimTable
          title="口座種類"
          :content="
            customer?.accountType === 1
              ? '普通'
              : customer?.accountType === 2
              ? '当座'
              : customer?.accountType === 3
              ? '総合'
              : ''
          "
        />
        <ClaimTable title="口座番号" :content="customer?.bankAccount" />
      </div>
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
            @click="goToNextPage('/mypage/contracts/claim/photo')"
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
import ClaimTable from '~/components/claim/parts/ClaimTable';
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    BaseButton,
    ClaimBreadcrumbs,
    ClaimPageTitle,
    ClaimTable,
  },

  layout: 'claim',

  data() {
    return {
      customer: null,
      contractInfo: null,
    };
  },

  async fetch({ store }) {
    await store.dispatch('contracts/contractInfoForMyPage');
  },

  computed: {
    ...mapState({
      policyId: (state) => state.contracts.policyId,
    }),
    ...mapGetters({
      listContractInfo: 'contracts/getListContractInfo',
    }),
  },
  async created() {
    // APIからデータを取得する
    const customer = await this.$store.dispatch('contracts/customerInfo');
    this.customer = customer;

    this.contractInfo = this.listContractInfo?.find(
      ({ policy }) => policy.policyId === this.policyId
    );
  },

  methods: {
    goToNextPage(linkRedirect) {
      this.$router.push(linkRedirect);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
</style>
