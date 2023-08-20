<template>
  <div
    :id="id"
    class="d-flex justify-content-center cursor-pointer"
    :class="disabled ? 'text-disabled' : 'text_default'"
    @click="handleBack"
  >
    <i class="icon-fonts icon-fonts--back" />
    <span class="ml-2">{{ label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleBack(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped>
.text-disabled {
  color: $gray-1;
  cursor: not-allowed;
}

.text_default {
  color: $green;
}

i {
  font-size: 16px;
  padding-top: 5px;
}
</style>
