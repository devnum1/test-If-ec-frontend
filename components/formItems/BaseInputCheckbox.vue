// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <label
    :class="[
      'input-checkbox',
      { 'input-checkbox--outline': outline },
      { 'input-checkbox--center': center },
      { 'input-checkbox--center-step4': centerStep4 },
      inputClass,
    ]"
  >
    <input
      :id="id"
      :class="id ? 'tracking input-checkbox__main' : 'input-checkbox__main'"
      type="checkbox"
      :name="name"
      :value="inputValue"
      :checked="checked"
      :disabled="disabled"
      @click="onChange"
    />
    <span v-if="!outline" class="input-checkbox__checkmark" />
    <span v-if="!outline" class="input-checkbox__title">{{ label }}</span>
    <div v-if="outline" class="input-checkbox__wrapper">
      <span class="input-checkbox__checkmark" />
      <span class="input-checkbox__title input-checkbox__title--outline">{{
        label
      }}</span>
    </div>
  </label>
</template>

<script>
export default {
  name: 'BaseInputCheckbox',
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'radio',
    },
    inputValue: {
      type: String,
      default: '',
    },
    value: {
      type: [Array, Boolean, String],
      default: () => [],
    },
    checked: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    centerStep4: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    checkDisease: {
      type: Boolean,
      default: false,
    },
    singleSelect: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(e) {
      if (this.singleSelect) {
        this.$emit('input', e.currentTarget.value);
      } else if (this.checkDisease) {
        // Outline style get Array value
        let currentValue = [...this.value];
        if (e.target.checked) {
          currentValue.push(e.target.value);
        } else {
          currentValue = currentValue.filter((item) => item !== e.target.value);
        }
        this.$emit('input', currentValue);
      } else {
        this.$emit('input', e.target.checked);
      }
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/scss/components/base-inputs-checkbox';
</style>
