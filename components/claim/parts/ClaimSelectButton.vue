<template>
  <div class="w-full" style="position: relative">
    <select class="rounded-8 cursor-pointer" @change="onChange($event)">
      <option value="">選択してください</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <span class="custom-arrow text-gray text-body-xs">▼</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onChange(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';

select {
  padding: 16px 12px;
  width: 100%;
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  &:focus {
    border-color: rgba(0, 0, 0, 0.6) !important;
  }
  &:focus-visible {
    outline: none;
  }
}

.custom-arrow {
  position: absolute;
  top: 50%;
  right: 18px;
  pointer-events: none;
  transform: translateY(-50%);
}
</style>
