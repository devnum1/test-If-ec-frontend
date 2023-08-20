<template>
  <div class="w-full">
    <input type="radio" hidden />

    <!-- チェックされている時 -->
    <label
      v-if="isCheck"
      class="cursor-pointer flex items-center bg-primary-light border-primary text-primary"
    >
      <div class="circle circle-primary rounded-full border-primary bg-white" />
      {{ label }}
    </label>

    <!-- チェックされていない時 -->
    <label
      v-if="!isCheck"
      class="cursor-pointer flex items-center border-secondary text-gray"
    >
      <div class="circle rounded-full border-secondary bg-white" />
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
label {
  margin: auto;
  padding: 16px 12px;
  width: 100%;
  border-radius: 8px;
  gap: 20px;
}

.circle-primary {
  &:before {
    content: ' ' !important;
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    border-radius: 999px !important;
    background-color: #5fbbb5 !important;
  }
}

.circle {
  width: 24px;
  height: 24px;
  padding: 6px;
}
</style>
