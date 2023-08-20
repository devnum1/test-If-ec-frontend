// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="pet-id-modal">
    <div class="modal__overlay">
      <div class="modal__container">
        <div class="modal__close-button">
          <div class="icon-delete" @click="closeModal()" />
        </div>
        <div class="modal__body modal-claim">
          <PetIdCard :pet-info="petInfo" />
          <div class="get-home">
            うちの子の写真を登録して、<br />
            うちの子だけのマイページにしよう！
          </div>
          <BaseButton
            btn-class="test"
            label="編集画面へ"
            btn-full="btn--full"
            icon-right
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      display: true,
      petInfo: {
        name: 'うめじまのうめ子',
        dob: '2018.01.01',
        type: 'スタッフォードシャーブルテリア',
        contract: '70％補償プラン',
        image: '',
        species: 0, // 1 => いぬ, 0 => ねこ
        gender: 0, // 1 => 男の子, 0 => 女の子
      },
    };
  },
  methods: {
    closeModal() {
      this.display = false;
      this.$emit('input', this.display);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/components/modal';
.modal__container {
  padding: 32px 16px 26px 16px;
}
</style>
