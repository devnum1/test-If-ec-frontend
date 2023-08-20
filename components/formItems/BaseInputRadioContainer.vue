// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div
    :class="[
      'input-radio-container',
      { 'input-radio-container--error': error },
    ]"
  >
    <slot />
    <span v-if="error" class="input-radio-container__error">{{ error }}</span>
  </div>
</template>
<script>
export default {
  name: 'BaseInputRadioContainer',
  props: {
    error: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss">
@import '~/assets/scss/components/base-inputs-radio';
</style>
