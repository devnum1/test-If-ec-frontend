// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="selected-insurance-card">
    <div class="insurance-head">
      <div class="insurance-head__inner">
        {{ compensation }}{{ $t('insurance.hoshou_plan') }}
      </div>
    </div>
    <div class="insurance-body">
      <div class="insurance-body__inner">
        <div>{{ $t('common.total') }}:&nbsp;</div>
        <div class="insurance-body__inner-price">
          {{ price | formatPrice }}
        </div>
        <div>&nbsp;{{ $t('common.yen_per_month') }}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    compensation: {
      type: String,
      default: '',
    },
    price: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      progress: 1,
      formatedPrice: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.selected-insurance-card {
  border: 1px solid rgba($green-border, 0.15);
  border-radius: 6px;
  text-align: center;
  padding-left: 16px;
  padding-right: 16px;
  background-color: white;
  font-family: $font-family-base;

  .insurance-head {
    &__inner {
      padding-top: 22px;
      padding-bottom: 21px;
      border-bottom: 1px dashed rgba($green-border, 0.15);
      font-size: 24px;
      line-height: 30px;
      color: $green;
      font-family: $font-family-base;
    }
  }

  .insurance-body {
    &__inner {
      font-size: 14px;
      padding-top: 11px;
      padding-bottom: 20px;
      font-family: $font-family-base;
      color: $base-gray;

      div {
        display: inline-block;
      }

      &-price {
        font-size: 24px;
        color: $base-black;
        line-height: 30px;
      }
    }
  }
}
</style>
