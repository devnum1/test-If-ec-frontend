// 01EZTX9M3AWK0ZB16B6KYR56F1
<template>
  <div>
    <p class="text-gray">
      {{ title }}
      <span
        v-if="required"
        class="require-label text-body-xxs bg-attention text-white"
      >
        必須
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    required: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
.require-label {
  padding: 2px 8px !important;
  border-radius: 999px !important;
  display: inline-block;
}
</style>
