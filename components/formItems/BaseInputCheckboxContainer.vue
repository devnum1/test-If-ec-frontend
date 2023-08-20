// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="input-checkbox-container">
    <slot />
    <span v-if="error" class="input-checkbox-container__error">{{
      error
    }}</span>
  </div>
</template>
<script>
export default {
  name: 'BaseInputCheckboxContainer',
  props: {
    error: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss">
@import '~/assets/scss/components/base-inputs-checkbox';
</style>
