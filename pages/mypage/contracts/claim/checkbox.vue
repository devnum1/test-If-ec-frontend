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
      <ClaimFormLabel
        title="診療明細に以下の項目がすべて記載されていますか？該当するものは全てチェックしてください。"
        :required="true"
        style="font-size: 14px !important"
      />
      <div class="space-y-2 mt-6">
        <template v-for="(item, index) in checkBoxes">
          <ClaimCheckBox
            :key="index"
            :title="item.title"
            :checked="item.checked"
            :on-click="() => onClickCheckBox(index)"
          />
        </template>
      </div>
      <div class="mt-10">
        <p class="text-gray-light text-body-xs">
          ※1
          診療明細に他の子の項目がある場合は動物病院にうちの子の項目を明記するように依頼してください
          <br />
          ※2
          本人、配偶者、もしくは同居の親族のお名前（左記以外のお名前が記載された場合はご連絡させていただく場合がございます）
        </p>
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
            :disabled="!isAllChecked()"
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
import ClaimCheckBox from '~/components/claim/parts/ClaimCheckBox';
import ClaimFormLabel from '~/components/claim/parts/ClaimFormLabel';

export default {
  components: {
    BaseButton,
    ClaimBreadcrumbs,
    ClaimPageTitle,
    ClaimCheckBox,
    ClaimFormLabel,
  },
  layout: 'claim',

  data() {
    return {
      checkBoxes: [
        {
          title: '動物病院名',
          checked: false,
        },
        {
          title: '診療日',
          checked: false,
        },
        {
          title: 'うちの子のお名前',
          checked: false,
        },
        {
          title: '診療明細は本請求のうちの子のみの診療明細となっている（※1）',
          checked: false,
        },
        {
          title: 'ご契約者さまのお名前（※2）',
          checked: false,
        },
        {
          title: '項目ごとの詳細（検査内容／処置内容／薬品名／製品名 など）',
          checked: false,
        },
        {
          title: '合計請求額と領収額',
          checked: false,
        },
      ],
    };
  },

  methods: {
    onClickCheckBox(index) {
      this.checkBoxes[index].checked = !this.checkBoxes[index].checked;
    },

    isAllChecked() {
      return this.checkBoxes.every((item) => item.checked);
    },

    handleNextStep() {
      this.$router.push('/mypage/contracts/claim/confirm/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
</style>
