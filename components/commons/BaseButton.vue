<template>
  <button
    type="submit"
    class="submit-button"
    :class="{
      [className]: !!className,
      disabled: disabled,
    }"
    :style="{
      width,
      height,
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.submit-button {
  color: #fff;
  display: flex;
  padding: 17px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 47px;
  border: 1px solid #4b9590;
  background: #5fbbb5;
  box-shadow: 0 4px 0 0 #4b9590;
}
.disabled {
  background-color: $white;
  box-shadow: none;
  color: rgba($black, 0.15);
  border-color: rgba($black, 0.15);
}
</style>
