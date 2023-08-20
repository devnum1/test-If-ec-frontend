// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="claim-item-modal">
    <div class="modal__overlay">
      <div class="modal__container">
        <div class="modal__body modal-claim">
          <div class="claim-title">
            <div class="claim-title__line">お手元にご用意いただくもの</div>
          </div>
          <div class="claim-row">
            <div class="claim-row__number">
              <div class="claim-row__number__round">1</div>
            </div>
            <div class="claim-row__text">診療明細書の写真</div>
            <div class="claim-row__icon">
              <img
                class="claim-row__icon-image"
                src="~/assets/images/icon-contract.svg"
              />
            </div>
          </div>
          <div class="claim-row">
            <div class="claim-row__number">
              <div class="claim-row__number__round">2</div>
            </div>
            <div class="claim-row__text">飼い主とペットが 一緒に写った写真</div>
            <div class="claim-row__icon">
              <img
                class="claim-row__icon-image"
                src="~/assets/images/icon-pet-owner.svg"
              />
            </div>
          </div>
          <BaseButton
            btn-class="test"
            label="保険金を請求する"
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
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/components/modal';
</style>
