<template>
  <textarea class="rounded-8" rows="4" :placeholder="placeholder" />
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
textarea {
  width: 100%;
  padding: 16px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  &:focus {
    border-color: rgba(0, 0, 0, 0.6) !important;
  }
  &:focus-visible {
    outline: none;
  }
}
</style>
