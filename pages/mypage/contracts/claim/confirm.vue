<template>
  <main class="page-content bg-gray claim">
    <!-- タイトル -->
    <ClaimPageTitle title="保険金請求" />

    <!-- パンくずリスト -->
    <div class="mt-4">
      <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
    </div>

    <!-- 診療明細について -->
    <div class="mt-10">
      <ClaimPageHeadText title="ご請求にあたっての同意" />
      <div class="mt-6">
        <ClaimFormLabel
          title="診療明細に以下の項目がすべて記載されていますか？該当するものは全てチェックしてください。"
          :required="true"
          style="font-size: 14px !important"
        />
      </div>
      <div class="mt-4">
        <ClaimCheckBox
          title="はい、同意します"
          :checked="isChecked"
          :on-click="onClickCheckBox"
        />
      </div>
    </div>

    <!-- 下部のボタン -->
    <div class="mt-12">
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
import ClaimPageHeadText from '~/components/claim/parts/ClaimPageHeadText';
import ClaimCheckBox from '~/components/claim/parts/ClaimCheckBox';
import ClaimFormLabel from '~/components/claim/parts/ClaimFormLabel';

export default {
  components: {
    BaseButton,
    ClaimBreadcrumbs,
    ClaimPageTitle,
    ClaimPageHeadText,
    ClaimCheckBox,
    ClaimFormLabel,
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
      this.$router.push('/mypage/contracts/claim/statement/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
</style>
