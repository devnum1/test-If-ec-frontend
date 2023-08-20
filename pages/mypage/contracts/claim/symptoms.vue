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
          <ClaimPageHeadText title="n通目の診療明細書に関する情報" />
          <div class="mt-4">
            <ClaimFormLabel title="(n-1)通目の診療明細書の内容と同様ですか？" />
            <div class="flex-between gap-2 mt-3">
              <ClaimTextRadioButton label="はい" is-check />
              <ClaimTextRadioButton label="いいえ" />
            </div>
          </div>
        </div>

        <div>
          <ClaimPageHeadText title="病気に関する情報" />
          <div class="mt-4">
            <div class="space-y-9">
              <div class="space-y-2">
                <ClaimFormLabel title="診断名" required />
                <p class="text-body-sm text-gray-light">
                  診断明細書に記載の傷病名または症状をご記入ください。
                </p>
                <ClaimTextInput placeholder="例）" />
              </div>
              <div class="space-y-2">
                <ClaimFormLabel title="該当の部位" required />
                <p class="text-body-sm text-gray-light">
                  ※例：お腹、右前肢、背中皮膚など
                </p>
                <ClaimTextInput placeholder="例）" />
              </div>
              <div class="space-y-2">
                <ClaimFormLabel title="発症日" required />
                <p class="text-body-xs text-gray-light">
                  ※病院受診前に症状が出た場合は、その日をご記入ください
                </p>
                <div class="flex gap-2">
                  <ClaimSelectButton :options="options" />
                  <ClaimSelectButton :options="options" />
                  <ClaimSelectButton :options="options" />
                </div>
              </div>
              <div class="space-y-2">
                <ClaimFormLabel title="治療に至るまでの経緯" required />
                <p class="text-body-sm text-gray">
                  発症（受傷）の原因や状況をご記入をお願いいたします。
                </p>
                <p class="text-body-xs text-gray-light">
                  【記入例】2、3日前から下痢で、食欲が落ちてきたため、病院に連れて行った。病院で注射してもらい、その後１週間内服薬を飲ませて回復した。
                </p>
                <ClaimTextArea />
              </div>
              <div class="space-y-2">
                <ClaimFormLabel
                  title="ケガ・病気の現在の状態を教えてください"
                  required
                />
                <div class="space-y-2">
                  <ClaimCheckBox title="完治" :checked="true" />
                  <ClaimCheckBox title="治療中" :checked="false" />
                  <ClaimCheckBox
                    title="経過観察中（投薬や治療を行なっていない）"
                    :checked="false"
                  />
                  <ClaimCheckBox title="ご逝去" :checked="false" />
                </div>
              </div>
              <div class="space-y-2">
                <ClaimFormLabel title="ご逝去日" required />
                <div class="flex gap-2">
                  <ClaimSelectButton :options="options" />
                  <ClaimSelectButton :options="options" />
                  <ClaimSelectButton :options="options" />
                </div>
              </div>
              <div class="space-y-2">
                <ClaimFormLabel
                  title="当社に保険金請求したことのあるケガ・病気の継続治療ですか？"
                  required
                />
                <div class="flex-between gap-2 mt-3">
                  <ClaimTextRadioButton label="はい" is-check />
                  <ClaimTextRadioButton label="いいえ" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ClaimPageHeadText title="検査・処置について" />
          <div class="mt-4">
            <div class="space-y-9">
              <div class="space-y-2">
                <ClaimFormLabel title="今回、診察は受けましたか" required />
                <div class="space-y-2">
                  <ClaimRadioButton label="はい" is-check />
                  <ClaimRadioButton label="いいえ" />
                  <ClaimRadioButton label="いいえ（薬の受け取りのみ）" />
                </div>
              </div>
              <div class="space-y-2">
                <ClaimFormLabel
                  title="病院内で行った検査・処置を教えてください"
                  required
                />
                <div class="space-y-2">
                  <ClaimCheckBox title="注射" :checked="true" />
                  <ClaimCheckBox title="点滴" :checked="false" />
                  <ClaimCheckBox title="処置" :checked="false" />
                  <ClaimCheckBox title="手術" :checked="false" />
                  <ClaimCheckBox title="検査" :checked="true" />
                  <ClaimCheckBox
                    title="その他（予防、お手入れ含む）"
                    :checked="false"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <ClaimFormLabel title="内容をご記入ください" required />
                <ClaimTextInput placeholder="血液検査" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <ClaimPageHeadText title="処方について" />
          <div class="mt-4">
            <div class="space-y-9">
              <div class="space-y-2">
                <ClaimFormLabel title="薬の持ち帰りはありましたか" required />
                <div class="space-y-2">
                  <ClaimRadioButton
                    label="はい（診療明細に薬品・製品名の記載あり）"
                    is-check
                  />
                  <ClaimRadioButton
                    label="はい（診療明細に薬品・製品名の記載なし）"
                  />
                  <ClaimRadioButton label="いいえ" />
                </div>
              </div>
              <div class="space-y-2">
                <ClaimFormLabel
                  title="薬品名・製品名をご記入ください"
                  required
                />
                <ClaimTextArea />
              </div>
              <div class="space-y-2">
                <ClaimFormLabel
                  title="サプリメント、海外薬、漢方薬、その他物品などの持ち帰りはありましたか？"
                  required
                />
                <div class="space-y-2">
                  <ClaimRadioButton
                    label="はい（診療明細に製品名の記載あり）"
                    is-check
                  />
                  <ClaimRadioButton
                    label="はい（診療明細に製品名の記載なし）"
                  />
                  <ClaimRadioButton label="いいえ" />
                </div>
              </div>
              <div class="space-y-2">
                <ClaimFormLabel title="製品名をご記入ください" required />
                <ClaimTextArea />
              </div>
              <div class="space-y-2">
                <ClaimFormLabel
                  title="処方食（療法食）の処方はありましたか"
                  required
                />
                <div class="space-y-2">
                  <ClaimRadioButton label="はい（持ち帰り）" is-check />
                  <ClaimRadioButton label="はい（病院内使用）" />
                  <ClaimRadioButton label="はい（持ち帰りと病院内使用）" />
                  <ClaimRadioButton label="いいえ" />
                </div>
              </div>
              <div class="space-y-2">
                <ClaimFormLabel title="持ち帰り数量をご記入ください" required />
                <ClaimTextInput />
              </div>
              <div class="space-y-2">
                <ClaimFormLabel
                  title="フィラリア予防薬・ダニ駆虫薬の処方はありましたか"
                  required
                />
                <div class="space-y-2">
                  <ClaimRadioButton label="はい（予防）" is-check />
                  <ClaimRadioButton label="はい（治療）" />
                  <ClaimRadioButton label="いいえ" />
                </div>
              </div>
              <div class="space-y-2">
                <ClaimFormLabel
                  title="シャンプーやイヤークリーナーの処方はありましたか"
                  required
                />
                <div class="space-y-2">
                  <ClaimRadioButton label="はい（予防）" is-check />
                  <ClaimRadioButton label="はい（治療）" />
                  <ClaimRadioButton label="いいえ" />
                  <p class="text-body-xs text-attention">
                    ※
                    診療明細書に診断名・発症日・治療目的で処方されたことの明記と動物病院さまのご捺印が必須となります
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
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
import BaseButton from '~/components/formItems/BaseButton';
import ClaimFormLabel from '@/components/claim/parts/ClaimFormLabel.vue';
import ClaimTextRadioButton from '~/components/claim/parts/ClaimTextRadioButton.vue';
import ClaimSelectButton from '~/components/claim/parts/ClaimSelectButton.vue';
import ClaimTextInput from '~/components/claim/parts/ClaimTextInput.vue';
import ClaimBreadcrumbs from '@/components/claim/parts/ClaimBreadcrumbs.vue';

export default {
  components: {
    BaseButton,
    ClaimFormLabel,
    ClaimTextRadioButton,
    ClaimSelectButton,
    ClaimTextInput,
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
