<template>
  <main class="page-content bg-gray claim">
    <!-- タイトル -->
    <ClaimPageTitle title="保険金請求" />

    <!-- パンくずリスト -->
    <div class="mt-4">
      <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
    </div>

    <!-- 診療明細書のアップロード -->
    <div class="mt-10">
      <ClaimPageHeadText title="診療明細書のアップロード" />

      <p class="text-gray text-body">
        診療明細書または治療費のお支払いを証明する領収証が必要です。
        <br />
        <br />
        お手続きの途中でお写真をアップロードいただけますので、お手元にご準備ください。
        また、以下をご確認のうえ、お手続きへとお進みください。
      </p>

      <div class="claim-image-wrapper border-secondary mt-6">
        <div class="claim-two-image-wrapper">
          <div>
            <img src="~/assets/images/invisible.png" width="100%" />
            <p class="text-gray-light text-body-xs mt-4">見えない部分がある</p>
          </div>
          <div>
            <img src="~/assets/images/not-all-pictured.png" width="100%" />
            <p class="text-gray-light text-body-xs mt-4">全部映っていない</p>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <div class="claim-one-image-wrapper">
            <img src="~/assets/images/all-good.png" width="100%" />
            <p class="text-gray-light text-body-xs mt-4">
              全部が綺麗に写っている
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 診療明細の画像 -->
    <div class="mt-10">
      <ClaimPageHeadText title="診療明細の画像" :required="true" />

      <p class="text-gray text-body mt-6">診療明細画像を選択してください。</p>

      <div class="mt-6">
        <ClaimTile
          title="画像選択の際は下記にご注意ください"
          content="・複数の診療明細書をお持ちの場合は1通ずつお手続きを進めてください。
          ・診療明細書の両面に印字されている場合や診療明細書が2枚にわたる場合のみ複数の画像をアップロードすることが可能です。
          診察日の異なる明細書を同時にアップロードすることはできません。"
        />
      </div>

      <div class="flex justify-center mt-6">
        <ClaimButton title="画像の選択" />
      </div>
      <p class="text-gray-light text-body-sm mt-4">
        ※10MBまで、アップロードいただけます。
      </p>
    </div>

    <!-- 混合ワクチン接種証明書のアップロード -->
    <div class="mt-10">
      <ClaimPageHeadText title="検査結果表のアップロード" :required="true" />
      <p class="text-body text-gray mt-6">今回の診療で検査はしましたか？</p>
      <div class="flex-between gap-2 mt-3">
        <ClaimTextRadioButton label="はい" />
        <ClaimTextRadioButton label="いいえ" is-check />
      </div>
    </div>

    <div class="flex justify-center mt-6">
      <ClaimButton width="257" title="画像の選択" />
    </div>
    <p class="text-gray-light text-body-sm mt-4">
      ※10MBまで、アップロードいただけます。
    </p>

    <!-- 下部のボタン -->
    <div class="mt-6">
      <div class="flex justify-center">
        <div style="width: 279px">
          <BaseButton
            width="279px"
            :label="$t('common.button.next')"
            btn-full="btn--full"
            icon-right
          />
        </div>
      </div>
      <p
        class="text-primary text-center mt-6 cursor-pointer"
        style="margin-bottom: 40px !important"
      >
        戻る
      </p>
    </div>
  </main>
</template>

<script>
import BaseButton from '~/components/formItems/BaseButton';
import ClaimBreadcrumbs from '~/components/claim/parts/ClaimBreadcrumbs';
import ClaimPageTitle from '~/components/claim/parts/ClaimPageTitle';
import ClaimTile from '~/components/claim/parts/ClaimTile';
import ClaimButton from '~/components/claim/parts/ClaimButton';

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

.claim-image-wrapper {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
}

.claim-two-image-wrapper {
  display: flex;
  justify-content: space-between !important;
  column-gap: 16px;
}

.claim-one-image-wrapper {
  width: 50%;
}
</style>
