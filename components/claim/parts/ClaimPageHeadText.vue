<template>
  <div class="claim-page-head-text-wrapper">
    <span class="claim-page-head-border" />
    <h2 class="claim-page-head-text w-full flex-between items-center">
      {{ title }}
      <span
        v-if="required"
        class="require-label text-body-xxs bg-attention text-white"
      >
        必須
      </span>
    </h2>
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
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
.claim-page-head-text-wrapper {
  display: flex;
  column-gap: 8px;
}
.claim-page-head-text {
  font-size: 18px;
  font-weight: 400;
  color: black;
  opacity: 0.82;
  line-height: 22.5px;
}
.claim-page-head-border {
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: #5fbbb5;
  border-radius: 7px;
}
.require-label {
  padding: 2px 8px !important;
  border-radius: 999px !important;
  display: block;
}
</style>
