<template>
  <div class="w-full">
    <input type="radio" hidden />

    <!-- チェックされている時 -->
    <label
      v-if="isCheck"
      class="text-center bg-primary-light border-primary text-primary"
    >
      {{ label }}
    </label>

    <!-- チェックされていない時 -->
    <label
      v-if="!isCheck"
      class="text-center border-secondary text-gray"
      @click="onClick"
    >
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
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
label {
  margin: auto;
  padding: 16px;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
}
</style>
