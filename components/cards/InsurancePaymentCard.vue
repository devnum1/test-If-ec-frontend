// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="insurance-payment-card">
    <div class="insurance-head">
      <div class="insurance-head__inner">
        {{ $t('common.insurance_payment_amount') }}
      </div>
    </div>
    <div class="insurance-body">
      <div class="insurance-body__inner">
        <div class="insurance-body__inner-input">
          <input
            v-model="insuranceValue"
            name="insuranceValue"
            class=""
            value=""
            placeholder="---"
            @keyup="updatePrice()"
          />
          <div>
            {{ $t('common.yen') }}
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
      progress: 1,
      insuranceValue: null,
    };
  },
  mounted() {},
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');

      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    updatePrice() {
      this.insuranceValue = this.insuranceValue.replace(/\D/g, '');
      this.insuranceValue = this.formatPrice(parseInt(this.insuranceValue));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/components/cards';
</style>
