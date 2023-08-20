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
      <ClaimPageHeadText
        title="うちの子の写真のアップロード"
        :required="true"
      />

      <div class="mt-6">
        <p class="text-gray-light text-body-xs">
          ※ご請求日から<span class="text-attention">1か月以内</span
          >の画像をアップロードしてください。
        </p>
        <p class="text-gray-light text-body-xs">
          ※1か月より前の画像をアップロードする等、虚偽のご請求については保険金をお支払い致しません。
        </p>
      </div>

      <!-- OKの場合 -->
      <div class="mt-7.5">
        <h3 class="text-body text-gray">OKの場合</h3>
        <div class="claim-image-wrapper border-secondary">
          <img src="~/assets/images/temp-cat.png" width="100%" />
          <p class="text-gray-light text-body-xs mt-4">
            ・診療を受けた子を本人と証明できる<br />
            （正面からの顔が写っている）
          </p>
        </div>
      </div>

      <!-- NGの場合 -->
      <div class="mt-7.5">
        <h3 class="text-body text-gray">NGの場合</h3>
        <div class="claim-image-wrapper border-secondary">
          <div class="claim-two-image-wrapper">
            <div>
              <img src="~/assets/images/black-white-cat.png" width="100%" />
              <p class="text-gray-light text-body-xs mt-4">白黒画像である</p>
            </div>
            <div>
              <img src="~/assets/images/far.png" width="100%" />
              <p class="text-gray-light text-body-xs mt-4">
                遠くからの画像である
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-7.5">
        <ClaimButton title="画像の選択" />
      </div>
      <p class="text-gray-light text-body-sm mt-4">
        ※10MBまで、アップロードいただけます。
      </p>
    </div>

    <!-- 混合ワクチン接種証明書のアップロード -->
    <div class="mt-10">
      <ClaimPageHeadText title="混合ワクチン接種証明書のアップロード" />
      <div class="mt-6">
        <ClaimFormLabel
          title="混合ワクチンを接種していますか？"
          :required="true"
        />
      </div>
      <div class="flex-between gap-2 mt-4">
        <ClaimTextRadioButton label="はい" is-check />
        <ClaimTextRadioButton label="いいえ" />
      </div>
    </div>

    <!-- ワクチン接種証明書は下記にご注意下さい -->
    <div class="mt-6">
      <ClaimTile
        title="ワクチン接種証明書証明書は下記にご注意ください"
        content="・有効期間：ワクチン接種日～次回接種日の中に診療日が含まれる
        ・ワクチン接種日～次回予定日に診療日が含まれる証明書が必要になります ※次回接種予定日の記載がない場合は動物病院さまでご追記のうえ、獣医師先生か動物病院さまのご捺印をお願いいたします"
      />
    </div>

    <div class="flex justify-center mt-6">
      <ClaimButton width="257" title="画像の選択" />
    </div>
    <p class="text-gray-light text-body-sm mt-4">
      ※10MBまで、アップロードいただけます。
    </p>

    <div class="mt-6">
      <ClaimCheckBox
        title="前回請求時の証明書を再アップロード"
        :checked="false"
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
import ClaimCheckBox from '~/components/claim/parts/ClaimCheckBox';
import ClaimButton from '~/components/claim/parts/ClaimButton';
import ClaimFormLabel from '~/components/claim/parts/ClaimFormLabel';

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
</style>
