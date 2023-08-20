// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div :class="['base-label', labelClass]">
    <label class="base-label__main">
      <span class="base-label__text">{{ labelTitle }}</span>
      <span v-if="required" class="base-label__required">
        {{ $t('common.input.required') }}</span
      >
    </label>
    <div v-if="labelHelp" class="base-label__help">
      {{ labelHelp }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseLabel',
  props: {
    labelTitle: {
      type: String,
      default: '',
    },
    labelHelp: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    labelClass: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss">
@import '~/assets/scss/components/base-labels';
</style>
