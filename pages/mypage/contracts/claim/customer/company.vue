<template>
  <main class="page-content bg-gray claim">
    <!-- タイトル -->
    <ClaimPageTitle title="保険金請求" />

    <!-- パンくずリスト -->
    <div class="mt-4">
      <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
    </div>

    <!-- 他社ペット保険情報 -->
    <div class="mt-10">
      <ClaimPageHeadText title="｛うちの子名｝の他社ペット保険情報" />
      <!-- 保険会社名 -->
      <div class="mt-6">
        <ClaimFormLabel title="保険会社名" required />
        <div class="mt-2">
          <ClaimTextInput placeholder="0000生命" />
        </div>
      </div>

      <!-- 加入状況 -->
      <div class="mt-9">
        <ClaimFormLabel title="加入状況" required />
        <div class="flex-between gap-2 mt-3">
          <ClaimTextRadioButton label="加入中" is-check />
          <ClaimTextRadioButton label="解約済み" />
        </div>
      </div>

      <!-- 契約者名義 -->
      <div class="mt-9">
        <ClaimFormLabel title="契約者名義" required />
        <div class="mt-2">
          <ClaimTextInput placeholder="山田太郎" />
        </div>
      </div>

      <!-- 暗証番号（任意） -->
      <div class="mt-9">
        <ClaimFormLabel title="証券番号（任意）" required />
        <div class="mt-2">
          <ClaimTextInput placeholder="123412341234" />
        </div>
      </div>
    </div>

    <!-- 下部のボタン -->
    <div class="mt-6">
      <div class="flex justify-center mt-14">
        <div style="width: 279px">
          <BaseButton
            width="279px"
            :label="$t('common.button.change')"
            btn-full="btn--full"
            icon-right
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

export default {
  components: {
    BaseButton,
    ClaimBreadcrumbs,
    ClaimPageTitle,
  },
  layout: 'claim',
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
</style>
