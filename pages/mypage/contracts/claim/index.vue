<template>
  <main class="page-content bg-gray claim">
    <!-- タイトル -->
    <ClaimPageTitle title="保険金請求" />

    <!-- パンくずリスト -->
    <div class="mt-4">
      <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
    </div>

    <!-- ご請求にあたってのご注意時以降 -->
    <div class="mt-10">
      <ClaimPageHeadText title="ご請求にあたってのご注意事項" />

      <div class="mt-6">
        <div class="space-y-3">
          <ClaimTile
            title="保証開始後の発症の病気が対象です"
            content="補償開始日より前に発症したケガや病気に関する治療は、保険金をお支払いできません"
          />
          <ClaimTile
            title="補償対象外の病気もございます"
            content="当社約款に明記している補償対象外項目（歯科治療や健康診断等の予防行為など）は保険金をお支払いできません。"
          />

          <ClaimTile
            title="恣意的な偽告知にご注意ください"
            content="適切な病歴告知をせず保険金をご請求いただいた場合は、契約解除や訴訟の対象となる可能性もございます。"
          />
        </div>
      </div>
    </div>

    <!-- 不正請求について -->
    <div class="mt-7.5">
      <div class="space-y-6">
        <ClaimPageHeadText title="不正請求について" />

        <p class="text-body-sm text-gray font-normal">
          当社では適正に保険金をお支払いするため、不正請求の防止に努めています。
        </p>

        <div class="flex justify-center">
          <ClaimButton
            title="保険金の不正請求とは"
            onclick="window.open('https://www.notion.so/littlefamily/cd7bc72593be4503b42cdd18e54e8ae5', '_blank')"
          />
        </div>
      </div>
    </div>

    <!-- ご請求にあたっての同意 -->
    <div class="mt-7.5">
      <div class="mt-6 space-y-4">
        <ClaimPageHeadText title="ご請求にあたっての同意" />
        <ClaimFormLabel title="ご請求にあたっての同意" :required="true" />
        <ClaimCheckBox
          title="はい、確認しました"
          :checked="isChecked"
          :on-click="onClickCheckBox"
        />
      </div>
    </div>

    <!-- 下記をご準備ください -->
    <div class="mt-7.5">
      <ClaimPageHeadText title="下記をご準備ください" />
      <div class="mt-6">
        <div class="font-normal text-body-sm text-gray">
          <p>保険金請求にあたり、以下をご用意ください。</p>
          <br />
          <p>【必須】</p>
          <p>・診断明細書</p>
          <p>・うちの子の写真</p>
          <br />
          <p>【ワクチン接種したことが場合】</p>
          <p>・混合ワクチンの接種証明書</p>
          <br />
          <p>【手術、または8万円を超えるご請求の場合】</p>
          <p>・各項目をご記入いただいた当初指定の診断書</p>
        </div>
      </div>
    </div>

    <!-- 下部のボタン -->
    <div class="mt-6">
      <div class="flex justify-center">
        <ClaimButton
          width="257"
          :is-pdf="true"
          title="当社指定診断書はこちら"
          onclick="window.open('https://www.notion.so/littlefamily/754df689831944659b569aa11954fb31', '_blank')"
        />
      </div>
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
import ClaimButton from '~/components/claim/parts/ClaimButton';
import ClaimFormLabel from '~/components/claim/parts/ClaimFormLabel';
import ClaimPageHeadText from '~/components/claim/parts/ClaimPageHeadText';

export default {
  components: {
    BaseButton,
    ClaimBreadcrumbs,
    ClaimPageTitle,
    ClaimTile,
    ClaimCheckBox,
    ClaimButton,
    ClaimFormLabel,
    ClaimPageHeadText,
  },
  layout: 'claim',

  data() {
    return {
      isChecked: false,
    };
  },

  methods: {
    onClickCheckBox() {
      this.isChecked = !this.isChecked;
    },

    handleNextStep() {
      this.$router.push('/mypage/contracts/claim/checkbox/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
</style>
