// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div
    :class="[
      'base-input',
      { 'base-input--help': helpText },
      { 'base-input--error': error },
      inputClass,
    ]"
  >
    <div class="base-input__wrapper">
      <input
        :id="id"
        ref="input"
        v-mask="mask"
        :name="name"
        :class="{ 'is-danger': error, tracking: !!id }"
        class="base-input__main form-control"
        :type="inputType"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :value="value"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :min="min"
        @input="handleInput"
        @keyup="handleKeyup"
        @keypress="handleKeyPress"
        @blur="handleBlur"
      />
      <span v-if="error" class="base-input__error">{{ error }}</span>
    </div>
    <span v-if="helpText" class="base-input__text">{{ helpText }}</span>
  </div>
</template>
<script>
export default {
  name: 'BaseInput',
  $_veeValidate: {
    // value getter
    value() {
      return this.$el.value;
    },
    // name getter
    name() {
      return this.name;
    },
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    error: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    helpText: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'on',
    },
    mask: {
      type: String,
      default: '',
      required: false,
    },
    id: {
      type: String,
      default: '',
    },
    maxLength: {
      type: String,
      default: '',
    },
    min: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isComposing: false,
    };
  },
  methods: {
    handleKeyup(e) {
      this.$emit('keyup', e);
    },
    handleKeyPress(e) {
      this.$emit('keypress', e);
    },
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    handleBlur(e) {
      this.$emit('blur', e);
    },
  },
};
</script>
<style lang="scss">
@import '~/assets/scss/components/base-inputs';
</style>
