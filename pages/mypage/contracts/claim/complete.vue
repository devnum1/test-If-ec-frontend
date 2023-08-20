<template>
  <main class="claim">
    <div class="flex-col justify-between">
      <div style="flex-grow: 1">
        <!-- タイトル -->
        <ClaimPageTitle title="保険金請求" />

        <!-- パンくずリスト -->
        <div class="mt-4">
          <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
        </div>

        <!-- 診療明細について -->
        <div class="mt-6">
          <div class="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
            >
              <circle cx="16.5" cy="16" r="16" fill="#5FBBB5" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.0738 12.1813C23.3775 11.8775 23.3775 11.3851 23.0738 11.0813C22.7701 10.7776 22.2776 10.7776 21.9739 11.0813L14.2161 18.839L10.8902 15.5132C10.5865 15.2094 10.094 15.2094 9.79031 15.5132C9.48656 15.8169 9.48657 16.3094 9.79031 16.6131L13.6668 20.4896C13.9705 20.7933 14.463 20.7933 14.7667 20.4896C14.7756 20.4807 14.7843 20.4716 14.7927 20.4624L23.0738 12.1813Z"
                fill="white"
              />
            </svg>
            <p class="text-primary mt-3">保険金の請求が完了しました</p>
          </div>
          <p class="text-gray text-body-sm mt-14 px-4">
            審査いたしますので最大10営業日ほどお待ちいただくことがあります。審査状況はマイページとメールでお知らせいたします。
          </p>
        </div>
      </div>

      <!-- 下部のボタン -->
      <div class="flex justify-center mt-14">
        <div style="width: 279px">
          <BaseButton
            width="279px"
            :label="$t('common.button.to_my_page')"
            btn-full="btn--full"
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
