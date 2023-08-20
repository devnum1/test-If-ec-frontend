<template>
  <main class="claim">
    <div class="space-y-6">
      <!-- タイトル -->
      <div class="space-y-2">
        <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
        <h1>保険金請求</h1>
        <div class="delimiter-line" style="margin: 16px 0px 24px" />
      </div>

      <div class="space-y-14">
        <div>
          <p class="text-gray-light">
            保険金請求に診断書のアップロードが必須です。こちらのページから診断書をダウンロードして記入後アップロードしてください。
          </p>

          <div class="mt-4">
            <div class="space-y-3">
              <ClaimTile
                title="動物病院さま記入欄があります"
                content="ご契約社さまがご記入・ご訂正された場合は約款第21条（重大事由による解除）が適用される場合がございます"
              />
              <ClaimTile
                title="診断書の内容をご確認ください"
                content="当社指定の診断書以外の場合内容に不備がないか、アップロード前にご確認ください"
              />
            </div>
          </div>
        </div>
        <div>
          <ClaimPageHeadText title="診断書ダウンロード" />
          <div class="flex justify-center mt-6 pb-4">
            <ClaimButton width="279" title="ダウンロードする" />
          </div>
        </div>
        <div>
          <ClaimPageHeadText title="診断書アップロード" required />
          <div class="flex justify-center mt-6 pb-4">
            <ClaimButton
              width="279"
              title="ファイルを選択してアップロードする"
            />
          </div>

          <!-- エラー文 -->
          <div v-if="isError" class="space-y-2">
            <p
              class="flex justify-center gap-1.5 items-center text-body-xss font-bold text-attention"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.9984 0C5.32973 0 0.734375 4.47715 0.734375 10C0.734375 15.5228 5.32973 20 10.9984 20C16.6671 20 21.2624 15.5228 21.2624 10C21.2624 4.47715 16.6671 0 10.9984 0ZM10.9986 5C10.5263 5 10.1432 5.3731 10.1432 5.83333V10.8337C10.1432 11.2939 10.5263 11.667 10.9986 11.667C11.471 11.667 11.8539 11.2939 11.8539 10.8337V5.83333C11.8539 5.37309 11.471 5 10.9986 5ZM11.8537 14.1667C11.8537 14.6269 11.4708 15 10.9984 15C10.526 15 10.1431 14.6269 10.1431 14.1667C10.1431 13.7064 10.526 13.3333 10.9984 13.3333C11.4708 13.3333 11.8537 13.7064 11.8537 14.1667Z"
                  fill="#E0705A"
                />
              </svg>
              ファイルのアップロードができません
            </p>
            <p class="text-center text-body-xs text-attention mb-4">
              詳細は<span class="text-primary">こちら</span>をご確認ください。
            </p>
          </div>

          <p class="text-body-xs text-gray-light">
            ※10MBまで、アップロードいただけます。
          </p>
        </div>
      </div>
      <!-- 次へボタン -->
      <div style="width: 279px; margin: 56px auto 0px !important">
        <BaseButton
          width="279px"
          :label="$t('common.button.next')"
          btn-full="btn--full"
          icon-right
        />
      </div>
      <!-- 戻るボタン -->
      <p
        class="text-primary text-center"
        style="margin-bottom: 40px !important"
      >
        戻る
      </p>
    </div>
  </main>
</template>

<script>
import BaseButton from '~/components/formItems/BaseButton';
import ClaimBreadcrumbs from '@/components/claim/parts/ClaimBreadcrumbs.vue';

export default {
  components: {
    BaseButton,
    ClaimBreadcrumbs,
  },
  layout: 'claim',
  data() {
    return {
      options: [
        { text: '2018', value: '2018' },
        { text: '2019', value: '2019' },
        { text: '2020', value: '2020' },
      ],
      isOpen: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';

.accordion-button {
  border: none;
  background-color: rgba(0, 0, 0, 0);
  text-align: left;
  padding: 8px 0px;
  position: relative;
  color: #fc5555;
}

.horizontal-bar {
  display: inline-block !important;
  width: 12px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.82);
  position: absolute;
  top: 50%;
  right: 0;
}

.vertical-bar {
  display: inline-block !important;
  width: 12px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.82);
  position: absolute;
  top: 50%;
  transform: rotate(90deg);
  right: 0;
}
</style>
