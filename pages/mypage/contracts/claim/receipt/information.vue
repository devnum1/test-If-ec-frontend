<template>
  <main class="claim">
    <div class="space-y-6">
      <!-- タイトル -->
      <div class="space-y-2">
        <ClaimBreadcrumbs level1="マイページ" level2="保険金請求" />
        <h1>保険金請求</h1>
        <div class="delimiter-line" style="margin: 16px 0px 24px" />
      </div>

      <div class="space-y-9">
        <div>
          <ClaimPageHeadText title="診療明細に関する情報" />
          <div class="space-y-2 mt-2">
            <ClaimFormLabel title="診療内容" required />
            <ClaimCheckBox title="通院" :checked="true" />
            <ClaimCheckBox title="入院" :checked="false" />
            <ClaimCheckBox title="手術" :checked="false" />
          </div>
        </div>

        <div class="space-y-2">
          <ClaimFormLabel
            title="診療明細書の合計金額は税込8万円以上ですか？"
            required
          />
          <div class="flex-between gap-2">
            <ClaimTextRadioButton label="はい" is-check />
            <ClaimTextRadioButton label="いいえ" />
          </div>
        </div>

        <div class="space-y-2">
          <ClaimFormLabel title="診察日" required />
          <p class="text-body-sm text-gray-light">
            入院、手術の場合は明細に記載の初日をご入力ください。
          </p>
          <div class="flex gap-2">
            <ClaimSelectButton :options="options" label="いいえ" />
            <ClaimSelectButton :options="options" label="いいえ" />
            <ClaimSelectButton :options="options" label="いいえ" />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-body-sm text-gray-light">
            診療明細書に明記されております「動物病院名」「動物病院電話番号」をこちらにご記入ください。
          </p>
          <ClaimFormLabel title="病院名" required />
          <ClaimTextInput placeholder="〇〇〇〇病院" />
        </div>

        <div class="space-y-2">
          <ClaimFormLabel title="病院電話番号" required />
          <ClaimTextInput placeholder="09012345678" />
        </div>

        <div>
          <div class="delimiter-line" style="margin: 8px 0px" />
          <button
            class="accordion-button w-full text-body-sm"
            @click="isOpen = !isOpen"
          >
            過去に通院した動物病院を選択する
            <span class="rounded-full horizontal-bar" />
            <span v-if="!isOpen" class="rounded-full vertical-bar" />
          </button>
          <transition name="slide-fade">
            <div v-if="isOpen" class="space-y-2">
              <ClaimRadioButton label="〇〇病院" is-check />
              <ClaimRadioButton label="〇〇病院" />
            </div>
          </transition>
          <div class="delimiter-line" style="margin: 8px 0px" />
        </div>
        <div style="width: 279px; margin: 120px auto 0px !important">
          <BaseButton
            width="279px"
            :label="$t('common.button.next')"
            btn-full="btn--full"
            icon-right
          />
        </div>
        <p
          class="text-primary text-center"
          style="margin-bottom: 40px !important"
        >
          戻る
        </p>
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
