<template>
  <main class="claim">
    <div class="space-y-6">
      <!-- タイトル -->
      <div class="space-y-2">
        <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
        <h1>保険金請求</h1>
        <div class="delimiter-line" style="margin: 16px 0px 24px" />
      </div>

      <div>
        <div>
          <ClaimPageHeadText title="その他の情報" />
          <div class="mt-4">
            <p class="text-body-sm text-gray">
              今回の請求に関する補足事項がございましたら、ご記入ください。質問事項がある場合はお問合せフォームよりご連絡お願いいたします。
            </p>
            <div class="flex-between gap-2 mt-3">
              <ClaimTextArea />
            </div>
          </div>
        </div>

        <div class="mt-14">
          <ClaimPageHeadText title="(n+1)通目の診療明細書の登録" />
          <div class="mt-4">
            <ClaimFormLabel
              title="保険金を請求する診療明細書がほかにもありますか？"
            />
            <div class="flex-between gap-2 mt-3">
              <ClaimTextRadioButton label="はい" is-check />
              <ClaimTextRadioButton label="いいえ" />
            </div>
          </div>
        </div>

        <div class="mt-6">
          <div style="width: 279px; margin: 0px auto !important">
            <BaseButton
              width="279px"
              :label="$t('common.button.next')"
              btn-full="btn--full"
              icon-right
            />
          </div>
          <p
            class="text-primary text-center mt-6"
            style="margin-bottom: 40px !important"
          >
            戻る
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BaseButton from '@/components/formItems/BaseButton';
import ClaimFormLabel from '@/components/claim/parts/ClaimFormLabel.vue';
import ClaimTextRadioButton from '@/components/claim/parts/ClaimTextRadioButton.vue';
import ClaimBreadcrumbs from '@/components/claim/parts/ClaimBreadcrumbs.vue';

export default {
  components: {
    BaseButton,
    ClaimFormLabel,
    ClaimTextRadioButton,
    ClaimBreadcrumbs,
  },
  layout: 'claim',
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
</style>
