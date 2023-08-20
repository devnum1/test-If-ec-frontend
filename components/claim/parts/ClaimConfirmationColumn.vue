<template>
  <div
    class="confirm-column flex-between gap-2 items-center"
    :style="{ 'flex-wrap': `${wrap}` }"
  >
    <p class="text-gray text-body-sm" :style="{ width: `${half && '50%'}` }">
      {{ title }}
    </p>
    <p>{{ answer }}</p>
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
    answer: {
      type: String,
      required: true,
      default: '',
    },
    wrap: {
      type: String,
      required: false,
      default: 'nowrap',
    },
    half: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
.confirm-column {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15) !important;
  padding: 12px 8px !important;
}
</style>
