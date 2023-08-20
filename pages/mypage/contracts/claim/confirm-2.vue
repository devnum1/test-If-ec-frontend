<template>
  <main class="claim">
    <div v-if="isDialogOpen" class="dialog">
      <div class="w-full bg-white pt-20" style="position: relative">
        <p class="text-center">ご請求内容１を<br />削除してよろしいですか</p>
        <div style="width: 279px; margin: 60px auto 0px !important">
          <BaseButton
            width="279px"
            :label="$t('削除する')"
            btn-full="btn--full"
          />
        </div>
        <p
          class="text-primary text-center text-body-sm"
          style="margin: 24px 0px 40px !important"
        >
          いいえ
        </p>
        <div
          class="close-button cursor-pointer"
          @click="isDialogOpen = !isDialogOpen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
              fill="black"
              fill-opacity="0.38"
            />
            <g clip-path="url(#clip0_19993_292279)">
              <path
                d="M9.14156 21.2118C8.68719 21.6663 8.68719 22.4032 9.14156 22.8577C9.59592 23.3122 10.3326 23.3122 10.787 22.8577L15.9997 17.6434L21.2146 22.8599C21.669 23.3144 22.4056 23.3144 22.86 22.8599C23.3144 22.4054 23.3144 21.6685 22.86 21.214L17.6451 15.9974L22.8533 10.7876C23.3077 10.3331 23.3077 9.59617 22.8533 9.14166C22.3989 8.68715 21.6623 8.68715 21.2079 9.14166L15.9997 14.3515L10.7937 9.14385C10.3393 8.68934 9.60263 8.68934 9.14826 9.14385C8.6939 9.59836 8.6939 10.3353 9.14826 10.7898L14.3543 15.9974L9.14156 21.2118Z"
                fill="white"
                fill-opacity="0.87"
              />
            </g>
            <defs>
              <clipPath id="clip0_19993_292279">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(8 8)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="space-y-6">
      <!-- タイトル -->
      <div class="space-y-2">
        <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
        <h1>保険金請求</h1>
        <div class="delimiter-line" style="margin: 16px 0px 24px" />
      </div>

      <div class="space-y-14">
        <div class="space-y-6">
          <ClaimPageHeadText title="うちの子情報の確認" />
          <div class="space-y-2">
            <p class="text-body-sm text-gray">診療を受けた子の画像</p>
            <img src="~/assets/images/input-demo01.png" alt="" width="100%" />
          </div>

          <div class="delimiter-line" />

          <div class="space-y-2">
            <p class="text-body-sm text-gray">混合ワクチンを接種しましたか</p>
            <p>はい</p>
          </div>

          <div class="delimiter-line" />

          <div class="space-y-2">
            <p class="text-body-sm text-gray">混合ワクチン接種証明書</p>
            <img src="~/assets/images/input-demo01.png" alt="" width="100%" />
          </div>
        </div>
        <div>
          <button
            class="accordion-button w-full bg-primary-light"
            @click="isOpen = !isOpen"
          >
            ご請求内容１
            <span class="rounded-full horizontal-bar" />
            <span v-if="!isOpen" class="rounded-full vertical-bar" />
          </button>
          <transition name="slide-fade">
            <div v-if="isOpen" class="space-y-6">
              <div class="space-y-2 mt-4">
                <p class="text-body-sm text-gray">診療明細書</p>
                <img
                  src="~/assets/images/input-demo01.png"
                  alt=""
                  width="100%"
                />
              </div>

              <div class="delimiter-line" />

              <div class="space-y-2 mt-4">
                <p class="text-body-sm text-gray">検査結果表</p>
                <img
                  src="~/assets/images/input-demo01.png"
                  alt=""
                  width="100%"
                />
              </div>

              <div class="delimiter-line" />

              <div class="space-y-2">
                <p class="text-body-sm text-gray">
                  「手術」または「税込8万円以上の請求」ですか
                </p>
                <p>はい</p>
              </div>

              <div class="delimiter-line" />
              <div class="space-y-2">
                <p class="text-body-sm text-gray">診断書</p>
                <img
                  src="~/assets/images/input-demo01.png"
                  alt=""
                  width="100%"
                />
              </div>

              <div class="delimiter-line" />

              <!-- 情報 -->
              <div class="space-y-9">
                <div class="space-y-6">
                  <ClaimPageHeadText title="診療に関する情報" />
                  <div>
                    <ClaimConfirmationColumn
                      title="診療内容"
                      answer="通院、入院"
                    />
                    <ClaimConfirmationColumn
                      title="診療日"
                      answer="2023/02/11"
                    />
                    <ClaimConfirmationColumn
                      title="病院名"
                      answer="リトルファミリー動物病院"
                    />
                    <ClaimConfirmationColumn
                      title="病院の電話番号"
                      answer="03-0000-0000"
                    />
                  </div>
                </div>

                <div class="space-y-6">
                  <ClaimPageHeadText title="病気に関する情報" />
                  <div>
                    <ClaimConfirmationColumn title="診断名" answer="骨折" />
                    <ClaimConfirmationColumn title="該当の部位" answer="足" />
                    <ClaimConfirmationColumn
                      title="発症日"
                      answer="2023/02/11"
                    />
                    <ClaimConfirmationColumn
                      title="治療に至るまでの経緯"
                      answer="テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。"
                      wrap="wrap"
                    />
                    <ClaimConfirmationColumn
                      title="ケガ・病気の状態を教えて下さい"
                      answer="経過計測中"
                      half
                    />
                    <ClaimConfirmationColumn
                      title="当社に保険金請求したことのあるケガ・病気の継続治療ですか"
                      answer="はい"
                      half
                    />
                  </div>
                </div>

                <div class="space-y-6">
                  <ClaimPageHeadText title="検査・処置について" />
                  <div>
                    <ClaimConfirmationColumn
                      title="病院内で行った検査・処置を教えてください"
                      answer="注射、手術"
                      wrap="wrap"
                      half
                    />
                    <ClaimConfirmationColumn
                      title="検査・処置の内容を教えて下さい"
                      wrap="wrap"
                      answer="テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。"
                    />
                  </div>
                </div>

                <div class="space-y-6">
                  <ClaimPageHeadText title="処方について" />
                  <div>
                    <ClaimConfirmationColumn
                      title="薬の持ち帰りはありましたか"
                      answer="いいえ"
                      half
                    />
                    <ClaimConfirmationColumn
                      title="薬品名・製品名をご記入ください"
                      answer="テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。"
                      wrap="wrap"
                    />
                    <ClaimConfirmationColumn
                      title="サプリメント、海外薬、漢方薬、その他物品などの持ち帰りはありましたか？"
                      answer="いいえ"
                      half
                    />
                    <ClaimConfirmationColumn
                      title="製品名をご記入ください"
                      answer="テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。"
                      wrap="wrap"
                    />
                    <ClaimConfirmationColumn
                      title="処方食（療法食）の処方はありましたか"
                      answer="いいえ"
                      half
                    />
                    <ClaimConfirmationColumn
                      title="持ち帰り数量をご記入ください"
                      answer="いいえ"
                      half
                    />
                    <ClaimConfirmationColumn
                      title="フィラリア予防薬・ダニ駆虫薬の処方はありましたか"
                      answer="いいえ"
                      half
                    />
                    <ClaimConfirmationColumn
                      title="シャンプーやイヤークリーナーの処方はありましたか"
                      answer="いいえ"
                      half
                    />
                  </div>
                </div>

                <div class="space-y-6">
                  <ClaimPageHeadText title="その他の情報" />
                  <p>
                    テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
                  </p>
                  <div class="delimiter-line" />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="flex justify-center pt-3">
        <ClaimButton width="279" title="上記の内容を変更する" />
      </div>
      <p
        class="text-primary text-center text-attention text-body-sm cursor-pointer"
        style="margin-bottom: 40px !important"
        @click="isDialogOpen = !isDialogOpen"
      >
        上記請求を削除する
      </p>

      <div style="width: 279px; margin: 56px auto 0px !important">
        <BaseButton
          width="279px"
          :label="$t('上記内容で請求する')"
          btn-full="btn--full"
          icon-right
        />
      </div>
      <p
        class="text-primary text-center text-body-sm"
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
      isOpen: false,
      isDialogOpen: false,
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
  padding: 8px;
  position: relative;
}

.horizontal-bar {
  display: inline-block !important;
  width: 12px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.82);
  position: absolute;
  top: 50%;
  right: 8px;
}

.vertical-bar {
  display: inline-block !important;
  width: 12px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.82);
  position: absolute;
  top: 50%;
  transform: rotate(90deg);
  right: 8px;
}

.dialog {
  z-index: 50;
  padding: 0px 24px;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.38);
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}
</style>
