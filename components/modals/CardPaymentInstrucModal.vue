// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="card-payment-instruc-modal" @click="closeModal()">
    <div class="modal__overlay">
      <div class="modal__container card_payment">
        <div class="modal__close-button">
          <div class="icon-delete" @click="closeModal()" />
        </div>
        <div class="modal__body">
          <div class="modal__title">
            VISA・Master・JCB・Diners{{ $t('card.such_as') }}
          </div>
          <div class="modal__card-instruc">
            <div class="image-name">
              {{ $t('card.back_face') }}
            </div>
            <div class="image--atm">
              <img src="~/assets/images/credit.png" />
            </div>
            <div class="image__description">
              {{ $t('card.security_code_instruc_3') }}
            </div>
          </div>
          <div class="modal__title">
            {{ $t('card.american_express') }}
          </div>
          <div class="modal__card-instruc">
            <div class="image-name">
              {{ $t('card.front_face') }}
            </div>
            <div class="image--credit">
              <img src="~/assets/images/AE.png" />
            </div>
            <div class="image__description">
              {{ $t('card.security_code_instruc_4') }}
            </div>
          </div>
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
</style>
